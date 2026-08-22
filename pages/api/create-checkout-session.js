export default async function handler(req, res) {
  console.log("create-checkout-session hit", { method: req.method, body: req.body });

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId, successUrl, cancelUrl } = req.body || {};

    if (!priceId || !successUrl || !cancelUrl) {
      console.log("create-checkout-session missing fields", { priceId, successUrl, cancelUrl });
      return res.status(400).json({ error: "Missing priceId, successUrl or cancelUrl" });
    }

    // Placeholder behavior for testing (replace with real Stripe call later).
    const fakeSessionUrl = `https://example.com/checkout?price=${encodeURIComponent(priceId)}`;

    console.log("create-checkout-session success", { priceId, successUrl, cancelUrl, fakeSessionUrl });

    return res.status(200).json({
      success: true,
      sessionUrl: fakeSessionUrl,
      received: { priceId, successUrl, cancelUrl }
    });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
