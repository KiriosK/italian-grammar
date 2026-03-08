/* ============================================
   CONTENT LOADER — Fetch HTML partials
   ============================================ */

const CONTENT_FILES = [
  'intro',
  'indicativo',
  'comparisons',
  'condizionale',
  'congiuntivo',
  'periodo-ipotetico',
  'imperativo',
  'forme-indefinite',
  'accordo-participio'
];

export async function loadContent() {
  const container = document.getElementById('content-sections');
  if (!container) return;

  const results = await Promise.allSettled(
    CONTENT_FILES.map(name =>
      fetch(`content/${name}.html`).then(r => {
        if (!r.ok) throw new Error(`${name}: ${r.status}`);
        return r.text();
      })
    )
  );

  let html = '';
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      html += result.value;
    } else {
      console.warn(`Failed to load: ${CONTENT_FILES[i]}`, result.reason);
    }
  });

  container.innerHTML = html;
}
