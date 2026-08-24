import { useState, useEffect } from "react";
import Head from "next/head";

const SPACE_IMG = (w, h) =>
  `https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/science/2022/07/STScI-01GA6KKWG229B16K4Q38CH3BXS.png?w=w&h={h}&fit=clip&crop=faces,focalpoint`;

const NAV_ITEMS = ["home", "services", "pricing", "about"];

const SERVICES = [
  {
    icon: "🚀",
    number: "01",
    title: "Deployment & DevOps",
    description:
      "We take your codebase from repo to production — CI/CD, environment config, and zero-downtime releases handled for you.",
    example:
      "A Next.js + Stripe storefront, wired to Vercel with automatic preview deployments on every pull request.",
    steps: [
      ["Connect your repo", "Link GitHub or GitLab and we configure the build pipeline around your stack."],
      ["Automate the pipeline", "Every push gets linted, built, and deployed to a preview URL automatically."],
      ["Ship to production", "One approval promotes a preview straight to your live domain, no manual steps."],
    ],
    outcome: "Deploys that used to take an afternoon now take under two minutes.",
  },
  {
    icon: "🔒",
    number: "02",
    title: "Security & Reliability",
    description:
      "Secrets management, dependency scanning, and uptime monitoring so a bad deploy never becomes a bad week.",
    example:
      "Environment secrets moved out of client code and into your host's encrypted variable store, with rotation reminders.",
    steps: [
      ["Audit the surface area", "We scan for exposed keys, outdated packages, and unsafe defaults."],
      ["Lock it down", "Secrets move server-side, webhooks get signature verification, and access is scoped."],
      ["Watch it continuously", "Uptime and error monitoring alert you before your customers notice anything."],
    ],
    outcome: "Fewer 3am pages, and a paper trail when something does go wrong.",
  },
  {
    icon: "🎧",
    number: "03",
    title: "Ongoing Support",
    description:
      "Direct access to a developer who already knows your codebase — no ticket queues, no re-explaining context.",
    example:
      "A checkout endpoint returning 404 after a deploy, diagnosed and fixed same-day by someone who built it.",
    steps: [
      ["Reach out directly", "Email or message us — you're talking to the person who wrote the code."],
      ["Get a real diagnosis", "We reproduce the issue against your actual deployment, not a generic checklist."],
      ["Fixed and documented", "You get the fix and a short note on why it happened, so it doesn't repeat."],
    ],
    outcome: "Problems get solved in hours, not support-ticket weeks.",
  },
];

const PLANS = [
  {
    name: "Starter",
    summary: "For a single site that just needs to work.",
    price: "$19",
    period: "/mo",
    features: ["1 production site", "Deploy pipeline setup", "Email support"],
    dark: false,
    priceId: "price_1U82Bk1jo0lM4L8bXOLAkhWa",
  },
  {
    name: "Growth",
    summary: "For products that are starting to matter.",
    price: "$79",
    period: "/mo",
    features: ["Up to 5 sites", "Stripe & webhook integration", "Priority support, same-day response"],
    dark: true,
    badge: "MOST POPULAR",
    priceId: "price_1U82CN1jo0lM4L8blPH6HpCj",
  },
  {
    name: "Scale",
    summary: "For teams that need a dedicated partner.",
    price: "Let's talk",
    features: ["Unlimited sites", "Dedicated on-call support", "Custom infrastructure review"],
    dark: false,
  },
];

