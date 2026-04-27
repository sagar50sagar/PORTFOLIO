/* ================================================
   main.js — Portfolio interactions
================================================ */

// ── Header scroll ──────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


// ── Mobile menu ────────────────────────────────
const navToggle  = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

const openMenu = () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
};
const closeMenu = () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
};

navToggle?.addEventListener('click', openMenu);
mobileClose?.addEventListener('click', closeMenu);

// Close on any mobile link click
document.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});


// ── Reveal on scroll ───────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -48px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


// ── Counter animation ──────────────────────────
function animateCount(el, target, suffix = '', duration = 1400) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      animateCount(el, target, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

counters.forEach(el => counterObserver.observe(el));


// ── Active nav link on scroll ──────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));


// ── Smooth scroll for anchor links ─────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
