// script.js — interactive behavior for the portfolio
(() => {
  // Utilities
  const q = sel => document.querySelector(sel);
  const qa = sel => Array.from(document.querySelectorAll(sel));

  // DOM elements
  const nav = q('#nav');
  const navToggle = q('#navToggle');
  const filters = qa('.filter');
  const projectsGrid = q('#projectsGrid');
  const bars = qa('.bar');
  const modal = q('#projectModal');
  const modalClose = q('#modalClose');
  const modalImage = q('#modalImage');
  const modalTitle = q('#modalTitle');
  const modalDesc = q('#modalDesc');
  const form = q('#contactForm');
  const formStatus = q('#formStatus');
  const yearSpan = q('#year');

  // set copyright year
  yearSpan.textContent = new Date().getFullYear();

  /* NAV toggle (mobile) */
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Smooth scrolling for internal links
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        nav.classList.remove('open');
        navToggle.classList.remove('open');
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  /* Skill bars animation when visible */
  function animateSkillBars() {
    bars.forEach(bar => {
      const pct = bar.dataset.percent || 0;
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        bar.style.width = pct + '%';
      }
    });
  }
  // run on load and scroll
  window.addEventListener('load', animateSkillBars);
  window.addEventListener('scroll', animateSkillBars);

  /* Project filtering */
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      // UI
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const items = qa('.project-item');

      items.forEach(it => {
        const tags = (it.dataset.tags || '').split(/\s+/).map(t => t.trim()).filter(Boolean);
        if (filter === 'all' || tags.includes(filter)) {
          it.style.display = '';
          it.style.opacity = 1;
          it.style.transform = 'scale(1)';
        } else {
          it.style.opacity = 0;
          it.style.transform = 'scale(.98)';
          // small delay then hide for screenreader cleanliness
          setTimeout(() => it.style.display = 'none', 220);
        }
      });
    });
  });

  /* Open project modal */
  qa('.open-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const t = e.currentTarget;
      const title = t.dataset.title || 'Project';
      const img = t.dataset.img || t.closest('.project-item').querySelector('img').src;
      modalImage.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = 'Detailed project description and gallery would appear here. Replace this text with the case study summary or add more images and links.';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalImage.src = '';
  }

  /* Contact form client-side validation + fake submit */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    formStatus.textContent = '';

    const name = q('#name').value.trim();
    const email = q('#email').value.trim();
    const message = q('#message').value.trim();

    let ok = true;

    if (!name) { showError('name', 'Please enter your name'); ok = false; }
    if (!validateEmail(email)) { showError('email', 'Please enter a valid email'); ok = false; }
    if (message.length < 10) { showError('message', 'Message should be at least 10 characters'); ok = false; }

    if (!ok) return;

    // Simulate sending (no backend provided) — show success and reset
    formStatus.style.color = '#8ef0c2';
    formStatus.textContent = 'Sending...';
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
      formStatus.textContent = 'Thanks — message sent (simulated). I will respond within 2 business days.';
    }, 900);
  });

  function validateEmail(email) {
    // Basic RFC-5322-ish regex (not perfect but ok for client-side)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(field, msg) {
    q(`#err-${field}`).textContent = msg;
  }
  function clearErrors() {
    qa('.error').forEach(el => el.textContent = '');
  }

  /* Accessibility: close menus with Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (nav.classList.contains('open')) nav.classList.remove('open');
      if (modal.getAttribute('aria-hidden') === 'false') closeModal();
    }
  });

  /* Small visual reveal on scroll for project items */
  function revealOnScroll() {
    qa('.project-item').forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        el.style.transition = `opacity .5s ease ${i * 70}ms, transform .5s ease ${i * 70}ms`;
      } else {
        el.style.opacity = 0;
        el.style.transform = 'translateY(18px)';
      }
    });
  }
  window.addEventListener('load', revealOnScroll);
  window.addEventListener('scroll', revealOnScroll);

})();
