/* ===== Dasbor Kinerja & Risiko: IKU/IKT Renstra, IKU Kementerian, SDGs, Risk Register ===== */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var dataEl = $('#kin-data'); if (!dataEl) return;
  var K = JSON.parse(dataEl.textContent);
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var toast = function (m) { if (window.unizarToast) window.unizarToast(m); };
  var SH = function () { return window.unizarSheet; };
  var BD = { R: 'Rektor', I: 'Wakil Rektor I', II: 'Wakil Rektor II', III: 'Wakil Rektor III', IV: 'Wakil Rektor IV', BPM: 'Badan Penjaminan Mutu', ETIK: 'Dewan Etik & Satgas PPKPT' };
  var UNIT = {}; K.units.forEach(function (u) { UNIT[u.k] = u; });
  var IND = {}; K.ind.forEach(function (i) { IND[i.id] = i; });
  K.km.forEach(function (r) { if (!r.link) IND[r.id] = { id: r.id, jenis: 'KM', n: 0, t: r.t, pj: 'Wakil Rektor IV (koordinator pelaporan)', bd: ['IV'], t26: r.tg, t27: r.tg, k: r.sat === '%' ? 'pct' : 'num', low: false, km: r }; });
  var USE = {}; // where each indicator appears
  K.km.forEach(function (r) { var id = r.link || r.id; (USE[id] = USE[id] || []).push('IKU Kementerian ' + r.kode); });
  K.sdg.forEach(function (r) { (USE[r.link] = USE[r.link] || []).push(r.sdg + ' · No. ' + r.n); });

  /* ---------------- state ---------------- */
  var KEY = 'unizar-kin-v1';
  var S = LS.get(KEY, null);
  function save() { LS.set(KEY, S); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return ((h >>> 0) % 1000) / 1000; }
  var FH = ['Data dari program studi belum lengkap terkumpul hingga akhir triwulan.', 'Anggaran kegiatan baru cair pada pertengahan triwulan.', 'Kegiatan dijadwalkan pada triwulan berikutnya sesuai kalender akademik.', 'Keterbatasan SDM pelaksana di unit terkait.', 'Sistem pendataan belum terintegrasi sehingga validasi memerlukan waktu.'];
  var TL = ['Percepatan pengumpulan data melalui surat edaran dan tenggat internal.', 'Penjadwalan ulang kegiatan dan penguatan koordinasi lintas unit.', 'Pendampingan teknis oleh biro terkait dan monitoring bulanan.', 'Pengusulan tambahan anggaran pada revisi RKT/RAB.', 'Integrasi data ke Pusdatin agar pemutakhiran lebih cepat.'];
  function demoEntries() {
    var e = {};
    K.ind.forEach(function (i) {
      var t = num(i.t26); if (t === null || t === 0 && i.t26 === '0') return;
      [1, 2, 3].forEach(function (q) {
        var h = hash(i.id), f = [0, 0.4 + h * 0.3, 0.6 + h * 0.35, 0.72 + h * 0.4][q], v;
        if (i.low) v = t * (1 + (1 - Math.min(f, 1)) * 0.6); else v = t * f;
        if (i.k === 'pct' && t === 100) v = Math.min(100, Math.round(v / 10) * 10 || 40);
        v = i.k === 'num' && Number.isInteger(t) && t >= 1 && !/IPK|rerata|rata-rata|sitasi|pengakuan|juta|tahun\)|bulan\)/i.test(i.t) ? Math.max(1, Math.round(v)) : Math.round(v * (t < 5 ? 100 : 10)) / (t < 5 ? 100 : 10);
        var sc = score(i.k === 'ratio' ? '1:' + t : String(t), String(v), i.low), x = { r: (i.k === 'ratio' ? '1:' : '') + v, by: 'Data contoh', at: Date.UTC(2026, q * 3, 5), v: q < 3 ? 'ok' : 'sub', demo: 1 };
        if (sc < 1) { x.fh = FH[Math.floor(h * 5)]; x.tl = TL[Math.floor(hash(i.id + 'x') * 5)]; }
        (e[i.id] = e[i.id] || {})['2026-' + q] = x;
      });
    });
    return e;
  }
  function applySeeds(e) {
    Object.keys(K.seed).forEach(function (id) {
      Object.keys(K.seed[id]).forEach(function (p) {
        var x = { r: K.seed[id][p], by: 'Template Arah Kinerja (laporan Kementerian)', at: Date.UTC(2026, +p.slice(5) * 3, 10), v: 'ok' };
        var n = K.seednote[id] && K.seednote[id][p]; if (n) x.cat = n;
        (e[id] = e[id] || {})[p] = x;
      });
      var last = Math.max.apply(null, Object.keys(K.seed[id]).map(function (k) { return +k.slice(5); })), base = num(K.seed[id]['2026-' + last]);
      for (var q = last + 1; q <= 3; q++) { var d = e[id]['2026-' + q]; if (d && d.demo && base !== null) { d.r = String(Number.isInteger(base) && base >= 1 ? base : Math.round(base * (1 + 0.02 * (q - last)) * 1000) / 1000); var sc = score(target(IND[id], '2026'), d.r, IND[id].low); if (sc >= 1) { delete d.fh; delete d.tl; } } }
    });
    return e;
  }
  function fresh(withDemo) {
    var e = applySeeds(withDemo ? demoEntries() : {});
    var risks = K.risks.map(function (r) { var c = JSON.parse(JSON.stringify(r)); c.hist = []; return c; });
    if (withDemo) {
      risks.forEach(function (r, i) {
        if (r.status === 'Dalam Proses') { r.tenggat = i % 3 === 0 ? '2026-10-31' : '2026-12-20'; r.catatan = 'Pemutakhiran TW III: tindakan berjalan sesuai rencana.'; r.upd = '2026-10-05'; }
        if (r.K * r.D >= 10 && !r.tenggat) r.tenggat = '2027-01-31';
      });
    }
    return { v: 1, demo: !!withDemo, e: e, risks: risks, sub: withDemo ? { 'RSB|2026-3': { st: 'diterima', at: Date.UTC(2026, 9, 6) }, 'BAK|2026-3': { st: 'diajukan', at: Date.UTC(2026, 9, 8) }, 'TI|2026-3': { st: 'revisi', at: Date.UTC(2026, 9, 9), note: 'Lengkapi tenggat untuk risiko Tinggi.' } } : {},
      usul: withDemo ? [{ id: 'U1', unit: 'PRODI', by: 'Dosen / tendik', at: Date.UTC(2026, 9, 20), kat: 'Akademik & Kemahasiswaan', risk: 'Jumlah dosen pembimbing tugas akhir tidak sebanding dengan mahasiswa tingkat akhir pada semester genap.', sebab: 'Beberapa dosen studi lanjut.', st: 'baru' }] : [],
      rep: { '2026-1': 'kirim', '2026-2': 'kirim', '2026-3': withDemo ? 'verif' : 'draf' }, lap: {}, rlog: [] };
  }
  if (!S || S.v !== 1) { S = fresh(true); save(); }

  /* ---------------- helpers ---------------- */
  function num(v) { if (v == null || v === '' || v === '-') return null; v = String(v).trim().replace('%', '').replace('≥', '').replace(',', '.'); if (v.indexOf('1:') === 0) v = v.slice(2); var n = parseFloat(v); return isNaN(n) ? null : n; }
  function score(t, r, low) {
    if (t == null || t === '' || t === '-') return null;
    if (num(t) === null) { if (r == null || r === '') return 0; return String(r).trim().toUpperCase() === String(t).trim().toUpperCase() ? 1 : 0; }
    var tt = num(t), rr = num(r); if (tt === 0) return null; if (rr === null) return 0;
    if (low) return rr <= 0 ? 1 : Math.min(tt / rr, 1);
    return Math.max(0, Math.min(rr / tt, 1));
  }
  function target(i, y) { return i.km ? i.km.tg : (+y === 2027 ? i.t27 : i.t26); }
  function entry(id, p) { return S.e[id] && S.e[id][p]; }
  function stat(i, p, tg) {
    var y = p.slice(0, 4), t = tg != null ? tg : target(i, y), x = entry(i.id, p);
    var s = score(t, x && x.r, i.low);
    if (s === null) return { s: null, k: 'na', l: 'Tidak ditargetkan' };
    if (!x || x.r === '' || x.r == null) return { s: 0, k: 'nil', l: 'Belum diisi' };
    if (s >= 1) return { s: s, k: 'ok', l: 'Tercapai' };
    if (s >= 0.75) return { s: s, k: 'near', l: 'Mendekati' };
    return { s: s, k: 'low', l: 'Belum tercapai' };
  }
  function pc(s) { return s == null ? '–' : (Math.round(s * 1000) / 10).toString().replace('.', ',') + '%'; }
  function fmt(v) { if (v == null || v === '') return '–'; var t = String(v).trim(); if (/^-?\d+(\.\d+)?$/.test(t)) { var d = (t.split('.')[1] || '').length; return (+t).toLocaleString('id-ID', { minimumFractionDigits: Math.min(d, 2), maximumFractionDigits: 2 }); } return t.replace('.', ','); }
  function bar(s, k) { return '<span class="pbar ' + (k || '') + '"><i style="width:' + (s == null ? 0 : Math.round(s * 100)) + '%"></i></span>'; }
  function chip(st) { return '<span class="kst ' + st.k + '">' + st.l + '</span>'; }
  function sess() { return LS.get('unizar-session', null); }
  function roleName() { var s = sess(); if (!s) return ''; return ({ unit: 'Operator ', renbang: 'Koordinator', spi: 'SPI', mutu: 'Tim mutu', dsn: 'Dosen/tendik', asesor: 'Asesor' }[s.role] || s.role) + (s.unit ? ' ' + s.unit : ''); }
  function myBd() { var s = sess(); if (!s) return []; if (s.role === 'renbang') return Object.keys(BD); if (s.role === 'unit') return K.ubd[s.unit] || []; return []; }
  function canEdit(i) { var b = myBd(); return i.bd.some(function (x) { return b.indexOf(x) > -1; }); }
  function isKoor() { var s = sess(); return !!s && s.role === 'renbang'; }
  var cur = { y: '2026', q: '3' };
  function per() { return cur.y + '-' + cur.q; }
  var TWN = ['', 'I', 'II', 'III', 'IV'];
  function perPick(id) {
    return '<div class="kin-per" role="group" aria-label="Periode"><label>Tahun <select data-kin-y>' + ['2026', '2027'].map(function (y) { return '<option' + (y === cur.y ? ' selected' : '') + '>' + y + '</option>'; }).join('') + '</select></label>' +
      '<div class="seg">' + [1, 2, 3, 4].map(function (q) { return '<button type="button" data-kin-q="' + q + '" aria-pressed="' + (String(q) === cur.q) + '">TW ' + TWN[q] + '</button>'; }).join('') + '</div></div>';
  }
  function demoNote() {
    return S.demo ? '<div class="kin-demo"><b>Data contoh.</b> Angka TW I–II IKU Kementerian berasal dari template yang dilampirkan; angka lain diisi otomatis untuk simulasi, bukan capaian resmi. <button type="button" class="linkbtn" data-kin-reset="0">Kosongkan semua data</button></div>'
      : '<div class="kin-demo"><b>Mode data bersih.</b> Hanya angka dari template Kementerian yang terisi. <button type="button" class="linkbtn" data-kin-reset="1">Isi data contoh</button></div>';
  }
  function whoNote(kind) {
    var s = sess();
    if (!s) return '<div class="kin-who">' + ICO.lock + '<span>Tampilan publik: ringkasan capaian. <a href="#masuk">Masuk</a> sebagai operator unit untuk memperbarui capaian, faktor penghambat, dan tindak lanjut.</span></div>';
    var b = myBd();
    if (!b.length) return '<div class="kin-who">' + ICO.user + '<span>Masuk sebagai <b>' + esc(roleName()) + '</b>: hanya dapat melihat. Pembaruan dilakukan oleh operator bidang penanggung jawab.</span></div>';
    return '<div class="kin-who ok">' + ICO.user + '<span>Masuk sebagai <b>' + esc(roleName()) + '</b>. Anda dapat memperbarui indikator bidang: ' + b.map(function (x) { return esc(BD[x]); }).join(', ') + '.</span></div>';
  }
  var ICO = {
    lock: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    user: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    dl: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    plus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    print: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M7 14h10v6H7z"/></svg>'
  };
  function kpis(list) { return '<div class="kpis">' + list.map(function (k) { return '<div class="kpi ' + (k[2] || '') + '"><b>' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('') + '</div>'; }

  /* ---------------- excel export (built-in minimal .xlsx writer, no external library) ---------------- */
  function H(a) { a._b = 1; return a; }
  var CRC = (function () { var t = [], c; for (var n = 0; n < 256; n++) { c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(b) { var c = 0xFFFFFFFF; for (var i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  function zip(files) {
    var enc = new TextEncoder(), parts = [], cd = [], off = 0;
    function u16(v) { return [v & 255, (v >>> 8) & 255]; } function u32(v) { return [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255]; }
    files.forEach(function (f) {
      var name = enc.encode(f.n), data = enc.encode(f.d), crc = crc32(data);
      var head = [].concat(u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(crc), u32(data.length), u32(data.length), u16(name.length), u16(0));
      parts.push(new Uint8Array(head), name, data);
      cd.push(new Uint8Array([].concat(u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(crc), u32(data.length), u32(data.length), u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(off))), name);
      off += head.length + name.length + data.length;
    });
    var cdl = cd.reduce(function (a, b) { return a + b.length; }, 0);
    return new Blob(parts.concat(cd, [new Uint8Array([].concat(u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(cdl), u32(off), u16(0)))]), { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }
  function xe(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ''); }
  function col(n) { var s = ''; n++; while (n) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
  function sheetXml(sh) {
    var x = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">';
    if (sh.w) x += '<cols>' + sh.w.map(function (w, i) { return '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + w + '" customWidth="1"/>'; }).join('') + '</cols>';
    x += '<sheetData>' + sh.rows.map(function (r, ri) {
      var st = ri === 0 ? 2 : r._b ? 1 : 3;
      return '<row r="' + (ri + 1) + '">' + r.map(function (v, ci) {
        if (v == null || v === '') return '';
        var ref = col(ci) + (ri + 1);
        if (typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v.trim()) && v.trim().length < 15) v = +v;
        if (typeof v === 'number' && isFinite(v)) return '<c r="' + ref + '" s="' + st + '"><v>' + v + '</v></c>';
        return '<c r="' + ref + '" t="inlineStr" s="' + st + '"><is><t xml:space="preserve">' + xe(v) + '</t></is></c>';
      }).join('') + '</row>';
    }).join('') + '</sheetData></worksheet>';
    return x;
  }
  function xlsx(sheets) {
    var ns = 'http://schemas.openxmlformats.org/', used = {};
    sheets.forEach(function (sh, i) { var n = sh.name.replace(/[\[\]\*\?\/\\:]/g, ' ').slice(0, 31); while (used[n]) n = n.slice(0, 28) + ' ' + (i + 1); used[n] = 1; sh.nm = n; });
    var files = [
      { n: '[Content_Types].xml', d: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="' + ns + 'package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' + sheets.map(function (s, i) { return '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'; }).join('') + '</Types>' },
      { n: '_rels/.rels', d: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="' + ns + 'package/2006/relationships"><Relationship Id="rId1" Type="' + ns + 'officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
      { n: 'xl/workbook.xml', d: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="' + ns + 'spreadsheetml/2006/main" xmlns:r="' + ns + 'officeDocument/2006/relationships"><sheets>' + sheets.map(function (s, i) { return '<sheet name="' + xe(s.nm) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>'; }).join('') + '</sheets></workbook>' },
      { n: 'xl/_rels/workbook.xml.rels', d: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="' + ns + 'package/2006/relationships">' + sheets.map(function (s, i) { return '<Relationship Id="rId' + (i + 1) + '" Type="' + ns + 'officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>'; }).join('') + '<Relationship Id="rId' + (sheets.length + 1) + '" Type="' + ns + 'officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>' },
      { n: 'xl/styles.xml', d: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="' + ns + 'spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="13"/><color rgb="FF064E3B"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF064E3B"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFDCE6E0"/></left><right style="thin"><color rgb="FFDCE6E0"/></right><top style="thin"><color rgb="FFDCE6E0"/></top><bottom style="thin"><color rgb="FFDCE6E0"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>' }
    ];
    sheets.forEach(function (s, i) { files.push({ n: 'xl/worksheets/sheet' + (i + 1) + '.xml', d: sheetXml(s) }); });
    return zip(files);
  }
  var DLP = null;
  function getDL() { if (!DLP) DLP = window.claude.use('downloads').then(function (d) { return d; }, function () { return null; }); return DLP; }
  setTimeout(function () { if (window.claude && window.claude.use) getDL(); }, 0);
  function download(name, sheets) {
    var blob;
    try { blob = xlsx(sheets); } catch (e) { toast('Gagal menyiapkan berkas: ' + e.message); return; }
    if (window.claude && window.claude.use) {
      toast('Menyiapkan unduhan …');
      getDL().then(function (d) {
        if (!d) { toast('Unduhan tidak tersedia di tampilan ini.'); return; }
        d.save({ filename: name, data: blob }).then(function () { toast('Berkas ' + name + ' disimpan.'); }, function (e) {
          toast(e && e.code === 'declined' ? 'Unduhan dibatalkan.' : e && e.code === 'rate_limited' ? 'Tunggu sebentar, lalu coba lagi.' : 'Unduhan tidak tersedia di tampilan ini.');
        });
      });
      return;
    }
    try {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
      toast('Berkas ' + name + ' diunduh.');
    } catch (e) { toast('Gagal menyiapkan berkas: ' + e.message); }
  }
  function stamp() { var d = new Date(); return d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2); }

  /* =========================================================
     1. RENSTRA IKU / IKT
     ========================================================= */
  var fR = { j: 'all', b: 'all', s: 'all', q: '', mine: !!(LS.get('unizar-session', null) || {}).unit && (LS.get('unizar-session', null) || {}).role === 'unit' };
  function renstraRows() {
    var p = per(), my = myBd();
    return K.ind.filter(function (i) {
      if (fR.j !== 'all' && i.jenis !== fR.j) return false;
      if (fR.b !== 'all' && i.bd.indexOf(fR.b) < 0) return false;
      if (fR.mine && !i.bd.some(function (x) { return my.indexOf(x) > -1; })) return false;
      if (fR.q && (i.id + ' ' + i.t + ' ' + i.pj).toLowerCase().indexOf(fR.q.toLowerCase()) < 0) return false;
      if (fR.s !== 'all' && stat(i, p).k !== fR.s) return false;
      return true;
    });
  }
  function agg(list, p) {
    var a = { n: 0, ok: 0, near: 0, low: 0, nil: 0, na: 0, sum: 0, m: 0 };
    list.forEach(function (i) { var st = stat(i, p); a.n++; a[st.k]++; if (st.s !== null) { a.sum += st.s; a.m++; } });
    a.avg = a.m ? a.sum / a.m : null; return a;
  }
  function renderRenstra(box) {
    var p = per(), a = agg(K.ind, p), my = myBd();
    var grpBars = function (j) {
      return K.groups.filter(function (g) { return g.id.indexOf(j) === 0; }).map(function (g) {
        var g1 = agg(K.ind.filter(function (i) { return i.g === g.id; }), p);
        return '<button type="button" class="hrow" data-kin-grp="' + g.id + '"><span class="hl"><b>' + g.id + '</b>' + esc(g.s.replace('Tercapainya ', '')) + '</span>' + bar(g1.avg) + '<span class="hv">' + pc(g1.avg) + '</span></button>';
      }).join('');
    };
    box.innerHTML = '<div class="kin-top">' + perPick() + '<div class="kin-act"><button type="button" class="btn dark sm" data-kin-dl="renstra">' + ICO.dl + ' Unduh Excel (akhir tahun)</button></div></div>' +
      whoNote() + demoNote() +
      kpis([[a.n, 'indikator (120 IKU · 71 IKT)'], [a.ok, 'tercapai', 'ok'], [a.near, 'mendekati target', 'near'], [a.low, 'belum tercapai', 'low'], [a.nil, 'belum diisi', 'nil'], [pc(a.avg), 'rerata ketercapaian TW ' + TWN[cur.q]]]) +
      '<div class="kin-2"><div class="kin-card"><h4>IKU per sasaran strategis</h4>' + grpBars('IKU') + '</div><div class="kin-card"><h4>IKT per sasaran strategis</h4>' + grpBars('IKT') + '</div></div>' +
      '<div class="kin-filter"><div class="seg" role="group" aria-label="Jenis">' + [['all', 'Semua'], ['IKU', 'IKU'], ['IKT', 'IKT']].map(function (x) { return '<button type="button" data-fr-j="' + x[0] + '" aria-pressed="' + (fR.j === x[0]) + '">' + x[1] + '</button>'; }).join('') + '</div>' +
      '<label>Bidang <select data-fr-b><option value="all">Semua bidang</option>' + Object.keys(BD).map(function (b) { return '<option value="' + b + '"' + (fR.b === b ? ' selected' : '') + '>' + BD[b] + '</option>'; }).join('') + '</select></label>' +
      '<label>Status <select data-fr-s>' + [['all', 'Semua status'], ['ok', 'Tercapai'], ['near', 'Mendekati'], ['low', 'Belum tercapai'], ['nil', 'Belum diisi'], ['na', 'Tidak ditargetkan']].map(function (x) { return '<option value="' + x[0] + '"' + (fR.s === x[0] ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>' +
      '<label class="grow">Cari <input data-fr-q type="search" value="' + esc(fR.q) + '" placeholder="nomor atau kata kunci, mis. IPK, tracer, SDG"></label>' +
      (my.length ? '<label class="chk"><input type="checkbox" data-fr-mine' + (fR.mine ? ' checked' : '') + '> Tugas bidang saya</label>' : '') + '</div>' +
      '<div class="kin-list" data-kin-list></div>';
    renderRenstraList(box);
  }
  function renderRenstraList(box) {
    var p = per(), rows = renstraRows(), list = $('[data-kin-list]', box), can = myBd().length;
    if (!rows.length) { list.innerHTML = '<p class="muted">Tidak ada indikator yang cocok dengan saringan.</p>'; return; }
    var html = '<p class="kin-count">Menampilkan <b>' + rows.length + '</b> indikator · periode TW ' + TWN[cur.q] + ' ' + cur.y + ' (capaian kumulatif)</p>';
    K.groups.forEach(function (g) {
      var gr = rows.filter(function (i) { return i.g === g.id; }); if (!gr.length) return;
      var ga = agg(gr, p);
      html += '<details class="kgrp" id="kg-' + g.id.replace(' ', '') + '"' + (rows.length < 60 || fR.mine ? ' open' : '') + '><summary><span class="kg-id">' + g.id + '</span><span class="kg-t">' + esc(g.s) + (g.p ? '<small>' + esc(g.p) + '</small>' : '') + '</span><span class="kg-m">' + bar(ga.avg) + '<b>' + pc(ga.avg) + '</b><small>' + ga.ok + '/' + ga.n + ' tercapai</small></span></summary>' +
        '<div class="tbl-wrap"><table class="ktbl"><thead><tr><th>No</th><th>Indikator & penanggung jawab</th><th>Target ' + cur.y + '</th><th>Realisasi</th><th>Ketercapaian</th><th>Status</th><th></th></tr></thead><tbody>' +
        gr.map(function (i) {
          var st = stat(i, p), x = entry(i.id, p), ed = canEdit(i);
          return '<tr><td class="kno">' + i.jenis + ' ' + i.n + '<small title="' + esc(K.src[i.src]) + '">' + i.src + '</small></td><td><span class="kt">' + esc(i.t) + '</span><span class="sub">' + esc(i.pj) + (x && x.fh && st.k !== 'ok' && sess() ? ' · <em>ada faktor penghambat</em>' : '') + '</span></td><td>' + fmt(target(i, cur.y)) + '</td><td>' + fmt(x && x.r) + (x && x.v === 'sub' ? '<span class="sub">menunggu verifikasi</span>' : x && x.v === 'rev' ? '<span class="sub warn">perlu revisi</span>' : '') + '</td><td class="kbar">' + bar(st.s, st.k) + '<small>' + pc(st.s) + '</small></td><td>' + chip(st) + '</td><td><button type="button" class="btn ' + (ed ? 'dark' : 'line') + ' xs" data-kin-edit="' + i.id + '">' + (ed ? 'Perbarui' : 'Detail') + '</button></td></tr>';
        }).join('') + '</tbody></table></div></details>';
    });
    if (!can && sess() === null) html += '<p class="note">Faktor penghambat dan tindak lanjut hanya tampil bagi pengguna internal yang masuk.</p>';
    list.innerHTML = html;
  }
  function dlRenstra() {
    var y = cur.y, hdr = ['Jenis', 'No', 'Sumber', 'Sasaran strategis', 'Indikator', 'Penanggung jawab', 'Target ' + y];
    [1, 2, 3, 4].forEach(function (q) { hdr.push('Realisasi TW ' + TWN[q], '% TW ' + TWN[q]); });
    hdr.push('Status akhir (TW terakhir terisi)', 'Faktor penghambat', 'Tindak lanjut', 'PIC tindak lanjut', 'Bukti dukung', 'Diperbarui oleh', 'Status verifikasi');
    var rows = [['REKAP KETERCAPAIAN IKU & IKT RENSTRA UNIZAR TAHUN ' + y], ['SK Rektor No. 076B/SK/REK/UNIZAR-012/III/2026 · diunduh ' + new Date().toLocaleString('id-ID')], [], H(hdr)];
    K.ind.forEach(function (i) {
      var g = K.groups.filter(function (x) { return x.id === i.g; })[0], r = [i.jenis, i.n, i.src, g.id + ' ' + g.s, i.t, i.pj, target(i, y)], last = null;
      [1, 2, 3, 4].forEach(function (q) { var p = y + '-' + q, x = entry(i.id, p), st = stat(i, p); r.push(x ? x.r : '', st.s == null ? '' : Math.round(st.s * 1000) / 10); if (x && x.r !== '') last = { x: x, st: st, q: q }; });
      r.push(last ? last.st.l + ' (TW ' + TWN[last.q] + ')' : 'Belum diisi', last ? last.x.fh || '' : '', last ? last.x.tl || '' : '', last ? last.x.pic || '' : '', last ? last.x.bk || '' : '', last ? (last.x.by || '') : '', last ? ({ ok: 'Terverifikasi', sub: 'Diajukan', rev: 'Perlu revisi' }[last.x.v] || '') : '');
      rows.push(r);
    });
    var res = [['RESUME PER SASARAN STRATEGIS · TW ' + TWN[cur.q] + ' ' + y], [], H(['Kode', 'Sasaran strategis', 'Jumlah indikator', 'Tercapai', 'Mendekati', 'Belum tercapai', 'Belum diisi', 'Rerata % ketercapaian'])];
    K.groups.forEach(function (g) { var a = agg(K.ind.filter(function (i) { return i.g === g.id; }), per()); res.push([g.id, g.s, a.n, a.ok, a.near, a.low, a.nil, a.avg == null ? '' : Math.round(a.avg * 1000) / 10]); });
    var a = agg(K.ind, per()); res.push(['TOTAL', '', a.n, a.ok, a.near, a.low, a.nil, a.avg == null ? '' : Math.round(a.avg * 1000) / 10]);
    download('Capaian_IKU_IKT_Renstra_UNIZAR_' + y + '_' + stamp() + '.xlsx', [{ name: 'IKU & IKT ' + y, rows: rows, w: [6, 5, 6, 40, 60, 28, 10, 10, 7, 10, 7, 10, 7, 10, 7, 22, 40, 40, 20, 30, 24, 16] }, { name: 'Resume', rows: res, w: [8, 70, 10, 10, 10, 12, 10, 14] }]);
  }

  /* ---------------- entry sheet (shared by Renstra, Kementerian, SDGs) ---------------- */
  function openEntry(id, ctx) {
    var i = IND[id]; if (!i) return;
    var y = cur.y, p = per(), ed = canEdit(i), x = entry(id, p) || {}, t = ctx && ctx.tg != null ? ctx.tg : target(i, y), s = sess();
    var hist = '<table class="ktbl mini"><thead><tr><th>Periode ' + y + '</th><th>Realisasi</th><th>Ketercapaian</th><th>Status</th></tr></thead><tbody>' + [1, 2, 3, 4].map(function (q) {
      var pp = y + '-' + q, xx = entry(id, pp), st = stat(i, pp, ctx && ctx.tg);
      return '<tr' + (String(q) === cur.q ? ' class="cur"' : '') + '><td>TW ' + TWN[q] + '</td><td>' + fmt(xx && xx.r) + '</td><td>' + pc(xx ? st.s : null) + '</td><td>' + chip(st) + '</td></tr>';
    }).join('') + '</tbody></table>';
    var uses = (USE[id] || []);
    var info = '<p class="kin-ind">' + esc(i.t) + '</p><dl class="meta"><dt>Penanggung jawab</dt><dd>' + esc(i.pj) + '</dd><dt>Target ' + y + '</dt><dd>' + fmt(t) + (i.low ? ' <small>(makin kecil makin baik)</small>' : '') + '</dd>' + (i.src ? '<dt>Sumber indikator</dt><dd>' + esc(K.src[i.src]) + '</dd>' : '') +
      (uses.length ? '<dt>Dipakai juga di</dt><dd>' + uses.map(function (u) { return '<span class="pill">' + esc(u) + '</span>'; }).join(' ') + '<small class="muted" style="display:block;margin-top:4px">Isi sekali; angka otomatis tampil di semua laporan tersebut.</small></dd>' : '') + '</dl>' + hist;
    var ver = x.r != null && x.r !== '' ? '<p class="kin-ver ' + (x.v || '') + '">' + ({ ok: 'Terverifikasi koordinator', sub: 'Diajukan · menunggu verifikasi koordinator', rev: 'Perlu revisi: ' + esc(x.vn || '') }[x.v] || '') + (x.by ? ' · diisi oleh ' + esc(x.by) : '') + (x.at ? ' · ' + new Date(x.at).toLocaleDateString('id-ID') : '') + '</p>' : '';
    var body;
    if (!ed) {
      body = info + '<h3 class="dash-t">TW ' + TWN[cur.q] + ' ' + y + '</h3>' + ver + (s ? '<dl class="meta"><dt>Faktor penghambat</dt><dd>' + esc(x.fh || '–') + '</dd><dt>Tindak lanjut</dt><dd>' + esc(x.tl || '–') + '</dd><dt>Catatan</dt><dd>' + esc(x.cat || '–') + '</dd><dt>Bukti dukung</dt><dd>' + esc(x.bk || '–') + '</dd></dl>' : '') +
        (isKoor() && x.v === 'sub' ? verBtns(id) : '') +
        '<p class="note">' + (s ? 'Akun Anda tidak termasuk bidang penanggung jawab indikator ini.' : 'Masuk sebagai operator bidang terkait untuk memperbarui capaian.') + '</p>';
    } else {
      body = info + '<form class="kin-form" novalidate><h3 class="dash-t">Perbarui capaian TW ' + TWN[cur.q] + ' ' + y + '</h3>' + ver +
        '<div class="fgrid"><div class="field"><label for="ke-r">Realisasi kumulatif s.d. TW ' + TWN[cur.q] + '</label><input id="ke-r" name="r" value="' + esc(x.r || '') + '" required placeholder="' + (i.k === 'pct' ? 'dalam persen, mis. 82,5' : i.k === 'ratio' ? 'format 1:x, mis. 1:3' : num(t) === null ? 'mis. ' + t : 'angka') + '" inputmode="' + (num(t) === null || i.k === 'ratio' ? 'text' : 'decimal') + '"><small class="hint" data-live></small></div>' +
        '<div class="field"><label for="ke-bk">Bukti dukung (tautan dokumen)</label><input id="ke-bk" name="bk" value="' + esc(x.bk || '') + '" placeholder="https://… atau nomor dokumen"></div>' +
        '<div class="field full"><label for="ke-file">Unggah berkas bukti <span class="opt">(opsional)</span></label><input id="ke-file" type="file" accept=".pdf,.xlsx,.docx,.jpg,.png"></div>' +
        '<div class="field full" data-need><label for="ke-fh">Faktor penghambat</label><textarea id="ke-fh" name="fh" rows="3" placeholder="Apa yang membuat target belum tercapai?">' + esc(x.fh || '') + '</textarea></div>' +
        '<div class="field full" data-need><label for="ke-tl">Rencana tindak lanjut</label><textarea id="ke-tl" name="tl" rows="3" placeholder="Langkah perbaikan, siapa, kapan">' + esc(x.tl || '') + '</textarea></div>' +
        '<div class="field" data-need><label for="ke-pic">PIC tindak lanjut</label><input id="ke-pic" name="pic" value="' + esc(x.pic || '') + '" placeholder="Jabatan/unit"></div>' +
        '<div class="field" data-need><label for="ke-tw">Target selesai</label><select id="ke-tw" name="tw">' + ['', 'TW I', 'TW II', 'TW III', 'TW IV', 'Tahun berikutnya'].map(function (o) { return '<option' + (x.tw === o ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select></div>' +
        '<div class="field full"><label for="ke-cat">Catatan / keterangan <span class="opt">(opsional)</span></label><textarea id="ke-cat" name="cat" rows="2">' + esc(x.cat || '') + '</textarea></div></div>' +
        '<div class="form-nav"><span class="form-err" aria-live="polite"></span><button type="submit" class="btn dark">Simpan & ajukan verifikasi</button></div></form>' + (isKoor() && x.v === 'sub' ? verBtns(id) : '');
    }
    SH().open(i.jenis === 'KM' ? 'IKU Kementerian · ' + i.km.kode : i.jenis + ' ' + i.n + ' · ' + i.pj.split(' dan ')[0], ctx && ctx.title || 'Capaian indikator', body, true);
    var f = $('.sheet .kin-form'); if (!f) return wireVer();
    var live = function () {
      var r = f.r.value, sc = score(t, r, i.low), need = r !== '' && sc !== null && sc < 1;
      $('[data-live]', f).innerHTML = r === '' ? '' : sc === null ? 'Tidak ditargetkan pada periode ini' : 'Ketercapaian ' + pc(sc) + ' · ' + (sc >= 1 ? 'Tercapai' : sc >= 0.75 ? 'Mendekati target' : 'Belum tercapai');
      $$('[data-need]', f).forEach(function (el) { el.classList.toggle('req', need); el.style.display = r === '' || need || el.querySelector('textarea,input,select').value ? '' : 'none'; });
      return need;
    };
    f.r.addEventListener('input', live); live();
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var need = live(), err = $('.form-err', f);
      if (!f.r.value.trim()) { err.textContent = 'Isi realisasi terlebih dahulu.'; f.r.focus(); return; }
      if (need && (!f.fh.value.trim() || !f.tl.value.trim())) { err.textContent = 'Target belum tercapai: faktor penghambat dan tindak lanjut wajib diisi.'; (f.fh.value.trim() ? f.tl : f.fh).focus(); return; }
      var fl = $('#ke-file', f).files[0];
      (S.e[id] = S.e[id] || {})[p] = { r: f.r.value.trim(), bk: f.bk.value.trim() || (fl ? fl.name : x.bk || ''), fh: need ? f.fh.value.trim() : '', tl: need ? f.tl.value.trim() : '', pic: need ? f.pic.value.trim() : '', tw: need ? f.tw.value : '', cat: f.cat.value.trim(), by: roleName(), at: Date.now(), v: isKoor() ? 'ok' : 'sub' };
      save(); SH().close(); toast(isKoor() ? 'Capaian disimpan dan langsung terverifikasi.' : 'Capaian disimpan dan diajukan ke koordinator untuk verifikasi.'); renderAll();
    });
    wireVer();
    function wireVer() {
      var b = $('.sheet [data-ver]'); if (!b) return;
      $$('.sheet [data-ver]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var xx = entry(id, p); if (!xx) return;
          if (btn.getAttribute('data-ver') === 'ok') { xx.v = 'ok'; xx.vn = ''; toast('Capaian diverifikasi.'); }
          else { var n = $('.sheet [data-ver-note]'); if (!n.value.trim()) { n.focus(); n.placeholder = 'Tulis catatan revisi dulu'; return; } xx.v = 'rev'; xx.vn = n.value.trim(); toast('Dikembalikan ke unit untuk revisi.'); }
          save(); SH().close(); renderAll();
        });
      });
    }
  }
  function verBtns() { return '<div class="kin-vbox"><h3 class="dash-t">Verifikasi koordinator</h3><textarea data-ver-note rows="2" placeholder="Catatan (wajib bila minta revisi)"></textarea><div class="btn-row"><button type="button" class="btn dark" data-ver="ok">Verifikasi</button><button type="button" class="btn line" data-ver="rev">Minta revisi</button></div></div>'; }

  /* =========================================================
     2. IKU KEMENTERIAN (triwulanan)
     ========================================================= */
  var REPST = [['draf', 'Draf unit'], ['verif', 'Diverifikasi koordinator'], ['sah', 'Disahkan Rektor'], ['kirim', 'Terkirim ke Kementerian']];
  function kmVal(r, p) { var id = r.link || r.id, x = entry(id, p); return x ? x.r : ''; }
  function kmStat(r, p) { return stat(IND[r.link || r.id], p, r.tg); }
  function renderKM(box) {
    var y = cur.y, p = per();
    var active = K.km.filter(function (r) { return r.tg !== '-' && (r.pick || r.grp !== 'Pilihan' || r.id === 'KM-11a'); });
    var a = { ok: 0, near: 0, low: 0, nil: 0, n: 0 }; active.forEach(function (r) { var st = kmStat(r, p); a.n++; if (a[st.k] != null) a[st.k]++; });
    var steps = '<div class="km-steps">' + [1, 2, 3, 4].map(function (q) {
      var k = S.rep[y + '-' + q] || 'draf', ix = REPST.map(function (x) { return x[0]; }).indexOf(k);
      return '<div class="km-step s' + ix + (String(q) === cur.q ? ' cur' : '') + '"><b>TW ' + TWN[q] + ' ' + y + '</b><span>' + REPST[ix][1] + '</span><i style="width:' + ((ix + 1) * 25) + '%"></i></div>';
    }).join('') + '</div>';
    var stNow = S.rep[p] || 'draf', ixNow = REPST.map(function (x) { return x[0]; }).indexOf(stNow);
    var adv = isKoor() && ixNow < 3 ? '<button type="button" class="btn pri sm" data-km-adv>' + ['Verifikasi laporan TW ' + TWN[cur.q], 'Tandai disahkan Rektor', 'Tandai terkirim ke Kementerian'][ixNow] + '</button>' : '';
    var sec = function (grp, title, note) {
      var rows = K.km.filter(function (r) { return r.grp === grp; });
      return '<h3 class="km-h">' + title + '</h3>' + (note ? '<p class="muted" style="margin:-4px 0 10px">' + note + '</p>' : '') + '<div class="tbl-wrap"><table class="ktbl km"><thead><tr><th>Kode</th><th>Indikator</th><th>Satuan</th><th>Target ' + y + '</th>' + [1, 2, 3, 4].map(function (q) { return '<th class="' + (String(q) === cur.q ? 'cur' : '') + '">TW ' + TWN[q] + '</th>'; }).join('') + '<th>Status TW ' + TWN[cur.q] + '</th><th></th></tr></thead><tbody>' +
        rows.map(function (r) {
          var off = r.tg === '-' || (grp === 'Pilihan' && !r.pick && r.id !== 'KM-11a'), st = kmStat(r, p), i = IND[r.link || r.id];
          return '<tr class="' + (off ? 'off' : '') + '"><td class="kno">' + (grp === 'Pilihan' ? (r.pick ? '<span class="tick" title="IKU pilihan dipilih">✓</span> ' : '') : '') + esc(r.kode) + '</td><td><span class="kt">' + esc(r.t) + '</span>' + (r.link ? '<span class="sub link">↔ ' + r.link.replace('-', ' ') + ' Renstra</span>' : '') + (r.cat ? '<span class="sub">' + esc(r.cat) + '</span>' : '') + '</td><td>' + esc(r.sat) + '</td><td>' + (off ? '–' : fmt(r.tg)) + '</td>' +
            [1, 2, 3, 4].map(function (q) { return '<td class="' + (String(q) === cur.q ? 'cur' : '') + '">' + (off ? '–' : fmt(kmVal(r, y + '-' + q))) + '</td>'; }).join('') +
            '<td>' + (off ? '<span class="kst na">' + (r.tg === '-' ? 'Tidak berlaku' : 'Tidak dipilih') + '</span>' : chip(st)) + '</td><td>' + (off ? '' : '<button type="button" class="btn ' + (canEdit(i) ? 'dark' : 'line') + ' xs" data-km-edit="' + r.id + '">' + (canEdit(i) ? 'Isi' : 'Detail') + '</button>') + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    };
    box.innerHTML = '<div class="kin-top">' + perPick() + '<div class="kin-act">' + adv + '<button type="button" class="btn dark sm" data-kin-dl="km">' + ICO.dl + ' Unduh format Kementerian</button></div></div>' + whoNote() +
      '<div class="km-lead"><p>Format <b>Arah Kinerja PTS 2026</b> (Kepmendiktisaintek 358/M/KEP/2026). Capaian diisi <b>kumulatif</b> sampai akhir triwulan. Baris bertanda ↔ terhubung ke IKU/IKT Renstra, jadi cukup diisi sekali di salah satu dasbor.</p></div>' + steps +
      kpis([[a.n, 'IKU aktif dilaporkan'], [a.ok, 'tercapai', 'ok'], [a.near, 'mendekati', 'near'], [a.low, 'belum tercapai', 'low'], [a.nil, 'belum diisi', 'nil']]) +
      sec('Wajib', 'Indikator Kinerja Utama Wajib') + sec('Pilihan', 'Indikator Kinerja Utama Pilihan', 'Centang ✓ menandai IKU pilihan yang dipilih UNIZAR.') + sec('Partisipatif', 'Indikator Kinerja Utama Partisipatif');
  }
  function dlKM() {
    var y = cur.y, out = [];
    [1, 2, 3, 4].forEach(function (Q) {
      var rows = [['Arah Kinerja Tahun ' + y], ['Universitas Islam Al-Azhar'], []];
      var head = function (g) { var h = ['No.', 'Sasaran Program', '✓', g, '', 'Satuan', 'Target']; for (var q = 1; q <= Q; q++) h.push('Capaian PT (TW' + q + ')'); h.push('Keterangan/Catatan (Baseline/Target IKU)'); return H(h); };
      [['Wajib', 'Indikator Kinerja Utama Wajib'], ['Pilihan', 'Indikator Kinerja Utama Pilihan*'], ['Partisipatif', 'Indikator Kinerja Utama Partisipatif']].forEach(function (g) {
        rows.push(head(g[1])); var lastSp = '';
        K.km.filter(function (r) { return r.grp === g[0]; }).forEach(function (r) {
          var x = entry(r.link || r.id, y + '-' + Q) || {}, row = ['', r.sp !== lastSp ? r.sp : '', r.pick && g[0] === 'Pilihan' ? '✓' : '', r.kode, r.t, r.sat, r.tg];
          lastSp = r.sp;
          for (var q = 1; q <= Q; q++) { var v = kmVal(r, y + '-' + q); row.push(r.tg === '-' ? '-' : v === '' ? '' : (isNaN(num(v)) ? v : num(v))); }
          row.push([x.cat, x.fh ? 'Penghambat: ' + x.fh : '', x.tl ? 'Tindak lanjut: ' + x.tl : '', x.bk ? 'Bukti: ' + x.bk : ''].filter(Boolean).join(' | '));
          rows.push(row);
        });
        rows.push([]);
      });
      rows.push(['', 'Keterangan:'], ['', '(*) Indikator diisi apabila memiliki jenis studi tersebut pada PT.'], ['', 'Capaian TW bersifat kumulatif sampai akhir triwulan.'], ['', 'Status laporan: ' + REPST.filter(function (s) { return s[0] === (S.rep[y + '-' + Q] || 'draf'); })[0][1]]);
      out.push({ name: y + ' TW ' + Q, rows: rows, w: [5, 22, 3, 14, 60, 9, 9, 11, 11, 11, 11, 60] });
    });
    download('Arah_Kinerja_PTS_' + y + '_UNIZAR_' + stamp() + '.xlsx', out);
  }

  /* =========================================================
     3. SDGs
     ========================================================= */
  var fS = 'all';
  function sdgStat(r, p) { return stat(IND[r.link], p); }
  function renderSDG(box) {
    var p = per(), groups = Object.keys(K.sdgmeta);
    var all = { n: 0, full: 0, sum: 0 };
    var tiles = groups.map(function (g) {
      var rows = K.sdg.filter(function (r) { return r.sdg === g; }), n = 0, full = 0, sum = 0;
      rows.forEach(function (r) { var st = sdgStat(r, p); n++; sum += st.s || 0; if (st.s >= 1) full++; });
      all.n += n; all.full += full; all.sum += sum;
      var m = K.sdgmeta[g], avg = n ? sum / n : 0;
      return '<button type="button" class="sdg-t" style="--c:' + m[2] + '" data-sdg="' + g + '" aria-pressed="' + (fS === g) + '"><span class="sdg-n">' + g.replace('SDG ', '') + '</span><span class="sdg-x"><b>' + esc(m[0]) + '</b><small>' + n + ' implementasi · ' + full + ' tercapai 100%</small></span><span class="sdg-p">' + pc(avg) + '</span>' + bar(avg) + '</button>';
    }).join('');
    var tot = all.n ? all.sum / all.n : 0;
    var rows = K.sdg.filter(function (r) { return fS === 'all' || r.sdg === fS; });
    box.innerHTML = '<div class="kin-top">' + perPick() + '<div class="kin-act"><button type="button" class="btn dark sm" data-kin-dl="sdg">' + ICO.dl + ' Unduh rekap SDGs</button></div></div>' + whoNote() +
      '<div class="sdg-hero"><div><span class="eyebrow">Ketercapaian implementasi SDGs · TW ' + TWN[cur.q] + ' ' + cur.y + '</span><b class="big">' + pc(tot) + '</b><p>Rerata dari ' + all.n + ' implementasi sesuai Lampiran Keputusan Rektor tentang Implementasi SDGs. ' + all.full + ' implementasi tercapai 100%. Hasil ini menjadi bukti IKU 118 Renstra dan IKU 7 Kementerian.</p></div>' + bar(tot) + '</div>' +
      '<div class="sdg-grid">' + tiles + '</div>' +
      '<div class="kin-filter"><span class="muted">' + (fS === 'all' ? 'Semua SDG' : esc(fS + ' ' + K.sdgmeta[fS][0])) + ' · ' + rows.length + ' implementasi</span>' + (fS !== 'all' ? '<button type="button" class="linkbtn" data-sdg="all">Tampilkan semua</button>' : '') + '</div>' +
      '<div class="tbl-wrap"><table class="ktbl"><thead><tr><th>No</th><th>Implementasi</th><th>Sumber</th><th>Target</th><th>Realisasi</th><th>% Ketercapaian</th><th></th></tr></thead><tbody>' +
      rows.map(function (r) {
        var i = IND[r.link], st = sdgStat(r, p), x = entry(r.link, p);
        return '<tr><td class="kno"><span class="sdg-dot" style="background:' + K.sdgmeta[r.sdg][2] + '"></span>' + r.n + '</td><td><span class="kt">' + esc(r.t) + '</span><span class="sub">' + esc(r.pj) + '</span></td><td><span class="pill">' + esc(r.src) + '</span></td><td>' + fmt(target(i, cur.y)) + '</td><td>' + fmt(x && x.r) + '</td><td class="kbar">' + bar(st.s, st.k) + '<small>' + pc(st.k === 'na' ? null : st.s) + '</small></td><td><button type="button" class="btn ' + (canEdit(i) ? 'dark' : 'line') + ' xs" data-kin-edit="' + r.link + '" data-ctx="' + esc(r.sdg + ' · No. ' + r.n) + '">' + (canEdit(i) ? 'Perbarui' : 'Detail') + '</button></td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  function dlSDG() {
    var p = per(), rows = [['KETERCAPAIAN IMPLEMENTASI SUSTAINABLE DEVELOPMENT GOALS (SDGs)'], ['UNIVERSITAS ISLAM AL-AZHAR — TRIWULAN ' + TWN[cur.q] + ' TAHUN ' + cur.y], ['Berdasarkan Lampiran Keputusan Rektor tentang Implementasi SDGs'], [],
      H(['SDGs', 'No', 'Implementasi', 'Sumber (IKU/IKT)', 'Unit Kerja Penanggung Jawab', 'Target Capaian ' + cur.y, 'Realisasi TW ' + TWN[cur.q], '% Ketercapaian', 'Faktor penghambat', 'Tindak lanjut'])];
    var last = '';
    K.sdg.forEach(function (r) { var i = IND[r.link], x = entry(r.link, p) || {}, st = sdgStat(r, p); rows.push([r.sdg !== last ? r.sdg + ' ' + K.sdgmeta[r.sdg][0] + ' (' + K.sdgmeta[r.sdg][1] + ')' : '', r.n, r.t, r.src, r.pj, target(i, cur.y), x.r || '', st.s == null ? '' : Math.round(st.s * 1000) / 10, x.fh || '', x.tl || '']); last = r.sdg; });
    rows.push([], ['RESUME KETERCAPAIAN IMPLEMENTASI SDGs TRIWULAN ' + TWN[cur.q] + ' ' + cur.y], H(['SDGs', '', '', 'Jumlah Implementasi', 'Jumlah Tercapai 100%', '', '', 'Rerata % Ketercapaian']));
    var T = [0, 0, 0];
    Object.keys(K.sdgmeta).forEach(function (g) { var n = 0, f = 0, s = 0; K.sdg.filter(function (r) { return r.sdg === g; }).forEach(function (r) { var st = sdgStat(r, p); n++; s += st.s || 0; if (st.s >= 1) f++; }); T[0] += n; T[1] += f; T[2] += s; rows.push([g + ' ' + K.sdgmeta[g][0], '', '', n, f, '', '', Math.round(s / n * 1000) / 10]); });
    rows.push(['TOTAL KETERCAPAIAN IMPLEMENTASI SDGs UNIZAR', '', '', T[0], T[1], '', '', Math.round(T[2] / T[0] * 1000) / 10], [],
      ['Keterangan: % Ketercapaian = Realisasi ÷ Target (maks. 100%); untuk indikator makin kecil makin baik = Target ÷ Realisasi; realisasi kosong dihitung 0%.']);
    download('Ketercapaian_SDGs_UNIZAR_TW_' + TWN[cur.q] + '_' + cur.y + '.xlsx', [{ name: 'Ketercapaian SDGs TW ' + TWN[cur.q], rows: rows, w: [30, 5, 60, 16, 30, 12, 12, 12, 40, 40] }]);
  }

  /* =========================================================
     4. RISK REGISTER
     ========================================================= */
  var LV = K.risk.lv;
  function lvOf(s) { for (var i = 0; i < LV.length; i++) if (s >= LV[i][1] && s <= LV[i][2]) return LV[i][0]; return 'Rendah'; }
  function lvChip(r) { var s = r.K * r.D, l = lvOf(s); return '<span class="lv lv-' + l.toLowerCase() + '">' + s + ' · ' + l + '</span>'; }
  function late(r) { return r.tenggat && r.status !== 'Selesai' && new Date(r.tenggat) < new Date(); }
  function kids(u) { var out = [u]; K.units.forEach(function (x) { if (x.p === u) out = out.concat(kids(x.k)); }); return out; }
  function scope() { var s = sess(); if (!s) return []; if (s.role === 'unit') return kids(s.unit); return K.units.map(function (u) { return u.k; }); }
  function riskRole() { var s = sess(); return s ? s.role : null; }
  var RV = { tab: 'sum', unit: 'all', lv: 'all', cat: 'all', st: 'all', q: '', cell: null };
  var PERIOD_LBL = function () { return 'TW ' + TWN[cur.q] + ' ' + cur.y; };
  function renderRisk(box) {
    var s = sess(), rr = riskRole();
    if (!s || ['unit', 'renbang', 'spi', 'mutu', 'asesor', 'dsn'].indexOf(rr) < 0) {
      box.innerHTML = '<div class="gate">' + ICO.lock + '<p><b>Risk register bersifat internal.</b><br>Masuk sebagai pemilik risiko (pimpinan unit), koordinator manajemen risiko, SPI, tim mutu, atau asesor (baca saja). Dosen dan tendik dapat mengusulkan risiko.</p><a class="btn dark" href="#masuk">Masuk</a></div>' + cycle();
      return;
    }
    var tabs = rr === 'dsn' ? [['usul', 'Usulkan risiko']] : [['sum', 'Ringkasan'], ['reg', 'Register'], ['flow', rr === 'unit' ? 'Usulan & pengajuan' : 'Pengajuan unit'], ['lap', 'Laporan berkala']];
    if (!tabs.some(function (t) { return t[0] === RV.tab; })) RV.tab = tabs[0][0];
    box.innerHTML = '<div class="kin-top"><div class="seg rtabs" role="tablist">' + tabs.map(function (t) { return '<button type="button" data-rtab="' + t[0] + '" aria-pressed="' + (RV.tab === t[0]) + '">' + t[1] + '</button>'; }).join('') + '</div><div class="kin-act">' +
      ((rr === 'unit' || rr === 'renbang') && RV.tab !== 'usul' ? '<button type="button" class="btn pri sm" data-risk-new>' + ICO.plus + ' Tambah risiko (FR-01)</button>' : '') +
      (rr !== 'dsn' ? '<button type="button" class="btn dark sm" data-kin-dl="risk">' + ICO.dl + ' Unduh risk register</button>' : '') + '</div></div>' +
      '<div class="kin-who ok">' + ICO.user + '<span>Masuk sebagai <b>' + esc(roleName()) + '</b>' + (rr === 'unit' ? ' · cakupan: ' + scope().map(function (k) { return k; }).join(', ') : rr === 'asesor' || rr === 'mutu' ? ' · baca saja' : rr === 'spi' ? ' · reviu independen' : rr === 'renbang' ? ' · seluruh unit kerja' : '') + '</span></div>' +
      '<div data-rbody></div>';
    var b = $('[data-rbody]', box);
    ({ sum: rSum, reg: rReg, flow: rFlow, lap: rLap, usul: rUsul })[RV.tab](b);
  }
  function rList() { var sc = scope(); return S.risks.filter(function (r) { return sc.indexOf(r.unit) > -1; }); }
  function cycle() {
    var m = new Date().getMonth(), idx = [8, 9, 9, 11, 0, 1, 2, 2, 2, 5, 6, 7], cm = { 8: 0, 9: 1, 10: 1, 11: 2, 0: 3, 1: 4, 2: 5, 3: 5, 4: 5, 5: 6, 6: 7, 7: 8 }[m];
    return '<div class="rcycle"><h4>Siklus tahunan manajemen risiko (Lampiran 11)</h4><ol>' + K.risk.cycle.map(function (c, i) { return '<li class="' + (i === cm ? 'now' : i < cm ? 'done' : '') + '"><b>' + c[0] + '</b><span>' + c[1] + '</span></li>'; }).join('') + '</ol></div>';
  }
  function rSum(b) {
    var L = rList(), by = function (f) { var o = {}; L.forEach(function (r) { var k = f(r); o[k] = (o[k] || 0) + 1; }); return o; };
    var lv = by(function (r) { return lvOf(r.K * r.D); }), st = by(function (r) { return r.status || 'Belum Dimulai'; }), hz = L.filter(function (r) { return r.bahaya; }).length, lt = L.filter(late).length;
    var grid = '<div class="heat"><span class="ax-y">Dampak</span>';
    for (var d = 5; d >= 1; d--) { grid += '<span class="hd">' + d + '</span>'; for (var k = 1; k <= 5; k++) { var n = L.filter(function (r) { return r.K === k && r.D === d; }).length, l = lvOf(k * d).toLowerCase(); grid += '<button type="button" class="hc lv-' + l + (n ? '' : ' z') + '" data-cell="' + k + '-' + d + '" title="K=' + k + ', D=' + d + ' (' + lvOf(k * d) + ')">' + (n || '') + '</button>'; } }
    grid += '<span></span>' + [1, 2, 3, 4, 5].map(function (k) { return '<span class="hk">' + k + '</span>'; }).join('') + '<span class="ax-x">Kemungkinan</span></div>';
    var units = scope().filter(function (k) { return L.some(function (r) { return r.unit === k; }) || true; });
    b.innerHTML = cycle() + kpis([[L.length, 'risiko aktif'], [(lv.Tinggi || 0) + (lv.Ekstrem || 0), 'tinggi & ekstrem', 'low'], [hz, 'jalur HIRADC (K3)'], [lt, 'terlambat (lewat tenggat)', lt ? 'low' : ''], [st['Selesai'] || 0, 'mitigasi selesai', 'ok']]) +
      '<div class="kin-2"><div class="kin-card"><h4>Peta risiko 5×5</h4>' + grid + '<p class="muted" style="font-size:13px;margin-top:8px">Klik sel untuk melihat daftar risikonya.</p></div><div class="kin-card"><h4>Level & status mitigasi</h4>' +
      LV.map(function (x) { var n = lv[x[0]] || 0; return '<div class="hrow static"><span class="hl"><span class="lv lv-' + x[0].toLowerCase() + '">' + x[0] + '</span></span>' + bar(L.length ? n / L.length : 0, 'blv-' + x[0].toLowerCase()) + '<span class="hv">' + n + '</span></div>'; }).join('') + '<hr>' +
      ['Belum Dimulai', 'Dalam Proses', 'Selesai'].map(function (x) { var n = st[x] || 0; return '<div class="hrow static"><span class="hl">' + x + '</span>' + bar(L.length ? n / L.length : 0, x === 'Selesai' ? 'ok' : x === 'Dalam Proses' ? 'near' : 'nil') + '<span class="hv">' + n + '</span></div>'; }).join('') + '</div></div>' +
      '<div class="kin-card"><h4>Profil risiko per unit kerja · pengajuan ' + PERIOD_LBL() + '</h4><div class="tbl-wrap"><table class="ktbl"><thead><tr><th>Kode</th><th>Unit kerja</th><th>Risiko</th><th>Tinggi/Ekstrem</th><th>HIRADC</th><th>Terlambat</th><th>Pengajuan ' + PERIOD_LBL() + '</th></tr></thead><tbody>' +
      units.map(function (k) { var R = L.filter(function (r) { return r.unit === k; }), sb = S.sub[k + '|' + per()]; return '<tr class="clickrow" data-runit="' + k + '"><td class="kno">' + k + '</td><td>' + esc(UNIT[k].n) + '</td><td>' + R.length + '</td><td>' + R.filter(function (r) { return r.K * r.D >= 10; }).length + '</td><td>' + R.filter(function (r) { return r.bahaya; }).length + '</td><td>' + R.filter(late).length + '</td><td>' + subChip(sb) + '</td></tr>'; }).join('') +
      '</tbody></table></div></div>' +
      '<div class="kin-card"><h4>Per kategori risiko</h4>' + K.risk.cats.map(function (c) { var R = L.filter(function (r) { return r.kat.indexOf(c.split(' ')[0]) === 0; }); var te = R.filter(function (r) { return r.K * r.D >= 10; }).length; return '<div class="hrow static"><span class="hl">' + esc(c) + '</span>' + bar(L.length ? R.length / Math.max.apply(null, K.risk.cats.map(function (cc) { return L.filter(function (r) { return r.kat.indexOf(cc.split(' ')[0]) === 0; }).length; }).concat([1])) : 0) + '<span class="hv">' + R.length + (te ? ' <small>(' + te + ' T/E)</small>' : '') + '</span></div>'; }).join('') + '</div>';
  }
  function subChip(sb) { if (!sb) return '<span class="kst nil">Belum diajukan</span>'; return '<span class="kst ' + ({ diajukan: 'near', diterima: 'ok', revisi: 'low' }[sb.st]) + '">' + ({ diajukan: 'Diajukan', diterima: 'Diterima koordinator', revisi: 'Perlu revisi' }[sb.st]) + '</span>'; }
  function rFiltered() {
    return rList().filter(function (r) {
      var s = r.K * r.D;
      if (RV.unit !== 'all' && r.unit !== RV.unit) return false;
      if (RV.lv !== 'all' && lvOf(s) !== RV.lv) return false;
      if (RV.cat !== 'all' && r.kat !== RV.cat) return false;
      if (RV.st === 'late') { if (!late(r)) return false; } else if (RV.st === 'hz') { if (!r.bahaya) return false; } else if (RV.st !== 'all' && (r.status || 'Belum Dimulai') !== RV.st) return false;
      if (RV.cell && (r.K + '-' + r.D) !== RV.cell) return false;
      if (RV.q && (r.kode + ' ' + r.risk + ' ' + r.owner).toLowerCase().indexOf(RV.q.toLowerCase()) < 0) return false;
      return true;
    });
  }
  function rReg(b) {
    var sc = scope(), R = rFiltered();
    b.innerHTML = '<div class="kin-filter">' + (sc.length > 1 ? '<label>Unit <select data-rf="unit"><option value="all">Semua unit</option>' + sc.map(function (k) { return '<option value="' + k + '"' + (RV.unit === k ? ' selected' : '') + '>' + k + ' · ' + esc(UNIT[k].n) + '</option>'; }).join('') + '</select></label>' : '') +
      '<label>Level <select data-rf="lv"><option value="all">Semua level</option>' + LV.map(function (x) { return '<option' + (RV.lv === x[0] ? ' selected' : '') + '>' + x[0] + '</option>'; }).join('') + '</select></label>' +
      '<label>Kategori <select data-rf="cat"><option value="all">Semua kategori</option>' + Array.from(new Set(S.risks.map(function (r) { return r.kat; }))).map(function (c) { return '<option' + (RV.cat === c ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '</select></label>' +
      '<label>Status <select data-rf="st">' + [['all', 'Semua'], ['Belum Dimulai', 'Belum dimulai'], ['Dalam Proses', 'Dalam proses'], ['Selesai', 'Selesai'], ['late', 'Terlambat'], ['hz', 'Jalur HIRADC']].map(function (x) { return '<option value="' + x[0] + '"' + (RV.st === x[0] ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>' +
      '<label class="grow">Cari <input type="search" data-rf="q" value="' + esc(RV.q) + '" placeholder="kode, risiko, pemilik"></label>' +
      (RV.cell ? '<button type="button" class="linkbtn" data-rcell-x>Sel K×D ' + RV.cell.replace('-', '×') + ' · hapus</button>' : '') + '</div>' +
      '<p class="kin-count"><b>' + R.length + '</b> risiko</p><div class="tbl-wrap"><table class="ktbl"><thead><tr><th>Kode</th><th>Risiko</th><th>Level</th><th>Strategi</th><th>Status</th><th>Tenggat</th></tr></thead><tbody>' +
      R.map(function (r) { return '<tr class="clickrow" data-rid="' + r.kode + '"><td class="kno">' + r.kode + (r.baru ? '<small>baru</small>' : '') + '</td><td><span class="kt">' + esc(r.risk) + '</span><span class="sub">' + esc(r.kat) + (r.bahaya ? ' · HIRADC: ' + esc(r.bahaya) : '') + ' · ' + esc(r.owner) + '</span></td><td>' + lvChip(r) + '</td><td>' + esc(r.strategi || '–') + '</td><td><span class="kst ' + ({ Selesai: 'ok', 'Dalam Proses': 'near' }[r.status] || 'nil') + '">' + esc(r.status || 'Belum Dimulai') + '</span>' + (late(r) ? '<span class="sub warn">terlambat</span>' : '') + '</td><td>' + (r.tenggat ? new Date(r.tenggat).toLocaleDateString('id-ID') : '–') + '</td></tr>'; }).join('') +
      '</tbody></table></div>';
  }
  function canRiskEdit(r) { var s = sess(); if (!s) return false; return s.role === 'renbang' || (s.role === 'unit' && scope().indexOf(r.unit) > -1); }
  function openRisk(code) {
    var r = S.risks.filter(function (x) { return x.kode === code; })[0]; if (!r) return;
    var ed = canRiskEdit(r), s = sess(), sc = r.K * r.D;
    var mx = '<div class="heat sm">'; for (var d = 5; d >= 1; d--) for (var k = 1; k <= 5; k++) mx += '<span class="hc lv-' + lvOf(k * d).toLowerCase() + (k === r.K && d === r.D ? ' on' : ' z') + '"></span>'; mx += '</div>';
    var A = [['Unit kerja', r.unit + ' · ' + UNIT[r.unit].n], ['Kategori', r.kat], ['Kategori bahaya (HIRADC)', r.bahaya || '–'], ['Penyebab', r.sebab], ['Dampak jika terjadi', r.dampak], ['Pemilik risiko', r.owner], ['Kemungkinan (K)', r.K + ' · ' + K.risk.K[r.K - 1][0]], ['Dampak (D)', r.D + ' · ' + K.risk.D[r.D - 1][0]], ['Sumber rujukan', r.rujukan || '–']];
    var B = [['Pengendalian existing', r.existing], ['Strategi perlakuan', r.strategi], ['Rencana tindak lanjut / mitigasi', r.mitigasi], ['Penanggung jawab (PIC)', r.pic], ['Sumber daya / anggaran', r.anggaran], ['Target waktu', r.waktu], ['Indikator keberhasilan', r.indikator]];
    var dl = function (L) { return '<dl class="meta">' + L.map(function (x) { return '<dt>' + x[0] + '</dt><dd>' + esc(x[1] || '–') + '</dd>'; }).join('') + '</dl>'; };
    var hist = (r.hist || []).slice().reverse();
    var html = '<p class="kin-ind">' + esc(r.risk) + '</p><div class="rsum">' + mx + '<div>' + lvChip(r) + '<p class="muted" style="margin-top:6px">' + esc(LV.filter(function (x) { return x[0] === lvOf(sc); })[0][3]) + '</p></div></div>' +
      '<h3 class="dash-t">Bagian A · Identifikasi & analisis</h3>' + dl(A) + '<h3 class="dash-t">Bagian B · Rencana mitigasi & tindak lanjut</h3>' + dl(B) +
      '<h3 class="dash-t">Pemantauan</h3>' + dl([['Status', r.status || 'Belum Dimulai'], ['Tenggat', r.tenggat ? new Date(r.tenggat).toLocaleDateString('id-ID') + (late(r) ? ' · terlambat' : '') : '–'], ['Catatan update terbaru', r.catatan || '–'], ['Tanggal update', r.upd || '–'], ['Catatan reviu SPI', r.spi || '–']]) +
      (hist.length ? '<ul class="tline sm">' + hist.map(function (h) { return '<li class="done"><b>' + esc(h.t) + '</b><small>' + esc(h.by) + ' · ' + new Date(h.at).toLocaleString('id-ID') + '</small></li>'; }).join('') + '</ul>' : '');
    if (ed) html += '<form class="kin-form rmon" novalidate><h3 class="dash-t">Perbarui pemantauan ' + PERIOD_LBL() + '</h3><div class="fgrid"><div class="field"><label for="rm-st">Status mitigasi</label><select id="rm-st" name="st">' + ['Belum Dimulai', 'Dalam Proses', 'Selesai'].map(function (o) { return '<option' + ((r.status || 'Belum Dimulai') === o ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="rm-tg">Tenggat</label><input id="rm-tg" type="date" name="tg" value="' + esc(r.tenggat || '') + '"></div>' +
      '<div class="field"><label for="rm-k">Penilaian ulang K</label><select id="rm-k" name="k">' + [1, 2, 3, 4, 5].map(function (n) { return '<option' + (n === r.K ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="rm-d">Penilaian ulang D</label><select id="rm-d" name="d">' + [1, 2, 3, 4, 5].map(function (n) { return '<option' + (n === r.D ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div>' +
      '<div class="field full"><label for="rm-c">Catatan perkembangan / kendala</label><textarea id="rm-c" name="c" rows="3" required placeholder="Apa yang sudah dilakukan, kendala, dukungan yang dibutuhkan">' + '</textarea></div></div><div class="form-nav"><span class="form-err" aria-live="polite"></span><button type="submit" class="btn dark">Simpan pemantauan</button></div></form>';
    if (s && s.role === 'spi') html += '<form class="kin-form rspi"><h3 class="dash-t">Reviu SPI</h3><textarea name="n" rows="3" required placeholder="Kecukupan identifikasi, analisis, dan efektivitas mitigasi">' + esc(r.spi || '') + '</textarea><div class="form-nav"><span></span><button class="btn dark" type="submit">Simpan catatan reviu</button></div></form>';
    SH().open('Risk register · ' + r.kode, r.unit + ' · ' + UNIT[r.unit].n.replace(/\s*\(.*\)/, ''), html, true);
    var f = $('.sheet .rmon');
    if (f) f.addEventListener('submit', function (e) {
      e.preventDefault(); if (!f.c.value.trim()) { $('.form-err', f).textContent = 'Tulis catatan perkembangan.'; f.c.focus(); return; }
      var ok = r.K + 'x' + r.D, nk = +f.k.value, nd = +f.d.value;
      var t = 'Status ' + f.st.value + (ok !== nk + 'x' + nd ? '; skor ' + r.K * r.D + ' → ' + nk * nd + ' (' + lvOf(nk * nd) + ')' : '') + ': ' + f.c.value.trim();
      r.status = f.st.value; r.tenggat = f.tg.value; r.K = nk; r.D = nd; r.catatan = f.c.value.trim(); r.upd = new Date().toISOString().slice(0, 10);
      (r.hist = r.hist || []).push({ t: t, by: roleName(), at: Date.now() }); if (ok !== nk + 'x' + nd) r.chg = 1;
      save(); SH().close(); toast('Pemantauan ' + r.kode + ' disimpan.'); renderAll();
    });
    var g = $('.sheet .rspi');
    if (g) g.addEventListener('submit', function (e) { e.preventDefault(); r.spi = g.n.value.trim(); (r.hist = r.hist || []).push({ t: 'Reviu SPI: ' + r.spi, by: 'SPI', at: Date.now() }); save(); SH().close(); toast('Catatan reviu SPI disimpan.'); renderAll(); });
  }
  /* FR-01 + FR-02 wizard */
  function openRiskForm(pref) {
    var s = sess(), sc = scope(), d = pref || {};
    var opts = function (L, v) { return L.map(function (o) { return '<option' + (o === v ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join(''); };
    var kd = function (nm, L, v) { return '<div class="kd" role="radiogroup" aria-label="' + nm + '">' + L.map(function (x, i) { return '<label class="kd-o"><input type="radio" name="' + nm + '" value="' + (i + 1) + '"' + (v === i + 1 ? ' checked' : '') + ' required><span><b>' + (i + 1) + ' · ' + x[0] + '</b><small>' + x[1] + '</small></span></label>'; }).join('') + '</div>'; };
    var html = '<form class="kin-form rform" novalidate><ol class="stepper"><li class="on"><span>1</span>Identifikasi</li><li><span>2</span>Analisis K×D</li><li><span>3</span>Rencana mitigasi</li></ol>' +
      '<section class="fstep" data-step="0"><div class="fgrid"><div class="field"><label>Unit kerja</label><select name="unit">' + sc.map(function (k) { return '<option value="' + k + '"' + (d.unit === k ? ' selected' : '') + '>' + k + ' · ' + esc(UNIT[k].n) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>Kategori risiko</label><select name="kat" required><option value="">Pilih…</option>' + opts(K.risk.cats, d.kat) + '</select></div>' +
      '<div class="field full"><label class="chk"><input type="checkbox" name="hz"' + (d.bahaya ? ' checked' : '') + '> Risiko bahaya kerja (Jalur HIRADC, dikoordinasikan UPT K3)</label><div class="opts hz" hidden>' + K.risk.hazards.map(function (h) { return '<label class="opt-pill"><input type="checkbox" name="bh" value="' + h + '"><span>' + h + '</span></label>'; }).join('') + '</div></div>' +
      '<div class="field full"><label>Pernyataan/deskripsi risiko</label><textarea name="risk" rows="2" required placeholder="Peristiwa spesifik dan terukur">' + esc(d.risk || '') + '</textarea></div>' +
      '<div class="field full"><label>Penyebab (sumber risiko)</label><textarea name="sebab" rows="2" required>' + esc(d.sebab || '') + '</textarea></div>' +
      '<div class="field full"><label>Dampak apabila terjadi</label><textarea name="dampak" rows="2" required></textarea></div>' +
      '<div class="field"><label>Pemilik risiko</label><input name="owner" required value="' + esc(d.owner || 'Kepala ' + (UNIT[sc[0]] ? UNIT[sc[0]].n : '')) + '"></div><div class="field"><label>Sumber rujukan <span class="opt">(opsional)</span></label><input name="rujukan" placeholder="mis. hasil AMI, Perrek 002/2024"></div></div></section>' +
      '<section class="fstep" data-step="1" hidden><div class="kd-wrap"><div><h4>Kemungkinan (K)</h4>' + kd('K', K.risk.K) + '</div><div><h4>Dampak (D)</h4>' + kd('D', K.risk.D) + '</div></div><div class="rlive"><div class="heat sm" data-hm></div><div data-sc><p class="muted">Pilih K dan D untuk melihat skor.</p></div></div><div class="field full"><label>Justifikasi singkat</label><textarea name="just" rows="2"></textarea></div></section>' +
      '<section class="fstep" data-step="2" hidden><div class="fgrid"><div class="field full"><label>Pengendalian yang sudah ada</label><textarea name="existing" rows="2"></textarea></div>' +
      '<div class="field full"><label data-strat-l>Strategi perlakuan</label><div class="opts" data-strat>' + K.risk.strat.map(function (o) { return '<label class="opt-pill"><input type="checkbox" name="strat" value="' + o + '"><span>' + o + '</span></label>'; }).join('') + '</div><div class="opts" data-hier hidden>' + K.risk.hier.map(function (o) { return '<label class="opt-pill"><input type="checkbox" name="hier" value="' + o + '"><span>' + o + '</span></label>'; }).join('') + '</div></div>' +
      '<div class="field full"><label>Rencana aksi mitigasi</label><textarea name="mitigasi" rows="3" placeholder="1. …&#10;2. …"></textarea></div><div class="field"><label>Penanggung jawab (PIC)</label><input name="pic"></div><div class="field"><label>Sumber daya / anggaran</label><input name="anggaran" placeholder="mis. RKT/RAB 2027"></div>' +
      '<div class="field"><label>Target waktu</label><input name="waktu" placeholder="mis. Semester genap 2026/2027"></div><div class="field"><label>Tenggat (tanggal)</label><input type="date" name="tenggat"></div><div class="field full"><label>Indikator keberhasilan</label><input name="indikator"></div></div></section>' +
      '<div class="form-nav"><button type="button" class="btn line" data-prev hidden>Kembali</button><span class="form-err" aria-live="polite"></span><button type="button" class="btn dark" data-next>Lanjut</button></div></form>';
    SH().open('FR-01 & FR-02 · Pedoman Tata Kelola Berbasis Risiko', 'Tambah risiko', html, true);
    var f = $('.sheet .rform'), cur2 = 0, steps = $$('.fstep', f);
    var hz = function () { var on = f.hz.checked; $('.opts.hz', f).hidden = !on; $('[data-strat]', f).hidden = on; $('[data-hier]', f).hidden = !on; $('[data-strat-l]', f).textContent = on ? 'Hierarki pengendalian (HIRADC)' : 'Strategi perlakuan'; };
    f.hz.addEventListener('change', hz); hz();
    var paint = function () {
      var k = +((f.querySelector('input[name=K]:checked') || {}).value || 0), dd = +((f.querySelector('input[name=D]:checked') || {}).value || 0), h = '';
      for (var d2 = 5; d2 >= 1; d2--) for (var k2 = 1; k2 <= 5; k2++) h += '<span class="hc lv-' + lvOf(k2 * d2).toLowerCase() + (k2 === k && d2 === dd ? ' on' : ' z') + '"></span>';
      $('[data-hm]', f).innerHTML = h;
      if (k && dd) { var l = lvOf(k * dd); $('[data-sc]', f).innerHTML = '<span class="lv lv-' + l.toLowerCase() + '">Skor ' + k * dd + ' · ' + l + '</span><p class="muted" style="margin-top:6px">' + LV.filter(function (x) { return x[0] === l; })[0][3] + '</p>' + (k * dd >= 10 ? '<p class="warn" style="margin-top:6px"><b>Eskalasi:</b> otomatis dilaporkan ke Wakil Rektor terkait' + (k * dd >= 16 ? ' dan Rektor' : '') + (f.hz.checked ? ' serta UPT K3' : '') + '.</p>' : ''); }
    };
    f.addEventListener('change', paint); paint();
    var go = function (n) { cur2 = n; steps.forEach(function (st, i) { st.hidden = i !== n; }); $$('.stepper li', f).forEach(function (li, i) { li.className = i < n ? 'done' : i === n ? 'on' : ''; }); $('[data-prev]', f).hidden = n === 0; $('[data-next]', f).textContent = n === 2 ? 'Simpan ke register' : 'Lanjut'; $('.sheet-b').scrollTop = 0; };
    $('[data-prev]', f).addEventListener('click', function () { go(cur2 - 1); });
    $('[data-next]', f).addEventListener('click', function () {
      var err = $('.form-err', f); err.textContent = '';
      var bad = $$('[required]', steps[cur2]).filter(function (el) { return el.type === 'radio' ? !f.querySelector('input[name=' + el.name + ']:checked') : !el.value.trim(); });
      if (bad.length) { err.textContent = 'Lengkapi isian yang wajib.'; return; }
      var k = +((f.querySelector('input[name=K]:checked') || {}).value || 0), dd = +((f.querySelector('input[name=D]:checked') || {}).value || 0);
      if (cur2 < 2) { go(cur2 + 1); return; }
      var strat = $$('input[name=' + (f.hz.checked ? 'hier' : 'strat') + ']:checked', f).map(function (x) { return x.value; }).join(' + ');
      if (k * dd >= 5 && (!strat || !f.mitigasi.value.trim() || !f.pic.value.trim())) { err.textContent = 'Level ' + lvOf(k * dd) + ' wajib memiliki strategi, rencana mitigasi, dan PIC.'; return; }
      var u = f.unit.value, n = S.risks.filter(function (r) { return r.unit === u; }).length + 1, code = 'RSK-' + u + '-' + ('0' + n).slice(-2);
      while (S.risks.some(function (r) { return r.kode === code; })) { n++; code = 'RSK-' + u + '-' + ('0' + n).slice(-2); }
      var r = { kode: code, unit: u, kat: f.kat.value, bahaya: f.hz.checked ? $$('input[name=bh]:checked', f).map(function (x) { return x.value; }).join(' / ') || 'Ergonomi' : '', risk: f.risk.value.trim(), sebab: f.sebab.value.trim(), dampak: f.dampak.value.trim(), owner: f.owner.value.trim(), K: k, D: dd, rujukan: f.rujukan.value.trim() + (f.just.value.trim() ? ' · Justifikasi: ' + f.just.value.trim() : ''),
        existing: f.existing.value.trim(), strategi: strat, mitigasi: f.mitigasi.value.trim(), pic: f.pic.value.trim(), anggaran: f.anggaran.value.trim(), waktu: f.waktu.value.trim(), tenggat: f.tenggat.value, indikator: f.indikator.value.trim(), status: 'Belum Dimulai', catatan: '', upd: new Date().toISOString().slice(0, 10), baru: per(), hist: [{ t: 'Risiko didaftarkan (skor ' + k * dd + ', ' + lvOf(k * dd) + ')', by: roleName(), at: Date.now() }] };
      S.risks.push(r);
      if (d.usulId) S.usul.forEach(function (x) { if (x.id === d.usulId) { x.st = 'diterima'; x.kode = code; } });
      save(); SH().close(); toast(code + ' ditambahkan ke risk register ' + u + '.'); RV.tab = 'reg'; renderAll();
    });
  }
  function rFlow(b) {
    var rr = riskRole(), p = per();
    if (rr === 'unit') {
      var sc = scope(), U = S.usul.filter(function (x) { return sc.indexOf(x.unit) > -1; });
      var mine = sess().unit, sb = S.sub[mine + '|' + p], R = S.risks.filter(function (r) { return r.unit === mine; });
      var chk = [['Semua risiko Sedang ke atas memiliki rencana mitigasi', R.filter(function (r) { return r.K * r.D >= 5; }).every(function (r) { return r.mitigasi; })],
        ['Risiko Tinggi/Ekstrem memiliki tenggat', R.filter(function (r) { return r.K * r.D >= 10; }).every(function (r) { return r.tenggat; })],
        ['Status mitigasi diperbarui pada periode ini', R.some(function (r) { return r.upd && r.upd >= '2026-10-01'; })]];
      b.innerHTML = '<div class="kin-2"><div class="kin-card"><h4>Ajukan risk register ' + mine + ' · ' + PERIOD_LBL() + '</h4><p class="muted">Pemilik risiko memverifikasi register unitnya (termasuk unit di bawahnya), lalu mengajukannya ke Koordinator Manajemen Risiko untuk dikompilasi.</p><ul class="clean rchk">' +
        chk.map(function (c) { return '<li class="' + (c[1] ? 'ok' : 'no') + '">' + (c[1] ? '✓' : '!') + ' ' + c[0] + '</li>'; }).join('') + '</ul><p>Status: ' + subChip(sb) + (sb && sb.note ? ' <span class="muted">' + esc(sb.note) + '</span>' : '') + '</p>' +
        '<button type="button" class="btn dark" data-sub-send' + (sb && sb.st === 'diterima' ? ' disabled' : '') + '>' + (sb && sb.st === 'diajukan' ? 'Ajukan ulang' : 'Ajukan ke koordinator') + '</button></div>' +
        '<div class="kin-card"><h4>Usulan risiko dari dosen/tendik & unit di bawah</h4>' + (U.length ? '<ul class="clean usul">' + U.map(function (x) { return '<li><div><b>' + esc(x.risk) + '</b><small>' + x.unit + ' · ' + esc(x.kat) + ' · ' + esc(x.by) + ' · ' + new Date(x.at).toLocaleDateString('id-ID') + '</small></div>' + (x.st === 'baru' ? '<div class="btn-row"><button type="button" class="btn dark xs" data-usul-ok="' + x.id + '">Terima & analisis</button><button type="button" class="btn line xs" data-usul-no="' + x.id + '">Tolak</button></div>' : '<span class="kst ' + (x.st === 'diterima' ? 'ok' : 'nil') + '">' + (x.st === 'diterima' ? 'Masuk register ' + (x.kode || '') : 'Ditolak') + '</span>') + '</li>'; }).join('') + '</ul>' : '<p class="muted">Belum ada usulan.</p>') + '</div></div>';
      return;
    }
    var units = K.units;
    b.innerHTML = '<div class="kin-card"><h4>Pengajuan risk register unit kerja · ' + PERIOD_LBL() + '</h4><p class="muted">' + (rr === 'renbang' ? 'Terima pengajuan untuk dikompilasi menjadi risk register universitas, atau kembalikan dengan catatan.' : 'Pantauan kepatuhan pengajuan unit.') + '</p><div class="tbl-wrap"><table class="ktbl"><thead><tr><th>Unit</th><th>Risiko</th><th>Status</th><th>Catatan</th><th></th></tr></thead><tbody>' +
      units.map(function (u) { var sb = S.sub[u.k + '|' + p]; return '<tr><td><b>' + u.k + '</b><span class="sub">' + esc(u.n) + '</span></td><td>' + S.risks.filter(function (r) { return r.unit === u.k; }).length + '</td><td>' + subChip(sb) + '</td><td>' + esc(sb && sb.note || '') + '</td><td>' + (rr === 'renbang' && sb && sb.st === 'diajukan' ? '<div class="btn-row"><button type="button" class="btn dark xs" data-sub-ok="' + u.k + '">Terima</button><button type="button" class="btn line xs" data-sub-rev="' + u.k + '">Revisi</button></div>' : '') + '</td></tr>'; }).join('') + '</tbody></table></div></div>';
  }
  function rUsul(b) {
    var s = sess(), mine = S.usul.filter(function (x) { return x.mine; });
    b.innerHTML = '<div class="kin-2"><form class="kin-card kin-form usulf" novalidate><h4>Usulkan potensi risiko</h4><p class="muted">Sesuai pedoman, seluruh dosen dan tendik melaporkan potensi risiko kepada pimpinan unit kerja (pemilik risiko).</p><div class="fgrid">' +
      '<div class="field"><label>Unit kerja</label><select name="unit">' + K.units.map(function (u) { return '<option value="' + u.k + '"' + (s.unit === u.k ? ' selected' : '') + '>' + u.k + ' · ' + esc(u.n) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>Kategori</label><select name="kat">' + K.risk.cats.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field full"><label>Potensi risiko</label><textarea name="risk" rows="3" required placeholder="Apa yang bisa terjadi dan menghambat tujuan unit?"></textarea></div><div class="field full"><label>Penyebab yang Anda amati</label><textarea name="sebab" rows="2"></textarea></div></div>' +
      '<div class="form-nav"><span class="form-err"></span><button class="btn dark" type="submit">Kirim ke pemilik risiko</button></div></form>' +
      '<div class="kin-card"><h4>Usulan saya</h4>' + (mine.length ? '<ul class="clean usul">' + mine.map(function (x) { return '<li><div><b>' + esc(x.risk) + '</b><small>' + x.unit + ' · ' + new Date(x.at).toLocaleDateString('id-ID') + '</small></div><span class="kst ' + ({ baru: 'near', diterima: 'ok', ditolak: 'nil' }[x.st]) + '">' + ({ baru: 'Menunggu pemilik risiko', diterima: 'Masuk register ' + (x.kode || ''), ditolak: 'Ditolak' }[x.st]) + '</span></li>'; }).join('') + '</ul>' : '<p class="muted">Belum ada usulan.</p>') + '</div></div>';
    var f = $('.usulf', b);
    f.addEventListener('submit', function (e) { e.preventDefault(); if (!f.risk.value.trim()) { $('.form-err', f).textContent = 'Tulis potensi risikonya.'; return; } S.usul.push({ id: 'U' + Date.now(), unit: f.unit.value, kat: f.kat.value, risk: f.risk.value.trim(), sebab: f.sebab.value.trim(), by: roleName(), at: Date.now(), st: 'baru', mine: 1 }); save(); toast('Usulan terkirim ke pemilik risiko ' + f.unit.value + '.'); renderAll(); });
  }
  function rLap(b) {
    var L = rList(), key = per(), lp = S.lap[key] || {}, rr = riskRole();
    var by = function (f) { var o = {}; L.forEach(function (r) { var k = f(r); o[k] = (o[k] || 0) + 1; }); return o; }, lv = by(function (r) { return lvOf(r.K * r.D); });
    var TE = L.filter(function (r) { return r.K * r.D >= 10; }), NEW = L.filter(function (r) { return r.baru || r.chg; }), KND = L.filter(function (r) { return r.catatan; });
    var sc = scope();
    var html = '<div class="rep" id="kin-rep"><header class="rep-h"><span class="eyebrow">Lampiran 12 · Pedoman Tata Kelola Berbasis Risiko</span><h3>Laporan Manajemen Risiko Universitas Islam Al-Azhar</h3><p class="muted">Periode ' + PERIOD_LBL() + (sc.length < K.units.length ? ' · cakupan ' + sc.join(', ') : '') + ' · disusun ' + new Date().toLocaleDateString('id-ID') + '</p></header>' +
      '<h4>1. Ringkasan eksekutif</h4><p>Terdapat <b>' + L.length + '</b> risiko aktif: ' + LV.map(function (x) { return (lv[x[0]] || 0) + ' ' + x[0].toLowerCase(); }).join(', ') + '. ' + L.filter(function (r) { return r.bahaya; }).length + ' risiko melalui jalur HIRADC. ' + L.filter(late).length + ' rencana mitigasi melewati tenggat.</p>' +
      '<h4>2. Profil risiko per unit kerja</h4><div class="tbl-wrap"><table class="ktbl mini"><thead><tr><th>Unit</th><th>Rendah</th><th>Sedang</th><th>Tinggi</th><th>Ekstrem</th><th>Total</th></tr></thead><tbody>' +
      sc.map(function (k) { var R = L.filter(function (r) { return r.unit === k; }); if (!R.length) return ''; var c = function (n) { return R.filter(function (r) { return lvOf(r.K * r.D) === n; }).length; }; return '<tr><td>' + k + '</td><td>' + c('Rendah') + '</td><td>' + c('Sedang') + '</td><td>' + c('Tinggi') + '</td><td>' + c('Ekstrem') + '</td><td><b>' + R.length + '</b></td></tr>'; }).join('') + '</tbody></table></div>' +
      '<h4>3. Perkembangan mitigasi risiko Tinggi & Ekstrem</h4><div class="tbl-wrap"><table class="ktbl mini"><thead><tr><th>Kode</th><th>Risiko</th><th>Level</th><th>Status</th><th>Kendala/catatan</th></tr></thead><tbody>' + TE.map(function (r) { return '<tr><td>' + r.kode + '</td><td>' + esc(r.risk) + '</td><td>' + lvChip(r) + '</td><td>' + esc(r.status || 'Belum Dimulai') + (late(r) ? ' · terlambat' : '') + '</td><td>' + esc(r.catatan || '–') + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<h4>4. Risiko baru dan perubahan level</h4>' + (NEW.length ? '<ul>' + NEW.map(function (r) { return '<li><b>' + r.kode + '</b> ' + esc(r.risk) + ' · ' + lvChip(r) + (r.baru ? ' <small>(baru, ' + r.baru + ')</small>' : ' <small>(level berubah)</small>') + '</li>'; }).join('') + '</ul>' : '<p class="muted">Tidak ada risiko baru atau perubahan level pada periode ini.</p>') +
      '<h4>5. Hasil reviu Satuan Pengawasan Internal</h4>' + field('spi', lp.spi, rr === 'spi' || rr === 'renbang', 'Ringkasan temuan dan rekomendasi SPI') +
      '<h4>6. Kendala dan kebutuhan dukungan</h4>' + (KND.length ? '<ul>' + KND.slice(0, 12).map(function (r) { return '<li><b>' + r.kode + '</b>: ' + esc(r.catatan) + '</li>'; }).join('') + '</ul>' : '<p class="muted">Belum ada catatan kendala dari unit.</p>') + field('knd', lp.knd, rr === 'renbang', 'Kebutuhan keputusan/sumber daya dari pimpinan') +
      '<h4>7. Rekomendasi tindak lanjut</h4>' + field('rek', lp.rek, rr === 'renbang', 'Rekomendasi untuk Rektor dan/atau Badan Penyelenggara') + '</div>' +
      '<div class="btn-row" style="margin-top:16px">' + (rr === 'renbang' || rr === 'spi' ? '<button type="button" class="btn dark" data-lap-save>Simpan isian laporan</button>' : '') + '<button type="button" class="btn line" data-lap-print>' + ICO.print + ' Cetak / simpan PDF</button></div>';
    b.innerHTML = html;
    function field(k, v, ed, ph) { return ed ? '<textarea class="rep-in" data-lap="' + k + '" rows="3" placeholder="' + ph + '">' + esc(v || '') + '</textarea>' : '<p>' + esc(v || '–') + '</p>'; }
  }
  function dlRisk() {
    var L = rList(), cols = ['No', 'Kode Risiko', 'Kategori Risiko', 'Kategori Bahaya (khusus Jalur HIRADC)', 'Jalur', 'Pernyataan/Deskripsi Risiko', 'Penyebab', 'Dampak jika Terjadi', 'Pemilik Risiko', 'K (1-5)', 'D (1-5)', 'Skor (K×D)', 'Level Risiko', 'Sumber Rujukan', 'Pengendalian Existing', 'Strategi Perlakuan', 'Rencana Tindak Lanjut / Mitigasi', 'Penanggung Jawab (PIC)', 'Sumber Daya / Anggaran', 'Target Waktu (naratif)', 'Tenggat (Tanggal)', 'Indikator Keberhasilan', 'Status', 'Keterlambatan', 'Catatan Update Terbaru', 'Tanggal Update Terakhir'];
    var row = function (r, i) { return [i + 1, r.kode, r.kat, r.bahaya || '-', r.bahaya ? 'HIRADC' : 'Umum', r.risk, r.sebab, r.dampak, r.owner, r.K, r.D, r.K * r.D, lvOf(r.K * r.D), r.rujukan, r.existing, r.strategi, r.mitigasi, r.pic, r.anggaran, r.waktu, r.tenggat, r.indikator, r.status || 'Belum Dimulai', late(r) ? 'Terlambat' : '-', r.catatan, r.upd]; };
    var dash = [['DASHBOARD PEMANTAUAN RISIKO — ' + PERIOD_LBL()], ['Diunduh ' + new Date().toLocaleString('id-ID')], [], H(['Level', 'Jumlah'])];
    LV.forEach(function (x) { dash.push([x[0], L.filter(function (r) { return lvOf(r.K * r.D) === x[0]; }).length]); });
    dash.push([], H(['Status', 'Jumlah'])); ['Belum Dimulai', 'Dalam Proses', 'Selesai'].forEach(function (x) { dash.push([x, L.filter(function (r) { return (r.status || 'Belum Dimulai') === x; }).length]); });
    dash.push([], H(['Matriks 5×5', 'K=1', 'K=2', 'K=3', 'K=4', 'K=5'])); for (var d = 5; d >= 1; d--) { var rw = ['D=' + d]; for (var k = 1; k <= 5; k++) rw.push(L.filter(function (r) { return r.K === k && r.D === d; }).length); dash.push(rw); }
    dash.push([], H(['Kode', 'Unit kerja', 'Jumlah risiko', 'Tinggi/Ekstrem', 'HIRADC', 'Terlambat', 'Pengajuan ' + PERIOD_LBL()]));
    scope().forEach(function (k) { var R = L.filter(function (r) { return r.unit === k; }), sb = S.sub[k + '|' + per()]; dash.push([k, UNIT[k].n, R.length, R.filter(function (r) { return r.K * r.D >= 10; }).length, R.filter(function (r) { return r.bahaya; }).length, R.filter(late).length, sb ? sb.st : 'belum']); });
    var sheets = [{ name: 'Dashboard', rows: dash, w: [26, 44, 12, 12, 10, 10, 16] }];
    scope().forEach(function (k) { var R = L.filter(function (r) { return r.unit === k; }); if (!R.length) return; sheets.push({ name: k, rows: [['RISK REGISTER — ' + k], [UNIT[k].n], [], H(cols.slice())].concat(R.map(row)), w: [4, 14, 24, 14, 8, 50, 40, 40, 26, 6, 6, 8, 9, 30, 30, 16, 50, 26, 24, 22, 12, 30, 13, 12, 36, 12] }); });
    sheets.push({ name: 'ALL_DATA', rows: [H(['Unit'].concat(cols))].concat(L.map(function (r, i) { return [r.unit].concat(row(r, i)); })) });
    download('Risk_Register_UNIZAR_' + per() + '_' + stamp() + '.xlsx', sheets);
  }

  /* =========================================================
     events & render
     ========================================================= */
  var R = { renstra: renderRenstra, km: renderKM, sdg: renderSDG, risk: renderRisk };
  var INTERNAL = ['unit', 'renbang', 'spi', 'mutu', 'asesor', 'dsn'];
  function renderAll() {
    var ss = sess(), ok = !!ss && INTERNAL.indexOf(ss.role) > -1, pg = $('#p-kinerja');
    if (pg) pg.classList.toggle('locked', !ok);
    if (ok) $$('[data-kin]').forEach(function (b) { R[b.getAttribute('data-kin')](b); });
    renderMini(); renderPub();
  }
  /* ---------- public summary (Profil › Rencana & Kinerja): verified figures only ---------- */
  var SDGTXT = { 'SDG 1': 'Beasiswa, keringanan UKT, dan pemberdayaan ekonomi desa binaan.', 'SDG 4': 'Kurikulum OBE, pembelajaran berbasis kasus, dan layanan belajar yang inklusif.',
    'SDG 8': 'Karier lulusan, kewirausahaan, dan kerja yang aman dan sehat, menguatkan keunggulan pariwisata.', 'SDG 16': 'Tata kelola bersih, kode etik, dan kampus aman sebagai wujud rahmatan lil ’alamin.', 'SDG 17': 'Kemitraan tridharma dengan pemerintah, industri, dan kampus dalam serta luar negeri.' };
  function pubPer() {
    for (var q = 4; q >= 1; q--) { var p = '2026-' + q, n = 0, v = 0; K.ind.forEach(function (i) { var x = entry(i.id, p); if (x) { n++; if (x.v === 'ok') v++; } }); if (n && v / n > 0.6) return p; }
    return '2026-1';
  }
  function latestOk(id) { for (var q = 4; q >= 1; q--) { var x = entry(id, '2026-' + q); if (x && x.v === 'ok' && x.r !== '') return { x: x, q: q }; } return null; }
  function renderPub() {
    var p = pubPer(), y = p.slice(0, 4), a = agg(K.ind, p), st = 0, n = 0;
    K.sdg.forEach(function (r) { st += sdgStat(r, p).s || 0; n++; });
    $$('[data-kin-year]').forEach(function (el) {
      var iku = el.getAttribute('data-kin-year') === 'iku';
      el.innerHTML = '<b>' + (iku ? pc(a.avg) : pc(st / n)) + '</b><span>' + (iku ? 'Ketercapaian IKU & IKT ' : 'Ketercapaian SDGs ') + y + '</span>';
    });
    var box = $('[data-kin-sdg]'); if (!box) return;
    box.innerHTML = '<div class="pub-sdg">' + Object.keys(K.sdgmeta).map(function (g) {
      var R = K.sdg.filter(function (r) { return r.sdg === g; }), s2 = 0; R.forEach(function (r) { s2 += sdgStat(r, p).s || 0; });
      var m = K.sdgmeta[g];
      return '<div class="ps" style="--c:' + m[2] + '"><span class="ps-n">' + g.replace('SDG ', '') + '</span><b>' + esc(m[0]) + '</b><p>' + esc(SDGTXT[g]) + '</p><span class="ps-p">' + pc(s2 / R.length) + '<small>' + R.length + ' program · ' + y + '</small></span></div>';
    }).join('') + '</div><p class="pub-note">' + K.sdg.length + ' program implementasi SDGs. Ketercapaian diperbarui sekali setahun' + (S.demo ? ' · angka contoh' : '') + '.</p>';
  }

  function renderMini() {
    $$('[data-kin-mini]').forEach(function (b) {
      var a = agg(K.ind, per()), t = 0, n = 0; K.sdg.forEach(function (r) { t += sdgStat(r, per()).s || 0; n++; });
      b.innerHTML = '<div class="kpis">' + [[pc(a.avg), 'rerata ketercapaian IKU/IKT'], [a.ok + '/' + a.n, 'indikator tercapai'], [pc(t / n), 'ketercapaian SDGs'], [S.risks.length, 'risiko terpantau']].map(function (k) { return '<div class="kpi"><b>' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('') + '</div><p class="muted" style="font-size:13px">Periode TW ' + TWN[cur.q] + ' ' + cur.y + (S.demo ? ' · data contoh' : '') + '</p>';
    });
  }
  document.addEventListener('click', function (e) {
    var t = e.target, el;
    if ((el = t.closest('[data-kin-q]'))) { cur.q = el.getAttribute('data-kin-q'); renderAll(); return; }
    if ((el = t.closest('[data-kin-edit]'))) { openEntry(el.getAttribute('data-kin-edit'), el.getAttribute('data-ctx') ? { title: el.getAttribute('data-ctx') } : null); return; }
    if ((el = t.closest('[data-km-edit]'))) { var r = K.km.filter(function (x) { return x.id === el.getAttribute('data-km-edit'); })[0]; openEntry(r.link || r.id, { tg: r.tg, title: 'IKU Kementerian · ' + r.kode }); return; }
    if ((el = t.closest('[data-km-adv]'))) { var k = S.rep[per()] || 'draf', ix = REPST.map(function (x) { return x[0]; }).indexOf(k); S.rep[per()] = REPST[Math.min(ix + 1, 3)][0]; save(); toast('Status laporan TW ' + TWN[cur.q] + ': ' + REPST[Math.min(ix + 1, 3)][1] + '.'); renderAll(); return; }
    if ((el = t.closest('[data-kin-dl]'))) { ({ renstra: dlRenstra, km: dlKM, sdg: dlSDG, risk: dlRisk })[el.getAttribute('data-kin-dl')](); return; }
    if ((el = t.closest('[data-kin-reset]'))) { S = fresh(el.getAttribute('data-kin-reset') === '1'); save(); toast(S.demo ? 'Data contoh diisi.' : 'Data contoh dikosongkan.'); renderAll(); return; }
    if ((el = t.closest('[data-kin-grp]'))) { var g = el.getAttribute('data-kin-grp'); fR.j = g.slice(0, 3); fR.s = 'all'; var box = el.closest('[data-kin]'); renderRenstra(box); var d = $('#kg-' + g.replace(' ', '')); if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); } return; }
    if ((el = t.closest('[data-fr-j]'))) { fR.j = el.getAttribute('data-fr-j'); renderRenstra(el.closest('[data-kin]')); return; }
    if ((el = t.closest('[data-sdg]'))) { var v = el.getAttribute('data-sdg'); fS = fS === v ? 'all' : v; renderSDG(el.closest('[data-kin]')); return; }
    if ((el = t.closest('[data-rtab]'))) { RV.tab = el.getAttribute('data-rtab'); renderRisk(el.closest('[data-kin]')); return; }
    if ((el = t.closest('[data-cell]'))) { RV.cell = el.getAttribute('data-cell'); RV.tab = 'reg'; renderRisk(el.closest('[data-kin]')); return; }
    if ((el = t.closest('[data-rcell-x]'))) { RV.cell = null; renderRisk(el.closest('[data-kin]')); return; }
    if ((el = t.closest('[data-runit]'))) { RV.unit = el.getAttribute('data-runit'); RV.tab = 'reg'; renderRisk(el.closest('[data-kin]')); return; }
    if ((el = t.closest('[data-rid]'))) { openRisk(el.getAttribute('data-rid')); return; }
    if ((el = t.closest('[data-risk-new]'))) { openRiskForm(); return; }
    if ((el = t.closest('[data-sub-send]'))) { var u = sess().unit; S.sub[u + '|' + per()] = { st: 'diajukan', at: Date.now() }; save(); toast('Risk register ' + u + ' diajukan ke koordinator.'); renderAll(); return; }
    if ((el = t.closest('[data-sub-ok]'))) { S.sub[el.getAttribute('data-sub-ok') + '|' + per()] = { st: 'diterima', at: Date.now() }; save(); toast('Pengajuan diterima dan dikompilasi.'); renderAll(); return; }
    if ((el = t.closest('[data-sub-rev]'))) { var uu = el.getAttribute('data-sub-rev'); S.sub[uu + '|' + per()] = { st: 'revisi', at: Date.now(), note: 'Lengkapi data sesuai catatan koordinator.' }; save(); toast('Dikembalikan ke ' + uu + ' untuk revisi.'); renderAll(); return; }
    if ((el = t.closest('[data-usul-ok]'))) { var x = S.usul.filter(function (z) { return z.id === el.getAttribute('data-usul-ok'); })[0]; openRiskForm({ unit: x.unit, kat: x.kat, risk: x.risk, sebab: x.sebab, usulId: x.id }); return; }
    if ((el = t.closest('[data-usul-no]'))) { S.usul.forEach(function (z) { if (z.id === el.getAttribute('data-usul-no')) z.st = 'ditolak'; }); save(); renderAll(); return; }
    if ((el = t.closest('[data-lap-save]'))) { var o = S.lap[per()] = S.lap[per()] || {}; $$('[data-lap]').forEach(function (a) { o[a.getAttribute('data-lap')] = a.value; }); save(); toast('Isian laporan disimpan.'); return; }
    if ((el = t.closest('[data-lap-print]'))) { $$('[data-lap]').forEach(function (a) { a.setAttribute('data-v', a.value); }); document.body.classList.add('print-rep'); window.print(); setTimeout(function () { document.body.classList.remove('print-rep'); }, 500); return; }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches('[data-kin-y]')) { cur.y = t.value; renderAll(); }
    else if (t.matches('[data-fr-b]')) { fR.b = t.value; renderRenstraList(t.closest('[data-kin]')); }
    else if (t.matches('[data-fr-s]')) { fR.s = t.value; renderRenstraList(t.closest('[data-kin]')); }
    else if (t.matches('[data-fr-mine]')) { fR.mine = t.checked; renderRenstraList(t.closest('[data-kin]')); }
    else if (t.matches('[data-rf]') && t.type !== 'search') { RV[t.getAttribute('data-rf')] = t.value; renderRisk(t.closest('[data-kin]')); }
  });
  var qT;
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches('[data-fr-q]')) { clearTimeout(qT); qT = setTimeout(function () { fR.q = t.value; renderRenstraList(t.closest('[data-kin]')); }, 200); }
    if (t.matches('[data-rf="q"]')) { clearTimeout(qT); qT = setTimeout(function () { RV.q = t.value; var box = t.closest('[data-kin]'); renderRisk(box); var i = $('[data-rf="q"]', box); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 250); }
  });
  document.addEventListener('unizar:session', function () { var ss = sess(); fR.mine = !!ss && ss.role === 'unit'; RV.unit = 'all'; RV.tab = 'sum'; renderAll(); });
  /* login: unit picker for operator/risk owner and staff */
  var lr = $('#l-role'), lu = $('[data-unit-f]');
  if (lr && lu) { var tg = function () { lu.hidden = ['unit', 'dsn'].indexOf(lr.value) < 0; }; lr.addEventListener('change', tg); tg(); }
  renderAll();
})();
