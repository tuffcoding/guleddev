export default function Home() {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GuledDev — Managed development & hosting</title>
        <script src="https://cdn.tailwindcss.com/3.4.17"></script>
        <script src="https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --ink: #071727;
            --ink-soft: #0c2134;
            --lime: #d9ff38;
            --paper: #f7f9f2;
            --muted: #aebbc5;
            --line: rgba(255,255,255,.15);
          }
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body {
            margin: 0;
            width: 100%;
            font-family: "DM Sans", sans-serif;
            color: var(--ink);
            background: var(--paper);
          }
          button, a { -webkit-tap-highlight-color: transparent; }
          button:focus-visible, a:focus-visible {
            outline: 3px solid var(--lime);
            outline-offset: 4px;
          }
          .site-shell { width: 100%; overflow: hidden; }
          .grid-noise {
            background-image:
              linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px);
            background-size: 46px 46px;
          }
          .lime-dot {
            width: 9px;
            height: 9px;
            background: var(--lime);
            border-radius: 99px;
            display: inline-block;
            box-shadow: 0 0 18px rgba(217,255,56,.85);
          }
          .eyebrow {
            font-family: "Space Mono", monospace;
            letter-spacing: .09em;
            text-transform: uppercase;
            font-size: .7rem;
          }
          .hero-title {
            font-size: clamp(3rem, 6.5vw, 6.2rem);
            letter-spacing: -.072em;
            line-height: .91;
          }
          .card-title { letter-spacing: -.045em; }
          .nav-link {
            position: relative;
            color: #d7e0e7;
            text-decoration: none;
            transition: color .2s ease;
          }
          .nav-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -6px;
            width: 100%;
            height: 2px;
            transform: scaleX(0);
            transform-origin: left;
            background: var(--lime);
            transition: transform .2s ease;
          }
          .nav-link:hover { color: white; }
          .nav-link:hover::after { transform: scaleX(1); }
          .action-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .65rem;
            text-decoration: none;
            transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
          }
          .action-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(0,0,0,.2);
          }
          .hero-image-wrap::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, rgba(7,23,39,.38), transparent 45%), linear-gradient(0deg, rgba(7,23,39,.65), transparent 40%);
            z-index: 1;
            pointer-events: none;
          }
          .hero-image-wrap img { filter: saturate(.8) contrast(1.08); }
          .offer-card, .price-card {
            transition: transform .25s ease, box-shadow .25s ease;
          }
          .offer-card:hover, .price-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 22px 45px rgba(7,23,39,.12);
          }
          .reveal { animation: lift .65s cubic-bezier(.2,.8,.2,1) both; }
          .delay-1 { animation-delay: .1s; }
          .delay-2 { animation-delay: .2s; }
          .delay-3 { animation-delay: .32s; }
          @keyframes lift {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 767px) {
            .mobile-menu { display: none; }
            .mobile-menu.is-open { display: flex; }
          }
        `}</style>
      </head>
      <div className="site-shell">
        <header className="canva-header bg-[#071727] text-white border-b border-white/10">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
            <div className="h-[76px] flex items-center justify-between">
              <a href="#top" className="canva-link text-white no-underline font-bold tracking-[-0.06em] text-2xl">
                Guled<span className="text-[#d9ff38]">Dev</span>
              </a>
              <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a className="nav-link" href="#services">Services</a>
                <a className="nav-link" href="#pricing">Pricing</a>
                <a className="nav-link" href="#about">About</a>
              </nav>
              <div className="hidden md:flex items-center gap-5">
                <a href="mailto:hello@guleddev.com" className="canva-link text-sm font-semibold text-white no-underline hover:text-[#d9ff38] transition-colors">Contact us</a>
                <a href="#pricing" className="canva-button action-button px-4 py-2.5 bg-[#d9ff38] text-[#071727] font-bold text-sm rounded-sm">
                  Get started <i data-lucide="arrow-up-right" className="w-4 h-4"></i>
                </a>
              </div>
              <button id="menu-toggle" type="button" aria-label="Toggle navigation menu" aria-controls="mobile-menu" aria-expanded="false" className="md:hidden p-2 text-[#d9ff38]">
                <i data-lucide="menu" className="w-6 h-6"></i>
              </button>
            </div>
            <nav id="mobile-menu" aria-label="Mobile navigation" className="mobile-menu md:hidden flex-col gap-5 pb-6 text-lg font-semibold">
              <a className="nav-link w-fit" href="#services">Services</a>
              <a className="nav-link w-fit" href="#pricing">Pricing</a>
              <a className="nav-link w-fit" href="#about">About</a>
              <a href="mailto:hello@guleddev.com" className="text-[#d9ff38] no-underline">Contact us</a>
            </nav>
          </div>
        </header>
        
        <main id="top">
          <section className="canva-section relative bg-[#071727] text-white overflow-hidden">
            <div className="absolute inset-0 grid-noise opacity-60"></div>
            <div className="absolute -top-24 right-[14%] w-80 h-80 rounded-full bg-[#d9ff38]/10 blur-3xl"></div>
            <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-14 lg:py-24">
              <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-12 items-center">
                <div>
                  <div className="reveal flex items-center gap-3 mb-7">
                    <span className="lime-dot"></span>
                    <p className="canva-text eyebrow text-[#d9ff38] m-0">Built for businesses that move</p>
                  </div>
                  <h1 className="canva-text hero-title reveal delay-1 font-bold max-w-3xl m-0">Launch fast.<br />Scale reliably.</h1>
                  <p className="canva-text reveal delay-2 text-[#c4d0d8] text-lg leading-relaxed max-w-xl mt-8 mb-0">Managed development and hosting tailored for agencies and founders. Deployments, security, and expert support — all in one place.</p>
                  <div className="reveal delay-3 flex flex-wrap gap-3 mt-9">
                    <a href="#pricing" className="canva-button action-button bg-[#d9ff38] text-[#071727] px-6 py-4 rounded-sm font-bold">
                      View plans <i data-lucide="arrow-right" className="w-5 h-5"></i>
                    </a>
                    <a href="#services" className="canva-button action-button bg-white/0 border border-white/30 text-white px-6 py-4 rounded-sm font-bold hover:bg-white/10">Explore services</a>
                  </div>
                  <div className="mt-12 pt-7 border-t border-white/15 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#b5c2cb]">
                    <span className="flex items-center gap-2">
                      <i data-lucide="shield-check" className="w-4 h-4 text-[#d9ff38]"></i>
                      <span className="canva-text">Security built in</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <i data-lucide="zap" className="w-4 h-4 text-[#d9ff38]"></i>
                      <span className="canva-text">Fast global delivery</span>
                    </span>
                  </div>
                </div>
                <div className="hero-image-wrap relative min-h-[370px] lg:min-h-[505px] border border-white/15 overflow-hidden shadow-2xl">
                  <img loading="lazy" className="canva-image absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=60" alt="Hero" />
                  <div className="relative z-10 absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="w-11 h-11 flex items-center justify-center rounded-full bg-[#d9ff38] text-[#071727]">
                        <i data-lucide="activity" className="w-5 h-5"></i>
                      </span>
                      <div>
                        <p className="canva-text eyebrow text-[#d9ff38] m-0">Always on</p>
                        <p className="canva-text text-white font-semibold text-lg mt-1 mb-0">Infrastructure you can count on</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section id="services" className="canva-section bg-[#f7f9f2] py-20 sm:py-28">
            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
                <div>
                  <p className="canva-text eyebrow text-[#37624c] font-bold mb-4">One team. Fewer headaches.</p>
                  <h2 className="canva-text font-bold text-4xl sm:text-5xl tracking-[-0.06em] leading-none m-0">Built to keep you<br />moving forward.</h2>
                </div>
                <p className="canva-text max-w-sm text-[#52616a] leading-relaxed m-0">Everything that sits behind a dependable digital business, looked after by people who care.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <article className="canva-card offer-card bg-white border border-[#dfe5dd] p-7 sm:p-8">
                  <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#eaf6d0] text-[#274e3b]">
                    <i data-lucide="rocket" className="w-6 h-6"></i>
                  </span>
                  <p className="canva-text eyebrow text-[#597161] font-bold mt-9 mb-3">01 / Delivery</p>
                  <h3 className="canva-text card-title text-2xl font-bold mb-4">Managed Deployments</h3>
                  <p className="canva-text text-[#52616a] leading-relaxed m-0">CI/CD, backups, and zero-downtime deploys so you can focus on the product.</p>
                </article>
                <article className="canva-card offer-card bg-[#d9ff38] border border-[#c4e936] p-7 sm:p-8">
                  <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#071727] text-[#d9ff38]">
                    <i data-lucide="lock-keyhole" className="w-6 h-6"></i>
                  </span>
                  <p className="canva-text eyebrow text-[#355116] font-bold mt-9 mb-3">02 / Protection</p>
                  <h3 className="canva-text card-title text-2xl font-bold mb-4">Security-first</h3>
                  <p className="canva-text text-[#29412d] leading-relaxed m-0">Automatic SSL, active monitoring, auditing, and DDoS protection by default.</p>
                </article>
                <article className="canva-card offer-card bg-[#0c2134] text-white p-7 sm:p-8">
                  <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-[#d9ff38]">
                    <i data-lucide="headphones" className="w-6 h-6"></i>
                  </span>
                  <p className="canva-text eyebrow text-[#9fb1bd] font-bold mt-9 mb-3">03 / People</p>
                  <h3 className="canva-text card-title text-2xl font-bold mb-4">24/7 Support</h3>
                  <p className="canva-text text-[#bdc9d1] leading-relaxed m-0">Priority help when you need it, plus clear answers from engineers who know your stack.</p>
                </article>
              </div>
            </div>
          </section>
          
          <section id="pricing" className="canva-section bg-white py-20 sm:py-28">
            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
              <div className="max-w-2xl mb-12">
                <p className="canva-text eyebrow text-[#37624c] font-bold mb-4">Plans that grow with you</p>
                <h2 className="canva-text font-bold text-4xl sm:text-5xl tracking-[-0.06em] leading-none m-0">Start simply.<br />Scale with confidence.</h2>
              </div>
              <div className="grid lg:grid-cols-3 gap-5 items-stretch">
                <article className="canva-card price-card flex flex-col border border-[#d7dfdc] p-7 sm:p-8">
                  <h3 className="canva-text card-title font-bold text-2xl m-0">Starter</h3>
                  <p className="canva-text text-[#637078] mt-3 mb-7">For a focused project with a solid foundation.</p>
                  <div className="mb-7">
                    <span className="canva-text text-5xl font-bold tracking-[-.07em]">$19</span>
                    <span className="canva-text text-[#637078]"> /mo</span>
                  </div>
                  <ul className="space-y-4 text-[#33434c] mb-9">
                    <li className="flex gap-3"><i data-lucide="check" className="w-5 h-5 text-[#377553] shrink-0"></i><span className="canva-text">1 production project</span></li>
                    <li className="flex gap-3"><i data-lucide="check" className="w-5 h-5 text-[#377553] shrink-0"></i><span className="canva-text">Daily backups</span></li>
                    <li className="flex gap-3"><i data-lucide="check" className="w-5 h-5 text-[#377553] shrink-0"></i><span className="canva-text">Email support</span></li>
                  </ul>
                  <a href="mailto:hello@guleddev.com?subject=Starter%20plan" className="canva-button action-button mt-auto border border-[#0c2134] text-[#0c2134] px-5 py-3.5 font-bold rounded-sm hover:bg-[#eef2ec]">Choose Starter</a>
                </article>
                <article className="canva-card price-card flex flex-col bg-[#071727] text-white p-7 sm:p-8 relative shadow-xl">
                  <span className="canva-tag absolute top-0 right-6 -translate-y-1/2 bg-[#d9ff38] text-[#071727] rounded-sm px-3 py-1.5 eyebrow font-bold">Most popular</span>
                  <h3 className="canva-text card-title font-bold text-2xl m-0">Growth</h3>
                  <p className="canva-text text-[#bbc8d0] mt-3 mb-7">For growing products that need extra care.</p>
                  <div className="mb-7">
                    <span className="canva-text text-5xl font-bold tracking-[-.07em]">$49</span>
                    <span className="canva-text text-[#bbc8d0]"> /mo</span>
                  </div>
                  <ul className="space-y-4 text-[#e8eff1] mb-9">
                    <li className="flex gap-3"><i data-lucide="check" className="w-5 h-5 text-[#d9ff38] shrink-0"></i><span className="canva-text">Up to 5 projects</span></li>
                    <li className="flex gap-3"><i data-lucide="check" className="w-5 h-5 text-[#d9ff38] shrink-0"></i><span className="canva-text">Deployment monitoring</span></li>
                    <li className="flex gap-3"><i data-lucide="check" className="w-5 h-5 text-[#d9ff38] shrink-0"></i><span className="canva-text">Priority support</span></li>
                  </ul>
                  <a href="mailto:hello@guleddev.com?subject=Growth%20plan" className="canva-button action-button mt-auto bg-[#d9ff38] text-[#071727] px-5 py-3.5 font-bold rounded-sm">
                    Choose Growth <i data-lucide="arrow-right" className="w-4 h-4"></i>
                  </a>
                </article>
                <article className="canva-card price-card flex flex-col border border-[#d7dfdc] p-7 sm:p-8">
                  <h3 className="canva-text card-title font-bold text-2xl m-0">Scale</h3>
                  <p className="canva-text text-[#637078] mt-3 mb-7">For teams building business-critical systems.</p>
                  <div className="mb-7">
                    <span className="canva-text text-5xl font-bold tracking-[-.07em]">Custom</span>
                  </div>
                  <ul className="space-y-4 text-[#33434c] mb-9">
                    <li className="flex gap-3"><i data-lucide="check" className="w-5 h-5 text-[#377553] shrink-0"></i><span className="canva-text">Unlimited projects</span></li>
                    <li className="flex gap-3"><i data-lucide="check" className="w-5 h-5 text-[#377553] shrink-0"></i><span className="canva-text">Custom SLAs</span></li>
                    <li className="flex gap-3"><i data-lucide="check" className="w-5 h-5 text-[#377553] shrink-0"></i><span className="canva-text">Dedicated engineering help</span></li>
                  </ul>
                  <a href="mailto:hello@guleddev.com?subject=Scale%20plan" className="canva-button action-button mt-auto border border-[#0c2134] text-[#0c2134] px-5 py-3.5 font-bold rounded-sm hover:bg-[#eef2ec]">Talk to us</a>
                </article>
              </div>
            </div>
          </section>
          
          <section id="about" className="canva-section bg-[#d9ff38] py-16 sm:py-20">
            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <p className="canva-text eyebrow text-[#355116] font-bold mb-4">Your next move starts here</p>
                <h2 className="canva-text text-[#071727] font-bold text-4xl sm:text-5xl tracking-[-0.065em] leading-none m-0">Spend less time maintaining. More time building.</h2>
              </div>
              <a href="mailto:hello@guleddev.com?subject=Let's%20build%20something" className="canva-button action-button bg-[#071727] text-white px-6 py-4 rounded-sm font-bold whitespace-nowrap">
                Let's talk <i data-lucide="arrow-up-right" className="w-5 h-5"></i>
              </a>
            </div>
          </section>
        </main>
        
        <footer className="canva-footer bg-[#071727] text-white">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-9 flex flex-col sm:flex-row gap-5 justify-between sm:items-center">
            <p className="canva-text font-bold text-xl tracking-[-.05em] m-0">
              Guled<span className="text-[#d9ff38]">Dev</span>
            </p>
            <p className="canva-text text-[#aebbc5] text-sm m-0">Managed development and hosting for ambitious teams.</p>
            <a href="mailto:hello@guleddev.com" className="canva-link text-[#d9ff38] font-semibold text-sm no-underline hover:text-white transition-colors">hello@guleddev.com</a>
          </div>
        </footer>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener("DOMContentLoaded", function () {
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }

          const menuToggle = document.getElementById("menu-toggle");
          const mobileMenu = document.getElementById("mobile-menu");

          if (menuToggle && mobileMenu) {
            menuToggle.addEventListener("click", function () {
              const isOpen = mobileMenu.classList.toggle("is-open");
              menuToggle.setAttribute("aria-expanded", String(isOpen));
            });

            mobileMenu.querySelectorAll("a").forEach(function (link) {
              link.addEventListener("click", function () {
                mobileMenu.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
              });
            });
          }
        });
      `}} />
    </>
  );
}
