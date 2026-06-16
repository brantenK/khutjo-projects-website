/* app.js */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Intersection Observer for scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animating once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // 4. Interactive Services Detailed Modals or Section scroll
  const serviceActions = document.querySelectorAll('.service-action');
  const serviceSelect = document.getElementById('quote-service');

  serviceActions.forEach(action => {
    action.addEventListener('click', (e) => {
      e.preventDefault();
      const targetService = action.getAttribute('data-service');
      
      // Auto-select in form
      if (serviceSelect && targetService) {
        serviceSelect.value = targetService;
      }

      // Scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Contact Form Handling
  const quoteForm = document.getElementById('quote-form');
  const formFeedback = document.getElementById('form-feedback');

  if (quoteForm && formFeedback) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous feedback
      formFeedback.style.display = 'none';
      formFeedback.className = 'form-feedback';

      // Inputs
      const name = document.getElementById('quote-name').value.trim();
      const email = document.getElementById('quote-email').value.trim();
      const phone = document.getElementById('quote-phone').value.trim();
      const service = document.getElementById('quote-service').value;
      const message = document.getElementById('quote-message').value.trim();

      // Basic Validation
      if (!name || !email || !phone || !service || !message) {
        formFeedback.textContent = 'Please fill out all required fields.';
        formFeedback.classList.add('error');
        return;
      }

      // Email format validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.classList.add('error');
        return;
      }

      // Phone format validation (simple SA length check)
      const cleanPhone = phone.replace(/\s+/g, '');
      if (cleanPhone.length < 9) {
        formFeedback.textContent = 'Please enter a valid contact number.';
        formFeedback.classList.add('error');
        return;
      }

      // Success feedback (Simulating procurement processing)
      const referenceCode = `KP99-${Math.floor(100 + Math.random() * 900)}`;
      formFeedback.innerHTML = `
        <strong>Thank you, ${name}!</strong> Your request has been successfully submitted.<br>
        Our procurement team will review your specifications for <strong>${service.replace('-', ' ')}</strong>.<br>
        Your Request reference code is: <strong>${referenceCode}</strong>.
      `;
      formFeedback.classList.add('success');

      // Clear form inputs
      quoteForm.reset();
    });
  }

  // 6. Hero Callback Form Handling
  const heroCallbackForm = document.getElementById('hero-callback-form');
  if (heroCallbackForm) {
    heroCallbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('hero-name').value.trim();
      const phone = document.getElementById('hero-phone').value.trim();
      const service = document.getElementById('hero-service').value;

      if (!name || !phone || !service) {
        alert('Please fill out all fields.');
        return;
      }

      const ticketId = `KP99-${Math.floor(1000 + Math.random() * 9000)}`;
      alert(`Callback Requested!\n\nThank you, ${name}. A representative will call you back shortly regarding your ${service.toUpperCase()} query.\nReference Ticket: ${ticketId}`);
      heroCallbackForm.reset();
    });
  }
});
