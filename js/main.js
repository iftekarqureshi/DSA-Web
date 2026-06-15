/**
 * EBCG – Main JavaScript
 * Modern interactive functionality for navigation and page interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      const isActive = mobileMenu.classList.contains('active');
      this.textContent = isActive ? '✕' : '☰';
    });
  }

  // Close mobile menu when clicking links
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Add animation classes on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll('.card, .section').forEach(el => {
    observer.observe(el);
  });

  // Form interaction
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      // Default form submission handled by Formspree
      // You can add custom analytics tracking here
      console.log('Form submitted');
    });
  }

  // Scroll to top functionality
  const scrollButton = document.createElement('button');
  scrollButton.innerHTML = '↑';
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    font-size: 1.5rem;
    z-index: 999;
    box-shadow: var(--shadow-lg);
    transition: all 0.3s ease;
  `;

  document.body.appendChild(scrollButton);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollButton.style.display = 'flex';
      scrollButton.style.alignItems = 'center';
      scrollButton.style.justifyContent = 'center';
    } else {
      scrollButton.style.display = 'none';
    }
  });

  scrollButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollButton.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
  });

  scrollButton.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
  });
});

// Page transition effect (optional)
window.addEventListener('beforeunload', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
});

// Utility functions
function trackEvent(eventName, eventData) {
  console.log('Event:', eventName, eventData);
  // Add your analytics tracking here
}

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 ? `+91 ${cleaned}` : phone;
}