export default function Home() {
  const [view, setView] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openService, setOpenService] = useState(null);
  const [offerVisible, setOfferVisible] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setOfferVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  function go(target) {
    setView(target);
    setMobileOpen(false);
  }

  async function handleCheckout(priceId) {
    setCheckoutLoading(priceId);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/?checkout=success`,
          cancelUrl: `${window.location.origin}/`,
        }),
      });
      const data = await res.json();
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        alert("Something went wrong starting checkout. Please try again.");
        setCheckoutLoading(null);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong starting checkout. Please try again.");
      setCheckoutLoading(null);
    }
  }

  return (
    <>
      <Head>
        <title>GuledDev — Managed development &amp; hosting</title>
        <link rel="icon" href="/logo-icon.jpeg" />
        <link rel="apple-touch-icon" href="/logo-icon.jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="page">
        {/* HEADER */}
        <header className="header">
          <div className="container header-row">
            <button className="brand" onClick={() => go("home")}>
              <img src="/logo-icon.jpeg" alt="GuledDev" className="brand-icon" />
              GuledDev
            </button>
            <nav className="nav-desktop">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  className={`nav-link ${view === item ? "active" : ""}`}
                  onClick={() => go(item)}
                >
                  {item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </nav>
            <div className="header-actions">
              <a className="header-email" href="mailto:hello@guleddev.com">hello@guleddev.com</a>
              <button className="btn btn-accent" onClick={() => go("pricing")}>Get started</button>
            </div>
            <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMobileOpen((o) => !o)}>
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
          {mobileOpen && (
            <nav className="nav-mobile">
              {NAV_ITEMS.map((item) => (
                <button key={item} className="nav-mobile-link" onClick={() => go(item)}>
                  {item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
              <a className="header-email" href="mailto:hello@guleddev.com">hello@guleddev.com</a>
            </nav>
          )}
        </header>

        {/* HOME */}
        {view === "home" && (
          <>
            <section className="hero">
              <div className="hero-bg" />
              <div className="container hero-grid">
                <div>
                  <div className="eyebrow-row">
                    <span className="dot" />
                    <span className="eyebrow eyebrow-light">Managed dev &amp; hosting</span>
                  </div>
                  <h1 className="hero-title">Ship your product.<br />We&apos;ll run the infrastructure.</h1>
                  <p className="hero-copy">
                    Deployment pipelines, Stripe checkout, webhooks, monitoring — the parts of shipping
                    a product that eat your week. We build and run them so you can stay focused on the
                    product itself.
                  </p>
                  <div className="btn-row">
                    <button className="btn btn-accent btn-lg" onClick={() => go("pricing")}>See pricing</button>
                    <button className="btn btn-ghost btn-lg" onClick={() => go("services")}>View services</button>
                  </div>
                  <div className="trust-row">
                    <span>✓ Uptime monitored 24/7</span>
                    <span>⚡ Deploys in minutes, not hours</span>
                  </div>
                </div>
                <div className="hero-image-card">
                  <img src={SPACE_IMG(1100, 850)} alt="Carina Nebula captured by NASA's James Webb Space Telescope" />
                  <div className="hero-image-caption">
                    <span className="hero-image-icon">📡</span>
                    <div>
                      <div className="eyebrow eyebrow-light">Live status</div>
                      <div className="hero-image-label">Infrastructure that doesn&apos;t sleep</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section section-light">
              <div className="container mission-grid">
                <div className="mission-image-wrap">
                  <img src={SPACE_IMG(800, 620)} alt="Star-forming region of the Carina Nebula" />
                  <div className="mission-caption">7,600 light-years from Earth — and your server still needs a human watching it.</div>
                </div>
                <div>
                  <div className="eyebrow eyebrow-green">Our mission</div>
                  <h2 className="section-title">Built for founders who&apos;d rather build than debug deploys.</h2>
                  <p className="section-copy">
                    Most teams lose days to preview-URL churn, misconfigured build settings, and 404s
                    that shouldn&apos;t exist. We set your project up right the first time — and stay on
                    as the person you call when something breaks.
                  </p>
                  <button className="btn btn-dark" onClick={() => go("about")}>More about us</button>
                </div>
              </div>
            </section>

            <section className="section section-dark">
              <div className="container">
                <div className="eyebrow eyebrow-light">Why founders switch</div>
                <h2 className="section-title" style={{ color: "#fff" }}>An AI can generate a site. It can&apos;t answer the phone when it breaks.</h2>
                <p className="section-copy" style={{ color: "#c2ccd4" }}>
                  Prompt-based builders are fast for a first draft — then you&apos;re on your own for
                  Stripe, webhooks, security, and the 2am outage. GuledDev is the difference between
                  a generated site and a maintained product.
                </p>
                <div className="compare-grid">
                  <div className="compare-col">
                    <div className="compare-col-title compare-col-title-them">AI website builders</div>
                    <ul className="compare-list">
                      <li><span className="x">✕</span>Generic template, generated in seconds</li>
                      <li><span className="x">✕</span>You debug integrations yourself</li>
                      <li><span className="x">✕</span>Support is a chatbot or a ticket queue</li>
                      <li><span className="x">✕</span>Locked into their platform &amp; pricing</li>
                    </ul>
                  </div>
                  <div className="compare-col compare-col-highlight">
                    <img src="/logo-icon.jpeg" alt="" className="compare-icon" />
                    <div className="compare-col-title compare-col-title-us">GuledDev</div>
                    <ul className="compare-list">
                      <li><span className="check">✓</span>Built and reviewed by an actual developer</li>
                      <li><span className="check">✓</span>Stripe, webhooks, and deploys wired correctly the first time</li>
                      <li><span className="check">✓</span>Direct line to the person who wrote your code</li>
                      <li><span className="check">✓</span>You own the codebase — no platform lock-in</li>
                    </ul>
                  </div>
                </div>
                <button className="btn btn-accent btn-lg" style={{ marginTop: "2.5rem" }} onClick={() => go("pricing")}>See pricing</button>
              </div>
            </section>
          </>
        )}

        {/* SERVICES */}
        {view === "services" && (
          <>
            <section className="section section-light section-border">
              <div className="container">
                <div className="eyebrow eyebrow-green">Services</div>
                <h2 className="section-title">Everything from first commit to first customer.</h2>
                <p className="section-copy section-copy-wide">Pick what you need — deployment, security, ongoing support — or bundle all three.</p>
              </div>
            </section>
            <section className="section section-white">
              <div className="container">
                <div className="eyebrow eyebrow-muted" style={{ marginBottom: "1.75rem" }}>Tap a card to see how it works</div>
                <div className="service-grid">
                  {SERVICES.map((s, i) => {
                    const isOpen = openService === i;
                    return (
                      <article key={s.title} className={`service-card ${isOpen ? "open" : ""}`}>
                        <button className="service-toggle" aria-expanded={isOpen} onClick={() => setOpenService(isOpen ? null : i)}>
                          <span className="service-icon">{s.icon}</span>
                          <div className="service-number">{s.number}</div>
                          <h3 className="service-title">{s.title}</h3>
                          <p className="service-desc">{s.description}</p>
                          <span className="service-cta">{isOpen ? "Show less −" : "See how it works +"}</span>
                        </button>
                        {isOpen && (
                          <div className="service-detail">
                            <img src={SPACE_IMG(700, 380)} alt="" className="service-detail-image" />
                            <div className="eyebrow eyebrow-muted" style={{ marginBottom: ".4rem" }}>Example</div>
                            <p className="service-example">{s.example}</p>
                            <div className="service-steps">
                              {s.steps.map(([title, copy], idx) => (
                                <div className="service-step" key={title}>
                                  <span className="step-num">0{idx + 1}</span>
                                  <div>
                                    <div className="step-title">{title}</div>
                                    <p className="step-copy">{copy}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="service-outcome">{s.outcome}</div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {/* PRICING */}
        {view === "pricing" && (
          <section className="section section-white">
            <div className="container">
              <div className="eyebrow eyebrow-green">Pricing</div>
              <h2 className="section-title" style={{ marginBottom: "3rem" }}>Simple plans, no surprise invoices.</h2>
              <div className="pricing-grid">
                {PLANS.map((plan) => (
                  <article key={plan.name} className={`plan-card ${plan.dark ? "plan-dark" : ""}`}>
                    {plan.badge && <div className="plan-badge">{plan.badge}</div>}
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-summary">{plan.summary}</p>
                    <div className="plan-price">
                      <span className="plan-price-num">{plan.price}</span>
                      {plan.period && <span className="plan-price-period">{plan.period}</span>}
                    </div>
                    <ul className="plan-features">
                      {plan.features.map((f) => (
                        <li key={f}><span className="check">✓</span>{f}</li>
                      ))}
                    </ul>
                    {plan.priceId ? (
                      <button
                        className={`btn btn-block ${plan.dark ? "btn-accent" : "btn-outline"}`}
                        onClick={() => handleCheckout(plan.priceId)}
                        disabled={checkoutLoading === plan.priceId}
                      >
                        {checkoutLoading === plan.priceId ? "Redirecting…" : "Get started"}
                      </button>
                    ) : (
                      <a
                        className={`btn btn-block ${plan.dark ? "btn-accent" : "btn-outline"}`}
                        href={`mailto:hello@guleddev.com?subject=${encodeURIComponent(plan.name + " plan")}`}
                      >
                        Contact us
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ABOUT */}
        {view === "about" && (
          <section className="section section-accent">
            <div className="container about-grid">
              <div>
                <div className="eyebrow eyebrow-dark">About</div>
                <h2 className="section-title" style={{ color: "#071727" }}>One developer, no ticket queue, no runaround.</h2>
                <p className="section-copy" style={{ color: "#243424" }}>
                  GuledDev is a small, hands-on shop. When you email us, you&apos;re talking to the
                  person who&apos;ll actually touch your codebase — not a support rep reading from a script.
                </p>
                <a className="btn btn-dark" href="mailto:hello@guleddev.com?subject=Let's build something">Let&apos;s build something</a>
              </div>
              <div className="about-image-wrap">
                <img src={SPACE_IMG(750, 620)} alt="James Webb Space Telescope image of star formation" />
                <div className="about-caption">We sweat the details most people never see — until they break.</div>
              </div>
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <div className="container footer-row">
            <div className="footer-brand">
              <img src="/logo-icon.jpeg" alt="GuledDev" className="footer-brand-icon" />
              GuledDev
            </div>
            <div className="footer-copy">© {new Date().getFullYear()} GuledDev. All rights reserved.</div>
            <a className="footer-email" href="mailto:hello@guleddev.com">hello@guleddev.com</a>
          </div>
        </footer>
      </div>

      {/* OFFER MODAL */}
      {offerVisible && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setOfferVisible(false)}>
          <div className="modal-card">
            <button className="modal-close" aria-label="Close" onClick={() => setOfferVisible(false)}>✕</button>
            <div className="eyebrow eyebrow-light" style={{ marginBottom: "1rem" }}>Limited offer</div>
            <h2 className="modal-title">First month free on any plan</h2>
            <p className="modal-copy">Mention this offer when you email us and your first month of hosting is on us — no strings.</p>
            <div className="btn-row" style={{ marginTop: "1.75rem" }}>
              <a className="btn btn-accent" href="mailto:hello@guleddev.com?subject=Special offer request">Claim offer</a>
              <button className="btn btn-ghost" onClick={() => setOfferVisible(false)}>Not now</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        body {
          font-family: "Inter", system-ui, -apple-system, sans-serif;
          color: #0f2438;
          background: #ffffff;
          -webkit-font-smoothing: antialiased;
        }
        button { font-family: inherit; }
        img { display: block; max-width: 100%; }

        .page { width: 100%; overflow-x: hidden; }
        .container { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 24px; }

        .eyebrow {
          font-family: "Space Mono", monospace;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.72rem;
          font-weight: 700;
        }
        .eyebrow-light { color: #a9e830; }
        .eyebrow-green { color: #1a7a4c; margin-bottom: 14px; display: block; }
        .eyebrow-dark { color: #0f2438; margin-bottom: 14px; display: block; }
        .eyebrow-muted { color: #6b7c88; }

        /* HEADER */
        .header { background: #0b1c2c; color: #fff; position: sticky; top: 0; z-index: 30; }
        .header-row { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 16px; }
        .brand { display: flex; align-items: center; gap: 10px; background: none; border: 0; color: #fff; font-weight: 800; font-size: 1.25rem; letter-spacing: -0.02em; cursor: pointer; padding: 0; }
        .brand-icon { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; }
        .footer-brand { display: flex; align-items: center; gap: 8px; font-weight: 800; letter-spacing: -0.02em; }
        .footer-brand-icon { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }
        .nav-desktop { display: none; gap: 32px; }
        .nav-link { background: none; border: 0; color: #9fb1bf; font-size: 0.95rem; font-weight: 500; cursor: pointer; padding: 8px 0; }
        .nav-link.active, .nav-link:hover { color: #fff; }
        .header-actions { display: none; align-items: center; gap: 20px; }
        .header-email { color: #fff; text-decoration: none; font-size: 0.9rem; font-weight: 500; }
        .header-email:hover { color: #a9e830; }
        .menu-toggle { background: none; border: 0; color: #a9e830; font-size: 1.4rem; cursor: pointer; }
        .nav-mobile { display: flex; flex-direction: column; gap: 4px; padding: 8px 24px 24px; }
        .nav-mobile-link { background: none; border: 0; color: #fff; font-size: 1.1rem; font-weight: 600; text-align: left; padding: 10px 0; cursor: pointer; }

        @media (min-width: 860px) {
          .nav-desktop { display: flex; }
          .header-actions { display: flex; }
          .menu-toggle { display: none; }
        }

        /* BUTTONS */
        .btn { display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 8px; padding: 12px 22px; font-weight: 700; font-size: 0.95rem; cursor: pointer; text-decoration: none; transition: transform .15s ease, box-shadow .15s ease, background .15s ease; }
        .btn-lg { padding: 15px 28px; font-size: 1rem; }
        .btn-block { width: 100%; }
        .btn-accent { background: #a9e830; color: #0b1c2c; }
        .btn-accent:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(169,232,48,0.35); }
        .btn-ghost { background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.25); }
        .btn-ghost:hover { background: rgba(255,255,255,0.16); }
        .btn-dark { background: #0b1c2c; color: #fff; }
        .btn-dark:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(11,28,44,0.25); }
        .btn-outline { background: #fff; color: #0b1c2c; border: 1.5px solid #d8dfe3; }
        .btn-outline:hover { background: #f4f7f5; }
        .btn-row { display: flex; flex-wrap: wrap; gap: 12px; }

        /* HERO */
        .hero { position: relative; background: #0b1c2c; color: #fff; overflow: hidden; padding: 64px 0 80px; }
        .hero-bg { position: absolute; top: -140px; right: 8%; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(169,232,48,0.18), transparent 70%); pointer-events: none; }
        .hero-grid { position: relative; display: grid; gap: 48px; align-items: center; }
        .eyebrow-row { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #a9e830; box-shadow: 0 0 14px rgba(169,232,48,0.9); }
        .hero-title { font-size: clamp(2.4rem, 5.5vw, 3.6rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.02em; margin: 0 0 26px; }
        .hero-copy { color: #c2ccd4; font-size: 1.1rem; line-height: 1.65; max-width: 520px; margin: 0 0 34px; }
        .trust-row { display: flex; flex-wrap: wrap; gap: 24px; margin-top: 38px; padding-top: 26px; border-top: 1px solid rgba(255,255,255,0.14); font-size: 0.9rem; color: #b7c3cc; }
        .hero-image-card { position: relative; border-radius: 16px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.45); min-height: 320px; }
        .hero-image-card img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
        .hero-image-caption { position: relative; z-index: 2; display: flex; align-items: center; gap: 12px; padding: 22px; background: linear-gradient(0deg, rgba(4,12,20,0.92), transparent); margin-top: 200px; }
        .hero-image-icon { width: 42px; height: 42px; border-radius: 50%; background: #a9e830; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
        .hero-image-label { color: #fff; font-weight: 700; font-size: 1.05rem; }

        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1.05fr 0.95fr; }
          .hero-image-card { min-height: 460px; }
        }

        /* SECTIONS */
        .section { padding: 72px 0; }
        .section-light { background: #f6f8f5; }
        .section-white { background: #fff; }
        .section-border { border-bottom: 1px solid #e2e8e3; }
        .section-accent { background: #a9e830; }
        .section-dark { background: #0b1c2c; }

        .compare-grid { display: grid; gap: 20px; margin-top: 3rem; }
        @media (min-width: 800px) { .compare-grid { grid-template-columns: 1fr 1fr; } }
        .compare-col { border-radius: 14px; padding: 34px 30px; border: 1px solid rgba(255,255,255,0.12); }
        .compare-col-highlight { background: #a9e830; border-color: #a9e830; position: relative; }
        .compare-icon { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; margin-bottom: 16px; }
        .compare-col-title { font-size: 1.2rem; font-weight: 800; margin-bottom: 20px; }
        .compare-col-title-them { color: #c2ccd4; }
        .compare-col-title-us { color: #0b1c2c; }
        .compare-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
        .compare-list li { display: flex; gap: 10px; align-items: flex-start; font-size: 0.95rem; color: #c2ccd4; }
        .compare-col-highlight .compare-list li { color: #0b1c2c; font-weight: 600; }
        .compare-list .x { color: #e0575c; font-weight: 700; flex-shrink: 0; }
        .compare-list .check { color: #0b1c2c; font-weight: 700; flex-shrink: 0; }
        .section-title { font-size: clamp(1.9rem, 3.6vw, 2.8rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.12; margin: 0 0 20px; max-width: 700px; }
        .section-copy { color: #4c5c63; font-size: 1.05rem; line-height: 1.65; max-width: 560px; margin: 0 0 28px; }
        .section-copy-wide { max-width: 640px; }

        .mission-grid { display: grid; gap: 40px; align-items: center; }
        .mission-image-wrap { position: relative; border-radius: 14px; overflow: hidden; }
        .mission-image-wrap img { width: 100%; height: 320px; object-fit: cover; }
        .mission-caption { position: absolute; bottom: 16px; left: 16px; right: 16px; background: rgba(11,28,44,0.88); color: #a9e830; font-family: "Space Mono", monospace; font-size: 0.78rem; letter-spacing: 0.04em; padding: 14px 16px; border-radius: 8px; }
        @media (min-width: 900px) { .mission-grid { grid-template-columns: 0.85fr 1.15fr; } .mission-image-wrap img { height: 380px; } }

        /* SERVICES */
        .service-grid { display: grid; gap: 20px; }
        @media (min-width: 780px) { .service-grid { grid-template-columns: repeat(3, 1fr); } }
        .service-card { background: #fff; border: 1px solid #e4e9e5; border-radius: 14px; overflow: hidden; transition: box-shadow .2s ease, transform .2s ease; }
        .service-card.open, .service-card:hover { box-shadow: 0 18px 40px rgba(11,28,44,0.1); transform: translateY(-4px); }
        .service-toggle { width: 100%; background: none; border: 0; text-align: left; padding: 30px 28px; cursor: pointer; }
        .service-icon { font-size: 1.7rem; display: block; margin-bottom: 20px; }
        .service-number { font-family: "Space Mono", monospace; font-size: 0.75rem; color: #97a3ab; margin-bottom: 10px; }
        .service-title { font-size: 1.2rem; font-weight: 700; margin: 0 0 12px; letter-spacing: -0.01em; }
        .service-desc { color: #5b6b72; font-size: 0.95rem; line-height: 1.55; margin: 0; }
        .service-cta { display: inline-block; margin-top: 20px; font-size: 0.88rem; font-weight: 700; color: #1a7a4c; }
        .service-detail { padding: 0 28px 30px; border-top: 1px solid #eef1ef; }
        .service-detail-image { width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin: 22px 0 18px; }
        .service-example { font-weight: 600; font-size: 0.92rem; line-height: 1.55; margin: 0 0 20px; }
        .service-steps { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
        .service-step { display: flex; gap: 12px; }
        .step-num { font-family: "Space Mono", monospace; font-size: 0.75rem; color: #97a3ab; padding-top: 2px; flex-shrink: 0; }
        .step-title { font-weight: 700; font-size: 0.92rem; margin-bottom: 3px; }
        .step-copy { color: #6b7c84; font-size: 0.85rem; line-height: 1.5; margin: 0; }
        .service-outcome { background: #eef7e2; color: #2c4a1f; font-weight: 600; font-size: 0.88rem; line-height: 1.5; padding: 14px 16px; border-radius: 8px; }

        /* PRICING */
        .pricing-grid { display: grid; gap: 20px; }
        @media (min-width: 900px) { .pricing-grid { grid-template-columns: repeat(3, 1fr); } }
        .plan-card { position: relative; background: #fff; border: 1px solid #dde3df; border-radius: 14px; padding: 34px 30px; display: flex; flex-direction: column; }
        .plan-dark { background: #0b1c2c; border-color: #0b1c2c; color: #fff; box-shadow: 0 24px 50px rgba(11,28,44,0.25); }
        .plan-badge { position: absolute; top: -14px; right: 24px; background: #a9e830; color: #0b1c2c; font-family: "Space Mono", monospace; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.05em; padding: 6px 12px; border-radius: 6px; }
        .plan-name { font-size: 1.4rem; font-weight: 800; margin: 0 0 8px; }
        .plan-summary { color: #6b7c84; margin: 0 0 24px; font-size: 0.95rem; }
        .plan-dark .plan-summary { color: #b7c3cc; }
        .plan-price { margin-bottom: 26px; }
        .plan-price-num { font-size: 2.4rem; font-weight: 800; letter-spacing: -0.02em; }
        .plan-price-period { color: #6b7c84; font-size: 0.95rem; }
        .plan-dark .plan-price-period { color: #b7c3cc; }
        .plan-features { list-style: none; padding: 0; margin: 0 0 30px; display: flex; flex-direction: column; gap: 14px; }
        .plan-features li { display: flex; gap: 10px; align-items: flex-start; font-size: 0.95rem; }
        .check { color: #1a7a4c; font-weight: 700; }
        .plan-dark .check { color: #a9e830; }

        /* ABOUT */
        .about-grid { display: grid; gap: 40px; align-items: center; }
        @media (min-width: 900px) { .about-grid { grid-template-columns: 1fr 0.9fr; } }
        .about-image-wrap { position: relative; }
        .about-image-wrap img { width: 100%; height: 340px; object-fit: cover; border-radius: 14px; }
        .about-caption { position: absolute; bottom: -16px; left: -16px; max-width: 220px; background: #0b1c2c; color: #fff; font-size: 0.85rem; line-height: 1.5; padding: 18px; border-radius: 10px; box-shadow: 0 14px 30px rgba(11,28,44,0.25); }

        /* FOOTER */
        .footer { background: #0b1c2c; color: #fff; }
        .footer-row { display: flex; flex-direction: column; gap: 16px; padding: 36px 0; }
        .footer-copy { color: #9fb1bf; font-size: 0.88rem; }
        .footer-email { color: #a9e830; font-weight: 600; font-size: 0.88rem; text-decoration: none; }
        @media (min-width: 700px) { .footer-row { flex-direction: row; justify-content: space-between; align-items: center; } }

        /* MODAL — fixed: solid opaque background, real contrast */
        .modal-backdrop { position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(4, 12, 20, 0.72); }
        .modal-card { width: 100%; max-width: 460px; background: #0b1c2c; color: #fff; border-radius: 16px; padding: 36px; position: relative; box-shadow: 0 40px 80px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08); }
        .modal-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.08); border: 0; color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 0.95rem; }
        .modal-close:hover { background: rgba(255,255,255,0.18); }
        .modal-title { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 14px; }
        .modal-copy { color: #c2ccd4; line-height: 1.6; margin: 0; }
      `}</style>
    </>
  );
}
