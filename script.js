document.documentElement.classList.add('js-enabled');

const menuToggle = document.querySelector('#menu-toggle');
const siteMenu = document.querySelector('#site-menu');
const copyEmailButton = document.querySelector('[data-copy-email]');
const copyStatus = document.querySelector('#copy-status');
const sectionLinks = document.querySelectorAll('[data-section-link]');

if (menuToggle && siteMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteMenu.classList.toggle('is-open', !expanded);
  });

  sectionLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteMenu.classList.remove('is-open');
    });
  });
}

if ('IntersectionObserver' in window) {
  const observedSections = [...document.querySelectorAll('main section[id]')];
  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries.find((entry) => entry.isIntersecting);
    if (!visibleEntry) return;
    sectionLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${visibleEntry.target.id}`);
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

  observedSections.forEach((section) => observer.observe(section));
}

if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    const email = copyEmailButton.dataset.email;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = 'Email copied';
      if (copyStatus) copyStatus.textContent = 'Email address copied to clipboard.';
    } catch {
      copyEmailButton.textContent = email;
      if (copyStatus) copyStatus.textContent = 'Copy email address manually.';
    }
  });
}

const themeToggle = document.querySelector('#theme-toggle');
if (themeToggle) {
  const root = document.documentElement;
  const render = () => {
    const dark = root.dataset.theme !== 'light';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Dark theme, switch to light' : 'Light theme, switch to dark');
    themeToggle.querySelector('.theme-text').textContent = dark ? 'Dark' : 'Light';
  };
  render();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    render();
  });
}

if (window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  const root = document.documentElement;
  const glow = document.querySelector('.cursor-glow');
  let frame = 0;
  let x = 0;
  let y = 0;
  const cards = '.skill-group, .backend-pillars article, .project-card, .stat-card';

  document.addEventListener('pointermove', (event) => {
    x = event.clientX;
    y = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      root.classList.add('has-glow');
      if (glow) glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
  }, { passive: true });
  document.addEventListener('pointerleave', () => root.classList.remove('has-glow'));

  document.addEventListener('pointermove', (event) => {
    const card = event.target.closest && event.target.closest(cards);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--cx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--cy', `${event.clientY - rect.top}px`);
  }, { passive: true });
}
