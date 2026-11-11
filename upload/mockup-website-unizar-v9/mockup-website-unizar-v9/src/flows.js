/* ===== End-points: forms, documents, details, external systems, session ===== */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var REG = JSON.parse($('#flow-data').textContent);
  var FORMS = REG.forms, DETAILS = REG.details, EXT = REG.ext, DOCS = REG.docs;
  var ROLES = { mhs: 'Mahasiswa', dsn: 'Dosen / tendik', asesor: 'Asesor', 'op-kmhs': 'Operator Biro Kemahasiswaan', mutu: 'Tim mutu internal', unit: 'Operator unit / pemilik risiko', renbang: 'Koordinator kinerja & risiko', spi: 'Satuan Pengawasan Internal' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var ICON = {
    check: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
    ext: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    lock: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    doc: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>'
  };

  /* ---------- session ---------- */
  var session = store.get('unizar-session', null);
  function setSession(s) { session = s; store.set('unizar-session', s); paintSession(); try { document.dispatchEvent(new CustomEvent('unizar:session')); } catch (e) {} }
  function rname() { return session ? ROLES[session.role] + (session.unit && (session.role === 'unit' || session.role === 'dsn') ? ' ' + session.unit : '') : ''; }
  function paintSession() {
    var slot = $('#sess');
    if (slot) slot.innerHTML = session ? '<a href="#dasbor">' + esc(rname()) + ' · Dasbor</a><button type="button" class="util-out">Keluar</button>' : '';
    var out = slot && $('.util-out', slot);
    if (out) out.addEventListener('click', function () { setSession(null); toast('Anda telah keluar.'); if (location.hash === '#dasbor') location.hash = 'beranda'; });
    $$('.rail a[href="#masuk"], .rail a[href="#dasbor"], .bbar a[href="#masuk"], .bbar a[href="#dasbor"]').forEach(function (a) {
      a.setAttribute('href', session ? '#dasbor' : '#masuk');
      var sp = a.querySelector('span') || a.lastChild;
      if (a.closest('.rail')) a.querySelector('span').textContent = session ? 'Dasbor' : 'Masuk';
      else a.lastChild.textContent = session ? 'Dasbor' : 'Masuk';
    });
    document.body.classList.toggle('internal', !!session && session.role === 'mutu');
    renderDash();
  }

  /* ---------- toast ---------- */
  var toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); toastEl.hidden = true; document.body.appendChild(toastEl);
  var tT = null;
  function toast(msg) { toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(tT); tT = setTimeout(function () { toastEl.hidden = true; }, 2800); }
  window.unizarToast = toast;
  window.unizarSheet = { open: function (k, t, h, w) { openSheet(k, t, h, w); }, close: function () { closeSheet(); } };

  /* ---------- sheet ---------- */
  var sheet = document.createElement('div');
  sheet.className = 'sheet'; sheet.hidden = true;
  sheet.innerHTML = '<div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><header class="sheet-h"><div><span class="sheet-k"></span><h2 id="sheet-title"></h2></div><button type="button" class="icon-btn sheet-x" aria-label="Tutup">' +
    '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></header><div class="sheet-b"></div></div>';
  document.body.appendChild(sheet);
  var lastFocus = null;
  function openSheet(kicker, title, html, wide) {
    lastFocus = document.activeElement;
    $('.sheet-k', sheet).textContent = kicker || '';
    $('#sheet-title', sheet).textContent = title || '';
    $('.sheet-b', sheet).innerHTML = html;
    sheet.classList.toggle('wide', !!wide);
    sheet.hidden = false;
    document.body.classList.add('noscroll');
    $('.sheet-b', sheet).scrollTop = 0;
    setTimeout(function () { var f = $('.sheet-x', sheet); if (f) f.focus(); }, 30);
  }
  function closeSheet() { sheet.hidden = true; document.body.classList.remove('noscroll'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  sheet.addEventListener('click', function (e) { if (e.target === sheet || e.target.closest('.sheet-x') || e.target.closest('[data-close-sheet]')) closeSheet(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });
  window.addEventListener('hashchange', function () { if (!sheet.hidden) closeSheet(); });

  /* ---------- action spec → attributes ---------- */
  function actionBtn(label, spec, primary) {
    var cls = primary ? 'btn dark' : 'btn line';
    if (spec.charAt(0) === '#') { var p = spec.slice(1).split('|'); return '<a class="' + cls + '" href="#' + p[0] + '"' + (p[1] ? ' data-sec="' + p[1] + '"' : '') + ' data-close-sheet>' + esc(label) + '</a>'; }
    return '<button type="button" class="' + cls + '" data-open="' + esc(spec) + '">' + esc(label) + '</button>';
  }

  /* ---------- gate ---------- */
  function gate(kind, title, roles) {
    var who = roles ? roles.map(function (r) { return ROLES[r]; }).join(' atau ') : 'sivitas atau asesor';
    var msg = session ? 'Akun Anda masuk sebagai <b>' + esc(ROLES[session.role]) + '</b>. Layanan ini khusus untuk ' + esc(who) + '.' : 'Silakan masuk terlebih dahulu. Layanan ini untuk ' + esc(who) + '.';
    openSheet(kind, title, '<div class="gate">' + ICON.lock + '<p>' + msg + '</p><div class="btn-row"><a class="btn dark" href="#masuk" data-close-sheet>' + (session ? 'Ganti akun' : 'Masuk') + '</a><button type="button" class="btn line" data-close-sheet>Nanti saja</button></div></div>');
  }

  /* ---------- forms ---------- */
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  function field(f, key) {
    var id = 'f-' + key + '-' + f.id, req = f.r ? ' required' : '', full = f.f || ['textarea', 'checks', 'radio', 'slots', 'likert', 'consent'].indexOf(f.t) > -1 ? ' full' : '';
    var lab = '<label for="' + id + '">' + esc(f.l) + (f.r ? '' : ' <span class="opt">(opsional)</span>') + '</label>';
    if (f.t === 'select') return '<div class="field' + full + '">' + lab + '<select id="' + id + '" name="' + f.id + '"' + req + '><option value="">Pilih…</option>' + f.o.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select></div>';
    if (f.t === 'textarea') return '<div class="field' + full + '">' + lab + '<textarea id="' + id + '" name="' + f.id + '" rows="4"' + req + '></textarea></div>';
    if (f.t === 'file') return '<div class="field' + full + '">' + lab + '<label class="drop" for="' + id + '">' + ICON.doc + '<span>Pilih berkas atau seret ke sini</span></label><input class="file-in" type="file" id="' + id + '" name="' + f.id + '"' + req + '></div>';
    if (f.t === 'radio' || f.t === 'checks') {
      var tp = f.t === 'radio' ? 'radio' : 'checkbox';
      return '<fieldset class="field' + full + '"><legend>' + esc(f.l) + (f.r ? '' : ' <span class="opt">(opsional)</span>') + '</legend><div class="opts">' + f.o.map(function (o, i) {
        return '<label class="opt-pill"><input type="' + tp + '" name="' + f.id + '" value="' + esc(o) + '"' + (f.r && tp === 'radio' && i === 0 ? ' required' : '') + '><span>' + esc(o) + '</span></label>';
      }).join('') + '</div></fieldset>';
    }
    if (f.t === 'consent') return '<label class="consent full"><input type="checkbox" id="' + id + '" name="' + f.id + '"' + req + '><span>' + esc(f.l) + '</span></label>';
    if (f.t === 'likert') return '<fieldset class="field full"><legend>' + esc(f.l) + '</legend><div class="likert"><div class="lk-h"><span></span><span>Sangat tidak puas</span><span></span><span></span><span></span><span>Sangat puas</span></div>' + f.o.map(function (o, i) {
      return '<div class="lk-r"><span>' + esc(o) + '</span>' + [1, 2, 3, 4, 5].map(function (n) { return '<label><input type="radio" name="lk' + i + '" value="' + n + '"' + (n === 1 && f.r ? ' required' : '') + '><span>' + n + '</span></label>'; }).join('') + '</div>';
    }).join('') + '</div></fieldset>';
    if (f.t === 'slots') return '<div class="field full"><span class="flabel">' + esc(f.l) + '</span><div class="slots" data-slots><p class="muted">Pilih ruang dan tanggal untuk melihat jadwal kosong.</p></div><input type="hidden" name="' + f.id + '" class="slot-val"></div>';
    var tp2 = { email: 'email', tel: 'tel', number: 'number', date: 'date' }[f.t] || 'text';
    return '<div class="field' + full + '">' + lab + '<input id="' + id + '" name="' + f.id + '" type="' + tp2 + '"' + req + (tp2 === 'number' ? ' min="1"' : '') + '></div>';
  }
  var SLOT = ['07.00–09.00', '09.00–11.00', '11.00–13.00', '13.00–15.00', '15.00–17.00', '19.00–21.00'];
  function wireSlots(form) {
    var box = $('[data-slots]', form); if (!box) return;
    var room = $('select[name="ruang"]', form), date = $('input[name="tgl"]', form), val = $('.slot-val', form);
    function paint() {
      if (!room.value || !date.value) { box.innerHTML = '<p class="muted">Pilih ruang dan tanggal untuk melihat jadwal kosong.</p>'; val.value = ''; return; }
      var h = hash(room.value + date.value);
      box.innerHTML = '<div class="slot-grid">' + SLOT.map(function (s, i) {
        var busy = (h >> i) % 3 === 0;
        return '<button type="button" class="slot' + (busy ? ' busy' : '') + '" ' + (busy ? 'disabled' : '') + ' data-v="' + s + '"><b>' + s + '</b><small>' + (busy ? 'Terpakai · [kegiatan lain]' : 'Tersedia') + '</small></button>';
      }).join('') + '</div><p class="slot-legend"><span class="sw ok"></span>Tersedia <span class="sw busy"></span>Terpakai <span class="sw sel"></span>Pilihan Anda</p>';
      val.value = '';
    }
    room.addEventListener('change', paint); date.addEventListener('change', paint);
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.slot'); if (!b || b.disabled) return;
      b.classList.toggle('sel');
      val.value = $$('.slot.sel', box).map(function (x) { return x.getAttribute('data-v'); }).join(', ');
    });
  }
  function openForm(key) {
    var F = FORMS[key]; if (!F) return toast('Formulir belum tersedia.');
    if (F.role && (!session || F.role.indexOf(session.role) < 0)) return gate(F.u, F.t, F.role);
    var html = '<p class="sheet-intro">' + esc(F.i) + '</p><p class="sla">' + ICON.check + esc(F.sla) + '</p>' +
      '<ol class="stepper">' + F.s.map(function (s, i) { return '<li' + (i === 0 ? ' class="on"' : '') + '><span>' + (i + 1) + '</span>' + esc(s[0]) + '</li>'; }).join('') + '</ol>' +
      '<form class="flow-form" novalidate data-key="' + key + '">' + F.s.map(function (s, i) {
        return '<section class="fstep" data-step="' + i + '"' + (i ? ' hidden' : '') + '><h3>' + esc(s[0]) + '</h3><div class="fgrid">' + s[1].map(function (f) { return field(f, key); }).join('') + '</div></section>';
      }).join('') + '<div class="form-nav"><button type="button" class="btn line" data-prev hidden>Kembali</button><span class="form-err" aria-live="polite"></span><button type="button" class="btn dark" data-next>' + (F.s.length > 1 ? 'Lanjut' : 'Kirim') + '</button></div></form>';
    openSheet(F.u, F.t, html);
    var form = $('.flow-form', sheet), cur = 0, n = F.s.length;
    wireSlots(form);
    $$('.file-in', form).forEach(function (inp) { inp.addEventListener('change', function () { var l = inp.previousElementSibling; if (l && inp.files[0]) l.querySelector('span').textContent = inp.files[0].name; }); });
    function go(i) {
      cur = i;
      $$('.fstep', form).forEach(function (s, j) { s.hidden = j !== i; });
      $$('.stepper li', sheet).forEach(function (li, j) { li.className = j < i ? 'done' : (j === i ? 'on' : ''); });
      $('[data-prev]', form).hidden = i === 0;
      $('[data-next]', form).textContent = i === n - 1 ? 'Kirim' : 'Lanjut';
      $('.sheet-b', sheet).scrollTop = 0;
    }
    function valid() {
      var step = $$('.fstep', form)[cur], ok = true, err = $('.form-err', form);
      $$('input,select,textarea', step).forEach(function (el) { if (!el.checkValidity()) ok = false; });
      var sv = $('.slot-val', step);
      if (sv && !sv.value) ok = false;
      err.textContent = ok ? '' : 'Lengkapi isian yang wajib terlebih dahulu.';
      if (!ok) { var bad = $$('input,select,textarea', step).filter(function (el) { return !el.checkValidity(); })[0]; if (bad) bad.reportValidity(); }
      return ok;
    }
    $('[data-prev]', form).addEventListener('click', function () { go(cur - 1); });
    $('[data-next]', form).addEventListener('click', function () {
      if (!valid()) return;
      if (cur < n - 1) return go(cur + 1);
      done(key);
    });
  }
  function done(key) {
    var F = FORMS[key];
    var d = new Date(), id = 'UNZ-' + String(d.getFullYear()).slice(2) + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2) + '-' + (1000 + Math.floor(Math.random() * 9000));
    var list = store.get('unizar-tickets', []);
    list.unshift({ id: id, key: key, t: F.t, u: F.u, at: d.toISOString() });
    store.set('unizar-tickets', list.slice(0, 30));
    openSheet(F.u, F.t, '<div class="success">' + ICON.check + '<h3>Permohonan terkirim</h3><p>Simpan nomor tiket ini untuk memantau prosesnya.</p>' +
      '<div class="ticket"><span>Nomor tiket</span><b>' + id + '</b><button type="button" class="btn line" data-copy="' + id + '">Salin</button></div></div>' +
      timeline(F.st, 1) + '<p class="sla">' + ICON.check + esc(F.sla) + '</p><div class="btn-row">' +
      (session ? '<a class="btn dark" href="#dasbor" data-close-sheet>Lihat di Dasbor</a>' : '<button type="button" class="btn dark" data-open="track:' + id + '">Lacak permohonan</button>') +
      '<button type="button" class="btn line" data-close-sheet>Selesai</button></div><p class="note" style="margin-top:14px">Mockup: data hanya tersimpan di perangkat ini. Pada sistem nyata, notifikasi dikirim ke email atau WhatsApp pemohon.</p>');
    renderDash();
  }
  function timeline(stages, cur) {
    return '<ol class="tline">' + stages.map(function (s, i) { return '<li class="' + (i < cur ? 'done' : (i === cur ? 'now' : '')) + '"><span></span><b>' + esc(s) + '</b>' + (i < cur ? '<small>Selesai</small>' : (i === cur ? '<small>Sedang diproses</small>' : '')) + '</li>'; }).join('') + '</ol>';
  }

  /* ---------- tracking ---------- */
  function openTrack(prefill) {
    openSheet('Layanan', 'Lacak permohonan', '<form class="track" novalidate><div class="field"><label for="trk">Nomor tiket</label><input id="trk" value="' + esc(prefill || '') + '" placeholder="UNZ-261110-1234" required></div><button class="btn dark" type="submit">Lacak</button></form><div class="track-res"></div>');
    var f = $('.track', sheet);
    function run() {
      var v = $('#trk', sheet).value.trim().toUpperCase(), res = $('.track-res', sheet);
      if (!v) return;
      var t = store.get('unizar-tickets', []).filter(function (x) { return x.id === v; })[0];
      if (!t) { res.innerHTML = '<p class="note">Tiket ' + esc(v) + ' tidak ditemukan di perangkat ini. Pada sistem nyata, status diambil dari server untuk semua tiket.</p>'; return; }
      var F = FORMS[t.key];
      res.innerHTML = '<div class="card flat" style="margin-top:14px"><span class="eyebrow">' + esc(t.u) + '</span><h3>' + esc(t.t) + '</h3><p>Diajukan ' + new Date(t.at).toLocaleString('id-ID') + '</p>' + timeline(F.st, 1) + '</div>';
    }
    f.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    if (prefill) run();
  }

  /* ---------- documents ---------- */
  function openDoc(id) {
    var d = DOCS[id]; if (!d) return toast('Dokumen belum tersedia.');
    if (d.acc === 'lock' && !session) return gate('Dokumen terbatas', d.t, null);
    var label = { pub: 'Publik', sum: 'Ringkasan publik', lock: 'Terbatas' }[d.acc];
    openSheet('Pusdatin · ' + label, d.t, '<div class="docview"><div class="paper"><img src="' + $('.seal img').getAttribute('src') + '" alt=""><b>' + esc(d.t) + '</b><i></i><i></i><i class="s"></i><i></i><i class="s"></i><small>Pratinjau dokumen</small></div>' +
      '<div><dl class="meta">' + [['Keterangan', d.m], ['Nomor', 'SK [nomor]'], ['Tanggal penetapan', '[tanggal]'], ['Versi', '[v]'], ['Status', 'Berlaku'], ['Akses', label]].map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>' +
      '<h4 style="margin:16px 0 6px">Riwayat versi</h4><ul class="clean vers"><li><b>[v terbaru]</b> Berlaku sejak [tanggal]</li><li><b>[v sebelumnya]</b> Diganti setelah evaluasi dan RTM</li></ul>' +
      '<div class="btn-row" style="margin-top:18px"><button type="button" class="btn dark" data-toast="Mockup: berkas PDF akan diunduh.">' + ICON.doc + ' Unduh PDF</button><button type="button" class="btn line" data-copy="' + esc(location.href.split('#')[0] + '#pusdatin') + '">Salin tautan</button></div>' +
      (d.acc === 'lock' ? '<p class="note" style="margin-top:12px">Dibuka oleh ' + esc(ROLES[session.role]) + '. Setiap unduhan dokumen terbatas tercatat dan diberi tanda air nama pengguna.</p>' : '') + '</div></div>', true);
  }

  /* ---------- external systems ---------- */
  function openExt(key, label) {
    var e = EXT[key] || [label || 'Website unit', 'Website resmi unit di lingkungan UNIZAR.', false];
    openSheet('Menuju sistem lain', e[0], '<div class="extview">' + ICON.ext + '<p>' + esc(e[1]) + '</p><div class="addr"><span>Alamat</span><b>[alamat diisi operator website]</b></div>' +
      (e[2] ? '<p class="note">Masuk otomatis memakai akun SSO UNIZAR.</p>' : '') + '<div class="btn-row"><button type="button" class="btn dark" data-toast="Mockup: halaman akan terbuka di tab baru setelah alamat diisi.">Buka di tab baru ' + ICON.ext + '</button><button type="button" class="btn line" data-close-sheet>Batal</button></div></div>');
  }

  /* ---------- details ---------- */
  function openDetail(key, override) {
    var d = DETAILS[key]; if (!d) return toast('Halaman detail belum tersedia.');
    if (override) { d = Object.assign({}, d, override); }
    var html = (d.cap ? '<div class="ph" data-cap="Foto: ' + esc(d.cap) + '" style="height:200px;margin-bottom:18px"></div>' : '') +
      (d.meta.length ? '<dl class="meta">' + d.meta.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>' : '') +
      d.p.map(function (p) { return '<p class="prose">' + esc(p) + '</p>'; }).join('') +
      d.lists.map(function (l) { return '<h4 style="margin:18px 0 6px">' + esc(l[0]) + '</h4><ul class="clean dlist">' + l[1].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }).join('') +
      (d.x === 'a11y' ? a11yHtml() : '') + (d.x === 'fee' ? feeHtml() : '') +
      (d.a.length ? '<div class="btn-row" style="margin-top:20px">' + d.a.map(function (a, i) { return a[1] === 'share' ? '<button type="button" class="btn line" data-copy="' + esc(location.href) + '">' + esc(a[0]) + '</button>' : (a[1].indexOf('toast:') === 0 ? '<button type="button" class="btn line" data-toast="' + esc(a[1].slice(6)) + '">' + esc(a[0]) + '</button>' : actionBtn(a[0], a[1], i === 0)); }).join('') + '</div>' : '');
    openSheet(d.k, d.t, html);
    if (d.x === 'a11y') wireA11y();
    if (d.x === 'fee') wireFee();
  }
  function a11yHtml() {
    return '<div class="a11y">' + [['big', 'Perbesar teks'], ['contrast', 'Kontras tinggi'], ['links', 'Garis bawahi semua tautan'], ['still', 'Hentikan animasi']].map(function (o) {
      return '<label class="consent"><input type="checkbox" data-a11y="' + o[0] + '"' + (document.documentElement.classList.contains('a11y-' + o[0]) ? ' checked' : '') + '><span>' + o[1] + '</span></label>';
    }).join('') + '</div>';
  }
  function wireA11y() { $$('[data-a11y]', sheet).forEach(function (c) { c.addEventListener('change', function () { document.documentElement.classList.toggle('a11y-' + c.getAttribute('data-a11y'), c.checked); store.set('unizar-a11y', $$('[data-a11y]', sheet).filter(function (x) { return x.checked; }).map(function (x) { return x.getAttribute('data-a11y'); })); }); }); }
  (store.get('unizar-a11y', []) || []).forEach(function (k) { document.documentElement.classList.add('a11y-' + k); });
  function feeHtml() {
    var prodi = REG.prodi;
    return '<div class="fee"><div class="field"><label for="fee-p">Program studi</label><select id="fee-p">' + prodi.map(function (p) { return '<option>' + esc(p) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="fee-j">Jalur masuk</label><select id="fee-j"><option>Reguler</option><option>Prestasi</option><option>KIP-Kuliah</option><option>RPL</option></select></div>' +
      '<table class="fee-t"><tbody><tr><td>Uang kuliah per semester</td><td>Rp [nominal]</td></tr><tr><td>Biaya pengembangan (sekali)</td><td>Rp [nominal]</td></tr><tr><td>Potongan jalur <span class="fee-jl">Reguler</span></td><td class="fee-pot">—</td></tr><tr class="tot"><td>Perkiraan semester pertama</td><td>Rp [nominal]</td></tr></tbody></table></div>';
  }
  function wireFee() {
    var j = $('#fee-j', sheet);
    j.addEventListener('change', function () { $('.fee-jl', sheet).textContent = j.value; $('.fee-pot', sheet).textContent = { Reguler: '—', Prestasi: 'Sesuai peringkat', 'KIP-Kuliah': 'Dibiayai penuh', RPL: 'Sesuai sks yang diakui' }[j.value]; });
  }

  /* ---------- dispatcher ---------- */
  function open(spec, el) {
    var i = spec.indexOf(':'), kind = spec.slice(0, i), key = spec.slice(i + 1);
    if (kind === 'form') openForm(key);
    else if (kind === 'doc') openDoc(key);
    else if (kind === 'ext') openExt(key, el && el.getAttribute('data-label'));
    else if (kind === 'detail') openDetail(key, el && el.getAttribute('data-title') ? { t: el.getAttribute('data-title') } : null);
    else if (kind === 'track') openTrack(key);
  }
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-copy]');
    if (c) { e.preventDefault(); var v = c.getAttribute('data-copy'); try { navigator.clipboard.writeText(v).then(function () { toast('Disalin: ' + v); }, function () { toast(v); }); } catch (x) { toast(v); } return; }
    var t = e.target.closest('[data-toast]');
    if (t) { e.preventDefault(); toast(t.getAttribute('data-toast')); return; }
    var w = e.target.closest('[data-web]');
    if (w) { e.preventDefault(); openExt('web', w.textContent.trim()); return; }
    var o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); open(o.getAttribute('data-open'), o); }
  });

  /* ---------- login ---------- */
  $$('form[data-login]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var sel = $('select[name=role]', f) || $('select', f), role = sel ? sel.value : f.getAttribute('data-login'), us = $('select[name=unit]', f);
      setSession(us && (role === 'unit' || role === 'dsn') ? { role: role, unit: us.value } : { role: role });
      toast('Berhasil masuk sebagai ' + rname() + ' (simulasi).');
      location.hash = 'dasbor';
    });
  });
  /* inline PkM form → ticket */
  $$('form[data-inline-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); if (!f.checkValidity()) { f.reportValidity(); return; } done(f.getAttribute('data-inline-form')); f.reset(); });
  });

  /* ---------- dashboard ---------- */
  var QUICK = {
    mhs: [['Surat aktif kuliah', 'form:surat-aktif'], ['Keringanan UKT', 'form:keringanan-ukt'], ['SIAKAD', 'ext:siakad'], ['E-learning', 'ext:elearning'], ['Janji konseling', 'form:konseling'], ['Pinjam ruang', 'form:peminjaman-ruang']],
    dsn: [['Usulkan potensi risiko', '#kinerja|risiko'], ['SIMPEG & jabatan akademik', 'ext:simpeg'], ['SIM-LPPM', 'ext:simlppm'], ['Ajukan HKI', 'form:hki-ajukan'], ['E-learning', 'ext:elearning'], ['Pinjam ruang', 'form:peminjaman-ruang'], ['Tiket helpdesk', 'form:helpdesk']],
    asesor: [['Peta Bukti BAN-PT', '#peta-bukti'], ['Dasbor kinerja & risiko', '#kinerja|renstra'], ['Pusdatin', '#pusdatin'], ['Dokumen mutu', '#penjaminan-mutu|dokumen'], ['Akreditasi prodi', '#penjaminan-mutu|akreditasi']],
    'op-kmhs': [['Unggah prestasi mahasiswa', 'form:unggah-prestasi'], ['SIMKATMAWA', 'ext:simkatmawa'], ['Rekap tracer study', 'ext:karier'], ['Pinjam ruang', 'form:peminjaman-ruang']],
    unit: [['Perbarui capaian IKU/IKT', '#kinerja|renstra'], ['IKU Kementerian (triwulan)', '#kinerja|kementerian'], ['Capaian SDGs', '#kinerja|sdgs'], ['Risk register unit saya', '#kinerja|risiko'], ['Pinjam ruang', 'form:peminjaman-ruang'], ['Tiket helpdesk', 'form:helpdesk']],
    renbang: [['Verifikasi capaian IKU/IKT', '#kinerja|renstra'], ['Laporan IKU Kementerian', '#kinerja|kementerian'], ['Rekap SDGs', '#kinerja|sdgs'], ['Kompilasi risk register', '#kinerja|risiko'], ['Peta Bukti BAN-PT', '#peta-bukti'], ['Pusdatin', '#pusdatin']],
    spi: [['Reviu risk register', '#kinerja|risiko'], ['Capaian IKU/IKT', '#kinerja|renstra'], ['Whistleblowing System', 'form:wbs'], ['Dokumen & audit', '#penjaminan-mutu|dokumen']],
    mutu: [['Dasbor kinerja & risiko', '#kinerja|renstra'], ['Peta Bukti (tampilan internal)', '#peta-bukti'], ['Dokumen & audit', '#penjaminan-mutu|dokumen'], ['Rekap survei kepuasan', 'form:survei-kepuasan'], ['Pusdatin', '#pusdatin']]
  };
  function renderDash() {
    var box = $('#dash'); if (!box) return;
    if (!session) { box.innerHTML = '<div class="gate">' + ICON.lock + '<p>Dasbor tersedia setelah Anda masuk.</p><a class="btn dark" href="#masuk">Masuk</a></div>'; return; }
    var tk = store.get('unizar-tickets', []);
    box.innerHTML = '<div class="dash-h"><div><span class="eyebrow">' + esc(rname()) + '</span><h2>Selamat datang kembali</h2><p class="muted">Ini simulasi dasbor sesuai peran. Data tersimpan hanya di perangkat ini.</p></div><button type="button" class="btn line dash-out">Keluar</button></div>' +
      '<h3 class="dash-t">Akses cepat</h3><div class="grid g3">' + QUICK[session.role].map(function (q) { return q[1].charAt(0) === '#' ? '<a class="card qk" href="#' + q[1].slice(1).split('|')[0] + '"' + (q[1].split('|')[1] ? ' data-sec="' + q[1].split('|')[1] + '"' : '') + '><b>' + esc(q[0]) + '</b><span class="more">Buka →</span></a>' : '<a class="card qk" href="#" data-open="' + q[1] + '"><b>' + esc(q[0]) + '</b><span class="more">Buka →</span></a>'; }).join('') + '</div>' +
      '<h3 class="dash-t">Permohonan saya</h3>' + (tk.length ? '<div class="tbl-wrap"><table><thead><tr><th>Nomor tiket</th><th>Layanan</th><th>Unit</th><th>Status</th><th></th></tr></thead><tbody>' + tk.map(function (t) {
        var F = FORMS[t.key]; return '<tr><td><b>' + t.id + '</b><span class="sub">' + new Date(t.at).toLocaleDateString('id-ID') + '</span></td><td>' + esc(t.t) + '</td><td>' + esc(t.u) + '</td><td><span class="st-up">' + esc(F.st[1]) + '</span></td><td><a href="#" data-open="track:' + t.id + '">Lacak →</a></td></tr>';
      }).join('') + '</tbody></table></div>' : '<div class="slim"><p>Belum ada permohonan. Ajukan layanan dari katalog Layanan.</p><a class="btn dark" href="#layanan">Buka katalog layanan</a></div>');
    var o = $('.dash-out', box); if (o) o.addEventListener('click', function () { setSession(null); location.hash = 'beranda'; });
  }

  paintSession();
})();
