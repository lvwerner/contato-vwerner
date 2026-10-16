/* Portfólio de Vinicius Werner: comportamento da página.
   Tudo é opcional: sem JavaScript o conteúdo continua legível. */
(function () {
  'use strict';

  var root = document.documentElement;
  var status = document.getElementById('copyStatus');

  /* Tema claro e escuro -------------------------------------------------- */
  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* armazenamento bloqueado */ }
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#08121d' : '#f3f6fa');
    });
  }

  /* Menu no celular ------------------------------------------------------ */
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    menu.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    /* Ao girar o aparelho ou ampliar a janela, o menu volta ao estado fechado */
    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 1001px)');
      var onWide = function (e) { if (e.matches) setMenu(false); };
      if (wide.addEventListener) wide.addEventListener('change', onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }
  }

  /* Seção ativa na navegação --------------------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var byId = {};
  links.forEach(function (l) { byId[l.getAttribute('href').slice(1)] = l; });
  if ('IntersectionObserver' in window && links.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting || !byId[en.target.id]) return;
        links.forEach(function (l) { l.removeAttribute('aria-current'); });
        byId[en.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* Copiar texto (e-mail e chaves dos certificados) ---------------------- */
  function announce(msg) {
    if (!status) return;
    status.textContent = '';
    window.setTimeout(function () { status.textContent = msg; }, 30);
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    var label = btn.querySelector('span') || btn;
    var original = label.textContent;
    btn.addEventListener('click', function () {
      copyText(btn.getAttribute('data-copy')).then(function (ok) {
        var what = btn.getAttribute('data-label') || 'texto';
        if (ok) {
          label.textContent = 'Copiado';
          announce('Copiado: ' + what + '.');
        } else {
          label.textContent = 'Selecione e copie';
          announce('Não foi possível copiar automaticamente. Selecione o texto e copie.');
        }
        window.setTimeout(function () { label.textContent = original; }, 2400);
      });
    });
  });

  /* Imprimir ou salvar em PDF -------------------------------------------- */
  var printBtn = document.getElementById('printBtn');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  /* Ano do rodapé -------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
