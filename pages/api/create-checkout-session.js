import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId, successUrl, cancelUrl } = req.body || {};
    if (!priceId || !successUrl || !cancelUrl) {
      return res.status(400).json({ error: "Missing priceId, successUrl or cancelUrl" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // use "payment" instead if these are one-time purchases, not recurring plans
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return res.status(200).json({ success: true, sessionUrl: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
