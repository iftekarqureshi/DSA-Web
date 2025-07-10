function toggleNav() {
  const nav = document.getElementById('navLinks');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function submitForm(e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Thanks! Your application has been received.';
  msg.style.color = 'green';
  e.target.reset();
}
