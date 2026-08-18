import fs from 'fs/promises';
import path from 'path';

let LEXICON_CACHE = null;

async function loadLexicon() {
  if (LEXICON_CACHE) return LEXICON_CACHE;
  const lexPath = path.join(process.cwd(), 'translator', 'lexicon.json');
  try {
    const raw = await fs.readFile(lexPath, 'utf8');
    LEXICON_CACHE = JSON.parse(raw);
    return LEXICON_CACHE;
  } catch (err) {
    console.error('Lexicon load error:', err.message);
    LEXICON_CACHE = {};
    return LEXICON_CACHE;
  }
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function translateUsingLexicon(text, map) {
  const input = (text || '').trim();
  if (!input) return '';

  // Normalize map keys to lowercase for reliable matching
  const normalized = {};
  for (const k of Object.keys(map || {})) {
    normalized[k.toLowerCase()] = map[k];
  }

  const lc = input.toLowerCase();
  const phrases = Object.keys(normalized).sort((a, b) => b.length - a.length);
  let out = input; // preserve original case/punctuation for replacements

  // Replace phrases (longest-first)
  for (const phrase of phrases) {
    const esc = escapeRegExp(phrase);
    const re = new RegExp('\\b' + esc + '\\b', 'gi');
    out = out.replace(re, (match) => {
      const translated = normalized[phrase];
      if (!translated) return match;
      // Preserve capitalization of the first char
      if (match[0] === match[0].toUpperCase()) {
        return translated.charAt(0).toUpperCase() + translated.slice(1);
      }
      return translated;
    });
  }

  // If nothing changed (no phrase matches), try word-by-word fallback
  if (out.toLowerCase() === lc) {
    const words = input.split(/\s+/);
    out = words
      .map((w) => {
        const lw = w.toLowerCase();
        const t = normalized[lw];
        if (!t) return w;
        if (w[0] === w[0].toUpperCase()) {
          return t.charAt(0).toUpperCase() + t.slice(1);
        }
        return t;
      })
      .join(' ');
  }

  return out;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { text = '', from = 'en', to = 'so' } = req.body || {};
  if (!text || !text.trim()) return res.status(400).json({ error: 'No text provided' });

  try {
    const lex = await loadLexicon();
    const key = `${from}|${to}`;
    const map = lex[key] || {};
    const translation = translateUsingLexicon(text, map);
    return res.status(200).json({ translation });
  } catch (err) {
    console.error('Translate error:', err);
    return res.status(500).json({ error: 'Translation failed' });
  }
}