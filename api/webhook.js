// api/webhook.js
import Stripe from 'stripe';
import { Readable } from 'stream';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-11-15' });

// Helper: read raw body (works in Vercel serverless Node functions)
async function rawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

// OPTIONAL: implement durable idempotency store here (Postgres, Redis, Supabase).
// Example: call await alreadyProcessed(event.id); then markProcessed(event.id) after handling.
// Without a durable store you risk double-processing on retries.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const sig = req.headers['stripe-signature'];
  if (!sig) {
    console.warn('Missing stripe-signature header');
    return res.status(400).send('Missing stripe-signature header');
  }

  let event;
  try {
    const buf = await rawBody(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Idempotency check: make sure you have a durable store to record processed event ids.
  // Example pseudo:
  // if (await alreadyProcessed(event.id)) {
  //   console.log('Already processed', event.id);
  //   return res.status(200).json({ received: true });
  // }
  // await markProcessed(event.id);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('checkout.session.completed', session.id, session.customer_email || '');
        // TODO: provision user, create order in DB, send confirmation email, etc.
        break;
      }
      case 'invoice.payment_succeeded': {
        console.log('invoice.payment_succeeded', event.data.object.id);
        // TODO: update subscription status in DB
        break;
      }
      default:
        console.log('Unhandled event type', event.type);
    }

    // Return 2xx to acknowledge receipt
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Error handling event', event.id, err);
    // Non-2xx will cause Stripe to retry. Consider returning 200 if you handled but logged a recoverable issue.
    return res.status(500).send('Internal handler error');
  }
}