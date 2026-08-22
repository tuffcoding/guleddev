// Minimal Node/Express Stripe Checkout example
// Install: npm install express stripe body-parser dotenv
// Usage: set STRIPE_SECRET_KEY and DOMAIN in .env
require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const DOMAIN = process.env.DOMAIN || 'https://your-domain.com';

app.use(express.static('public'));
app.use(express.json());

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl } = req.body;
    if (!priceId) return res.status(400).json({ error: 'Missing priceId' });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // or 'payment' for one-time
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl || `${DOMAIN}/success`,
      cancel_url: cancelUrl || `${DOMAIN}/canceled`,
    });

    // Respond with the hosted URL
    return res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// Webhook endpoint for post-checkout handling (replace STRIPE_WEBHOOK_SECRET)
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  try {
    let event;
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      event = req.body; // Not recommended for production
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // TODO: fulfill the purchase, provision account, send emails, etc.
      console.log('Checkout session completed:', session.id);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
