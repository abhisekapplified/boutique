/* =============================================
   अन्नपूर्णा फैशन बुटीक — Main JavaScript
   ============================================= */

'use strict';

/* ---------- Image Placeholder Fallback ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      const w = this.naturalWidth || this.width || 600;
      const h = this.naturalHeight || this.height || 400;
      this.src = `https://placehold.co/${w}x${h}/800020/C9A84C?text=Photo+Coming+Soon`;
      this.onerror = null;
    });
    // Trigger for already-broken images
    if (img.complete && !img.naturalWidth) {
      img.dispatchEvent(new Event('error'));
    }
  });
});

/* ---------- Loading Screen ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 800);
  }
});

/* ---------- Navbar Scroll Effect ---------- */
const navbar = document.getElementById('mainNavbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (navbar) {
    navbar.classList.toggle('scrolled', scrollY > 80);
  }

  if (backToTop) {
    backToTop.classList.toggle('visible', scrollY > 400);
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Smooth Scroll for Nav Links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    // Close mobile navbar if open
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    }

    const offset = navbar ? navbar.offsetHeight : 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- Intersection Observer — Animate on Scroll ---------- */
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-fade-up').forEach(el => observer.observe(el));

/* ---------- Counter Animation ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.why-counter').forEach(el => counterObserver.observe(el));

/* ---------- Gallery Lightbox ---------- */
const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('.lightbox-img');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
const lightboxNext = lightbox?.querySelector('.lightbox-next');

let currentIndex = 0;

function openLightbox(index) {
  if (!lightbox || !lightboxImg) return;
  currentIndex = index;
  const img = galleryItems[index];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  if (lightboxCaption) lightboxCaption.textContent = img.dataset.caption || img.alt || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
}

galleryItems.forEach((img, i) => {
  img.closest('.gallery-item')?.addEventListener('click', () => openLightbox(i));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
lightboxNext?.addEventListener('click', () => navigateLightbox(1));

lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

/* ---------- Gallery Filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItemWrappers = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItemWrappers.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
        item.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/* ---------- Contact Form ---------- */
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.classList.add('was-validated');
    return;
  }

  const name = contactForm.querySelector('#name')?.value || '';
  const phone = contactForm.querySelector('#phone')?.value || '';
  const service = contactForm.querySelector('#service')?.value || '';
  const message = contactForm.querySelector('#message')?.value || '';

  const waMsg = `नमस्ते! मेरा नाम ${name} है।%0A📞 नंबर: ${phone}%0A👗 सेवा: ${service}%0A💬 संदेश: ${message}`;
  window.open(`https://wa.me/919450968443?text=${waMsg}`, '_blank');

  showToast('आपका संदेश भेज दिया गया! हम जल्द संपर्क करेंगे। 🌸', 'success');
  contactForm.reset();
  contactForm.classList.remove('was-validated');
});

/* ---------- Appointment Form ---------- */
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm?.addEventListener('submit', e => {
  e.preventDefault();
  if (!appointmentForm.checkValidity()) {
    appointmentForm.classList.add('was-validated');
    return;
  }

  const name = appointmentForm.querySelector('#apptName')?.value || '';
  const phone = appointmentForm.querySelector('#apptPhone')?.value || '';
  const date = appointmentForm.querySelector('#apptDate')?.value || '';
  const service = appointmentForm.querySelector('#apptService')?.value || '';

  const waMsg = `📅 Appointment Request%0A%0Aनाम: ${name}%0A📞 ${phone}%0A👗 सेवा: ${service}%0A📅 Date: ${date}`;
  window.open(`https://wa.me/919450968443?text=${waMsg}`, '_blank');

  const modal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
  modal?.hide();
  showToast('अपॉइंटमेंट बुक हो गई! हम आपसे संपर्क करेंगे। ✨', 'success');
  appointmentForm.reset();
  appointmentForm.classList.remove('was-validated');
});

/* ---------- Toast Utility ---------- */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const id = 'toast-' + Date.now();
  const bg = type === 'success' ? '#800020' : '#dc3545';

  container.insertAdjacentHTML('beforeend', `
    <div id="${id}" class="toast align-items-center text-white border-0 show"
         style="background:${bg}; border-radius:12px; min-width:280px;" role="alert">
      <div class="d-flex">
        <div class="toast-body fw-semibold" style="font-size:0.88rem; padding:14px 18px;">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `);

  const toastEl = document.getElementById(id);
  setTimeout(() => toastEl?.remove(), 4500);
}

/* ---------- Hero Section Parallax (subtle) ---------- */
const heroBgs = document.querySelectorAll('.hero-bg');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  heroBgs.forEach(bg => {
    bg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
  });
}, { passive: true });

/* ---------- Scroll-to-section from hero CTA ---------- */
document.getElementById('heroViewServices')?.addEventListener('click', () => {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
});

/* ---------- Set min date for appointment datepicker ---------- */
const apptDateInput = document.getElementById('apptDate');
if (apptDateInput) {
  const today = new Date().toISOString().split('T')[0];
  apptDateInput.min = today;
}
