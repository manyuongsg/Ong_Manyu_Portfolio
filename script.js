/* =============================================
   TYPED HERO TEXT
============================================= */
const phrases = [
  'Data Analyst',
  'Python & SQL Developer',
  'Power BI Specialist',
  'Policy & Data Translator',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];
  if (deleting) {
    typedEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}

type();

/* =============================================
   FOOTER YEAR
============================================= */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =============================================
   NAVBAR SCROLL SHRINK
============================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(13,17,23,0.97)'
    : 'rgba(13,17,23,0.85)';
});

/* =============================================
   HAMBURGER MENU
============================================= */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* =============================================
   ACTIVE NAV LINK ON SCROLL
============================================= */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

/* =============================================
   SCROLL REVEAL
============================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.info-card, .skill-group, .project-card, .timeline-item, .edu-card, .contact-card'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  revealObserver.observe(el);
});

/* =============================================
   STAT COUNTER ANIMATION
============================================= */
function animateCounter(el, target, prefix, suffix) {
  const duration = 1500;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(eased * target);
    el.textContent = prefix + value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const prefix = el.classList.contains('stat-dollar') ? 'S$' : '';
        const suffix = el.classList.contains('stat-dollar') ? 'M' : '+';
        animateCounter(el, target, prefix, suffix);
        delete el.dataset.target; // run once
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
