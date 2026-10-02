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
