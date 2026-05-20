/* =====================================================
   AIRLISI LEATHER GOODS — Main Script
   ===================================================== */

'use strict';

/* ===== Sticky Header ===== */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* ===== Mobile Nav Toggle ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ===== Active Nav Link on Scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const updateActiveNav = () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + section.id) {
          a.classList.add('active');
        }
      });
    }
  });
};
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ===== Scroll Fade-In Animation ===== */
const fadeElements = document.querySelectorAll(
  '.product-card, .why-card, .testimonial-card, .capability, .process-step, .about-text, .about-visual, .section-header, .contact-info, .contact-form-wrap, .factory-visual, .factory-capabilities'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (idx % 6));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => observer.observe(el));

/* ===== Back to Top Button ===== */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== Animated Counters (Hero Stats) ===== */
const animateCount = (el, target, suffix = '', duration = 1800) => {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString() + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }
  }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statEls = entry.target.querySelectorAll('.stat strong');
      const targets = [15, 500, 200, 10000];
      const suffixes = ['+', '+', '+', '+'];
      statEls.forEach((el, i) => {
        animateCount(el, targets[i], suffixes[i]);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ===== Contact Form ===== */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
        valid = false;
      }
    });

    if (!valid) return;

    // Email validation
    const email = form.querySelector('#email');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.value)) {
      email.style.borderColor = '#ef4444';
      return;
    }

    // Simulate form submission (replace with actual backend endpoint)
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 1200);
  });
}

/* ===== Smooth Scroll Offset (fixed header) ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = header ? header.offsetHeight : 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===== Lazy-load background images ===== */
const bgImages = document.querySelectorAll('[style*="background-image"]');
const bgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.backgroundImage = entry.target.dataset.bg || entry.target.style.backgroundImage;
      bgObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '200px' });

bgImages.forEach(el => bgObserver.observe(el));
