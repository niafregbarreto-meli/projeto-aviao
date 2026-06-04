const _moduleCache = {};
const _moduleInited = {};

async function showModule(name) {
  const app = document.getElementById('app-content');
  if (!name || !['home','colab','lms','org','bingo'].includes(name)) name = 'home';

  // Highlight active nav button
  document.querySelectorAll('.spa-nav-btn').forEach(b => {
    b.classList.toggle('spa-nav-active', b.dataset.module === name);
  });

  app.innerHTML = '<div class="module-loading"><div class="loader"></div></div>';

  try {
    // Load HTML fragment (cached)
    if (!_moduleCache[name]) {
      const res = await fetch(`modules/${name}.html`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      _moduleCache[name] = await res.text();
    }
    app.innerHTML = _moduleCache[name];
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Call module init once
    if (!_moduleInited[name]) {
      _moduleInited[name] = true;
      const fn = window[`_init_${name}`];
      if (typeof fn === 'function') fn();
    }
  } catch(e) {
    app.innerHTML = `<div style="margin:40px auto;max-width:500px;background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:20px;font-size:13px;">
      <strong style="color:#d32f2f;">Erro ao carregar módulo "${name}"</strong><br>
      <code>${e.message}</code><br><br>
      <button onclick="showModule('${name}')" style="background:#3483fa;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">Tentar novamente</button>
    </div>`;
  }

  history.pushState(null, '', `#${name}`);
}

document.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash.slice(1) || 'home';
  showModule(hash);
});

window.addEventListener('popstate', function() {
  const hash = window.location.hash.slice(1) || 'home';
  showModule(hash);
});
