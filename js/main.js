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
      const action = form.getAttribute('action');
      if (action && action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        alert('Thank you for your interest! The contact form is currently in demo mode. To make it live, please replace "YOUR_FORM_ID" with your actual Formspree ID.');
        console.log('Form submission intercepted - placeholder ID present.');
      } else {
        console.log('Form submitted');
      }
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

// EMI Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
  const loanAmountInput = document.getElementById('loan-amount');
  const loanAmountVal = document.getElementById('loan-amount-val');
  const interestRateInput = document.getElementById('interest-rate');
  const interestRateVal = document.getElementById('interest-rate-val');
  const loanTenureInput = document.getElementById('loan-tenure');
  const loanTenureVal = document.getElementById('loan-tenure-val');

  const emiResult = document.getElementById('emi-result');
  const interestResult = document.getElementById('interest-result');
  const totalResult = document.getElementById('total-result');

  function formatRupees(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function calculateEMI() {
    if (!loanAmountInput || !interestRateInput || !loanTenureInput) return;

    const principal = parseFloat(loanAmountInput.value);
    const annualRate = parseFloat(interestRateInput.value);
    const years = parseFloat(loanTenureInput.value);
    
    // Update labels
    if (loanAmountVal) {
      if (principal >= 10000000) {
        loanAmountVal.textContent = (principal / 10000000).toFixed(2) + " Cr";
      } else {
        loanAmountVal.textContent = (principal / 100000).toFixed(1) + " Lakhs";
      }
    }
    if (interestRateVal) interestRateVal.textContent = annualRate.toFixed(1) + "%";
    if (loanTenureVal) loanTenureVal.textContent = years + " Years";

    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = years * 12;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = principal / totalMonths;
    } else {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    if (emiResult) emiResult.textContent = formatRupees(Math.round(emi));
    if (interestResult) interestResult.textContent = formatRupees(Math.round(totalInterest));
    if (totalResult) totalResult.textContent = formatRupees(Math.round(totalPayment));
  }

  if (loanAmountInput) {
    loanAmountInput.addEventListener('input', calculateEMI);
    interestRateInput.addEventListener('input', calculateEMI);
    loanTenureInput.addEventListener('input', calculateEMI);
    calculateEMI(); // initial calculation
  }
});

