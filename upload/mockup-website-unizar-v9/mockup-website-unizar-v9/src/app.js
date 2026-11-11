(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------------- Router ---------------- */
  var pages = $$('.page');
  var pending = null;
  var DEFAULT = 'beranda';

  function scrollToSec(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function show() {
    var id = (location.hash || '').replace('#', '') || DEFAULT;
    var pg = document.getElementById('p-' + id);
    if (!pg) { id = DEFAULT; pg = document.getElementById('p-' + id); }
    pages.forEach(function (p) { p.hidden = p !== pg; });
    document.title = (pg.getAttribute('data-title') || 'Beranda') + ' | Universitas Islam Al-Azhar';
    var nav = pg.getAttribute('data-nav') || '';
    $$('.nav button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-menu') === nav); });
    $$('.rail a, .bbar a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + id); });
    closeMega(); closeDrawer(); closeSearch();
    buildSubnav(pg);
    if (pending) { var s = pending; pending = null; setTimeout(function () { scrollToSec(s); }, 60); }
    else window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', show);

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var h = a.getAttribute('href');
    if (h === '#' ) { e.preventDefault(); if (a.hasAttribute('data-open')) { closeMega(); closeDrawer(); closeSearch(); } return; }
    if (h === '#main') { e.preventDefault(); var m = document.getElementById('main'); m.setAttribute('tabindex', '-1'); m.focus(); return; }
    var sec = a.getAttribute('data-sec');
    var target = h.slice(1);
    if (sec) pending = target + '--' + sec;
    if (('#' + ((location.hash || '').replace('#', '') || DEFAULT)) === h) {
      e.preventDefault();
      closeMega(); closeDrawer(); closeSearch();
      if (pending) { var s = pending; pending = null; scrollToSec(s); } else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  /* ---------------- Sub-navigation per page ---------------- */
  var io = null;
  function buildSubnav(pg) {
    var bar = $('.subnav .wrap', pg);
    if (!bar) return;
    var secs = $$('.sec[data-t]', pg);
    bar.innerHTML = '';
    secs.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = s.getAttribute('data-t');
      if (i === 0) b.classList.add('on');
      b.addEventListener('click', function () { s.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      bar.appendChild(b);
    });
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var idx = secs.indexOf(en.target);
        $$('button', bar).forEach(function (b, j) { b.classList.toggle('on', j === idx); });
        var on = $$('button', bar)[idx];
        if (on) bar.scrollTo({ left: on.offsetLeft - 20, behavior: 'smooth' });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { io.observe(s); });
  }

  /* ---------------- Mega menu ---------------- */
  var openMenu = null, hoverT = null;
  function closeMega() {
    $$('.mega').forEach(function (m) { m.hidden = true; });
    $$('.nav button').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    openMenu = null;
  }
  function openMega(key) {
    closeMega();
    var m = document.getElementById('mega-' + key);
    if (!m) return;
    m.hidden = false; openMenu = key;
    var b = $('.nav button[data-menu="' + key + '"]');
    if (b) b.setAttribute('aria-expanded', 'true');
  }
  $$('.nav button').forEach(function (b) {
    var k = b.getAttribute('data-menu');
    b.addEventListener('click', function () { openMenu === k ? closeMega() : openMega(k); });
    b.addEventListener('mouseenter', function () {
      if (window.matchMedia('(hover: hover)').matches) { clearTimeout(hoverT); hoverT = setTimeout(function () { openMega(k); }, 140); }
    });
    b.addEventListener('mouseleave', function () { clearTimeout(hoverT); });
  });
  var hdr = $('.hdr');
  hdr.addEventListener('mouseleave', function () { if (window.matchMedia('(hover: hover)').matches) { clearTimeout(hoverT); hoverT = setTimeout(closeMega, 250); } });
  hdr.addEventListener('mouseenter', function () { clearTimeout(hoverT); });
  document.addEventListener('click', function (e) { if (openMenu && !e.target.closest('.hdr')) closeMega(); });

  /* ---------------- Drawer (mobile) ---------------- */
  var drawer = $('#drawer');
  function openDrawer() { drawer.hidden = false; }
  function closeDrawer() { if (drawer) drawer.hidden = true; }
  $$('[data-open-drawer]').forEach(function (b) { b.addEventListener('click', openDrawer); });
  drawer.addEventListener('click', function (e) { if (e.target === drawer || e.target.closest('[data-close-drawer]')) closeDrawer(); });

  /* ---------------- Search ---------------- */
  var IDX = JSON.parse($('#search-index').textContent);
  var sOverlay = $('#search'), sInput = $('#search-q'), sList = $('#search-res');
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function renderResults() {
    var q = norm(sInput.value.trim());
    var res = q ? IDX.filter(function (r) { return norm(r.t + ' ' + (r.k || '')).indexOf(q) > -1; }).slice(0, 14) : IDX.filter(function (r) { return r.pop; });
    sList.innerHTML = '';
    if (!res.length) { sList.innerHTML = '<li class="hint">Tidak ada hasil untuk "' + sInput.value.replace(/</g, '&lt;') + '". Coba kata lain, misalnya "beasiswa", "SPMI", atau "Ind. 28".</li>'; return; }
    res.forEach(function (r) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      if (r.o) { a.href = '#'; a.setAttribute('data-open', r.o); } else a.href = '#' + r.p;
      if (r.s && !r.o) a.setAttribute('data-sec', r.s);
      a.innerHTML = '<span>' + r.t + '</span><small>' + r.g + '</small>';
      li.appendChild(a); sList.appendChild(li);
    });
  }
  function openSearch() { sOverlay.hidden = false; sInput.value = ''; renderResults(); sInput.focus(); }
  function closeSearch() { if (sOverlay) sOverlay.hidden = true; }
  $$('[data-open-search]').forEach(function (b) { b.addEventListener('click', function () { closeDrawer(); openSearch(); }); });
  sInput.addEventListener('input', renderResults);
  sOverlay.addEventListener('click', function (e) { if (e.target === sOverlay || e.target.closest('[data-close-search]')) closeSearch(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSearch(); closeMega(); closeDrawer(); }
    if (e.key === '/' && !/input|textarea|select/i.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); openSearch(); }
  });

  /* ---------------- Language ---------------- */
  function setLang(l) {
    $$('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-id')) el.setAttribute('data-id', el.innerHTML);
      el.innerHTML = l === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id');
    });
    document.documentElement.lang = l;
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-l') === l)); });
    store.set('unizar-lang', l);
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-l')); }); });

  /* ---------------- Filters (chips + text) ---------------- */
  $$('[data-filter]').forEach(function (box) {
    var items = $$('[data-item]', box);
    var state = {};
    var txt = $('[data-filter-text]', box);
    var count = $('[data-filter-count]', box);
    function apply() {
      var q = txt ? norm(txt.value.trim()) : '';
      var n = 0;
      items.forEach(function (it) {
        var ok = Object.keys(state).every(function (k) { return state[k] === 'all' || (' ' + (it.getAttribute('data-' + k) || '') + ' ').indexOf(' ' + state[k] + ' ') > -1; });
        if (ok && q) ok = norm(it.textContent).indexOf(q) > -1;
        it.hidden = !ok; if (ok) n++;
      });
      if (count) count.textContent = n;
    }
    $$('[data-chips]', box).forEach(function (grp) {
      var key = grp.getAttribute('data-chips');
      state[key] = 'all';
      $$('button', grp).forEach(function (b) {
        b.addEventListener('click', function () {
          state[key] = b.getAttribute('data-v');
          $$('button', grp).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          apply();
        });
      });
    });
    if (txt) txt.addEventListener('input', apply);
    apply();
  });

  /* ---------------- Tabs (login, PPID) ---------------- */
  $$('[data-tabs]').forEach(function (box) {
    var btns = $$('[role="tab"]', box), panes = $$('[role="tabpanel"]', box);
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        btns.forEach(function (x, j) { x.setAttribute('aria-selected', String(i === j)); });
        panes.forEach(function (p, j) { p.hidden = i !== j; });
      });
    });
  });

  /* ---------------- Mock forms ---------------- */
  $$('form[data-mock]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = $('.form-msg', f);
      if (m) m.textContent = f.getAttribute('data-mock');
    });
  });

  /* ---------------- Evidence map: public vs internal view ---------------- */
  $$('[data-view]').forEach(function (b) {
    b.addEventListener('click', function () {
      document.body.classList.toggle('internal', b.getAttribute('data-view') === 'internal');
      $$('[data-view]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    });
  });

  /* ---------------- Mockup pill ---------------- */
  var pill = $('.mock-pill');
  if (store.get('unizar-pill') === 'off') pill.hidden = true;
  $('button', pill).addEventListener('click', function () { pill.hidden = true; store.set('unizar-pill', 'off'); });

  /* ---------------- Accreditation archive finder ---------------- */
  var akrEl = $('#akr-data');
  if (akrEl) {
    var AKR = JSON.parse(akrEl.textContent);
    $$('form[data-akr]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var prodi = $('#akr-p', f).value, y = parseInt($('#akr-y', f).value, 10), out = $('.akr-result', f);
        var rows = AKR[prodi] || [];
        var hit = null;
        rows.forEach(function (r) { if (y >= r.f && y < r.t) hit = r; });
        if (!y || !rows.length || y < rows[0].f) { out.innerHTML = '<span>Program studi ' + prodi + ' belum menerima lulusan pada tahun itu. Periksa kembali tahun lulus Anda.</span>'; return; }
        if (!hit) hit = rows[rows.length - 1];
        out.innerHTML = '<span><small class="muted">Berlaku saat Anda lulus (' + y + ')</small><br><b>' + prodi + ' · ' + hit.k + ' ' + hit.f + '–' + hit.t + '</b><br><span class="muted">' + hit.l + ' · ' + hit.r + ' · SK [nomor]</span></span><a class="btn pri" href="#">Unduh sertifikat (PDF)</a>';
      });
    });
  }

  show();
  if (store.get('unizar-lang') === 'en') setLang('en');
})();
