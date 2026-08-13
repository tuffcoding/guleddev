// NAV TOGGLE (mobile)
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    if (isOpen) {
      nav.classList.add('mobile');
      toggle.setAttribute('aria-expanded', 'true');
      const first = nav.querySelector('a');
      if (first) first.focus();
    } else {
      nav.classList.remove('mobile');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  // Close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      nav.classList.remove('mobile');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// Set current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ------------- ABOUT inline reveal & smooth scroll -------------
const aboutNavLink = document.querySelector('a[href="#about"]');
const aboutSection = document.getElementById('about');
const aboutCard = aboutSection ? aboutSection.querySelector('.about-card') : null;

if (aboutNavLink && aboutSection && aboutCard) {
  aboutNavLink.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => aboutCard.classList.add('reveal'), 250);
    // focus heading for screen readers without scrolling
    const heading = aboutSection.querySelector('#about-heading');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  });

  const aboutObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
        aboutCard.classList.add('reveal');
      }
    });
  }, { threshold: [0.15, 0.25, 0.5] });

  aboutObs.observe(aboutSection);
}

// ------------- CONTACT PANEL (floating) -------------
const contactLink = document.querySelector('a[href="#contact"], a#contact-link');
const contactPanel = document.getElementById('contact-panel');
const contactClose = document.getElementById('contact-close');
const contactCancel = document.getElementById('contact-cancel');
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

function openContact(byClick = false) {
  if (!contactPanel) return;
  contactPanel.classList.add('open');
  contactPanel.setAttribute('aria-hidden', 'false');
  if (byClick) contactPanel.setAttribute('data-open-by', 'click');
  const first = contactPanel.querySelector('input, textarea, button');
  if (first) first.focus();
}
function closeContact() {
  if (!contactPanel) return;
  contactPanel.classList.remove('open');
  contactPanel.setAttribute('aria-hidden', 'true');
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

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (contactPanel && contactPanel.classList.contains('open')) closeContact();
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      nav.classList.remove('mobile');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  }
});

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
      contactStatus.hidden = false;
      contactStatus.style.color = 'crimson';
      contactStatus.textContent = 'Please complete all fields.';
      return;
    }

    contactStatus.hidden = false;
    contactStatus.style.color = 'var(--muted)';
    contactStatus.textContent = 'Sending…';

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