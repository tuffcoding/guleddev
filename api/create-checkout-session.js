// api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-11-15' });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { priceId, mode = 'subscription', successUrl, cancelUrl, customerEmail, metadata } = req.body;

    if (!priceId) return res.status(400).json({ error: 'Missing priceId' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: mode === 'payment' ? 'payment' : 'subscription',
      success_url: successUrl || `${process.env.DOMAIN}/?success=true`,
      cancel_url: cancelUrl || `${process.env.DOMAIN}/?canceled=true`,
      customer_email: customerEmail || undefined,
      metadata: metadata || {},
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}