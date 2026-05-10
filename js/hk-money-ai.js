/* HK Money AI – interactions */

(function () {
  'use strict';

  /* ── Header scroll ── */
  const header = document.getElementById('ha-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Mobile nav toggle ── */
  const toggle = document.getElementById('ha-toggle');
  const navLinks = document.getElementById('ha-nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ── Testimonials carousel ── */
  const track = document.getElementById('ha-track');
  const prev  = document.getElementById('ha-prev');
  const next  = document.getElementById('ha-next');
  if (track && prev && next) {
    const card = track.querySelector('.ha-testi-card');
    const scroll = () => card.offsetWidth + 20;
    next.addEventListener('click', () => track.scrollBy({ left: -scroll(), behavior: 'smooth' }));
    prev.addEventListener('click', () => track.scrollBy({ left:  scroll(), behavior: 'smooth' }));
  }

  /* ── Smooth anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      const hdrH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr-h')) || 64;
      window.scrollTo({ top: el.offsetTop - hdrH, behavior: 'smooth' });
    });
  });

  /* ── Intersection observer – fade-in sections ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('ha-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.ha-pain-card, .ha-ai-demo, .ha-ai-feat, .ha-step, .ha-alert-card, .ha-layer-card, .ha-testi-card, .ha-daily-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .45s ease, transform .45s ease';
    io.observe(el);
  });

  document.addEventListener('animationend', () => {});
  document.querySelectorAll('.ha-visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });

  /* Custom event to trigger transition */
  const style = document.createElement('style');
  style.textContent = '.ha-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  /* ── Form submit ── */
  const form = document.getElementById('ha-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✅ קיבלנו! נחזור אליך תוך 24 שעות';
      btn.style.background = '#16a34a';
      btn.disabled = true;
    });
  }

})();
