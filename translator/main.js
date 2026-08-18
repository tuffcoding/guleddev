(async function initTranslator() {
  'use strict';

  const rootPath = ''; // same origin

  // Elements
  const input = document.getElementById('translator-input');
  const output = document.getElementById('translator-output');
  const status = document.getElementById('translator-status');

  const btnTranslate = document.getElementById('translator-translate');
  const btnClear = document.getElementById('translator-clear');
  const btnCopy = document.getElementById('translator-copy');
  const btnSwap = document.getElementById('translator-swap');

  const selFrom = document.getElementById('translator-from');
  const selTo = document.getElementById('translator-to');
  const example = document.getElementById('translator-example');

  function showStatus(text, color = 'var(--muted)') {
    if (!status) return;
    status.hidden = false;
    status.style.color = color;
    status.textContent = text;
  }

  function hideStatus() {
    if (!status) return;
    status.hidden = true;
    status.textContent = '';
  }

  async function callTranslateAPI(text, from = 'en', to = 'so') {
    const url = `${rootPath}/api/translate`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, from, to }),
      });

      if (!res.ok) {
        throw new Error(`Translate API error ${res.status}`);
      }

      const data = await res.json();
      return data.translation || '';
    } catch (err) {
      // If API fails, return fallback (keeps original behavior).
      console.warn('API unavailable; using fallback', err);
      return `[offline] ${text}`;
    }
  }

  if (btnTranslate && input) {
    btnTranslate.addEventListener('click', async (e) => {
      e.preventDefault();

      const text = (input.value || '').trim();
      if (!text) {
        showStatus('Please enter text.', 'crimson');
        return;
      }

      hideStatus();
      showStatus('Translating…');
      btnTranslate.disabled = true;

      const from = selFrom?.value ?? 'en';
      const to = selTo?.value ?? 'so';

      try {
        const translated = await callTranslateAPI(text, from, to);
        if (output) output.value = translated;
        showStatus('Done', 'lightgreen');
      } catch (err) {
        // callTranslateAPI returns a fallback instead of throwing,
        // but keep this catch to mirror original structure.
        console.error(err);
        showStatus('Translation failed', 'crimson');
      } finally {
        btnTranslate.disabled = false;
      }
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', (e) => {
      e.preventDefault();
      if (input) input.value = '';
      if (output) output.value = '';
      hideStatus();
      input?.focus();
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(output?.value || '');
        showStatus('Copied to clipboard', 'lightgreen');
      } catch (err) {
        console.warn('Copy failed', err);
        showStatus('Copy failed', 'crimson');
      }
    });
  }

  if (btnSwap && selFrom && selTo) {
    btnSwap.addEventListener('click', (e) => {
      e.preventDefault();
      const a = selFrom.value;
      selFrom.value = selTo.value;
      selTo.value = a;
    });
  }

  if (example && input && selFrom && selTo) {
    example.addEventListener('click', (e) => {
      e.preventDefault();
      input.value = 'Hello, how are you?';
      selFrom.value = 'en';
      selTo.value = 'so';
      input.focus();
    });
  }
})();