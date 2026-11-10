// Copy-to-clipboard for the email address. The link next to it still works without JS.
const copyButton = document.querySelector('[data-copy]');
const copyStatus = document.querySelector('#copy-status');

if (copyButton && navigator.clipboard) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy);
      copyButton.textContent = 'Copied';
      copyStatus.textContent = 'Email address copied.';
    } catch {
      copyStatus.textContent = 'Could not copy. Select the address instead.';
    }
  });
} else if (copyButton) {
  copyButton.hidden = true;
}
