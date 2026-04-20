/* =============================================
   NAV — active page highlight
============================================= */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* =============================================
   NAV — scroll tint + hamburger
============================================= */
const navbar  = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    })
  );
}

/* =============================================
   TYPED TEXT (hero only)
============================================= */
const typedEl = document.getElementById('typed');
if (typedEl) {
  const phrases = [
    'Data Analyst',
    'Python & SQL Developer',
    'Power BI and Tableau Specialist',
    'Turning Complex Data Into Social Impact',
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const cur = phrases[pi];
    typedEl.textContent = cur.slice(0, ci);
    if (!deleting) {
      if (ci++ >= cur.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      if (ci-- <= 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 380); return; }
    }
    setTimeout(type, deleting ? 55 : 85);
  }
  type();
}

/* =============================================
   STAT COUNTERS (hero only)
============================================= */
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    statsObserver.disconnect();

    heroStats.querySelectorAll('.stat-num[data-target]').forEach(el => {
      const target = +el.dataset.target;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const t0 = performance.now();
      const dur = 1400;

      (function tick(now) {
        const p = Math.min((now - t0) / dur, 1);
        const v = Math.round((1 - Math.pow(1 - p, 3)) * target);
        el.textContent = prefix + v + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  statsObserver.observe(heroStats);
}

/* =============================================
   SCROLL REVEAL
============================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.info-card, .skill-group, .project-card, .timeline-item, .edu-card, .contact-card, .contact-cta'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 5) * 70}ms`;
  revealObserver.observe(el);
});

/* =============================================
   FOOTER YEAR
============================================= */
const yr = document.getElementById('footer-year');
if (yr) yr.textContent = new Date().getFullYear();
