// Mobile nav toggle
const toggle = document.getElementById('mn-toggle');
const links  = document.getElementById('mn-nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('open');
  });
}

// Testimonials carousel
const track = document.getElementById('mn-testimonials-track');
const prev  = document.getElementById('mn-prev');
const next  = document.getElementById('mn-next');
if (track && prev && next) {
  const cardWidth = () => track.querySelector('.mn-testimonial-card').offsetWidth + 24;
  prev.addEventListener('click', () => track.scrollBy({ left:  cardWidth(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));
}

// Sticky header shadow on scroll
const header = document.getElementById('mn-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(12,64,104,.14)'
      : '0 2px 16px rgba(12,64,104,.08)';
  });
}
