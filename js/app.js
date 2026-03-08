/* ============================================
   APP — Main initialization
   ============================================ */

import { loadContent } from './content-loader.js';
import { initNavigation } from './navigation.js';

async function init() {
  await loadContent();
  initNavigation();
  initCollapsibles();
}

function initCollapsibles() {
  document.querySelectorAll('.collapsible__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.collapsible').classList.toggle('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
