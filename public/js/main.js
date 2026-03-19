// ── Mobile Nav Toggle ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  links.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

// ── Contact Form Submission ──
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  status.textContent = '';
  status.className = 'form-status';

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.classList.add('success');
      form.reset();
    } else {
      throw new Error(result.error || 'Something went wrong');
    }
  } catch (err) {
    status.textContent = '✗ ' + err.message + '. Please try again.';
    status.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// ── Fade-in animation on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .qual-item, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
