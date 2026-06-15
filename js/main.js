(function () {
  'use strict';

  const FORMSPREE_ID = 'YOUR_FORM_ID';

  /* Mobile Menu */
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = mobileMenu.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', expanded);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Services dropdown (mobile tap) */
  const dropdownBtn = document.querySelector('.nav-dropdown-btn');
  const dropdown = document.querySelector('.nav-dropdown');

  if (dropdownBtn && dropdown) {
    dropdownBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      if (mobileMenu) {
        mobileMenu.classList.remove('open');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* FAQ Accordion */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Intersection Observer scroll-fade */
  const faders = document.querySelectorAll('.scroll-fade');
  if (faders.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    faders.forEach((el) => observer.observe(el));
  } else {
    faders.forEach((el) => el.classList.add('visible'));
  }

  /* Active nav link via data-path */
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/') || '/';
  document.querySelectorAll('[data-path]').forEach((link) => {
    const linkPath = link.getAttribute('data-path');
    if (linkPath === currentPath || (currentPath !== '/' && linkPath !== '/' && currentPath.includes(linkPath))) {
      link.classList.add('active');
    }
  });

  /* Form handler */
  document.querySelectorAll('.contact-form').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) return;

      const submitBtn = form.querySelector('[type="submit"]');
      const submitWrap = submitBtn ? submitBtn.closest('.form-submit') : null;
      const messageEl = form.querySelector('.form-message');
      const thankYouUrl = form.getAttribute('data-thank-you');

      if (messageEl) {
        messageEl.className = 'form-message';
        messageEl.textContent = '';
      }

      if (submitWrap) submitWrap.classList.add('loading');
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(form);

      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          if (thankYouUrl) {
            window.location.href = thankYouUrl;
            return;
          }
          if (messageEl) {
            messageEl.textContent = 'Thank you! We will be in touch shortly.';
            messageEl.classList.add('success');
          }
          form.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          const errMsg = data.error || 'Something went wrong. Please try again or call us directly.';
          if (messageEl) {
            messageEl.textContent = errMsg;
            messageEl.classList.add('error');
          }
        }
      } catch {
        if (messageEl) {
          messageEl.textContent = 'Network error. Please check your connection and try again.';
          messageEl.classList.add('error');
        }
      } finally {
        if (submitWrap) submitWrap.classList.remove('loading');
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
})();
