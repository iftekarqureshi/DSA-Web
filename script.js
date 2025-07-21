// Responsive Navigation
const navBtn = document.getElementById('navButton');
const navLinks = document.getElementById('navLinks');
let navOpen = false;
navBtn.onclick = function() {
  navOpen = !navOpen;
  navLinks.classList.toggle('open', navOpen);
};
document.addEventListener('click', e => {
  if(navOpen && !navLinks.contains(e.target) && e.target !== navBtn) {
    navLinks.classList.remove('open');
    navOpen = false;
  }
});
// Keyboard accessibility for nav
navBtn.onkeydown = function(e){ if(e.key==="Enter"||e.key===" "){ navBtn.click(); } };

// Smooth Scroll to Section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  navLinks.classList.remove('open');
  navOpen = false;
}
document.querySelectorAll('.nav-links a').forEach(link=>{
  link.addEventListener('click', e=>{
    const target = link.getAttribute('href');
    if(target.startsWith('#')) {
      e.preventDefault();
      scrollToSection(target.replace('#',''));
    }
  });
});
// Form Submission Animation
function submitForm(e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Thanks! Your application has been received.';
  msg.style.color = '#22b5a7';
  e.target.reset();
  if(msg.animate) {
    msg.animate([
      { transform: "scale(1.18)", opacity: .4 },
      { transform: "scale(1)", opacity: 1 }
    ], {duration: 430, easing: "cubic-bezier(.77,0,.19,1.1)"});
  }
  setTimeout(()=>{msg.textContent='';}, 5000);
}
