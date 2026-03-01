/* =============================================
   CSA — Creative Sport Agency | main.js
   ============================================= */

/* ---------- Custom Cursor ---------- */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .case-card, .hamburger').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});

/* ---------- Navbar scroll ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---------- Mobile menu ---------- */
function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Portfolio filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const caseCards  = document.querySelectorAll('.case-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    caseCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.display = 'block';
        // Small delay so display:block kicks in before transition
        setTimeout(() => { card.style.opacity = '1'; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.3s';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ---------- Contact form ---------- */
function handleSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('csaForm');
  const success = document.getElementById('formSuccess');

  form.style.transition = 'opacity 0.4s';
  form.style.opacity    = '0';

  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('show');
  }, 400);
}

/* ---------- Smooth anchor scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- Hero parallax ---------- */
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBgText) {
    heroBgText.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});
