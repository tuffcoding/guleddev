// Mobile nav toggle and accessible behavior
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    nav.classList.toggle('mobile', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      const first = nav.querySelector('a');
      if (first) first.focus();
    } else {
      toggle.focus();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open','mobile');
      toggle.setAttribute('aria-expanded','false');
      toggle.focus();
    }
  });
}

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// About reveal & smooth scroll
const aboutLink = document.getElementById('about-link');
const aboutSection = document.getElementById('about');
const aboutCard = aboutSection ? aboutSection.querySelector('.about-card') : null;
if (aboutLink && aboutSection && aboutCard) {
  aboutLink.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => aboutCard.classList.add('reveal'), 250);
    const heading = aboutSection.querySelector('#about-heading');
    if (heading) { heading.setAttribute('tabindex','-1'); heading.focus({preventScroll:true}); }
  });

  const aboutObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) aboutCard.classList.add('reveal');
    });
  }, { threshold: [0.15, 0.25, 0.5] });
  aboutObs.observe(aboutSection);
}

// Contact panel
const contactLink = document.querySelector('a[href="#contact"], a#contact-link');
const contactPanel = document.getElementById('contact-panel');
const contactClose = document.getElementById('contact-close');
const contactCancel = document.getElementById('contact-cancel');
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

function openContact(byClick = false) {
  if (!contactPanel) return;
  contactPanel.classList.add('open');
  contactPanel.setAttribute('aria-hidden','false');
  if (byClick) contactPanel.setAttribute('data-open-by','click');
  const first = contactPanel.querySelector('input, textarea, button');
  if (first) first.focus();
}
function closeContact() {
  if (!contactPanel) return;
  contactPanel.classList.remove('open');
  contactPanel.setAttribute('aria-hidden','true');
  contactPanel.removeAttribute('data-open-by');
  if (contactLink) contactLink.focus();
}
if (contactLink) {
  contactLink.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    openContact(true);
  });
}
if (contactClose) contactClose.addEventListener('click', closeContact);
if (contactCancel) contactCancel.addEventListener('click', closeContact);

// Click outside to close
document.addEventListener('click', (e) => {
  if (contactPanel && contactPanel.classList.contains('open')) {
    const inside = contactPanel.contains(e.target) || (contactLink && contactLink.contains(e.target));
    if (!inside) closeContact();
  }
});

// Contact form submit (mock)
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!name || !email || !message) {
      contactStatus.hidden = false; contactStatus.style.color = 'crimson'; contactStatus.textContent = 'Please complete all fields.'; return;
    }
    contactStatus.hidden = false; contactStatus.style.color = 'var(--muted)'; contactStatus.textContent = 'Sending…';
    try {
      await new Promise(r => setTimeout(r, 700)); // simulate send
      contactStatus.style.color = 'green';
      contactStatus.textContent = 'Thanks — your message was sent!';
      contactForm.reset();
      setTimeout(closeContact, 1200);
    } catch (err) {
      contactStatus.style.color = 'crimson';
      contactStatus.textContent = 'There was an error sending your message.';
      console.error(err);
    }
  });
}

/* ---------- Stripe Checkout integration (client) ----------
  This expects a server endpoint at POST /create-checkout-session
  which returns JSON { url: 'https://checkout.stripe.com/...' } or { id: 'session_id' }.
  Replace data-price-id attributes on .buy-btn with your Stripe Price IDs.
----------------------------------------------------------- */
const buyButtons = document.querySelectorAll('.buy-btn');
if (buyButtons && buyButtons.length) {
  buyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const priceId = btn.getAttribute('data-price-id');
      btn.disabled = true;
      btn.textContent = 'Redirecting…';
      try {
        const res = await fetch('/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ priceId, successUrl: window.location.href + '?success=true', cancelUrl: window.location.href + '?canceled=true' })
        });
        const data = await res.json();
        if (data.url) {
          window.location = data.url; // Stripe hosted checkout
        } else if (data.sessionId && window.Stripe) {
          // If server returns sessionId, use redirectToCheckout
          const stripe = Stripe(data.publishableKey || 'pk_test_replace');
          const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
          if (error) console.error(error);
        } else {
          console.error('Unexpected response from server', data);
          alert('Unable to start checkout. See console.');
        }
      } catch (err) {
        console.error(err);
        alert('Network error starting checkout');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Buy';
      }
    });
  });
