import { useState } from "react";
import Head from "next/head";

// Real NASA/ESA/CSA Webb Telescope image of the "Cosmic Cliffs" in the Carina Nebula.
// Public NASA imagery — safe to hotlink. We just request different crops/sizes
// from NASA's own image resizer for each spot on the page.
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
    exampleLabel: "EXAMPLE",
    example:
      "A Next.js + Stripe storefront, wired to Vercel with automatic preview deployments on every pull request.",
    steps: [
      ["Connect your repo", "Link GitHub or GitLab and we configure the build pipeline around your stack."],
      ["Automate the pipeline", "Every push gets linted, built, and deployed to a preview URL automatically."],
      ["Ship to production", "One approval promotes a preview straight to your live domain, no manual steps."],
    ],
    outcome: "Outcome: deploys that used to take an afternoon now take under two minutes.",
    bg: "bg-white",
    accent: "eaf6d0",
  },
  {
    icon: "🔒",
    number: "02",
    title: "Security & Reliability",
    description:
      "Secrets management, dependency scanning, and uptime monitoring so a bad deploy never becomes a bad week.",
    exampleLabel: "EXAMPLE",
    example:
      "Environment secrets moved out of client code and into your host's encrypted variable store, with rotation reminders.",
    steps: [
      ["Audit the surface area", "We scan for exposed keys, outdated packages, and unsafe defaults."],
      ["Lock it down", "Secrets move server-side, webhooks get signature verification, and access is scoped."],
      ["Watch it continuously", "Uptime and error monitoring alert you before your customers notice anything."],
    ],
    outcome: "Outcome: fewer 3am pages, and a paper trail when something does go wrong.",
    bg: "bg-[#d9ff38]",
    accent: "071727",
  },
  {
    icon: "🎧",
    number: "03",
    title: "Ongoing Support",
    description:
      "Direct access to a developer who already knows your codebase — no ticket queues, no re-explaining context.",
    exampleLabel: "EXAMPLE",
    example:
      "A checkout endpoint returning 404 after a deploy, diagnosed and fixed same-day by someone who built it.",
    steps: [
      ["Reach out directly", "Email or message us — you're talking to the person who wrote the code."],
      ["Get a real diagnosis", "We reproduce the issue against your actual deployment, not a generic checklist."],
      ["Fixed and documented", "You get the fix and a short note on why it happened, so it doesn't repeat."],
    ],
    outcome: "Outcome: problems get solved in hours, not support-ticket weeks.",
    bg: "bg-[#0c2134]",
    accent: "d9ff38",
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
  },
  {
    name: "Growth",
    summary: "For products that are starting to matter.",
    price: "$79",
    period: "/mo",
    features: ["Up to 5 sites", "Stripe & webhook integration", "Priority support, same-day response"],
    dark: true,
    badge: "MOST POPULAR",
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

  useState(() => {
    const t = setTimeout(() => setOfferVisible(true), 750);
    return () => clearTimeout(t);
  }, []);

  function go(target) {
    setView(target);
    setMobileOpen(false);
  }

  return (
    <>
      <Head>
        <title>GuledDev — Managed development &amp; hosting</title>
      </Head>

      <style jsx global>{`
        :root {
          --ink: #071727;
          --lime: #d9ff38;
          --paper: #f7f9f2;
        }
        body {
          margin: 0;
          font-family: "DM Sans", system-ui, sans-serif;
          color: var(--ink);
          background: var(--paper);
        }
        .grid-noise {
          background-image: linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
          background-size: 46px 46px;
        }
        .eyebrow {
          font-family: "Space Mono", monospace;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }
        .lime-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
          background: var(--lime);
          box-shadow: 0 0 18px rgba(217, 255, 56, 0.85);
        }
        .hero-title {
          font-size: clamp(3rem, 7vw, 6rem);
          letter-spacing: -0.075em;
          line-height: 0.9;
        }
        .page-title {
          font-size: clamp(2.6rem, 5.5vw, 4.8rem);
          letter-spacing: -0.07em;
          line-height: 0.92;
        }
        .nav-link {
          position: relative;
          background: transparent;
          border: 0;
          padding: 0.45rem 0;
          font: inherit;
          cursor: pointer;
          color: #c8d3da;
        }
        .nav-link.active,
        .nav-link:hover {
          color: #fff;
        }
        .action-button {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .action-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 13px 28px rgba(0, 0, 0, 0.2);
        }
        .hero-image-wrap {
          position: relative;
        }
        .hero-image-wrap::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(90deg, rgba(7, 23, 39, 0.36), transparent 52%),
            linear-gradient(0deg, rgba(7, 23, 39, 0.76), transparent 42%);
        }
        .service-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .service-card.open {
          transform: translateY(-6px);
          box-shadow: 0 24px 44px rgba(7, 23, 39, 0.13);
        }
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          background: rgba(3, 14, 24, 0.76);
          backdrop-filter: blur(8px);
        }
      `}</style>

      <div className="site-shell w-full">
        <header className="bg-[#071727] text-white border-b border-white/10">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
            <div className="h-[76px] flex items-center justify-between">
              <button
                type="button"
                onClick={() => go("home")}
                className="text-white bg-transparent border-0 font-bold text-xl tracking-[-0.06em] p-0 cursor-pointer"
              >
                GuledDev
              </button>
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`nav-link capitalize ${view === item ? "active" : ""}`}
                    onClick={() => go(item)}
                  >
                    {item}
                  </button>
                ))}
              </nav>
              <div className="hidden md:flex items-center gap-5">
                <a href="mailto:hello@guleddev.com" className="text-sm font-semibold text-white no-underline hover:text-[#d9ff38]">
                  hello@guleddev.com
                </a>
                <button
                  type="button"
                  onClick={() => go("pricing")}
                  className="action-button px-4 py-2.5 bg-[#d9ff38] text-[#071727] border-0 font-bold text-sm rounded-sm cursor-pointer"
                >
                  Get started
                </button>
              </div>
              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden p-2 bg-transparent border-0 text-[#d9ff38] cursor-pointer text-2xl"
              >
                ☰
              </button>
            </div>
            {mobileOpen && (
              <nav className="md:hidden flex flex-col gap-4 pb-6 text-lg font-semibold">
                {NAV_ITEMS.map((item) => (
                  <button key={item} type="button" className="nav-link text-left w-fit capitalize" onClick={() => go(item)}>
                    {item}
                  </button>
                ))}
                <a href="mailto:hello@guleddev.com" className="text-[#d9ff38] no-underline text-base">
                  hello@guleddev.com
                </a>
              </nav>
            )}
          </div>
        </header>

        <main>
          {view === "home" && (
            <section aria-label="Home page">
              <section className="relative bg-[#071727] text-white overflow-hidden">
                <div className="absolute inset-0 grid-noise opacity-60" />
                <div className="absolute -top-24 right-[14%] w-80 h-80 rounded-full bg-[#d9ff38]/10 blur-3xl" />
                <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
                  <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-7">
                        <span className="lime-dot" />
                        <p className="eyebrow text-[#d9ff38] m-0">MANAGED DEV &amp; HOSTING</p>
                      </div>
                      <h1 className="hero-title font-bold max-w-3xl m-0">
                        Ship your product. We&apos;ll run the infrastructure.
                      </h1>
                      <p className="text-[#c4d0d8] text-lg leading-relaxed max-w-xl mt-8 mb-0">
                        Deployment pipelines, Stripe checkout, webhooks, monitoring — the parts of shipping a
                        product that eat your week. We build and run them so you can stay focused on the product
                        itself.
                      </p>
                      <div className="flex flex-wrap gap-3 mt-9">
                        <button type="button" onClick={() => go("pricing")} className="action-button bg-[#d9ff38] text-[#071727] px-6 py-4 rounded-sm font-bold border-0 cursor-pointer">
                          See pricing
                        </button>
                        <button type="button" onClick={() => go("services")} className="action-button bg-transparent border border-white/30 text-white px-6 py-4 rounded-sm font-bold cursor-pointer hover:bg-white/10">
                          View services
                        </button>
                      </div>
                      <div className="mt-12 pt-7 border-t border-white/15 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#b5c2cb]">
                        <span>✓ Uptime monitored 24/7</span>
                        <span>⚡ Deploys in minutes, not hours</span>
                      </div>
                    </div>
                    <div className="hero-image-wrap relative min-h-[370px] lg:min-h-[505px] border border-white/15 overflow-hidden shadow-2xl">
                      <img
                        src={SPACE_IMG(1200, 900)}
                        alt="Cosmic Cliffs in the Carina Nebula, captured by NASA's James Webb Space Telescope"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: "saturate(.85) contrast(1.05)" }}
                        loading="lazy"
                      />
                      <div className="absolute z-10 bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                          <span className="w-11 h-11 flex items-center justify-center rounded-full bg-[#d9ff38] text-[#071727]">📡</span>
                          <div>
                            <p className="eyebrow text-[#d9ff38] m-0">LIVE STATUS</p>
                            <p className="text-white font-semibold text-lg mt-1 mb-0">Infrastructure that doesn&apos;t sleep</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-[#f7f9f2] py-16 sm:py-24">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-20 items-center">
                  <div className="relative">
                    <img
                      src={SPACE_IMG(900, 700)}
                      alt="Star-forming region of the Carina Nebula"
                      className="w-full min-h-[290px] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-5 left-5 bg-[#071727] text-white px-5 py-4 max-w-xs">
                      <p className="eyebrow text-[#d9ff38] m-0">7,600 light-years from Earth — and your server still needs a human watching it.</p>
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow text-[#37624c] font-bold mb-5">OUR MISSION</p>
                    <h2 className="page-title font-bold max-w-3xl m-0">Built for founders who&apos;d rather build than debug deploys.</h2>
                    <p className="text-[#52616a] text-lg leading-relaxed mt-7 mb-0 max-w-2xl">
                      Most teams lose days to preview-URL churn, misconfigured build settings, and 404s that
                      shouldn&apos;t exist. We set your project up right the first time — and stay on as the
                      person you call when something breaks.
                    </p>
                    <button type="button" onClick={() => go("about")} className="action-button mt-8 bg-[#071727] text-white px-6 py-4 rounded-sm font-bold border-0 cursor-pointer">
                      More about us
                    </button>
                  </div>
                </div>
              </section>
            </section>
          )}

          {view === "services" && (
            <section aria-label="Services page">
              <section className="bg-[#f7f9f2] py-16 sm:py-24 border-b border-[#dfe5dd]">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
                  <p className="eyebrow text-[#37624c] font-bold mb-5">SERVICES</p>
                  <h2 className="page-title font-bold max-w-4xl m-0">Everything from first commit to first customer.</h2>
                  <p className="max-w-2xl text-[#52616a] text-lg leading-relaxed mt-7 mb-0">
                    Pick what you need — deployment, security, ongoing support — or bundle all three.
                  </p>
                </div>
              </section>
              <section className="bg-white py-14 sm:py-20">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
                  <p className="eyebrow text-[#597161] font-bold mb-6">TAP A CARD TO SEE HOW IT WORKS</p>
                  <div className="grid md:grid-cols-3 gap-5">
                    {SERVICES.map((s, i) => {
                      const isOpen = openService === i;
                      return (
                        <article key={s.title} className={`service-card ${s.bg} border border-[#dfe5dd] ${isOpen ? "open" : ""}`}>
                          <button
                            type="button"
                            className="w-full text-left border-0 bg-transparent cursor-pointer p-7 sm:p-8"
                            aria-expanded={isOpen}
                            onClick={() => setOpenService(isOpen ? null : i)}
                          >
                            <span className="w-12 h-12 flex items-center justify-center rounded-full text-2xl" style={{ background: `#${s.accent}22` }}>
                              {s.icon}
                            </span>
                            <p className="eyebrow font-bold mt-8 mb-3 opacity-70">{s.number}</p>
                            <h3 className="tracking-[-.045em] font-bold text-xl mb-4">{s.title}</h3>
                            <p className="leading-relaxed m-0 opacity-90">{s.description}</p>
                            <span className="inline-flex items-center gap-2 mt-6 text-sm font-bold">
                              {isOpen ? "Show less" : "See how it works"} <span>{isOpen ? "−" : "+"}</span>
                            </span>
                          </button>
                          {isOpen && (
                            <div className="px-7 sm:px-8 pb-8">
                              <div className="border-t border-black/10 pt-6">
                                <img
                                  src={SPACE_IMG(700, 400)}
                                  alt=""
                                  className="w-full h-44 object-cover mb-6"
                                  loading="lazy"
                                />
                                <p className="eyebrow font-bold mb-2 opacity-70">{s.exampleLabel}</p>
                                <p className="font-semibold leading-relaxed m-0">{s.example}</p>
                                <div className="mt-7 space-y-5">
                                  {s.steps.map(([title, copy], idx) => (
                                    <div className="flex gap-4" key={title}>
                                      <span className="text-xs font-mono pt-1 opacity-60">0{idx + 1}</span>
                                      <div>
                                        <h4 className="font-bold m-0">{title}</h4>
                                        <p className="text-sm leading-relaxed mt-1 mb-0 opacity-80">{copy}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-7 p-4" style={{ background: `#${s.accent}22` }}>
                                  <p className="font-semibold text-sm leading-relaxed m-0">{s.outcome}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            </section>
          )}

          {view === "pricing" && (
            <section aria-label="Pricing page">
              <section className="bg-white py-16 sm:py-24">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
                  <div className="max-w-2xl mb-12">
                    <p className="eyebrow text-[#37624c] font-bold mb-5">PRICING</p>
                    <h2 className="page-title font-bold m-0">Simple plans, no surprise invoices.</h2>
                  </div>
                  <div className="grid lg:grid-cols-3 gap-5 items-stretch">
                    {PLANS.map((plan) => (
                      <article
                        key={plan.name}
                        className={`flex flex-col p-7 sm:p-8 relative ${
                          plan.dark ? "bg-[#071727] text-white shadow-xl" : "border border-[#d7dfdc]"
                        }`}
                      >
                        {plan.badge && (
                          <span className="absolute top-0 right-6 -translate-y-1/2 bg-[#d9ff38] text-[#071727] rounded-sm px-3 py-1.5 eyebrow font-bold">
                            {plan.badge}
                          </span>
                        )}
                        <h3 className="tracking-[-.045em] font-bold text-2xl m-0">{plan.name}</h3>
                        <p className={`mt-3 mb-7 ${plan.dark ? "text-[#bbc8d0]" : "text-[#637078]"}`}>{plan.summary}</p>
                        <div className="mb-7">
                          <span className="font-bold text-4xl tracking-[-.07em]">{plan.price}</span>
                          {plan.period && (
                            <span className={plan.dark ? "text-[#bbc8d0]" : "text-[#637078]"}>{plan.period}</span>
                          )}
                        </div>
                        <ul className={`space-y-4 mb-9 ${plan.dark ? "text-[#e8eff1]" : "text-[#33434c]"}`}>
                          {plan.features.map((f) => (
                            <li className="flex gap-3" key={f}>
                              <span className={plan.dark ? "text-[#d9ff38]" : "text-[#377553]"}>✓</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href={`mailto:hello@guleddev.com?subject=${encodeURIComponent(plan.name + " plan")}`}
                          className={`action-button mt-auto px-5 py-3.5 font-bold rounded-sm text-center no-underline ${
                            plan.dark ? "bg-[#d9ff38] text-[#071727]" : "border border-[#0c2134] text-[#0c2134] hover:bg-[#eef2ec]"
                          }`}
                        >
                          {plan.price === "Let's talk" ? "Contact us" : "Get started"}
                        </a>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </section>
          )}

          {view === "about" && (
            <section aria-label="About page">
              <section className="bg-[#d9ff38] py-16 sm:py-24">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_.9fr] gap-12 items-center">
                  <div>
                    <p className="eyebrow text-[#355116] font-bold mb-5">ABOUT</p>
                    <h2 className="page-title text-[#071727] font-bold max-w-3xl m-0">
                      One developer, no ticket queue, no runaround.
                    </h2>
                    <p className="text-[#29412d] text-lg leading-relaxed mt-7 mb-0 max-w-2xl">
                      GuledDev is a small, hands-on shop. When you email us, you&apos;re talking to the person
                      who&apos;ll actually touch your codebase — not a support rep reading from a script.
                    </p>
                    <a
                      href="mailto:hello@guleddev.com?subject=Let's build something"
                      className="action-button mt-9 bg-[#071727] text-white px-6 py-4 rounded-sm font-bold inline-block no-underline"
                    >
                      Let&apos;s build something
                    </a>
                  </div>
                  <div className="relative">
                    <img
                      src={SPACE_IMG(800, 650)}
                      alt="James Webb Space Telescope image of star formation"
                      className="w-full min-h-[330px] object-cover border border-[#6b8e17]"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-4 -left-4 bg-[#071727] text-white p-5 max-w-[220px]">
                      <p className="text-sm leading-relaxed m-0">
                        We sweat the details most people never see — until they break.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          )}
        </main>

        <footer className="bg-[#071727] text-white">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-9 flex flex-col sm:flex-row gap-5 justify-between sm:items-center">
            <p className="font-bold tracking-[-.05em] m-0">GuledDev</p>
            <p className="text-[#aebbc5] text-sm m-0">© {new Date().getFullYear()} GuledDev. All rights reserved.</p>
            <a href="mailto:hello@guleddev.com" className="text-[#d9ff38] font-semibold text-sm no-underline hover:text-white">
              hello@guleddev.com
            </a>
          </div>
        </footer>
      </div>

      {offerVisible && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="offer-title" onClick={(e) => e.target === e.currentTarget && setOfferVisible(false)}>
          <div className="w-full max-w-lg bg-[#071727] text-white border border-white/15 p-7 sm:p-9 relative shadow-2xl">
            <button
              type="button"
              aria-label="Close special offer"
              onClick={() => setOfferVisible(false)}
              className="absolute top-4 right-4 p-2 bg-transparent border-0 text-white/70 hover:text-[#d9ff38] cursor-pointer text-xl"
            >
              ✕
            </button>
            <p className="eyebrow text-[#d9ff38] font-bold mb-5">LIMITED OFFER</p>
            <h2 id="offer-title" className="font-bold tracking-[-.06em] leading-none text-3xl m-0">
              First month free on any plan
            </h2>
            <p className="text-[#c4d0d8] leading-relaxed mt-5 mb-0">
              Mention this offer when you email us and your first month of hosting is on us — no strings.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="mailto:hello@guleddev.com?subject=Special offer request"
                className="action-button bg-[#d9ff38] text-[#071727] px-5 py-3.5 rounded-sm font-bold no-underline"
              >
                Claim offer
              </a>
              <button
                type="button"
                onClick={() => setOfferVisible(false)}
                className="action-button border border-white/25 text-white bg-transparent px-5 py-3.5 rounded-sm font-bold cursor-pointer"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


