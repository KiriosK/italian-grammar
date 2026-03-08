/* ============================================
   NAVIGATION — Sidebar, Scroll Spy, Mobile
   ============================================ */

export function initNavigation() {
  const sidebar = document.querySelector('.sidebar');
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.querySelector('.back-to-top');

  // --- Mobile toggle ---
  function toggleSidebar() {
    sidebar.classList.toggle('open');
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    burger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (burger) burger.addEventListener('click', toggleSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // Close on nav link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });

  // --- Scroll spy ---
  const sections = document.querySelectorAll('[data-nav-id]');
  let ticking = false;

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;

    let currentId = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        currentId = section.dataset.navId;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });

    // Back to top visibility
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initial state
  updateActiveLink();
}
