const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('main.js', 'utf8');

function context(overrides = {}) {
  return vm.createContext({ document: { addEventListener() {} }, window: {}, ...overrides });
}

test('les erreurs distantes sont du texte, même avec une charge XSS', async () => {
  const payload = '<img src=x onerror="alert(document.domain)">';
  let submit;
  const status = { classList: { add() {}, remove() {} }, textContent: '', set innerHTML(_) { throw Error('HTML non fiable'); } };
  const button = { innerHTML: 'Envoyer', disabled: false };
  const form = { reportValidity: () => true, addEventListener: (_, callback) => { submit = callback; }, getAttribute: () => 'https://formspree.io/f/xljrkkqy' };
  const ctx = context({
    document: { addEventListener() {}, getElementById: id => ({ 'contact-form': form, 'form-submit-btn': button, 'form-status-msg': status })[id] },
    FormData: class {}, setTimeout() {}, clearTimeout() {},
    fetch: async () => ({ ok: false, json: async () => ({ errors: [{ message: payload }] }) })
  });
  vm.runInContext(source + '\ninitContactForm();', ctx);
  await submit({ preventDefault() {} });
  assert.equal(status.textContent, payload);
  assert.equal(button.disabled, false);
});

test('la réduction des animations et les navigateurs sans animate sont respectés', () => {
  const ctx = context({ window: { matchMedia: () => ({ matches: true }) } });
  vm.runInContext(source, ctx);
  ctx.element = { animate() { throw Error('Animation indésirable'); } };
  vm.runInContext('animateEntrance(element)', ctx);
  ctx.element = {};
  vm.runInContext('animateEntrance(element)', ctx);
});

test('les paramètres URL malformés restent du texte sur les pages annexes', () => {
  for (const page of ['demo-acces', 'source-privee']) {
    const title = { textContent: '' };
    const ctx = context({ URLSearchParams, window: { location: { search: '?name=%E0%A4%A%3Cimg%20src=x%3E' } }, document: { getElementById: () => title } });
    vm.runInContext(fs.readFileSync(`assets/${page}-page.js`, 'utf8'), ctx);
    assert.ok(title.textContent.includes('<img src=x>'));
  }
});

test('toutes les pages utilisent uniquement des scripts locaux sans inline', () => {
  for (const file of ['index.html', '404.html', 'demo-acces.html', 'source-privee.html']) {
    const html = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(html, /<script\s*>|<script[^>]+src="https?:/);
    assert.doesNotMatch(html, /\son(?:click|error|load)\s*=/i);
    for (const match of html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
      if (!/^(?:https?:|data:|mailto:|tel:)/.test(match[1])) assert.ok(fs.existsSync(match[1]), `${file}: ${match[1]}`);
    }
  }
});
