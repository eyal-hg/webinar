(function () {
  'use strict';

  /* ── CSS ── */
  var s = document.createElement('style');
  s.textContent = `
    .sa-up     { opacity: 0; transform: translateY(48px); }
    .sa-left   { opacity: 0; transform: translateX(60px); }
    .sa-right  { opacity: 0; transform: translateX(-60px); }
    .sa-scale  { opacity: 0; transform: scale(.92); }
    .sa-up, .sa-left, .sa-right, .sa-scale {
      transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1);
      will-change: opacity, transform;
    }
    .sa-in { opacity: 1 !important; transform: none !important; }
  `;
  document.head.appendChild(s);

  /* ── Helpers ── */
  function prep(selector, cls, stagger) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.classList.add(cls);
      if (stagger) el.style.transitionDelay = (i * 0.11) + 's';
      observe(el);
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('sa-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function observe(el) { io.observe(el); }

  /* ── Elements ── */

  // Section titles — slide from right (RTL)
  prep('.mn-section-title',    'sa-right');
  prep('.mn-tag',              'sa-right');

  // Cards — stagger up
  prep('.ai-trio__card',       'sa-up',  true);
  prep('.ai-how-step',         'sa-up',  true);
  prep('.ai-feat-card',        'sa-up',  true);
  prep('.ai-pricing__card',    'sa-scale', true);
  prep('.mn-testimonial-card', 'sa-up',  true);
  prep('.ai-faq__item',        'sa-up',  true);

  // Problem stats — scale in
  prep('.ai-problem__stat',    'sa-scale', true);

  // About cards — left/right
  var aboutCards = document.querySelectorAll('.ai-about__card');
  aboutCards.forEach(function (el, i) {
    el.classList.add(i % 2 === 0 ? 'sa-right' : 'sa-left');
    observe(el);
  });

  // Contact form — scale
  prep('.mn-contact__form',    'sa-scale');

  /* ── Counter animation for stats ── */
  document.querySelectorAll('.ai-problem__num').forEach(function (el) {
    var original = el.textContent.trim();
    var match = original.match(/^(\d+)/);
    if (!match) return;

    var target  = parseInt(match[1]);
    var suffix  = original.slice(match[1].length);
    var started = false;

    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !started) {
          started = true;
          var start    = 0;
          var duration = 1400;
          var startTime = null;

          function tick(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var ease     = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counterIO.observe(el);
  });

})();
