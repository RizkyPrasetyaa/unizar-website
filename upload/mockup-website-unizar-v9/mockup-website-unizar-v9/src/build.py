import base64, json, re, sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent))
from flows import FORMS, EXT, DETAILS, NEWS, AGENDA, PRODI
from kinerja import KIN
from pathlib import Path
from urllib.parse import quote

D = Path(__file__).parent
OUT = Path(sys.argv[1])
LOGO = 'data:image/png;base64,' + base64.b64encode((D / 'logo144.png').read_bytes()).decode()
PATTERN_SVG = ("<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>"
               "<g fill='none' stroke='#F2C230' stroke-opacity='.16' stroke-width='1'>"
               "<rect x='16' y='16' width='32' height='32'/><rect x='16' y='16' width='32' height='32' transform='rotate(45 32 32)'/>"
               "<circle cx='32' cy='32' r='7'/><path d='M0 32h9M55 32h9M32 0v9M32 55v9'/></g></svg>")
PATTERN = "url(\"data:image/svg+xml," + quote(PATTERN_SVG) + "\")"

ICONS = {
 'login': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/>',
 'grid': '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 'hand': '<path d="M7 11l3-3 3 2 4-4 4 4-7 7-3-2-3 3-4-4z"/><path d="M3 12l4-1"/>',
 'cap': '<path d="M22 9L12 4 2 9l10 5 10-5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
 'search': '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
 'menu': '<path d="M4 7h16M4 12h16M4 17h10"/>',
 'close': '<path d="M6 6l12 12M18 6L6 18"/>',
 'lock': '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 'arrow': '<path d="M5 12h14M13 6l6 6-6 6"/>',
 'down': '<path d="M6 9l6 6 6-6"/>',
 'home': '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
 'doc': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
 'ext': '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
 'map': '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
}
def I(n, cls='i'): return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{ICONS[n]}</svg>'
def ph(cap, cls='', style=''): return f'<div class="ph {cls}" data-cap="Foto: {cap}" role="img" aria-label="Tempat foto: {cap}" style="{style}"></div>'
def en(s): return f' data-en="{s}"' if s else ''

# ------------------------------------------------------------------ NAV
NAV = [
 ('profil', 'Profil', 'Profile', 'profil', 'Siapa kami, dari mana kami datang, dan ke mana kami melangkah.', [
   ('Tentang UNIZAR', 'About UNIZAR', 'profil', 'tentang', 'Sambutan rektor, visi, misi, dan keunggulan'),
   ('Sejarah', 'History', 'profil', 'sejarah', 'Perjalanan sejak 1981'),
   ('Pimpinan & Organisasi', 'Leadership', 'profil', 'pimpinan', 'Rektor, wakil rektor, dan struktur organisasi'),
   ('UNIZAR dalam Angka', 'UNIZAR in Numbers', 'profil', 'angka', 'Fakta ringkas yang selalu mutakhir'),
   ('UNIZAR untuk SDGs', 'UNIZAR for the SDGs', 'profil', 'sdgs', 'Lima SDGs yang kami tekuni'),
  ], ('Diferensiasi misi UNIZAR', 'Tiga fokus keunggulan', 'profil', 'tentang', 'wisuda di halaman Rektorat')),
 ('fakultas', 'Fakultas', 'Faculties', 'fakultas', 'Tujuh fakultas dan tiga belas program studi.', [
   ('Kedokteran', 'Medicine', 'fakultas-kedokteran', None, 'Pendidikan Dokter · Profesi Dokter'),
   ('Teknik', 'Engineering', 'fakultas', 'ft', 'Teknik Sipil · Ilmu Komputer'),
   ('Hukum', 'Law', 'fakultas', 'fh', 'Ilmu Hukum'),
   ('Ekonomi & Bisnis', 'Economics & Business', 'fakultas', 'feb', 'Akuntansi · Ekonomi Pembangunan'),
   ('Pertanian', 'Agriculture', 'fakultas', 'fp', 'Agribisnis · Agroekoteknologi'),
   ('MIPA', 'Science', 'fakultas', 'fmipa', 'Biologi'),
   ('Agama Islam', 'Islamic Studies', 'fakultas', 'fai', 'Ekonomi Syariah · Manajemen Bisnis Syariah'),
  ], ('Contoh halaman prodi', 'Pendidikan Dokter', 'prodi-pendidikan-dokter', None, 'praktikum keterampilan klinis')),
 ('direktori', 'Direktori', 'Directory', 'direktori', 'Temukan unit, orang, dokumen, dan lokasi.', [
   ('Unit Kerja', 'Units', 'direktori', 'unit', 'Biro, lembaga, badan, UPT, dan satgas'),
   ('Dosen & Pakar', 'Lecturers & Experts', 'direktori', 'dosen', 'Cari berdasarkan nama atau bidang keahlian'),
   ('Pusat Data & Informasi (Pusdatin)', 'Data & Information Centre', 'pusdatin', None, 'Dokumen resmi, data, statistik, dan JDIH'),
   ('Kontak & Peta Kampus', 'Contact & Map', 'direktori', 'kontak', 'Alamat, telepon, dan denah gedung'),
  ], ('Pusdatin', 'Dokumen, data, dan statistik resmi', 'pusdatin', None, 'arsip dokumen')),
 ('tata-kelola', 'Tata Kelola', 'Governance', 'tata-kelola', 'Akuntabel, berintegritas, dan terbuka bagi publik.', [
   ('Kebijakan & Laporan', 'Policies & Reports', 'tata-kelola', 'kebijakan', 'Laporan tahunan, keuangan teraudit, survei'),
   ('Integritas & Kampus Aman', 'Integrity & Safe Campus', 'tata-kelola', 'integritas', 'Kode etik, Satgas PPKPT, pelaporan'),
   ('Pengawasan Internal', 'Internal Audit', 'tata-kelola', 'pengawasan', 'SPI, manajemen risiko, zona integritas'),
   ('Transparansi & PPID', 'Public Information', 'tata-kelola', 'ppid', 'Daftar informasi publik dan permohonan'),
  ], ('Lapor dengan aman', 'Kanal pelaporan rahasia', 'tata-kelola', 'integritas', 'layanan pengaduan', )),
 ('pendidikan', 'Pendidikan', 'Education', 'pendidikan', 'Dari pendaftaran sampai wisuda.', [
   ('Penerimaan & Beasiswa', 'Admissions & Scholarships', 'pendidikan', 'penerimaan', 'Jalur masuk, biaya, dan beasiswa'),
   ('Kurikulum & Pembelajaran', 'Curriculum & Learning', 'pendidikan', 'kurikulum', 'OBE, MBKM, RPL, dan e-learning'),
   ('Kalender & Panduan', 'Calendar & Guides', 'pendidikan', 'kalender', 'Kalender akademik dan panduan studi'),
   ('Suasana Akademik', 'Academic Life', 'pendidikan', 'suasana', 'Kuliah umum, integritas akademik'),
  ], ('PMB 2027 dibuka', 'Gelombang 1 sampai [tanggal]', 'pendidikan', 'penerimaan', 'calon mahasiswa di stan PMB')),
 ('penelitian', 'Penelitian', 'Research', 'penelitian', 'Riset yang berangkat dari persoalan NTB.', [
   ('Riset UNIZAR', 'Research at UNIZAR', 'penelitian', 'riset', 'Tema unggulan, peta jalan, hibah'),
   ('Publikasi & Inovasi', 'Publications & Innovation', 'publikasi-inovasi', None, 'Jurnal, repositori, SINTA, HKI, hilirisasi'),
   ('Tata Kelola Riset', 'Research Governance', 'penelitian', 'tata-kelola', 'Alur, etik, dan pedoman'),
  ], ('Hibah internal 2027', 'Proposal dibuka', 'penelitian', 'riset', 'peneliti di laboratorium')),
 ('pengabdian', 'Pengabdian', 'Community Service', 'pengabdian', 'Ilmu yang hadir di tengah masyarakat.', [
   ('Program & Desa Binaan', 'Programmes & Partner Villages', 'pengabdian', 'program', 'Program unggulan dan lokasinya'),
   ('Kepakaran & Kolaborasi', 'Expertise & Collaboration', 'pengabdian', 'kepakaran', 'Ajukan kerja sama dengan pakar'),
   ('Dampak & Luaran', 'Impact & Outputs', 'pengabdian', 'dampak', 'Cerita perubahan dan luaran'),
  ], ('Ajukan kolaborasi', 'Untuk desa, sekolah, UMKM', 'pengabdian', 'kepakaran', 'kegiatan di desa binaan')),
 ('penjaminan-mutu', 'Penjaminan Mutu', 'Quality Assurance', 'penjaminan-mutu', 'Sistem mutu yang berjalan, bukan hanya tertulis.', [
   ('Tentang & Kalender Mutu', 'About & Quality Calendar', 'penjaminan-mutu', 'tentang', 'Siklus PPEPP sepanjang tahun'),
   ('Dokumen & Audit', 'Documents & Audit', 'penjaminan-mutu', 'dokumen', 'SPMI, AMI, RTM, dan RTL'),
   ('Akreditasi', 'Accreditation', 'penjaminan-mutu', 'akreditasi', 'Institusi dan program studi'),
   ('Peta Bukti BAN-PT', 'Accreditation Evidence Map', 'peta-bukti', None, '39 indikator IAPT 4.1'),
  ], ('Untuk asesor', 'Peta Bukti 39 indikator', 'peta-bukti', None, 'rapat tinjauan manajemen')),
]
LEFT = NAV[:4]; RIGHT = NAV[4:]

def href(p, s=None):
    return f'href="#{p}"' + (f' data-sec="{s}"' if s else '')

def nav_buttons(items):
    return ''.join(f'<button type="button" data-menu="{k}" aria-expanded="false" aria-controls="mega-{k}"><span{en(e)}>{l}</span>{I("down")}</button>' for k, l, e, *_ in items)

def mega(item):
    k, l, e, p, desc, subs, feat = item
    links = ''.join(f'<a {href(pp, ss)}><b><span{en(se)}>{sl}</span></b><small>{sd}</small></a>' for sl, se, pp, ss, sd in subs)
    ft, fs, fp, fsec, fcap = feat
    return f'''<div class="mega" id="mega-{k}" hidden><div class="wrap">
<div class="mega-intro"><span class="eyebrow">Jelajahi</span><h3{en(e)}>{l}</h3><p>{desc}</p><p style="margin-top:14px"><a class="btn dark" {href(p)}>Buka halaman {I("arrow")}</a></p></div>
<div class="mega-links">{links}</div>
<a class="mega-feat" {href(fp, fsec)}>{ph(fcap)}<div class="t"><b>{ft}</b><small>{fs}</small></div></a>
</div></div>'''

RAIL = [('masuk', 'login', 'Masuk', 'Sign in', ' login'), ('layanan', 'grid', 'Layanan', 'Services', ''),
        ('kerjasama', 'hand', 'Kerjasama & Internasional', 'Partnerships', ''), ('mahasiswa-alumni', 'cap', 'Mahasiswa & Alumni', 'Students & Alumni', '')]

# ------------------------------------------------------------------ helpers
WEBS = {'fakultas-kedokteran': 'Website Fakultas Kedokteran', 'prodi-pendidikan-dokter': 'Website Prodi Pendidikan Dokter',
        'penjaminan-mutu': 'Website BPM', 'penelitian': 'Website LPPM', 'pengabdian': 'Website LPPM', 'publikasi-inovasi': 'Website LPPM'}
def web(label, ghost=False, small=False):
    cls = 'btn ghost' if ghost else ('weblink' if small else 'btn line')
    return f'<a class="{cls}" href="#" title="Alamat website menyusul" data-web>{label} {I("ext")}</a>'
JDIH_BAR = '<div class="slim jdih" style="margin-top:22px"><div><span class="eyebrow">JDIH UNIZAR</span><p style="margin-top:4px"><b style="color:var(--ink)">Jaringan Dokumentasi dan Informasi Hukum.</b> Statuta, peraturan rektor, keputusan, dan produk hukum lain dikelola di website JDIH.</p></div>' + '<a class="btn dark" href="#" data-open="ext:jdih">Buka JDIH UNIZAR <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></a></div>'

def page(pid, title, nav, crumb, h1, lead, cap, body, extra_hero=''):
    if pid in WEBS and not extra_hero:
        extra_hero = f'<div class="btn-row" style="margin-top:20px">{web(WEBS[pid], ghost=True)}</div>'
    return f'''<section class="page" id="p-{pid}" data-title="{title}" data-nav="{nav}" hidden>
<div class="pagehero"><div class="pat"></div><div class="wrap"><div><nav class="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / {crumb}</nav><h1>{h1}</h1><p>{lead}</p>{extra_hero}</div>{ph(cap)}</div></div>
<div class="subnav"><div class="wrap"></div></div>
{body}
</section>'''

def sec(pid, sid, t, eyebrow, h2, p, body, more=''):
    return f'''<section class="sec" id="{pid}--{sid}" data-t="{t}"><div class="wrap">
<div class="sec-h"><div><span class="eyebrow">{eyebrow}</span><h2>{h2}</h2>{f"<p>{p}</p>" if p else ""}</div>{more}</div>
{body}</div></section>'''

def cards(items, cols='g3'):
    out = []
    for it in items:
        t, d = it[0], it[1]
        tag = it[2] if len(it) > 2 else ''
        link = it[3] if len(it) > 3 else None
        pill = '<span class="pill">' + tag + '</span>' if tag else ''
        inner = f'{pill}<h3>{t}</h3><p>{d}</p>'
        if link:
            attr = link if isinstance(link, str) else href(*link)
            out.append(f'<a class="card" {attr}>{inner}<span class="more">Selengkapnya →</span></a>')
        else:
            out.append(f'<div class="card flat">{inner}</div>')
    return f'<div class="grid {cols}">{"".join(out)}</div>'

def docs(items):
    rows = []
    for name, meta, acc in items:
        d = dref(name, meta, acc)
        act = f'<a {d} class="lock">{I("lock")} Masuk untuk membuka</a>' if acc == 'lock' else (f'<a {d}>Lihat ringkasan →</a>' if acc == 'sum' else f'<a {d}>Lihat dokumen →</a>')
        rows.append(f'<li class="doc"><div><b>{name}</b><small>{meta}</small></div>{act}</li>')
    return f'<ul class="clean">{"".join(rows)}</ul>'

def op(spec):
    return f'href="#" data-open="{spec}"'
DOCREG = {}
def dslug(t):
    return re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')[:70]
def dref(t, m='[keterangan]', acc='pub'):
    k = dslug(t)
    DOCREG.setdefault(k, {'t': t, 'm': m, 'acc': acc})
    return op('doc:' + k)
for _k, _t, _m, _a in [('panduan-hki', 'Panduan Pengajuan HKI', 'Sentra HKI · LPPM', 'pub'), ('pedoman-penelitian', 'Pedoman Penelitian', 'LPPM · SK [nomor]', 'pub'),
    ('kode-etik-penelitian', 'Kode Etik Penelitian', 'Komisi Etik · SK [nomor]', 'pub'), ('panduan-hibah', 'Panduan Hibah Internal 2027', 'LPPM', 'pub'),
    ('kalender-akademik', 'Kalender Akademik 2026/2027', 'Biro Akademik · SK [nomor]', 'pub'), ('panduan-akademik', 'Panduan Akademik 2026', 'Biro Akademik', 'pub'),
    ('pedoman-mbkm', 'Pedoman MBKM UNIZAR', 'Wakil Rektor I · SK [nomor]', 'pub'), ('pedoman-antikorupsi', 'Pedoman Pendidikan Antikorupsi', 'SK [nomor]', 'pub'),
    ('pedoman-integritas', 'Pedoman Integritas Akademik & Antiplagiarisme', 'SK [nomor]', 'pub'), ('manajemen-risiko', 'Kebijakan & Peta Risiko Institusi', 'SPI · pembaruan tahunan', 'sum'),
    ('zona-integritas', 'Program Zona Integritas WBK/WBBM', 'Rencana dan capaian', 'pub'), ('pedoman-kerjasama', 'Pedoman Kerja Sama', 'Biro HKA · SK [nomor]', 'pub'),
    ('sertifikat-institusi', 'Sertifikat Akreditasi Institusi', 'BAN-PT · SK [nomor]', 'pub'), ('bagan-organisasi', 'Bagan & SK Struktur Organisasi', 'Rektor · SK [nomor]', 'pub'),
    ('panduan-pkkmb', 'Panduan PKKMB 2027', 'Biro Kemahasiswaan', 'pub'), ('kode-etik', 'Kode Etik Dosen, Tendik & Mahasiswa', 'Rektor · SK [nomor]', 'pub'),
    ('kurikulum-pd', 'Kurikulum Prodi Pendidikan Dokter', 'Prodi · SK [nomor]', 'pub'), ('sertifikat-pd', 'Sertifikat Akreditasi Pendidikan Dokter', 'LAM-PTKes · SK [nomor]', 'pub'),
    ('pedoman-obe', 'Pedoman Kurikulum OBE', 'Wakil Rektor I · SK [nomor]', 'pub'), ('rip', 'Rencana Induk Pengembangan 2025–2045', 'Rektor · ringkasan publik', 'sum'),
    ('renstra', 'Renstra 2025–2029', 'Rektor · SK [nomor]', 'pub'), ('iku', 'Laporan Capaian IKU & IKT 2025', 'Biro Perencanaan & Pengembangan', 'sum'),
    ('data-mhs', 'Data Mahasiswa per Program Studi 2021–2026', 'Pusdatin · Excel / PDF', 'pub'), ('data-dosen', 'Data Dosen & Tendik per Program Studi', 'Pusdatin · Excel / PDF', 'pub'),
    ('data-riset', 'Data Penelitian & Pengabdian 2021–2026', 'Pusdatin · Excel / PDF', 'pub')]:
    DOCREG[_k] = {'t': _t, 'm': _m, 'acc': _a}
DOCREG['sdgs-report'] = {'t': 'Laporan Keberlanjutan UNIZAR (SDGs) 2025', 'm': 'Wakil Rektor IV · ringkasan publik', 'acc': 'pub'}
DOCREG['pedoman-risiko'] = {'t': 'Pedoman Tata Kelola Berbasis Risiko', 'm': 'Rektor · SK [nomor] · SNI ISO 31000:2018', 'acc': 'pub'}

def more(p, s=None, label='Lihat semua'):
    return f'<a class="btn line" {href(p, s)}>{label} {I("arrow")}</a>'

# ------------------------------------------------------------------ HOME
FAC = [('fk', 'FK', 'Kedokteran', 'Pendidikan Dokter · Profesi Dokter', 'fakultas-kedokteran', None),
       ('ft', 'FT', 'Teknik', 'Teknik Sipil · Ilmu Komputer', 'fakultas', 'ft'),
       ('fh', 'FH', 'Hukum', 'Ilmu Hukum', 'fakultas', 'fh'),
       ('feb', 'FEB', 'Ekonomi & Bisnis', 'Akuntansi · Ekonomi Pembangunan', 'fakultas', 'feb'),
       ('fp', 'FP', 'Pertanian', 'Agribisnis · Agroekoteknologi', 'fakultas', 'fp'),
       ('fmipa', 'FMIPA', 'MIPA', 'Biologi', 'fakultas', 'fmipa'),
       ('fai', 'FAI', 'Agama Islam', 'Ekonomi Syariah · Manajemen Bisnis Syariah', 'fakultas', 'fai')]

home = f'''<section class="page" id="p-beranda" data-title="Beranda" data-nav="">
<div class="hero" data-hero-media="emerald"><div class="hero-bg" aria-hidden="true"></div>
<!-- Latar beranda: warna emerald bergerak. Operator web dapat menggantinya dengan foto atau video melalui CMS (atribut data-hero-media). -->
<div class="wrap"><div>
<p class="hero-kicker">UNIVERSITAS ISLAM AL-AZHAR</p>
<h1 data-en="Welcome to the campus of <em>Rahmatan lil 'Alamin</em>">Selamat Datang di Kampus <em>Rahmatan lil 'Alamin</em></h1>
<div class="btn-row"><a class="btn pri" href="#pendidikan" data-sec="penerimaan"><span data-en="Apply for 2027">Daftar PMB 2027</span> {I("arrow")}</a><a class="btn ghost" href="#profil"><span data-en="Discover UNIZAR">Kenali UNIZAR</span></a></div>
</div></div></div>

<div class="aud"><div class="wrap"><span data-en="I am a">Saya adalah</span>
<a href="#pendidikan" data-sec="penerimaan" data-en="Prospective student">Calon mahasiswa</a><a href="#layanan" data-en="Student">Mahasiswa</a><a href="#layanan" data-en="Lecturer & staff">Dosen & tendik</a><a href="#mahasiswa-alumni" data-sec="alumni" data-en="Alumni">Alumni</a><a href="#kerjasama" data-en="Partner">Mitra & industri</a></div></div>

<section class="sec"><div class="wrap">
<div class="stats">
<div class="stat"><b>1981</b><span data-en="Founded in Mataram">Berdiri di Mataram</span></div>
<div class="stat"><b>7</b><span data-en="Faculties">Fakultas</span></div>
<div class="stat"><b>13</b><span data-en="Study programmes">Program studi</span></div>
<div class="stat"><b style="font-size:20px;line-height:1.3;padding-top:8px">Fakta lengkap & sumber data</b><span><a href="#profil" data-sec="angka" data-en="UNIZAR in Numbers →">UNIZAR dalam Angka →</a></span></div>
</div></div></section>

<section class="sec"><div class="wrap">
<div class="sec-h"><div><span class="eyebrow" data-en="What sets us apart">Keunggulan</span><h2 data-en="Three focus areas that define UNIZAR">Tiga fokus yang membedakan UNIZAR</h2><p data-en="Three commitments that shape our teaching, research, and service.">Tiga komitmen yang menjiwai pendidikan, riset, dan pengabdian di UNIZAR.</p></div>{more('profil', 'tentang', 'Baca diferensiasi misi')}</div>
<div class="focus">
<a class="card" href="#" data-open="detail:fokus-pendidikan">{ph('mahasiswa berdiskusi di kelas', '')}<div class="body"><span class="pill">Pendidikan</span><h3>Misi Pendidikan Berkualitas</h3><p>Kurikulum berbasis luaran, pembelajaran berbasis kasus dan proyek, serta dosen yang terus bertumbuh. Setiap lulusan kami siapkan kompeten, beretika, dan siap bersaing.</p></div></a>
<a class="card" href="#" data-open="detail:fokus-rahmatan">{ph('sivitas lintas latar belakang di masjid kampus', 'warm')}<div class="body"><span class="pill gold">Nilai</span><h3>Kampus Rahmatan lil 'Alamin</h3><p>Islam yang menebar rahmat bagi semua. Kampus yang aman, inklusif, dan berintegritas, terbuka bagi siapa pun tanpa memandang suku, agama, dan latar belakang.</p></div></a>
<a class="card" href="#" data-open="detail:fokus-pariwisata">{ph('pantai dan desa wisata di Lombok', 'sky')}<div class="body"><span class="pill">Pariwisata</span><h3>Berwawasan Kepariwisataan Berkelanjutan</h3><p>Lombok adalah rumah kami sekaligus destinasi dunia. Setiap prodi menghadirkan wawasan kepariwisataan, dari kesehatan wisata dan ekonomi halal sampai pelestarian alam dan budaya Sasak.</p></div></a>
</div></div></section>

<section class="sec" style="background:#fff"><div class="wrap">
<div class="sec-h"><div><span class="eyebrow" data-en="Study with us">Belajar di UNIZAR</span><h2 data-en="Seven faculties, thirteen programmes">Tujuh fakultas, tiga belas program studi</h2></div>{more('fakultas', None, 'Semua fakultas')}</div>
<div class="fac-scroll">{''.join(f'<a class="fac-chip" {href(p, s)}><span class="abbr">{a}</span><b>{n}</b><small>{pr}</small></a>' for _, a, n, pr, p, s in FAC)}</div>
</div></section>

<section class="sec"><div class="wrap">
<div class="sec-h"><div><span class="eyebrow" data-en="Stories">Kabar & kisah</span><h2 data-en="What our campus is doing">Yang sedang terjadi di kampus</h2></div>{more('berita', None, 'Semua berita')}</div>
<div class="stories">
<a class="story" href="#" data-open="detail:berita-posyandu">{ph('posyandu di desa binaan Lombok Tengah')}<div class="t"><span class="pill red">Pengabdian</span><h3>Mahasiswa kedokteran dampingi posyandu di tiga desa binaan</h3><p class="muted">Program berkelanjutan bersama puskesmas setempat, berfokus pada gizi balita dan kesehatan ibu.</p><small class="muted">[tanggal]</small></div></a>
<div class="story-stack">
<a class="story sm" href="#" data-open="detail:berita-hibah">{ph('laboratorium biologi', 'sky')}<div class="t"><span class="pill">Penelitian</span><h3>Dosen UNIZAR raih hibah riset kolaborasi internasional</h3><small class="muted">[tanggal]</small></div></a>
<a class="story sm" href="#" data-open="detail:berita-juara">{ph('tim debat di panggung', 'warm')}<div class="t"><span class="pill gold">Prestasi</span><h3>Tim mahasiswa juara kompetisi ilmiah tingkat nasional</h3><small class="muted">[tanggal]</small></div></a>
</div></div></div></section>

<section class="sec" style="background:#fff"><div class="wrap split">
<div><div class="sec-h"><div><span class="eyebrow" data-en="Agenda">Agenda</span><h2 data-en="Coming up">Segera di kampus</h2></div></div>
<ul class="clean agenda">{''.join(f'<li><span class="d">{d.split()[0]}<small>{d.split()[1]}</small></span><div><a href="#" data-open="detail:agenda-{k}"><b>{t}</b></a><div class="muted">{w}</div></div></li>' for k, d, t, w in AGENDA)}</ul></div>
<div class="band" style="align-self:stretch"><div><span class="eyebrow" style="color:var(--gold)">PMB 2027</span><h2>Mulai perjalananmu di UNIZAR</h2><p>Lima jalur masuk, beasiswa KIP-Kuliah dan beasiswa internal, serta pendaftaran sepenuhnya daring.</p></div><a class="btn pri" href="#pendidikan" data-sec="penerimaan">Lihat jalur masuk {I("arrow")}</a></div>
</div></section>

<section class="sec"><div class="wrap">
<div class="sec-h"><div><span class="eyebrow" data-en="Partners">Mitra</span><h2 data-en="We work with">Bekerja bersama</h2></div>{more('kerjasama', None, 'Semua kerja sama')}</div>
<div class="partners">{''.join(f'<a href="#" data-open="detail:mitra-{i - 1}">[Logo mitra {i}]</a>' for i in range(1, 7))}</div>
<div class="slim" style="margin-top:28px"><p><b style="color:var(--ink)">Mencari dokumen mutu atau bukti akreditasi?</b> Semua tersedia di Penjaminan Mutu dan Pusdatin.</p><div class="btn-row"><a class="btn line" href="#peta-bukti">Peta Bukti BAN-PT</a><a class="btn line" href="#pusdatin">Pusdatin</a></div></div>
</div></section>
</section>'''

# ------------------------------------------------------------------ PROFIL
P = 'profil'
profil = page(P, 'Profil', P, 'Profil', 'Mengenal UNIZAR', 'Universitas Islam di jantung Kota Mataram yang tumbuh bersama masyarakat Nusa Tenggara Barat sejak 1981.', 'Gedung Rektorat UNIZAR',
 sec(P, 'tentang', 'Tentang UNIZAR', 'Sambutan Rektor', 'Selamat datang di Universitas Islam Al-Azhar', None,
  f'''<div class="split"><div style="display:grid;gap:16px;font-size:17px;max-width:66ch">
<p><i>Assalamu'alaikum warahmatullahi wabarakatuh.</i></p>
<p>Empat puluh lima tahun lalu, UNIZAR lahir dari satu kegelisahan: anak-anak muda Nusa Tenggara Barat harus pergi jauh untuk kuliah. Para pendiri memilih membangun kampus di sini, di tanah sendiri.</p>
<p>Semangat itu yang kami jaga sampai hari ini. Kami ingin setiap lulusan UNIZAR menguasai ilmunya, jujur dalam bekerja, dan pulang membawa manfaat bagi kampung halamannya. Itulah makna <i>rahmatan lil 'alamin</i> bagi kami.</p>
<p>Melalui website ini, kami membuka diri seluas-luasnya: program studi, riset, layanan, laporan, dan dokumen tata kelola. Silakan menjelajah, dan sampaikan masukan Anda kepada kami.</p>
<p><b>[Nama dan gelar Rektor]</b><br><span class="muted">Rektor Universitas Islam Al-Azhar</span></p></div>
<div style="display:grid;gap:16px;align-content:start">{ph('potret Rektor', '', 'height:340px')}</div></div>
<div class="vm">
<div class="vm-visi"><span class="eyebrow">Visi</span><p>[Visi resmi UNIZAR sesuai Statuta dan RIP]</p></div>
<div data-tabs class="vm-tabs"><div class="tabs-l" role="tablist" aria-label="Misi, tujuan, sasaran, dan strategi"><button type="button" role="tab" aria-selected="true">Misi</button><button type="button" role="tab" aria-selected="false">Tujuan</button><button type="button" role="tab" aria-selected="false">Sasaran</button><button type="button" role="tab" aria-selected="false">Strategi pencapaian</button></div>
<div role="tabpanel"><ol class="vm-list"><li>[Misi pendidikan dan pengajaran]</li><li>[Misi penelitian dan inovasi]</li><li>[Misi pengabdian kepada masyarakat]</li><li>[Misi tata kelola dan kerja sama]</li></ol></div>
<div role="tabpanel" hidden><ol class="vm-list"><li>[Tujuan 1: lulusan yang kompeten, beriman, dan berakhlak]</li><li>[Tujuan 2: riset dan inovasi yang bermanfaat]</li><li>[Tujuan 3: pengabdian yang memberdayakan masyarakat NTB]</li><li>[Tujuan 4: tata kelola yang baik dan kemitraan yang luas]</li></ol></div>
<div role="tabpanel" hidden><p class="muted" style="margin-bottom:12px">Sasaran strategis Renstra UNIZAR 2026–2027 (SK Rektor No. 076B/SK/REK/UNIZAR-012/III/2026).</p><ol class="vm-sas"><li><span class="vm-n">1</span><div><b>Tercapainya mutu pembelajaran dan lulusan yang memiliki kompetensi tinggi, beriman, berakhlak, dan inovatif</b><small>Learning & Growth</small></div></li><li><span class="vm-n">2</span><div><b>Tercapainya mutu kemahasiswaan</b><small>Learning & Growth</small></div></li><li><span class="vm-n">3</span><div><b>Tercapainya peningkatan kapasitas dan kapabilitas sumber daya manusia</b><small>Learning & Growth</small></div></li><li><span class="vm-n">4</span><div><b>Tercapainya mutu sarana prasarana dan peningkatan pendapatan serta sistem keuangan yang akuntabel</b><small>Internal Business Process, Learning & Growth</small></div></li><li><span class="vm-n">5</span><div><b>Tercapainya mutu penelitian, publikasi ilmiah, dan pengabdian kepada masyarakat (PkM) yang berbasis riset dan inovasi</b><small>Learning & Growth</small></div></li><li><span class="vm-n">6</span><div><b>Tercapainya peningkatan kerja sama dalam dan luar negeri</b><small>Internal Business Process</small></div></li><li><span class="vm-n">7</span><div><b>Tercapainya peningkatan mutu tata kelola (good governance) kelembagaan dalam sistem manajemen</b><small>Internal Business Process</small></div></li></ol></div>
<div role="tabpanel" hidden><div class="vm-str"><div><span class="eyebrow">Jangka panjang · 25 tahun</span><b>Rencana Induk Pengembangan 2025–2045</b><p>[Tahapan besar menuju visi: penguatan mutu, daya saing, dan rekognisi internasional.]</p></div><div><span class="eyebrow">Jangka menengah · 5 tahun</span><b>Rencana Strategis</b><p>[Strategi per sasaran strategis beserta indikator kinerja dan targetnya.]</p></div><div><span class="eyebrow">Jangka pendek · 1 tahun</span><b>Rencana Kerja & Anggaran Tahunan</b><p>[Program kerja unit yang diturunkan dari Renstra dan dipantau tiap triwulan.]</p></div></div></div>
</div></div>''') +
 sec(P, 'sejarah', 'Sejarah', 'Sejarah', 'Perjalanan sejak 1981', 'Disusun dari dokumen sejarah institusi. Setiap tonggak dapat ditautkan ke SK aslinya.',
  '''<ul class="clean tl">
<li><b>1979</b><p>Yayasan Pesantren Luhur Al-Azhar didirikan untuk berperan dalam pendidikan tinggi di NTB.</p></li>
<li><b>1981</b><p>SK Yayasan No. 01/YPLA/1981 tanggal 10 Mei 1981 membentuk Universitas Islam Al-Azhar dengan empat fakultas perintis: Hukum, Pertanian, Teknik, dan Ekonomi.</p></li>
<li><b>1984</b><p>Keempat fakultas memperoleh status terdaftar melalui SK Mendikbud No. 0378/0/1984.</p></li>
<li><b>1992</b><p>Fakultas MIPA dengan Program Studi Biologi resmi terdaftar, menjadi cikal bakal pendidikan kedokteran.</p></li>
<li><b>2004</b><p>Izin penyelenggaraan Program Studi Pendidikan Dokter terbit.</p></li>
<li><b>2016–2022</b><p>Program Studi Akuntansi (2016), Agroekoteknologi (2020), dan Ilmu Komputer (2022) dibuka.</p></li>
<li><b>2023</b><p>Fakultas Agama Islam berdiri dengan Program Studi Ekonomi Syariah dan Manajemen Bisnis Syariah.</p></li>
</ul>''') +
 sec(P, 'pimpinan', 'Pimpinan & Organisasi', 'Pimpinan', 'Pimpinan universitas', None,
  '<div class="grid g5">' + ''.join(f'<a class="card" href="#" data-open="detail:pimpinan-{r.lower().replace(" ", "-")}" style="padding:0;overflow:hidden">{ph("potret resmi", "", "height:190px;border-radius:0")}<div style="padding:16px 18px"><span class="eyebrow">{r}</span><h3 style="font-size:17px;margin-top:4px">[Nama & gelar]</h3><p style="font-size:13.5px">{d}</p></div></a>' for r, d in [('Rektor', 'Memimpin penyelenggaraan universitas'), ('Wakil Rektor I', '[Bidang]'), ('Wakil Rektor II', '[Bidang]'), ('Wakil Rektor III', '[Bidang]'), ('Wakil Rektor IV', '[Bidang]')]) + '</div>' +
  f'<div class="slim" style="margin-top:20px"><p>Struktur organisasi serta tugas dan fungsi setiap unit tersedia lengkap.</p><div class="btn-row"><a class="btn line" href="#" data-open="doc:bagan-organisasi">Bagan & SK organisasi</a><a class="btn line" href="#direktori" data-sec="unit">Direktori unit</a></div></div>') +
 sec(P, 'angka', 'Dalam Angka', 'Fakta ringkas', 'UNIZAR dalam Angka', 'Angka ditarik otomatis dari PD Dikti dan sistem internal, lengkap dengan tanggal pembaruan.',
  '<div class="stats s5">' + ''.join(f'<div class="stat"><b>{v}</b><span>{l}</span></div>' for v, l in [('7', 'Fakultas'), ('13', 'Program studi'), ('[n]', 'Mahasiswa aktif'), ('[n]', 'Dosen tetap'), ('[n]', 'Alumni'), ('[n]', 'Mitra kerja sama'), ('[n]', 'Publikasi 3 tahun'), ('[n]', 'HKI tercatat')]) +
  '<div class="stat" data-kin-year="iku"><b>–</b><span>Ketercapaian IKU & IKT</span></div><div class="stat" data-kin-year="sdg"><b>–</b><span>Ketercapaian SDGs</span></div></div>' +
  '<p class="note" style="margin-top:14px">Setiap angka menampilkan sumber dan tanggal pembaruan saat disentuh, misalnya "PD Dikti · 1 Okt 2026". Ketercapaian IKU & IKT dan SDGs diperbarui sekali setahun dari laporan kinerja tahunan.</p>') +
 sec(P, 'sdgs', 'UNIZAR untuk SDGs', 'Keberlanjutan', 'Kontribusi pada Sustainable Development Goals', 'Lima SDGs yang kami tekuni sesuai Keputusan Rektor tentang Implementasi SDGs.', '<div data-kin-sdg></div>'))

# ------------------------------------------------------------------ FAKULTAS
F = 'fakultas'
fac_cards = ''.join(f'''<div class="card" id="fakultas--{k}" style="padding:0;overflow:hidden">{ph(f'kegiatan Fakultas {n}', ['', 'sky', 'warm', 'red'][i % 4], 'height:150px;border-radius:0')}<div style="padding:18px 20px 22px;display:grid;gap:12px"><span class="eyebrow">{a}</span><h3>Fakultas {n}</h3><ul class="clean" style="display:grid;gap:8px">{''.join(f'<li style="display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:14.5px"><a {'href="#prodi-pendidikan-dokter"' if x == "Pendidikan Dokter" else f'href="#" data-open="detail:prodi-x" data-title="Program Studi {x}"'}>{x}</a>{web("Web prodi", small=True)}</li>' for x in pr.split(' · '))}</ul><div class="btn-row" style="gap:8px;margin-top:4px"><a class="btn dark" style="padding:10px 16px;font-size:14px" {href(p, None) if p != 'fakultas' else op('detail:fak-' + k)}>Lihat fakultas</a>{web("Website fakultas").replace('class="btn line"', 'class="btn line" style="padding:10px 16px;font-size:14px"')}</div></div></div>''' for i, (k, a, n, pr, p, s) in enumerate(FAC))
fakultas = page(F, 'Fakultas', F, 'Fakultas', 'Fakultas & Program Studi', 'Tujuh fakultas dengan tiga belas program studi sarjana dan profesi.', 'gedung kuliah',
 sec(F, 'daftar', 'Semua fakultas', 'Pilih fakultas', 'Temukan program studi Anda', 'Status akreditasi setiap prodi ditarik dari data resmi dan selalu menampilkan masa berlakunya.', f'<div class="grid g3">{fac_cards}</div>'))

FK = 'fakultas-kedokteran'
fkp = page(FK, 'Fakultas Kedokteran', F, '<a href="#fakultas">Fakultas</a> / Kedokteran', 'Fakultas Kedokteran', 'Contoh pola halaman fakultas: satu halaman yang bercerita, dengan dua program studi di dalamnya.', 'mahasiswa di skills lab',
 sec(FK, 'tentang', 'Tentang', 'Tentang fakultas', 'Dokter yang siap melayani NTB', None,
  f'<div class="split"><div style="display:grid;gap:14px;max-width:64ch"><p class="lead">[Ringkasan keunggulan fakultas: fokus kesehatan pariwisata dan pariwisata kesehatan, jejaring rumah sakit pendidikan, dan kedokteran berbasis komunitas.]</p><p class="muted">Halaman fakultas memakai templat yang sama dengan universitas sehingga tim fakultas cukup mengisi teks, foto, dan berita.</p><div class="btn-row"><a class="btn dark" href="#prodi-pendidikan-dokter">Pendidikan Dokter</a><a class="btn line" href="#prodi-pendidikan-dokter">Profesi Dokter</a></div></div>{ph("Dekan bersama mahasiswa", "", "height:260px")}</div>') +
 sec(FK, 'prodi', 'Program studi', 'Program studi', 'Dua tahap menjadi dokter', None,
  cards([('Pendidikan Dokter (S1)', 'Tahap akademik 7 semester, berbasis blok dan OBE. Gelar S.Ked.', 'Sarjana', ('prodi-pendidikan-dokter',)),
         ('Profesi Dokter', 'Kepaniteraan klinik di rumah sakit pendidikan dan jejaring. Gelar dr.', 'Profesi', ('prodi-pendidikan-dokter',))], 'g2')) +
 sec(FK, 'fasilitas', 'Fasilitas', 'Fasilitas', 'Tempat belajar', None,
  '<div class="grid g3">' + ''.join(f'<a class="card" href="#" data-open="detail:fas-{k}" style="padding:0;overflow:hidden">{ph(c, "", "height:160px;border-radius:0")}<div style="padding:16px 18px"><h3 style="font-size:17px">{t}</h3><span class="more">Detail fasilitas →</span></div></a>' for k, t, c in [('skills-lab', 'Skills Lab', 'ruang keterampilan klinis'), ('lab-terpadu', 'Laboratorium terpadu', 'praktikum anatomi'), ('rs-jejaring', 'Rumah sakit jejaring', 'kepaniteraan klinik')]) + '</div>') +
 sec(FK, 'kabar', 'Kabar', 'Kabar fakultas', 'Berita terbaru', None,
  cards([('[Judul berita fakultas]', '[Ringkasan satu kalimat]', 'Akademik', 'href="#" data-open="detail:berita-kuliah-umum"'), ('[Judul berita fakultas]', '[Ringkasan satu kalimat]', 'Riset', 'href="#" data-open="detail:berita-hibah"'), ('[Judul berita fakultas]', '[Ringkasan satu kalimat]', 'Pengabdian', 'href="#" data-open="detail:berita-posyandu"')])))

PR = 'prodi-pendidikan-dokter'
prodi = page(PR, 'Pendidikan Dokter', F, '<a href="#fakultas">Fakultas</a> / <a href="#fakultas-kedokteran">Kedokteran</a> / Pendidikan Dokter', 'Pendidikan Dokter', 'Contoh pola halaman program studi. Status akreditasi tampil sebagai lencana, bukan tab terpisah.', 'praktikum keterampilan klinis',
 sec(PR, 'tentang', 'Tentang Prodi', 'Tentang', 'Program studi sarjana kedokteran', None,
  f'''<div class="split"><div style="display:grid;gap:14px;max-width:64ch"><p class="lead">[Profil singkat prodi dan keunggulannya.]</p>
<div class="grid g3"><div class="card flat"><span class="eyebrow">Gelar</span><b>S.Ked</b></div><div class="card flat"><span class="eyebrow">Masa studi</span><b>7 semester</b></div><div class="card flat"><span class="eyebrow">Beban</span><b>[n] sks</b></div></div>
<div class="btn-row"><a class="btn pri" href="#pendidikan" data-sec="penerimaan">Daftar sekarang</a><a class="btn line" href="#direktori" data-sec="kontak">Hubungi prodi</a></div></div>
<div class="card"><span class="eyebrow">Akreditasi</span><h3>[Peringkat] · LAM-PTKes</h3><p>SK [nomor] · berlaku sampai [tanggal]</p><a class="more" href="#" data-open="doc:sertifikat-pd">Lihat sertifikat →</a></div></div>''') +
 sec(PR, 'belajar', 'Belajar di Sini', 'Kurikulum', 'Belajar di Pendidikan Dokter', 'Capaian pembelajaran, struktur kurikulum, dan fasilitas dalam satu tempat.',
  cards([('Capaian pembelajaran lulusan', 'Sikap, pengetahuan, keterampilan umum, dan keterampilan klinis.', 'CPL'),
         ('Struktur kurikulum', 'Blok per semester, termasuk pendidikan antikorupsi dan elektif lintas prodi.', 'Kurikulum', 'href="#" data-open="doc:kurikulum-pd"'),
         ('Fasilitas belajar', 'Skills lab, laboratorium terpadu, dan rumah sakit jejaring.', 'Fasilitas', ('fakultas-kedokteran', 'fasilitas'))])) +
 sec(PR, 'dosen', 'Dosen', 'Dosen', 'Dosen pengampu', 'Kualifikasi dan jabatan akademik ditarik dari PD Dikti.',
  '<div class="grid g4">' + ''.join(f'<a class="card" href="#" data-open="detail:dosen" style="flex-direction:row;align-items:center;gap:12px"><span style="width:52px;height:52px;border-radius:50%;background:var(--em-100);flex:none"></span><div><b style="font-size:14.5px">[Nama dosen]</b><p style="font-size:13px">{j}</p></div></a>' for j in ['Lektor Kepala', 'Lektor', 'Lektor', 'Asisten Ahli']) + f'</div><p style="margin-top:14px">{more("direktori", "dosen", "Semua dosen & pakar")}</p>') +
 sec(PR, 'lulusan', 'Lulusan', 'Lulusan', 'Ke mana lulusan melangkah', None,
  '<div class="stats">' + ''.join(f'<div class="stat"><b>{v}</b><span>{l}</span></div>' for v, l in [('[n]%', 'Lulus uji kompetensi'), ('[n] bln', 'Masa tunggu kerja'), ('[n]%', 'Kepuasan pengguna'), ('[n]%', 'Respons tracer study')]) + '</div>'))

# ------------------------------------------------------------------ DIREKTORI
DI = 'direktori'
UNITS = [('Biro Akademik', 'biro', 'akademik@unizar.ac.id', 'Gedung Rektorat Lt. 2'), ('Biro Kemahasiswaan', 'biro', 'kemahasiswaan@unizar.ac.id', 'Gedung Rektorat Lt. 2'),
         ('Biro Keuangan', 'biro', 'keuangan@unizar.ac.id', 'Gedung Rektorat Lt. 2'), ('Biro Sumber Daya Manusia', 'biro', 'sdm@unizar.ac.id', 'Gedung Rektorat Lt. 2'),
         ('Biro Humas, Kerja Sama & Alumni', 'biro', 'hka@unizar.ac.id', 'Gedung Rektorat Lt. 2'), ('Biro Umum', 'biro', 'biroumum@unizar.ac.id', 'Gedung Rektorat Lt. 1'),
         ('Biro Perencanaan & Pengembangan', 'biro', 'renstrabang@unizar.ac.id', 'Gedung Rektorat Lt. 2'), ('Biro Hukum & Administrasi Umum', 'biro', 'hukum@unizar.ac.id', 'Gedung Rektorat Lt. 2'),
         ('LPPM', 'lembaga', '[email]', '[lokasi]'), ('Badan Penjaminan Mutu', 'badan', '[email]', '[lokasi]'), ('Satuan Pengawasan Internal', 'badan', '[email]', '[lokasi]'),
         ('PUSTIK', 'upt', '[email]', '[lokasi]'), ('Perpustakaan', 'upt', '[email]', '[lokasi]'), ('Inkubator Bisnis dan Teknologi (ITe)', 'upt', '[email]', '[lokasi]'),
         ('Unit Bisnis', 'upt', '[email]', '[lokasi]'), ('Unizar Learning Center (ULC)', 'upt', '[email]', '[lokasi]'), ('Unit Keselamatan dan Kesehatan Kerja (K3)', 'upt', '[email]', '[lokasi]'), ('Satgas PPKPT', 'satgas', '[email]', '[lokasi]')]
UNIT_WEB = {'LPPM', 'Badan Penjaminan Mutu'} | {n for n, c, e, l in UNITS if c == 'upt'}
unit_html = ''.join(f'<div class="card" data-item data-k="{c}"><span class="pill">{c.upper() if c == "upt" else c.capitalize()}</span><h3 style="font-size:17px">{n}</h3><p style="font-size:14px">{e}<br>{l}</p><div class="btn-row" style="gap:8px;margin-top:auto"><a class="btn dark" style="padding:10px 16px;font-size:14px" {op("detail:unit-" + dslug(n))}>Detail unit</a>{web("Website") if n in UNIT_WEB else ""}</div></div>' for n, c, e, l in UNITS)
direktori = page(DI, 'Direktori', DI, 'Direktori', 'Direktori', 'Satu tempat untuk menemukan unit kerja, dosen dan pakar, dokumen, serta lokasi di kampus.', 'denah kampus',
 sec(DI, 'unit', 'Unit Kerja', 'Unit kerja', 'Biro, lembaga, badan, dan UPT', None,
  f'<div data-filter><div class="toolbar"><div class="field"><label for="u-q">Cari unit</label><input id="u-q" data-filter-text placeholder="mis. keuangan, perpustakaan"></div><div class="chips" data-chips="k" role="group" aria-label="Jenis unit"><button type="button" data-v="all" aria-pressed="true">Semua</button><button type="button" data-v="biro" aria-pressed="false">Biro</button><button type="button" data-v="lembaga" aria-pressed="false">Lembaga</button><button type="button" data-v="badan" aria-pressed="false">Badan</button><button type="button" data-v="upt" aria-pressed="false">UPT</button><button type="button" data-v="satgas" aria-pressed="false">Satgas</button></div></div><div class="grid g3">{unit_html}</div></div>') +
 sec(DI, 'dosen', 'Dosen & Pakar', 'Dosen & pakar', 'Cari dosen dan kepakarannya', 'Profil publik memuat jabatan akademik, bidang keahlian, dan tautan SINTA/Google Scholar. Data pribadi tidak ditampilkan.',
  '<div data-filter><div class="toolbar"><div class="field"><label for="d-q2">Nama atau bidang keahlian</label><input id="d-q2" data-filter-text placeholder="mis. ergonomi, hukum agraria, agribisnis"></div><div class="field" style="flex:0 1 220px"><label for="d-f2">Fakultas</label><select id="d-f2"><option>Semua fakultas</option>' + ''.join(f'<option>{n}</option>' for _, _, n, *_ in FAC) + '</select></div></div><div class="grid g4">' +
  ''.join(f'<a class="card" href="#" data-open="detail:dosen" data-item style="flex-direction:row;gap:12px;align-items:center"><span style="width:52px;height:52px;border-radius:50%;background:var(--em-100);flex:none"></span><div><b style="font-size:14.5px">[Nama dosen]</b><p style="font-size:13px">{j} · {b}</p></div></a>' for j, b in [('Guru Besar', 'hukum agraria'), ('Lektor Kepala', 'ergonomi'), ('Lektor Kepala', 'agribisnis'), ('Lektor', 'akuntansi'), ('Lektor', 'teknik sipil'), ('Lektor', 'biologi'), ('Asisten Ahli', 'ekonomi syariah'), ('Asisten Ahli', 'ilmu komputer')]) + '</div></div>') +
 sec(DI, 'dokumen', 'Pusdatin', 'Dokumen', 'Pusdatin', None, f'<div class="slim"><p>Statuta, peraturan, pedoman, SOP, rencana strategis, dan laporan, lengkap dengan nomor SK dan riwayat versi.</p><a class="btn dark" href="#pusdatin">Buka Pusdatin {I("arrow")}</a></div>') +
 sec(DI, 'kontak', 'Kontak & Peta', 'Kontak', 'Kontak & peta kampus', None,
  f'<div class="split"><div class="card"><h3>Universitas Islam Al-Azhar</h3><p>Jl. Unizar No. 20, Turida, Sandubaya<br>Mataram, Nusa Tenggara Barat 83232</p><p><b style="color:var(--ink)">Telepon</b> (0370) 6175555<br><b style="color:var(--ink)">Email</b> humas@unizar.ac.id</p><p><b style="color:var(--ink)">Jam layanan</b> Senin–Jumat, 08.00–16.00 WITA</p><div class="btn-row"><button class="btn dark" type="button" data-open="form:kontak">Kirim pesan</button><button class="btn line" type="button" data-open="detail:aksesibilitas">Pengaturan tampilan</button></div></div>{ph("denah kampus interaktif (tautan ke peta)", "sky", "height:260px")}</div>'))

# ------------------------------------------------------------------ PUSAT DOKUMEN
DOCS = [('Statuta Universitas Islam Al-Azhar', 'peraturan', 'Yayasan · SK [nomor] · v3.0', 'pub'),
        ('Rencana Induk Pengembangan 2025–2045', 'rencana', 'Rektor · SK [nomor] · ringkasan publik', 'sum'),
        ('Renstra 2025–2029', 'rencana', 'Rektor · SK [nomor] · v1.2', 'pub'),
        ('Struktur Organisasi & Tata Kerja', 'peraturan', 'Rektor · SK [nomor] · v2.0', 'pub'),
        ('Kode Etik Dosen, Tendik & Mahasiswa', 'pedoman', 'Rektor · SK [nomor]', 'pub'),
        ('Pedoman Pencegahan & Penanganan Kekerasan (PPKPT)', 'pedoman', 'Satgas PPKPT · SK [nomor]', 'pub'),
        ('Pedoman Kurikulum OBE', 'pedoman', 'WR I · SK [nomor] · v2.1', 'pub'),
        ('Kebijakan, Manual & Standar SPMI', 'mutu', 'BPM · SK [nomor] · v4.0', 'lock'),
        ('Ikhtisar Kebijakan & Standar SPMI', 'mutu', 'BPM · ringkasan 4 halaman', 'pub'),
        ('Laporan Audit Mutu Internal 2025', 'mutu', 'BPM · siklus 2025', 'lock'),
        ('Laporan Tahunan 2025', 'laporan', 'Rektor · ringkasan publik', 'sum'),
        ('Laporan Keuangan Teraudit 2025', 'laporan', 'KAP [nama] · opini dan ikhtisar', 'sum'),
        ('Renstra Penelitian & PkM 2025–2029', 'rencana', 'LPPM · SK [nomor]', 'pub'),
        ('Data Pribadi Pegawai', 'laporan', 'Biro SDM', 'lock')]
def acc_cell(a, n, m):
    d = dref(n, m, a)
    return f'<a {d} class="lock">{I("lock")} Masuk</a>' if a == 'lock' else (f'<a {d}>Ringkasan →</a>' if a == 'sum' else f'<a {d}>Lihat →</a>')
doc_rows = ''.join(f'<tr data-item data-k="{c}"><td><a {dref(n, m, a)}><b>{n}</b></a><span class="sub">{m}</span></td><td>{c.capitalize()}</td><td>{acc_cell(a, n, m)}</td></tr>' for n, c, m, a in DOCS)
PD = 'pusdatin'
PUSDATIN_EXTRA = (sec('pusdatin', 'data', 'Data & statistik', 'Data', 'Data & statistik universitas', 'Data utama yang sering diminta, diperbarui dari PD Dikti dan sistem internal. Setiap tabel dapat diunduh.',
  cards([('UNIZAR dalam Angka', 'Ringkasan fakta universitas yang selalu mutakhir.', 'Ringkasan', ('profil', 'angka')),
         ('Mahasiswa per prodi', 'Jumlah mahasiswa aktif, baru, dan lulusan per tahun akademik.', 'Tabel', 'href="#" data-open="doc:data-mhs"'),
         ('Dosen & tenaga kependidikan', 'Jumlah, kualifikasi, dan jabatan akademik per prodi.', 'Tabel', 'href="#" data-open="doc:data-dosen"'),
         ('Akreditasi', 'Status akreditasi terkini dan arsip sertifikat.', 'Akreditasi', ('penjaminan-mutu', 'akreditasi')),
         ('Penelitian & pengabdian', 'Judul, pendanaan, dan luaran per tahun.', 'Tabel', 'href="#" data-open="doc:data-riset"'),
         ('Permintaan data', 'Ajukan permintaan data untuk riset atau keperluan resmi.', 'Layanan', 'href="#" data-open="form:permintaan-data"')])) +
  sec('pusdatin', 'jdih', 'JDIH', 'Produk hukum', 'Jaringan Dokumentasi dan Informasi Hukum', None, JDIH_BAR))
pusdok = page(PD, 'Pusat Data dan Informasi', 'direktori', '<a href="#direktori">Direktori</a> / Pusdatin', 'Pusat Data dan Informasi', 'Dokumen resmi, data, dan statistik universitas di satu tempat. Dokumen bertanda gembok dapat dibuka oleh sivitas dan asesor setelah masuk.', 'arsip dokumen',
 sec(PD, 'daftar', 'Daftar dokumen', 'Cari dokumen', 'Temukan dokumen resmi', None,
  f'''<div data-filter><div class="toolbar"><div class="field"><label for="pd-q">Judul, nomor SK, atau unit</label><input id="pd-q" data-filter-text placeholder="mis. Statuta, SPMI, keuangan"></div>
<div class="chips" data-chips="k" role="group" aria-label="Jenis dokumen"><button type="button" data-v="all" aria-pressed="true">Semua</button>{"".join(f'<button type="button" data-v="{c}" aria-pressed="false">{c.capitalize()}</button>' for c in ["peraturan", "rencana", "pedoman", "mutu", "laporan"])}</div></div>
<p class="muted" style="margin-bottom:10px">Menampilkan <b data-filter-count>14</b> dokumen</p>
<div class="tbl-wrap"><table><thead><tr><th>Dokumen</th><th>Jenis</th><th>Akses</th></tr></thead><tbody>{doc_rows}</tbody></table></div></div>''') + PUSDATIN_EXTRA)

# ------------------------------------------------------------------ TATA KELOLA
TK = 'tata-kelola'
tatakelola = page(TK, 'Tata Kelola', TK, 'Tata Kelola', 'Tata Kelola', 'Kami melaporkan apa yang kami kerjakan, menjaga integritas, dan membuka informasi publik.', 'rapat senat universitas',
 sec(TK, 'kebijakan', 'Kebijakan & Laporan', 'Akuntabilitas', 'Kebijakan & laporan', 'Laporan tahunan dan keuangan teraudit tiga tahun terakhir, beserta hasil survei kepuasan.',
  '<div class="grid g3">' + ''.join(f'<div class="card"><span class="eyebrow">Tahun {y}</span><h3>Laporan {y}</h3><a {dref("Laporan Tahunan " + y + " (ringkasan)", "Rektor · ringkasan publik", "pub")}>Laporan tahunan (ringkasan) →</a><a {dref("Ikhtisar Laporan Keuangan Teraudit " + y, "KAP [nama] · opini auditor", "pub")}>Ikhtisar keuangan & opini auditor →</a><a {dref("Laporan Tahunan & Keuangan Lengkap " + y, "Untuk pimpinan dan asesor", "lock")} class="lock">{I("lock")} Dokumen lengkap</a></div>' for y in ['2025', '2024', '2023']) +
  '</div><div class="split" style="margin-top:22px"><div class="card"><span class="eyebrow">Survei kepuasan tata kelola</span><h3>Yang kami ubah dari masukan Anda</h3><ul style="margin:0;padding-left:18px;color:var(--muted)"><li>[Contoh: layanan surat akademik kini selesai dalam 1 hari kerja]</li><li>[Contoh: ikhtisar keuangan terbit setiap triwulan]</li><li>[Contoh: forum dengar pendapat mahasiswa tiap semester]</li></ul><a class="more" href="#" data-open="form:survei-kepuasan">Isi survei kepuasan →</a></div><div class="card flat"><span class="eyebrow">Kebijakan pengelolaan</span><p>Pedoman pengelolaan di sebelas bidang, pola pengelolaan keuangan, dan renstra keuangan tersedia di Pusdatin.</p><a class="more" href="#pusdatin">Buka Pusdatin →</a></div></div>' + JDIH_BAR) +
 sec(TK, 'integritas', 'Integritas & Kampus Aman', 'Integritas', 'Kampus yang aman dan berintegritas', None,
  f'''{cards([("Kode etik", "Berlaku untuk dosen, tenaga kependidikan, dan mahasiswa, beserta mekanisme penegakannya.", "Pedoman", 'href="#" data-open="doc:kode-etik"'), ("Satgas PPKPT", "Pencegahan dan penanganan kekerasan di lingkungan kampus, termasuk perundungan dan intoleransi.", "Satgas", 'href="#" data-open="detail:unit-satgas-ppkpt"')], "g2")}
<div class="band" style="background:var(--red-ink);margin-top:20px"><div><span class="eyebrow" style="color:#FFD2D4">Kanal rahasia</span><h2>Laporkan pelanggaran atau kekerasan</h2><p>Identitas pelapor dirahasiakan. Setiap laporan mendapat nomor tiket untuk dipantau.</p></div><div class="btn-row"><a class="btn pri" href="#" data-open="form:lapor-ppkpt">Lapor ke Satgas PPKPT</a><a class="btn ghost" href="#" data-open="form:wbs">Whistleblowing System</a></div></div>''') +
 sec(TK, 'pengawasan', 'Pengawasan Internal', 'Pengawasan', 'Pengawasan internal & manajemen risiko', None,
  cards([('Satuan Pengawasan Internal', 'Audit internal non-akademik, konsultasi, dan pendampingan unit kerja.', 'SPI', 'href="#" data-open="detail:unit-satuan-pengawasan-internal"'),
         ('Manajemen risiko', 'Diterapkan di seluruh unit kerja sesuai SNI ISO 31000:2018, dipantau tiap triwulan, dan direviu SPI setiap tahun.', 'Pedoman', 'href="#" data-open="doc:pedoman-risiko"'),
         ('Zona integritas', 'Program menuju Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM), beserta capaiannya.', 'WBK/WBBM', 'href="#" data-open="doc:zona-integritas"')])) +
 sec(TK, 'ppid', 'Transparansi & PPID', 'Informasi publik', 'Transparansi & PPID', 'Kami terbuka secara bawaan dan hanya mengecualikan informasi yang dilindungi peraturan.',
  f'''<div class="split"><div data-tabs><div class="tabs-l" role="tablist" aria-label="Kategori informasi">{"".join(f'<button type="button" role="tab" aria-selected="{str(i == 0).lower()}">{t}</button>' for i, t in enumerate(["Berkala", "Serta-merta", "Setiap saat", "Dikecualikan"]))}</div>
{"".join(f'<div role="tabpanel" {"" if i == 0 else "hidden"} style="margin-top:12px">{docs(d)}</div>' for i, d in enumerate([
  [("Profil, struktur organisasi, dan pimpinan", "Diperbarui setiap 6 bulan", "pub"), ("Laporan tahunan dan ikhtisar keuangan", "Tiap tahun", "sum"), ("Laporan layanan informasi publik", "Tiap tahun", "pub")],
  [("Peringatan dini bencana & prosedur evakuasi", "Diumumkan tanpa penundaan", "pub"), ("Gangguan layanan sistem penting", "Status sistem", "pub")],
  [("Statuta, peraturan, dan keputusan pimpinan", "Pusdatin", "pub"), ("Daftar kerja sama", "Kerjasama", "pub"), ("Kebijakan penerimaan dan biaya pendidikan", "Pendidikan", "pub")],
  [("Data pribadi sivitas", "Dilindungi UU Pelindungan Data Pribadi", "lock"), ("Laporan audit rinci", "Untuk pimpinan dan asesor", "lock"), ("Identitas pelapor", "Dirahasiakan", "lock")]]))}</div>
<div class="card"><h3>Ajukan permohonan informasi</h3><ol class="clean steps" style="grid-template-columns:minmax(0,1fr);gap:8px">{"".join(f'<li style="padding:12px 14px"><b>{t}</b><p>{d}</p></li>' for t, d in [("Ajukan", "Isi formulir daring"), ("Registrasi", "Nomor permohonan dikirim ke email"), ("Jawaban", "Paling lambat 10 hari kerja"), ("Keberatan", "Bila tidak puas, ajukan ke atasan PPID")])}</ol><div class="btn-row"><a class="btn dark" href="#" data-open="form:ppid-permohonan">Ajukan permohonan</a><a class="btn line" href="#" data-open="track:">Lacak permohonan</a><a class="btn line" href="#" data-open="form:ppid-keberatan">Ajukan keberatan</a></div></div></div>'''))

# ------------------------------------------------------------------ PENDIDIKAN
PE = 'pendidikan'
pendidikan = page(PE, 'Pendidikan', PE, 'Pendidikan', 'Pendidikan', 'Dari pendaftaran, perkuliahan, sampai wisuda. Semua yang perlu Anda ketahui tentang belajar di UNIZAR.', 'perkuliahan di kelas',
 sec(PE, 'penerimaan', 'Penerimaan & Beasiswa', 'PMB 2027', 'Penerimaan mahasiswa baru', 'Terbuka untuk semua, tanpa membedakan suku, agama, asal daerah, maupun disabilitas.',
  f'''<div class="grid g4" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">{"".join(f'<a class="card" href="#" data-open="ext:pmb"><span class="pill {c}">{t}</span><p>{d}</p><span class="more">Daftar jalur ini →</span></a>' for t, d, c in [("Reguler", "Seleksi tes potensi akademik daring.", ""), ("Prestasi", "Rapor dan prestasi akademik atau non-akademik.", "gold"), ("Afirmasi & KIP-Kuliah", "Untuk calon mahasiswa kurang mampu dan daerah 3T.", ""), ("RPL", "Pengalaman kerja diakui sebagai sks.", "gold"), ("Pindahan", "Alih kredit dari perguruan tinggi lain.", "")])}</div>
<div class="split" style="margin-top:22px"><div class="card"><h3>Beasiswa & keringanan</h3>{docs([("KIP-Kuliah", "Pemerintah · biaya pendidikan dan hidup", "pub"), ("Beasiswa afirmasi daerah 3T", "Universitas · potongan UKT", "pub"), ("Beasiswa prestasi & tahfidz", "Universitas", "pub"), ("Keringanan UKT", "Bagi mahasiswa terdampak ekonomi", "pub")])}</div>
<div><div class="band"><div><h2>Siap mendaftar?</h2><p>Pendaftaran, pembayaran, dan pengumuman sepenuhnya daring.</p></div><div class="btn-row"><a class="btn pri" href="#" data-open="ext:pmb">Portal PMB {I("ext")}</a><a class="btn ghost" href="#" data-open="detail:simulasi-biaya">Simulasi biaya</a></div></div>
<details class="faq"><summary>Berapa biaya kuliah per semester?</summary><p>Biaya berbeda per prodi. Gunakan simulasi biaya di portal PMB dan cek peluang beasiswa.</p></details>
<details class="faq"><summary>Apakah penyandang disabilitas bisa mendaftar?</summary><p>Bisa. Unit layanan disabilitas mendampingi sejak pendaftaran, termasuk akomodasi saat seleksi.</p></details>
<details class="faq"><summary>Saya sudah bekerja. Bisakah kuliah lebih singkat?</summary><p>Melalui jalur RPL, pengalaman kerja yang relevan dapat diakui sebagai sks.</p></details></div></div>''') +
 sec(PE, 'kurikulum', 'Kurikulum & Pembelajaran', 'Pembelajaran', 'Kurikulum & pembelajaran', None,
  cards([('Kurikulum berbasis luaran (OBE)', 'Disusun bersama pengguna lulusan dan dievaluasi berkala.', 'Kebijakan', 'href="#" data-open="doc:pedoman-obe"'),
         ('Merdeka Belajar (MBKM)', 'Minimal 10 sks di luar prodi: magang, proyek desa, riset, atau pertukaran.', 'MBKM', 'href="#" data-open="doc:pedoman-mbkm"'),
         ('Rekognisi Pembelajaran Lampau', 'Pengalaman kerja dan pelatihan diakui sebagai sks.', 'RPL', 'href="#" data-open="ext:sierra"'),
         ('E-learning', 'Kelas daring, bahan ajar, dan forum diskusi untuk semua mata kuliah.', 'Layanan', 'href="#" data-open="ext:elearning"'),
         ('Pendidikan antikorupsi', 'Nilai integritas terintegrasi di setiap kurikulum prodi.', 'Integritas', 'href="#" data-open="doc:pedoman-antikorupsi"'),
         ('Evaluasi pembelajaran', 'Hasil evaluasi dosen oleh mahasiswa dan tindak lanjutnya.', 'Mutu', ('penjaminan-mutu', 'dokumen'))])) +
 sec(PE, 'kalender', 'Kalender & Panduan', 'Kalender', 'Kalender akademik 2026/2027', None,
  '<div class="ppepp">' + ''.join(f'<div style="background:{c}"><b>{m}</b><span>{t}</span><small>{d}</small></div>' for m, t, d, c in [('AGU', 'Awal semester ganjil', 'Perkuliahan dimulai', 'var(--em-700)'), ('OKT', 'Ujian tengah semester', 'Semua prodi', 'var(--em-800)'), ('DES', 'Wisuda periode II', 'Aula utama', '#8A6A10'), ('JAN', 'Ujian akhir semester', 'Semester ganjil', 'var(--em-900)'), ('FEB', 'Awal semester genap', 'Pengisian KRS', 'var(--em-700)')]) + f'</div><div class="btn-row" style="margin-top:18px"><a class="btn line" href="#" data-open="doc:kalender-akademik">Kalender lengkap (PDF)</a><a class="btn line" href="#" data-open="doc:panduan-akademik">Panduan akademik</a></div>') +
 sec(PE, 'suasana', 'Suasana Akademik', 'Kehidupan akademik', 'Suasana akademik', 'Kebebasan akademik dan mimbar akademik dijalankan dengan menjunjung integritas.',
  cards([('Kuliah umum & seminar', 'Agenda terbuka untuk umum setiap bulan.', 'Agenda', ('berita', 'agenda')), ('Integritas akademik', 'Pemeriksaan kemiripan karya ilmiah dan pedoman antiplagiarisme.', 'Pedoman', 'href="#" data-open="doc:pedoman-integritas"'), ('Kelompok studi', 'Forum diskusi lintas prodi yang dikelola mahasiswa.', 'Komunitas', 'href="#" data-open="detail:ukm"')])))

# ------------------------------------------------------------------ PENELITIAN
PN = 'penelitian'
penelitian = page(PN, 'Penelitian', PN, 'Penelitian', 'Penelitian', 'Riset yang berangkat dari persoalan Nusa Tenggara Barat dan berbicara di tingkat nasional maupun internasional.', 'peneliti di laboratorium',
 sec(PN, 'riset', 'Riset UNIZAR', 'Tema unggulan', 'Riset yang kami tekuni', 'Tema mengikuti peta jalan penelitian dan fokus diferensiasi universitas.',
  '<div class="focus">' + ''.join(f'<a class="card" href="#" data-open="detail:fokus-{["kesehatan", "syariah", "pangan"][i]}">{ph(c, k)}<div class="body"><span class="pill">{tg}</span><h3>{t}</h3><p>{d}</p></div></a>' for i, (t, d, tg, c, k) in enumerate([('Kesehatan pariwisata', 'Kesehatan wisatawan dan pekerja pariwisata, ergonomi, dan keselamatan kerja di destinasi.', 'Tema 1', 'riset lapangan di destinasi wisata', ''), ('Ekonomi syariah & UMKM', 'Pembiayaan syariah, sertifikasi halal, dan daya saing usaha lokal.', 'Tema 2', 'wawancara pelaku UMKM', 'warm'), ('Pangan lahan kering', 'Agroekoteknologi dan agribisnis untuk lahan kering NTB.', 'Tema 3', 'uji tanam di lahan kering', 'sky')])) +
  f'</div><div class="band" style="margin-top:22px"><div><span class="eyebrow" style="color:var(--gold)">Hibah internal 2027</span><h2>Ajukan proposal penelitian</h2><p>Skema dasar, terapan, dan kolaborasi internasional. Proposal wajib selaras peta jalan dan melibatkan mahasiswa.</p></div><div class="btn-row"><a class="btn pri" href="#" data-open="ext:simlppm">Ajukan proposal {I("ext")}</a><a class="btn ghost" href="#" data-open="doc:panduan-hibah">Panduan hibah</a></div></div>') +
 sec(PN, 'publikasi', 'Publikasi & Inovasi', 'Luaran', 'Publikasi & inovasi', None,
  cards([('Jurnal UNIZAR', 'Jurnal ilmiah terbitan universitas beserta status akreditasinya.', 'Jurnal', ('publikasi-inovasi', 'jurnal')),
         ('Repositori institusi', 'Artikel, skripsi, dan laporan penelitian berlisensi terbuka.', 'Akses terbuka', ('publikasi-inovasi', 'repositori')),
         ('Profil SINTA', 'Kinerja publikasi dosen dan institusi di SINTA.', 'SINTA', ('publikasi-inovasi', 'sinta')),
         ('Kekayaan intelektual', 'Paten, hak cipta, dan desain industri hasil riset.', 'HKI', ('publikasi-inovasi', 'hki')),
         ('Kolaborasi riset', 'Riset bersama mitra dalam dan luar negeri.', 'Kolaborasi', ('publikasi-inovasi', 'kolaborasi')),
         ('Produk & hilirisasi', 'Hasil riset yang dimanfaatkan masyarakat dan industri.', 'Inovasi', ('publikasi-inovasi', 'hilirisasi'))])) +
 sec(PN, 'tata-kelola', 'Tata Kelola Riset', 'Tata kelola', 'Alur penelitian di UNIZAR', None,
  '<ol class="clean steps">' + ''.join(f'<li><b>{t}</b><p>{d}</p></li>' for t, d in [('Usulan', 'Unggah proposal sesuai tema peta jalan'), ('Telaah', 'Penilaian oleh reviewer yang ditetapkan'), ('Etik & kontrak', 'Kelaikan etik dan surat penugasan'), ('Pelaksanaan & monev', 'Catatan kemajuan dan seminar hasil'), ('Luaran', 'Publikasi terbuka, HKI, repositori')]) + f'</ol><div class="btn-row" style="margin-top:18px"><a class="btn line" href="#" data-open="doc:pedoman-penelitian">Pedoman penelitian</a><a class="btn line" href="#" data-open="doc:kode-etik-penelitian">Kode etik penelitian</a></div>'))

# ------------------------------------------------------------------ PUBLIKASI & INOVASI
PI = 'publikasi-inovasi'
JURNAL = [('[Nama jurnal hukum]', 'Ilmu Hukum', 'SINTA [n]', '2 terbitan/tahun'), ('[Nama jurnal kedokteran & kesehatan]', 'Kedokteran', 'SINTA [n]', '2 terbitan/tahun'),
          ('[Nama jurnal ekonomi & bisnis]', 'Ekonomi', 'SINTA [n]', '2 terbitan/tahun'), ('[Nama jurnal pertanian]', 'Pertanian', 'Proses akreditasi', '2 terbitan/tahun'),
          ('[Nama jurnal teknik]', 'Teknik', 'SINTA [n]', '2 terbitan/tahun'), ('[Nama jurnal pengabdian]', 'Pengabdian', 'SINTA [n]', '2 terbitan/tahun')]
HKI = [('[Judul paten sederhana]', 'Paten sederhana', '[Inventor]', '[Nomor]', '2026'), ('[Judul modul ajar]', 'Hak cipta', '[Pencipta]', '[Nomor]', '2025'),
       ('[Judul aplikasi]', 'Hak cipta (program komputer)', '[Pencipta]', '[Nomor]', '2025'), ('[Judul desain alat]', 'Desain industri', '[Pendesain]', '[Nomor]', '2024')]
publikasi = page(PI, 'Publikasi & Inovasi', 'penelitian', '<a href="#penelitian">Penelitian</a> / Publikasi & Inovasi', 'Publikasi & Inovasi', 'Luaran riset dosen dan mahasiswa: jurnal, repositori, kinerja SINTA, kekayaan intelektual, kolaborasi, dan produk yang dimanfaatkan masyarakat.', 'peneliti mempresentasikan hasil riset',
 sec(PI, 'jurnal', 'Jurnal UNIZAR', 'Jurnal', 'Jurnal terbitan UNIZAR', 'Semua jurnal dikelola melalui OJS dan terbuka untuk penulis dari dalam maupun luar UNIZAR.',
  '<div class="tbl-wrap"><table><thead><tr><th>Jurnal</th><th>Bidang</th><th>Status</th><th>Frekuensi</th><th>Situs</th></tr></thead><tbody>' + ''.join(f'<tr><td><b>{n}</b><span class="sub">e-ISSN [nomor]</span></td><td>{b}</td><td><span class="pill">{st}</span></td><td>{f}</td><td>{web("Kunjungi", small=True)}</td></tr>' for n, b, st, f in JURNAL) + '</tbody></table></div>') +
 sec(PI, 'repositori', 'Repositori', 'Akses terbuka', 'Repositori institusi', 'Artikel, skripsi, tesis, dan laporan penelitian dengan lisensi terbuka.',
  f'''<div class="split"><div><div class="toolbar"><div class="field"><label for="repo-q">Cari di repositori</label><input id="repo-q" placeholder="judul, penulis, atau kata kunci"></div><button class="btn dark" type="button" data-open="ext:repositori">Cari</button></div>
{docs([('[Judul artikel terbaru]', '[Penulis] · Artikel · 2026', 'pub'), ('[Judul skripsi terbaru]', '[Penulis] · Skripsi · 2026', 'pub'), ('[Judul laporan penelitian]', '[Tim peneliti] · Laporan · 2025', 'pub')])}</div>
<div class="card flat"><span class="eyebrow">Koleksi</span><div class="grid g2" style="margin-top:8px"><div><b style="font-size:28px;color:var(--em-800)">[n]</b><p>Artikel</p></div><div><b style="font-size:28px;color:var(--em-800)">[n]</b><p>Skripsi & tesis</p></div><div><b style="font-size:28px;color:var(--em-800)">[n]</b><p>Laporan riset</p></div><div><b style="font-size:28px;color:var(--em-800)">[n]</b><p>Buku & modul</p></div></div><a class="btn line" href="#" data-open="ext:repositori">Buka repositori</a></div></div>''') +
 sec(PI, 'sinta', 'Profil SINTA', 'SINTA', 'Kinerja publikasi di SINTA', 'Ringkasan dari SINTA Kemdiktisaintek. Klik untuk melihat profil lengkap institusi.',
  '<div class="stats">' + ''.join(f'<div class="stat"><b>{v}</b><span>{l}</span></div>' for v, l in [('[n]', 'Skor SINTA 3 tahun'), ('[n]', 'Artikel terindeks Scopus'), ('[n]', 'Artikel Garuda'), ('[n]', 'Sitasi Google Scholar')]) +
  f'</div><div class="split" style="margin-top:20px"><div class="card"><h3>Dosen dengan skor SINTA tertinggi</h3><ul class="clean">{"".join('<li class="doc"><div><b>[Nama dosen]</b><small>[Fakultas] · skor [n]</small></div><a href="#" data-open="detail:dosen">Profil →</a></li>' for _ in range(3))}</ul></div><div class="card flat"><h3>Profil institusi di SINTA</h3><p>Peringkat, skor per bidang, dan daftar publikasi terbaru UNIZAR.</p><a class="btn line" href="#" data-open="ext:sinta">Buka profil SINTA</a></div></div>') +
 sec(PI, 'hki', 'Kekayaan Intelektual', 'HKI', 'Kekayaan intelektual', 'Paten, hak cipta, dan desain industri hasil riset dosen dan mahasiswa, terhubung dengan pangkalan data PDKI.',
  '<div class="tbl-wrap"><table><thead><tr><th>Judul</th><th>Jenis</th><th>Inventor / pencipta</th><th>Nomor</th><th>Tahun</th></tr></thead><tbody>' + ''.join(f'<tr><td><b>{t}</b></td><td>{j}</td><td>{i}</td><td>{n}</td><td>{y}</td></tr>' for t, j, i, n, y in HKI) + '</tbody></table></div><div class="btn-row" style="margin-top:16px"><a class="btn dark" href="#" data-open="form:hki-ajukan">Ajukan HKI</a><a class="btn line" href="#" data-open="doc:panduan-hki">Panduan pengajuan HKI</a></div>') +
 sec(PI, 'kolaborasi', 'Kolaborasi Riset', 'Kolaborasi', 'Kolaborasi riset', None,
  cards([('[Judul riset bersama]', '[Mitra luar negeri] · 2025–2027 · luaran: artikel bereputasi', 'Internasional', ('kerjasama', 'mitra')),
         ('[Judul riset bersama]', '[Perguruan tinggi nasional] · 2026 · hibah kolaborasi', 'Nasional', ('kerjasama', 'mitra')),
         ('[Judul riset terapan]', '[Pemerintah daerah / industri] · 2026 · rekomendasi kebijakan', 'Mitra daerah', ('kerjasama', 'mitra'))])) +
 sec(PI, 'hilirisasi', 'Produk & Hilirisasi', 'Inovasi', 'Produk & hilirisasi', 'Hasil riset yang sudah dipakai masyarakat, pemerintah, atau industri.',
  '<div class="focus">' + ''.join(f'<a class="card" href="#" data-open="detail:hilir-produk-{i + 1}">{ph(c, k)}<div class="body"><span class="pill gold">{tg}</span><h3>{t}</h3><p>{d}</p></div></a>' for i, (t, d, tg, c, k) in enumerate([('[Nama produk inovasi kesehatan]', '[Siapa penggunanya dan manfaatnya]', 'Kesehatan', 'produk inovasi', ''), ('[Nama produk pangan olahan]', '[Mitra UMKM yang memproduksi]', 'Pangan', 'produk UMKM binaan', 'warm'), ('[Nama aplikasi / teknologi]', '[Instansi pengguna]', 'Teknologi', 'demo aplikasi', 'sky')])) + '</div>'))

# ------------------------------------------------------------------ PENGABDIAN
PB = 'pengabdian'
pengabdian = page(PB, 'Pengabdian', PB, 'Pengabdian', 'Pengabdian kepada Masyarakat', 'Ilmu yang hadir di desa, sekolah, puskesmas, dan pasar di seluruh Nusa Tenggara Barat.', 'kegiatan di desa binaan',
 sec(PB, 'program', 'Program & Desa Binaan', 'Program', 'Program unggulan & desa binaan', None,
  f'<div class="split"><div class="grid g2" style="grid-template-columns:minmax(0,1fr)">{cards([("Desa binaan kesehatan", "Pendampingan posyandu dan kesehatan ibu-anak bersama puskesmas.", "Kesehatan", 'href="#" data-open="detail:pkm-desa-kesehatan"'), ("Klinik UMKM halal", "Pendampingan legalitas, sertifikasi halal, dan pemasaran digital.", "Ekonomi", 'href="#" data-open="detail:pkm-umkm-halal"'), ("Sekolah lapang petani", "Teknik budidaya lahan kering dan pascapanen.", "Pangan", 'href="#" data-open="detail:pkm-sekolah-lapang"')], "g2")}</div>{ph("peta sebaran program di NTB (interaktif)", "sky", "height:100%;min-height:320px")}</div>') +
 sec(PB, 'kepakaran', 'Kepakaran & Kolaborasi', 'Kolaborasi', 'Ajukan kolaborasi dengan pakar UNIZAR', 'Untuk pemerintah desa dan daerah, sekolah, komunitas, UMKM, dan industri. Permintaan dicocokkan dengan pakar dalam 7 hari kerja.',
  '''<form class="card" data-inline-form="kolaborasi-pkm" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px">
<div class="field"><label for="k-org">Nama lembaga / komunitas</label><input id="k-org" required></div>
<div class="field"><label for="k-kab">Kabupaten / kota</label><select id="k-kab"><option>Pilih…</option><option>Kota Mataram</option><option>Lombok Barat</option><option>Lombok Tengah</option><option>Lombok Timur</option><option>Lombok Utara</option><option>Sumbawa</option></select></div>
<div class="field" style="grid-column:1/-1"><label for="k-need">Kebutuhan atau permasalahan</label><textarea id="k-need" rows="3" required></textarea></div>
<div class="field"><label for="k-cp">Narahubung</label><input id="k-cp" placeholder="email atau WhatsApp"></div>
<div style="display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap"><button class="btn dark" type="submit">Kirim permintaan</button><span class="form-msg" aria-live="polite"></span></div></form>''') +
 sec(PB, 'dampak', 'Dampak & Luaran', 'Dampak', 'Cerita perubahan', None,
  '<div class="stories"><a class="story" href="#" data-open="detail:berita-posyandu">' + ph('ibu dan balita di posyandu binaan') + '<div class="t"><span class="pill red">Kisah</span><h3>[Judul kisah dampak program pengabdian]</h3><p class="muted">[Ringkasan perubahan yang terjadi, siapa yang terbantu, dan apa yang berlanjut.]</p></div></a><div class="story-stack">' +
  '<div class="band" style="margin-bottom:22px"><div><span class="eyebrow" style="color:var(--gold)">UNIZAR untuk SDGs</span><h2>Lima SDGs yang kami tekuni</h2><p>Tanpa kemiskinan, pendidikan berkualitas, pekerjaan layak, kelembagaan yang tangguh, dan kemitraan.</p></div><div class="btn-row"><a class="btn pri" href="#profil" data-sec="sdgs">Lihat capaian SDGs</a></div></div>' + docs([('Laporan monev PkM 2025', 'LPPM · ringkasan publik', 'sum'), ('Luaran PkM 3 tahun', 'Artikel, modul, produk, HKI', 'pub'), ('Laporan akhir per judul', 'Untuk sivitas dan asesor', 'lock')]) + '</div></div>'))

# ------------------------------------------------------------------ PENJAMINAN MUTU
PM = 'penjaminan-mutu'
AKR = [('Pendidikan Dokter', 'S1', 'LAM-PTKes'), ('Profesi Dokter', 'Profesi', 'LAM-PTKes'), ('Teknik Sipil', 'S1', 'LAM Teknik'), ('Ilmu Komputer', 'S1', 'LAM INFOKOM'),
       ('Ilmu Hukum', 'S1', 'BAN-PT'), ('Akuntansi', 'S1', 'LAMEMBA'), ('Ekonomi Pembangunan', 'S1', 'LAMEMBA'), ('Agribisnis', 'S1', 'BAN-PT'), ('Agroekoteknologi', 'S1', 'BAN-PT'),
       ('Biologi', 'S1', 'LAMSAMA'), ('Ekonomi Syariah', 'S1', 'LAMEMBA'), ('Manajemen Bisnis Syariah', 'S1', 'LAMEMBA')]
START = {'Pendidikan Dokter': 2004, 'Profesi Dokter': 2010, 'Teknik Sipil': 1981, 'Ilmu Komputer': 2022, 'Ilmu Hukum': 1981, 'Akuntansi': 2016,
         'Ekonomi Pembangunan': 1981, 'Agribisnis': 1981, 'Agroekoteknologi': 2020, 'Biologi': 1992, 'Ekonomi Syariah': 2023, 'Manajemen Bisnis Syariah': 2023}
def history(name, lam, start):
    rows = [{'f': start, 't': None, 'k': 'Izin / status terdaftar', 'l': 'Kementerian', 'r': 'SK izin'}]
    y = max(start + 4, 1998)
    while y <= 2026:
        rows.append({'f': y, 't': y + 5, 'k': 'Akreditasi', 'l': 'BAN-PT' if y < 2021 else lam, 'r': '[peringkat]'})
        y += 5
    rows[0]['t'] = rows[1]['f'] if len(rows) > 1 else 2030
    return rows
ARSIP_DATA = {'Institusi (Perguruan Tinggi)': [{'f': 1981, 't': 1984, 'k': 'Pendirian', 'l': 'Yayasan', 'r': 'SK 01/YPLA/1981'}, {'f': 1984, 't': 2013, 'k': 'Status terdaftar', 'l': 'Mendikbud', 'r': 'SK 0378/0/1984'}] + [{'f': y, 't': y + 5, 'k': 'Akreditasi institusi', 'l': 'BAN-PT', 'r': '[peringkat]'} for y in (2013, 2018, 2023)]}
for n, j, l in AKR:
    ARSIP_DATA[n] = history(n, l, START[n])
def arsip_rows(name, rows):
    out = []
    for i, r in enumerate(reversed(rows)):
        now = ' <span class="pill" style="font-size:10.5px">Terkini</span>' if i == 0 else ''
        out.append(f"<tr><td>{r['f']}–{r['t']}{now}</td><td>{r['k']}</td><td>{r['l']}</td><td>{r['r']}</td><td>SK [nomor]</td><td><a {dref("Sertifikat " + name + " " + str(r['f']) + "–" + str(r['t']), r['l'] + " · " + r['k'], "pub")}>Lihat →</a></td></tr>")
    return ''.join(out)
ARSIP = (f'''<div id="penjaminan-mutu--arsip" style="margin-top:44px;scroll-margin-top:150px"><span class="eyebrow">Arsip</span><h3 style="font-size:26px;margin:6px 0 8px">Arsip sertifikat akreditasi</h3><p class="muted" style="max-width:64ch">Seluruh sertifikat sejak UNIZAR berdiri. Alumni dapat langsung mengunduh sertifikat yang berlaku saat mereka lulus.</p>
<form class="card akr-find" data-akr style="margin-top:18px"><h3>Cari sertifikat berdasarkan tahun lulus</h3>
<div class="toolbar" style="margin:0"><div class="field"><label for="akr-p">Program studi</label><select id="akr-p">{"".join(f"<option>{k}</option>" for k in ARSIP_DATA if not k.startswith('Institusi'))}</select></div>
<div class="field" style="flex:0 1 180px"><label for="akr-y">Tahun lulus</label><input id="akr-y" type="number" min="1985" max="2026" value="2015" inputmode="numeric"></div>
<button class="btn dark" type="submit">Tampilkan sertifikat</button></div>
<div class="akr-result" aria-live="polite"></div></form>
<div style="margin-top:20px">{"".join(f'<details class="crit"><summary><span><b>{k}</b><br><small>{len(v)} dokumen · sejak {v[0]["f"]}</small></span>{I("down")}</summary><div class="tbl-wrap" style="border:0;border-top:1px solid var(--line);border-radius:0"><table><thead><tr><th>Periode</th><th>Jenis</th><th>Lembaga</th><th>Status</th><th>Nomor SK</th><th>Sertifikat</th></tr></thead><tbody>{arsip_rows(k, v)}</tbody></table></div></details>' for k, v in ARSIP_DATA.items())}</div>
<p class="note" style="margin-top:12px">Periode pada arsip ini masih contoh untuk memperlihatkan pola. BAN-PT berdiri tahun 1994, sehingga dokumen sebelum masa itu berupa SK pendirian atau status terdaftar.</p></div>
<script type="application/json" id="akr-data">''' + json.dumps(ARSIP_DATA, ensure_ascii=False) + '</script>')
mutu = page(PM, 'Penjaminan Mutu', PM, 'Penjaminan Mutu', 'Penjaminan Mutu', 'Sistem mutu yang berjalan sepanjang tahun: menetapkan, melaksanakan, mengevaluasi, mengendalikan, dan meningkatkan.', 'rapat tinjauan manajemen',
 sec(PM, 'tentang', 'Kalender Mutu', 'Siklus PPEPP', 'Kalender mutu 2026', 'Setiap tahap tercatat waktunya dan hasilnya dapat dilihat.',
  '<div class="ppepp">' + ''.join(f'<div style="background:{c}"><b>{l}</b><span>{t}</span><small>{d}</small></div>' for l, t, d, c in [('P', 'Penetapan', 'Jan–Feb · revisi standar', 'var(--em-900)'), ('P', 'Pelaksanaan', 'Mar–Des · seluruh unit', 'var(--em-700)'), ('E', 'Evaluasi', 'Apr & Agu–Sep · monev dan AMI', '#8A6A10'), ('P', 'Pengendalian', 'Okt–Nov · RTM dan RTL', 'var(--red-ink)'), ('P', 'Peningkatan', 'Des · standar naik', 'var(--em-800)')]) +
  '</div><div class="grid g3" style="margin-top:22px">' + ''.join(f'<div class="card flat"><span class="eyebrow">{e}</span><h3 style="font-size:22px">{v}</h3><p>{d}</p></div>' for e, v, d in [('AMI 2025', '[n] temuan', '[n]% sudah ditindaklanjuti'), ('RTM 2025', '[n] keputusan', 'Dilaksanakan [tanggal]'), ('Survei 2025', '[n]% puas', 'Dari [n] responden')]) + '</div>') +
 sec(PM, 'dokumen', 'Dokumen & Audit', 'Dokumen mutu', 'Dokumen SPMI & hasil audit', 'Dokumen inti dapat dibuka oleh sivitas dan asesor setelah masuk. Publik dapat membaca ikhtisarnya.',
  docs([('Ikhtisar Kebijakan & Standar SPMI', 'Ringkasan publik · 4 halaman', 'pub'), ('Kebijakan, Manual & Standar SPMI', 'SK [nomor] · v4.0', 'lock'), ('Formulir & pendokumentasian', 'Template unit kerja', 'lock'),
        ('Laporan Monev & AMI 2025', 'Akademik dan non-akademik', 'lock'), ('Laporan RTM & RTL 2025', 'Keputusan dan status tindak lanjut', 'lock'), ('Pedoman AMI & daftar auditor', 'SK penugasan 2026', 'lock')])) +
 sec(PM, 'akreditasi', 'Akreditasi', 'Akreditasi', 'Akreditasi institusi & program studi', 'Diambil dari BAN-PT, LAM, dan PD Dikti. Setiap baris menampilkan nomor SK, masa berlaku, dan sertifikat.',
  f'''<div class="slim" style="margin-bottom:18px"><p><b style="color:var(--ink)">Akreditasi institusi:</b> [status sesuai SK BAN-PT] · SK [nomor] · berlaku sampai [tanggal]</p><a class="btn line" href="#" data-open="doc:sertifikat-institusi">Sertifikat {I("doc")}</a></div>
<div class="tbl-wrap"><table><thead><tr><th>Program studi</th><th>Jenjang</th><th>Lembaga</th><th>Peringkat</th><th>Berlaku sampai</th><th>Sertifikat</th></tr></thead><tbody>{"".join(f"<tr><td><b>{n}</b></td><td>{j}</td><td>{l}</td><td>[peringkat]</td><td>[tanggal]</td><td><a {dref("Sertifikat akreditasi " + n + " (terkini)", l + " · SK [nomor]", "pub")}>Lihat →</a></td></tr>" for n, j, l in AKR)}</tbody></table></div>
<p class="note" style="margin-top:12px">Nama lembaga akreditasi pada tabel ini masih contoh. Isi sesuai SK yang berlaku untuk tiap prodi.</p>''' + ARSIP) +
 sec(PM, 'bukti', 'Peta Bukti', 'Untuk asesor', 'Peta Bukti BAN-PT', None,
  f'<div class="band"><div><h2>39 indikator IAPT 4.1, satu halaman</h2><p>Setiap indikator menautkan langsung ke bagian website atau dokumen yang menjadi buktinya.</p></div><a class="btn pri" href="#peta-bukti">Buka Peta Bukti {I("arrow")}</a></div>'))

# ------------------------------------------------------------------ PETA BUKTI
CRIT = [('Budaya Mutu', range(1, 5)), ('Relevansi Pendidikan', range(5, 16)), ('Relevansi Penelitian', range(16, 20)),
        ('Relevansi Pengabdian kepada Masyarakat', range(20, 24)), ('Akuntabilitas', range(24, 36)), ('Diferensiasi Misi', range(36, 40))]
IND = {
 1: ('SPMI dikembangkan dengan tata kelola yang baik dan akuntabel', [('Dokumen SPMI', PM, 'dokumen')]),
 2: ('Implementasi SPMI melalui siklus PPEPP', [('Kalender mutu', PM, 'tentang'), ('Laporan AMI, RTM & RTL', PM, 'dokumen')]),
 3: ('Laporan implementasi SPMI dan kinerja berkala', [('UNIZAR dalam Angka', P, 'angka'), ('Portal kinerja (akun asesor)', 'kinerja', 'renstra'), ('Laporan tahunan', TK, 'kebijakan')]),
 4: ('Pengakuan mutu: akreditasi program studi', [('Tabel akreditasi', PM, 'akreditasi')]),
 5: ('Kebijakan kurikulum OBE', [('Kurikulum & pembelajaran', PE, 'kurikulum')]),
 6: ('Renstra SDM dan ketersediaan tenaga kependidikan', [('Pusdatin', PD, None), ('Direktori unit', DI, 'unit')]),
 7: ('Kecukupan dosen per program studi', [('Dosen & pakar', DI, 'dosen')]),
 8: ('Akses sarana-prasarana dan K3', [('Layanan', 'layanan', 'katalog')]),
 9: ('Sarana TIK untuk pembelajaran', [('Status sistem', 'layanan', 'status')]),
 10: ('Perbaikan pembelajaran dan MBKM', [('Kurikulum & pembelajaran', PE, 'kurikulum')]),
 11: ('Jabatan akademik dosen tetap', [('Dosen & pakar', DI, 'dosen')]),
 12: ('Analisis luaran pendidikan', [('UNIZAR dalam Angka', P, 'angka'), ('Tracer study', 'mahasiswa-alumni', 'alumni')]),
 13: ('Internalisasi antikorupsi dalam pembelajaran', [('Kurikulum & pembelajaran', PE, 'kurikulum')]),
 14: ('Pengakuan kompetensi lulusan', [('Alumni & karier', 'mahasiswa-alumni', 'alumni')]),
 15: ('Prestasi mahasiswa dan keterserapan lulusan', [('Prestasi', 'mahasiswa-alumni', 'prestasi')]),
 16: ('Peta jalan dan pedoman penelitian', [('Riset UNIZAR', PN, 'riset')]),
 17: ('Penyelenggaraan proses penelitian', [('Tata kelola riset', PN, 'tata-kelola')]),
 18: ('Hasil penelitian yang bermutu dan terbuka', [('Publikasi & inovasi', PN, 'publikasi')]),
 19: ('Pengakuan dan pemanfaatan hasil penelitian', [('Publikasi & inovasi', PN, 'publikasi')]),
 20: ('Peta jalan dan sumber daya PkM', [('Program & desa binaan', PB, 'program')]),
 21: ('Penyelenggaraan proses PkM', [('Program & desa binaan', PB, 'program')]),
 22: ('Hasil PkM yang bermutu', [('Dampak & luaran', PB, 'dampak')]),
 23: ('Pengakuan kepakaran', [('Kepakaran & kolaborasi', PB, 'kepakaran')]),
 24: ('Renstra, statuta, dan struktur organisasi', [('Dokumen di Pusdatin', PD, None), ('Pimpinan & organisasi', P, 'pimpinan')]),
 25: ('Tata pamong: akuntabilitas, transparansi, mitigasi risiko', [('Pengawasan internal', TK, 'pengawasan'), ('Risk register (akun asesor)', 'kinerja', 'risiko')]),
 26: ('Sistem informasi berbasis TIK', [('Status sistem', 'layanan', 'status')]),
 27: ('Renstra keuangan dan bantuan biaya mahasiswa', [('Kebijakan & laporan', TK, 'kebijakan'), ('Beasiswa', PE, 'penerimaan')]),
 28: ('Praktik tata kelola, kode etik, dan kampus aman', [('Integritas & kampus aman', TK, 'integritas')]),
 29: ('Sistem pengelolaan dan pedoman bidang', [('Kebijakan & laporan', TK, 'kebijakan')]),
 30: ('Suasana akademik dan kebebasan mimbar', [('Suasana akademik', PE, 'suasana')]),
 31: ('Penerimaan mahasiswa yang adil dan inklusif', [('Penerimaan & beasiswa', PE, 'penerimaan')]),
 32: ('Layanan mahasiswa', [('Layanan mahasiswa', 'mahasiswa-alumni', 'layanan')]),
 33: ('Pola pengelolaan keuangan', [('Kebijakan & laporan', TK, 'kebijakan')]),
 34: ('Kepuasan pemangku kepentingan terhadap tata pamong', [('Survei & tindak lanjut', TK, 'kebijakan')]),
 35: ('Audit eksternal keuangan', [('Laporan keuangan teraudit', TK, 'kebijakan')]),
 36: ('Diferensiasi misi dan peta jalan', [('Tentang UNIZAR', P, 'tentang')]),
 37: ('Program tridharma sesuai renstra', [('Dokumen Renstra (Pusdatin)', PD, None), ('Portal kinerja (akun asesor)', 'kinerja', 'renstra')]),
 38: ('Penilaian capaian terhadap diferensiasi misi', [('UNIZAR dalam Angka', P, 'angka'), ('UNIZAR untuk SDGs', P, 'sdgs'), ('Portal kinerja (akun asesor)', 'kinerja', 'renstra')]),
 39: ('Pengakuan eksternal atas keunggulan', [('Tiga fokus keunggulan', 'beranda', None), ('Prestasi', 'mahasiswa-alumni', 'prestasi')]),
}
SP = {1, 2, 4, 7, 11}
STATUS = {2: 'up', 10: 'up', 13: 'no', 21: 'up', 31: 'up', 34: 'up', 38: 'up'}
def ind_row(n):
    t, links = IND[n]
    l = '<br>'.join(f'<a {href(p, s)}>{lab} →</a>' for lab, p, s in links)
    st = STATUS.get(n, 'ok')
    stl = {'ok': ('st-ok', 'Lengkap'), 'up': ('st-up', 'Perlu pembaruan'), 'no': ('st-no', 'Belum tersedia')}[st]
    spb = ' <span class="pill" style="font-size:10.5px;background:var(--ink);color:#fff">Syarat perlu</span>' if n in SP else ''
    return f'<tr><td style="width:56px"><b style="font-size:17px;color:var(--em-800)">{n}</b></td><td>{t}{spb}</td><td>{l}</td><td class="st"><span class="{stl[0]}">{stl[1]}</span></td></tr>'
crit_html = ''.join(f'<details class="crit" {"open" if i == 0 else ""}><summary><span><small>Kriteria {i + 1} · indikator {r.start}–{r.stop - 1}</small><br><b>{c}</b></span>{I("down")}</summary><div class="tbl-wrap" style="border:0;border-top:1px solid var(--line);border-radius:0"><table><thead><tr><th>No</th><th>Indikator (ringkas)</th><th>Bukti di website</th><th class="st">Status internal</th></tr></thead><tbody>{"".join(ind_row(n) for n in r)}</tbody></table></div></details>' for i, (c, r) in enumerate(CRIT))
PBK = 'peta-bukti'
peta = page(PBK, 'Peta Bukti BAN-PT', PM, '<a href="#penjaminan-mutu">Penjaminan Mutu</a> / Peta Bukti', 'Peta Bukti BAN-PT', 'Ke-39 indikator Instrumen Akreditasi Perguruan Tinggi (IAPT 4.1) beserta tautan langsung ke buktinya di website ini.', 'tim mutu menyusun dokumen',
 sec(PBK, 'peta', 'Peta 39 indikator', 'IAPT 4.1 · PerBAN-PT No. 35 Tahun 2025', 'Enam kriteria, tiga puluh sembilan indikator', 'Dokumen bertanda gembok terbuka setelah asesor masuk dengan akun berbatas waktu.',
  f'''<div class="slim" style="margin-bottom:18px"><p><b style="color:var(--ink)">Simulasi tampilan:</b> kolom status kelengkapan hanya terlihat oleh tim internal yang sudah masuk.</p><div class="chips" role="group" aria-label="Tampilan"><button type="button" data-view="public" aria-pressed="true">Publik & asesor</button><button type="button" data-view="internal" aria-pressed="false">Tim internal</button></div></div>
{crit_html}
<div class="btn-row" style="margin-top:18px"><a class="btn dark" href="#masuk">Masuk sebagai asesor</a><a class="btn line" href="#pusdatin">Pusdatin</a></div>'''), )

# ------------------------------------------------------------------ LAYANAN
LY = 'layanan'
SERV = [('SIAKAD', 'KRS, KHS, transkrip, jadwal kuliah', 'mhs dsn', 'akademik', True), ('Surat keterangan aktif kuliah', 'Terbit dengan tanda tangan elektronik · 1 hari kerja', 'mhs', 'akademik', True),
        ('Legalisir ijazah & transkrip', 'Ajukan daring · 3 hari kerja', 'alumni', 'akademik', False), ('Pembayaran UKT', 'Virtual account berbagai bank', 'mhs', 'keuangan', True),
        ('Keringanan UKT', 'Verifikasi berkas daring · 7 hari kerja', 'mhs', 'keuangan', True), ('Email & SSO UNIZAR', 'Aktivasi akun, reset kata sandi', 'mhs dsn', 'tik', False),
        ('E-learning', 'Kelas daring dan bahan ajar', 'mhs dsn', 'tik', True), ('Perpustakaan digital', 'Katalog, e-book, e-journal, cek kemiripan', 'mhs dsn alumni', 'perpustakaan', True),
        ('Klinik & konseling', 'Layanan kesehatan dan psikolog kampus', 'mhs dsn', 'kesehatan', False), ('Kepegawaian & jabatan akademik', 'Data dosen dan tendik, usulan kenaikan jabatan', 'dsn', 'kepegawaian', True),
        ('Peminjaman ruang & fasilitas', 'Jadwal dan formulir daring', 'mhs dsn publik', 'sarpras', False), ('Lapor kerusakan / insiden K3', 'Tindak lanjut dapat dipantau', 'mhs dsn publik', 'sarpras', False)]
SPEC = {'SIAKAD': 'ext:siakad', 'Surat keterangan aktif kuliah': 'form:surat-aktif', 'Legalisir ijazah & transkrip': 'form:legalisir', 'Pembayaran UKT': 'ext:ukt',
        'Keringanan UKT': 'form:keringanan-ukt', 'Email & SSO UNIZAR': 'form:reset-sso', 'E-learning': 'ext:elearning', 'Perpustakaan digital': 'ext:perpus',
        'Klinik & konseling': 'form:konseling', 'Kepegawaian & jabatan akademik': 'ext:simpeg', 'Peminjaman ruang & fasilitas': 'form:peminjaman-ruang', 'Lapor kerusakan / insiden K3': 'form:lapor-k3'}
serv_html = ''.join(f'<a class="card" href="#" data-open="{SPEC[t]}" data-item data-aud="{a}" data-cat="{c}"><span class="pill">{c.capitalize()}</span><h3 style="font-size:17px">{t}</h3><p style="font-size:14px">{d}</p><span class="more">{("Buka sistem ↗" if SPEC[t].startswith("ext") else "Ajukan →")}</span></a>' for t, d, a, c, lg in SERV)
layanan = page(LY, 'Layanan', '', 'Layanan', 'Layanan', 'Semua layanan kampus di satu tempat, dipilah sesuai kebutuhan Anda.', 'loket layanan terpadu',
 sec(LY, 'katalog', 'Katalog layanan', 'Katalog', 'Layanan apa yang Anda perlukan?', None,
  f'''<div data-filter><div class="toolbar"><div class="field"><label for="ly-q">Cari layanan</label><input id="ly-q" data-filter-text placeholder="mis. legalisir, UKT, reset password"></div></div>
<div class="chips" data-chips="aud" role="group" aria-label="Untuk siapa" style="margin-bottom:10px">{"".join(f'<button type="button" data-v="{v}" aria-pressed="{str(v == "all").lower()}">{l}</button>' for v, l in [("all", "Semua"), ("mhs", "Mahasiswa"), ("dsn", "Dosen & tendik"), ("alumni", "Alumni"), ("publik", "Publik")])}</div>
<div class="chips" data-chips="cat" role="group" aria-label="Kategori" style="margin-bottom:18px">{"".join(f'<button type="button" data-v="{v}" aria-pressed="{str(v == "all").lower()}">{l}</button>' for v, l in [("all", "Semua kategori"), ("akademik", "Akademik"), ("keuangan", "Keuangan"), ("tik", "TIK"), ("perpustakaan", "Perpustakaan"), ("kesehatan", "Kesehatan"), ("kepegawaian", "Kepegawaian"), ("sarpras", "Sarpras & K3")])}</div>
<div class="grid g3">{serv_html}</div></div>''') +
 sec(LY, 'status', 'Status sistem', 'Status', 'Status sistem informasi', 'Diperbarui otomatis. Gangguan terjadwal diumumkan sehari sebelumnya.',
  '<div class="tbl-wrap"><table><thead><tr><th>Sistem</th><th>Uptime 30 hari</th><th>Status</th></tr></thead><tbody>' + ''.join(f'<tr><td><b>{n}</b></td><td>{u}</td><td><span class="{c}">{s}</span></td></tr>' for n, u, s, c in [('SIAKAD', '[n]%', 'Normal', 'st-ok'), ('E-learning', '[n]%', 'Normal', 'st-ok'), ('SSO & email', '[n]%', 'Normal', 'st-ok'), ('Perpustakaan digital', '[n]%', 'Pemeliharaan malam ini', 'st-up'), ('Portal PMB', '[n]%', 'Normal', 'st-ok')]) +
  '</tbody></table></div><div class="slim" style="margin-top:18px"><p>Tidak menemukan layanan yang Anda cari?</p><div class="btn-row"><a class="btn dark" href="#" data-open="form:helpdesk">Buat tiket helpdesk</a><a class="btn line" href="#" data-open="track:">Lacak permohonan</a><a class="btn line" href="#direktori" data-sec="kontak">Kontak kami</a></div></div>'))

# ------------------------------------------------------------------ KERJASAMA
KS = 'kerjasama'
MITRA = [('[Universitas mitra, Malaysia]', 'ln', 'Pendidikan', 'Pertukaran mahasiswa', 'Berjalan'), ('[Universitas mitra, Jepang]', 'ln', 'Penelitian', 'Riset bersama', 'Berjalan'),
         ('[Rumah sakit jejaring]', 'dn', 'Pendidikan', 'Kepaniteraan klinik', 'Terealisasi'), ('[Pemerintah Provinsi NTB]', 'dn', 'Pengabdian', 'Desa binaan', 'Terealisasi'),
         ('[Perusahaan mitra]', 'dn', 'Magang', 'Magang MBKM', 'Berjalan'), ('[Perguruan tinggi nasional]', 'dn', 'Penelitian', 'Hibah kolaborasi', 'Terealisasi')]
kerjasama = page(KS, 'Kerjasama & Internasional', '', 'Kerjasama & Internasional', 'Kerjasama & Internasional', 'Setiap kerja sama ditampilkan bersama kegiatannya, karena yang penting adalah hasilnya.', 'penandatanganan kerja sama',
 sec(KS, 'mitra', 'Mitra', 'Mitra', 'Mitra kerja sama', None,
  f'''<div data-filter><div class="chips" data-chips="s" role="group" aria-label="Cakupan" style="margin-bottom:16px"><button type="button" data-v="all" aria-pressed="true">Semua</button><button type="button" data-v="dn" aria-pressed="false">Dalam negeri</button><button type="button" data-v="ln" aria-pressed="false">Luar negeri</button></div>
<div class="tbl-wrap"><table><thead><tr><th>Mitra</th><th>Bidang</th><th>Kegiatan</th><th>Realisasi</th></tr></thead><tbody>{"".join(f'<tr data-item data-s="{s}"><td><a href="#" data-open="detail:mitra-{i}"><b>{n}</b></a></td><td>{b}</td><td>{k}</td><td><span class="{"st-ok" if r == "Terealisasi" else "st-up"}">{r}</span></td></tr>' for i, (n, s, b, k, r) in enumerate(MITRA))}</tbody></table></div></div>''') +
 sec(KS, 'internasional', 'Internasional', 'Internasional', 'Peluang internasional', None,
  cards([('Mobilitas mahasiswa', 'Pertukaran pelajar, summer course, dan magang luar negeri.', 'Mahasiswa', 'href="#" data-open="detail:intl-mhs"'), ('Mobilitas dosen', 'Visiting lecturer, riset bersama, dan konferensi.', 'Dosen', 'href="#" data-open="detail:intl-dosen"'), ('Mahasiswa internasional', 'Informasi pendaftaran, visa, dan pendampingan.', 'Pendaftar', 'href="#" data-open="detail:intl-pendaftar"')])) +
 sec(KS, 'ajukan', 'Ajukan kerja sama', 'Bermitra', 'Ingin bermitra dengan UNIZAR?', None,
  f'<div class="band"><div><h2>Ajukan kerja sama</h2><p>Pendidikan, penelitian, pengabdian, atau magang. Tim kerja sama merespons dalam 5 hari kerja.</p></div><div class="btn-row"><a class="btn pri" href="#" data-open="form:ajukan-kerjasama">Ajukan kerja sama</a><a class="btn ghost" href="#" data-open="doc:pedoman-kerjasama">Pedoman kerja sama</a></div></div>'))

# ------------------------------------------------------------------ MAHASISWA & ALUMNI
MA = 'mahasiswa-alumni'
mhs = page(MA, 'Mahasiswa & Alumni', '', 'Mahasiswa & Alumni', 'Mahasiswa & Alumni', 'Tumbuh selama kuliah, tetap terhubung setelah lulus.', 'kegiatan UKM mahasiswa',
 sec(MA, 'layanan', 'Layanan mahasiswa', 'Layanan', 'Untuk mahasiswa', None,
  cards([('Konseling', 'Psikolog kampus, kerahasiaan terjaga.', 'Kesehatan', 'href="#" data-open="form:konseling"'), ('Layanan disabilitas', 'Akomodasi belajar dan aksesibilitas.', 'Inklusi', 'href="#" data-open="detail:disabilitas"'), ('Beasiswa', 'Informasi dan pendaftaran beasiswa.', 'Keuangan', ('pendidikan', 'penerimaan')),
         ('PKKMB', 'Pengenalan kehidupan kampus bagi mahasiswa baru.', 'Mahasiswa baru', 'href="#" data-open="doc:panduan-pkkmb"'), ('Kewirausahaan', 'Inkubasi bisnis dan pendanaan usaha mahasiswa di ITe.', 'Inkubator', 'href="#" data-open="detail:unit-inkubator-bisnis-dan-teknologi-ite"'), ('Organisasi & UKM', 'BEM, DPM, dan unit kegiatan mahasiswa.', 'Komunitas', 'href="#" data-open="detail:ukm"')])) +
 sec(MA, 'prestasi', 'Prestasi', 'Prestasi', 'Prestasi mahasiswa', None,
  '<div class="stories"><a class="story" href="#" data-open="detail:prestasi">' + ph('tim juara di atas panggung', 'warm') + '<div class="t"><span class="pill gold">Nasional</span><h3>[Judul prestasi terbaru]</h3><p class="muted">[Nama tim · prodi · bulan]</p></div></a><div class="story-stack">' + '<ul class="clean">' + ''.join(f'<li class="doc"><div><b>{a}</b><small>{b}</small></div><a href="#" data-open="detail:prestasi">Detail →</a></li>' for a, b in [('[Prestasi internasional]', '[Nama · prodi]'), ('[Prestasi nasional]', '[Nama · prodi]'), ('[Prestasi wilayah]', '[Nama · prodi]')]) + '</ul><a class="btn line" href="#" data-open="form:unggah-prestasi">Unggah Prestasi Mahasiswa</a><p class="note">Diunggah oleh operator Biro Kemahasiswaan setelah verifikasi bukti.</p></div></div>') +
 sec(MA, 'alumni', 'Alumni & karier', 'Alumni', 'Alumni & karier', 'Hasil tracer study digunakan untuk memperbaiki kurikulum setiap tahun.',
  '<div class="stats">' + ''.join(f'<div class="stat"><b>{v}</b><span>{l}</span></div>' for v, l in [('[n] bln', 'Masa tunggu kerja'), ('[n]%', 'Bekerja sesuai bidang'), ('[n]%', 'Berwirausaha'), ('[n]%', 'Kepuasan pengguna lulusan')]) +
  '</div><div class="btn-row" style="margin-top:18px"><a class="btn dark" href="#" data-open="form:tracer">Isi tracer study</a><a class="btn line" href="#" data-open="detail:lowongan">Lowongan & magang</a><a class="btn line" href="#" data-open="form:gabung-alumni">Gabung ikatan alumni</a><a class="btn line" href="#" data-open="form:legalisir">Legalisir ijazah</a></div>'))

# ------------------------------------------------------------------ MASUK
MS = 'masuk'
masuk = page(MS, 'Masuk', '', 'Masuk', 'Masuk ke UNIZAR', 'Satu akun untuk layanan dan dokumen terbatas. Asesor menggunakan akun berbatas waktu dari Penjaminan Mutu.', 'gedung kampus malam hari',
 sec(MS, 'form', 'Masuk', 'Akun', 'Pilih jenis akun', None,
  f'''<div class="split"><div class="card" data-tabs style="max-width:520px">
<div class="tabs-l" role="tablist" aria-label="Jenis akun"><button type="button" role="tab" aria-selected="true">Sivitas (SSO)</button><button type="button" role="tab" aria-selected="false">Asesor / mitra</button></div>
<form role="tabpanel" data-login style="display:grid;gap:14px;margin-top:14px">
<div class="field"><label for="l-id">Email UNIZAR / NIDN / NIM</label><input id="l-id" autocomplete="username" placeholder="nama@unizar.ac.id"></div>
<div class="field"><label for="l-pw">Kata sandi</label><input id="l-pw" type="password" autocomplete="current-password"></div>
<div class="field"><label for="l-role">Masuk sebagai (simulasi peran)</label><select id="l-role" name="role"><option value="mhs">Mahasiswa</option><option value="dsn">Dosen / tendik</option><option value="op-kmhs">Operator Biro Kemahasiswaan</option><option value="unit">Operator unit kerja / pemilik risiko</option><option value="renbang">Koordinator kinerja & risiko (WR IV / Biro Perencanaan)</option><option value="spi">Satuan Pengawasan Internal</option><option value="mutu">Tim mutu internal</option></select></div>
<div class="field" data-unit-f hidden><label for="l-unit">Unit kerja</label><select id="l-unit" name="unit">{''.join(f'<option value="{u["k"]}"' + (' selected' if u['k'] == 'BAK' else '') + f'>{u["k"]} · {u["n"]}</option>' for u in KIN['units'])}</select></div>
<button class="btn dark" type="submit" style="justify-content:center">Masuk</button><a href="#" data-open="form:reset-sso" style="font-size:14px;font-weight:700">Lupa kata sandi atau belum punya akun?</a></form>
<form role="tabpanel" hidden data-login="asesor" style="display:grid;gap:14px;margin-top:14px">
<div class="field"><label for="a-id">ID asesor</label><input id="a-id" autocomplete="username"></div>
<div class="field"><label for="a-pw">Kode akses</label><input id="a-pw" type="password" autocomplete="current-password"></div>
<button class="btn dark" type="submit" style="justify-content:center">Masuk sebagai asesor</button><span class="form-msg" aria-live="polite"></span>
<p class="note">Akun asesor hanya-baca, berlaku selama masa asesmen, dan langsung membuka Peta Bukti. Setiap unduhan tercatat.</p></form></div>
<div class="card flat"><h3>Yang terbuka setelah masuk</h3><ul style="margin:0;padding-left:18px;color:var(--muted)"><li>Dokumen bertanda gembok di Pusdatin</li><li>Laporan audit, RTM, dan RTL</li><li>Layanan akademik, keuangan, dan kepegawaian</li><li>Kolom status kelengkapan bukti (tim internal)</li></ul></div></div>'''))

# ------------------------------------------------------------------ KINERJA & RISIKO
KN = 'kinerja'
FLOW = '<ol class="kin-flow">' + ''.join(f'<li><b>{a}</b><small>{b}</small></li>' for a, b in [('Unit mengisi', 'Operator bidang memperbarui realisasi kumulatif tiap triwulan, plus bukti dukung.'), ('Belum tercapai? Wajib jelaskan', 'Faktor penghambat dan tindak lanjut menjadi isian wajib.'), ('Koordinator memverifikasi', 'WR IV / Biro Perencanaan memverifikasi atau minta revisi.'), ('Unduh kapan saja', 'Rekap akhir tahun, format Kementerian, dan rekap SDGs langsung jadi Excel.')]) + '</ol>'
kinerja = page(KN, 'Portal Kinerja & Risiko', '', '<a href="#dasbor">Dasbor</a> / Portal Kinerja & Risiko', 'Portal Kinerja & Risiko', 'Ruang kerja internal untuk mengisi capaian IKU/IKT, menyusun laporan Kementerian dan SDGs, serta mengelola risk register. Contoh layar: pada implementasi, portal ini berjalan di kinerja.unizar.ac.id dengan SSO.', 'ruang kerja unit',
 '<div class="wrap kin-gate"><div class="gate"><svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><p><b>Portal ini khusus sivitas yang berwenang.</b><br>Masuk sebagai operator unit, koordinator, SPI, tim mutu, atau asesor. Ringkasan publik ada di <a href="#profil" data-sec="angka">Profil › UNIZAR dalam Angka</a>.</p><a class="btn dark" href="#masuk">Masuk</a></div></div>' +
 sec(KN, 'renstra', 'IKU & IKT Renstra', 'Renstra 2026–2027', 'Capaian IKU & IKT Renstra', 'Sesuai SK Rektor No. 076B/SK/REK/UNIZAR-012/III/2026: 120 IKU dan 71 IKT beserta penanggung jawab dan target 2026–2027.', FLOW + '<div data-kin="renstra"></div>') +
 sec(KN, 'kementerian', 'IKU Kementerian', 'Kemdiktisaintek', 'Laporan IKU Kementerian per triwulan', None, '<div data-kin="km"></div>') +
 sec(KN, 'sdgs', 'SDGs', 'Sustainable Development Goals', 'Ketercapaian implementasi SDGs', None, '<div data-kin="sdg"></div>') +
 sec(KN, 'risiko', 'Risk Register', 'Tata kelola berbasis risiko', 'Risk register & laporan manajemen risiko', 'Mengikuti Pedoman Tata Kelola Berbasis Risiko UNIZAR (SNI ISO 31000:2018, HIRADC untuk risiko K3): identifikasi FR-01, mitigasi FR-02, pemantauan triwulanan, reviu SPI, dan laporan Lampiran 12.', '<div data-kin="risk"></div>'),
 '<span class="pill gold" style="margin-top:16px">Internal · perlu masuk</span>')

# ------------------------------------------------------------------ BERITA & DASBOR
BR = 'berita'
berita = page(BR, 'Berita & Agenda', '', 'Berita & Agenda', 'Berita & Agenda', 'Kabar terbaru dari kampus dan acara yang akan datang.', 'liputan kegiatan kampus',
 sec(BR, 'berita', 'Berita', 'Berita', 'Berita terbaru', None,
  f'''<div data-filter><div class="chips" data-chips="c" role="group" aria-label="Kategori berita" style="margin-bottom:18px"><button type="button" data-v="all" aria-pressed="true">Semua</button>{"".join(f'<button type="button" data-v="{dslug(c)}" aria-pressed="false">{c}</button>' for c in dict.fromkeys(n[1] for n in NEWS))}</div>
<div class="news-grid">{"".join(f'<a class="card news" href="#" data-open="detail:berita-{k}" data-item data-c="{dslug(c)}">{ph(cap, ["", "sky", "warm", "red"][i % 4])}<div class="t"><span class="pill">{c}</span><h3>{t}</h3><small class="muted">{d}</small></div></a>' for i, (k, c, t, cap, d, ps) in enumerate(NEWS))}</div></div>''') +
 sec(BR, 'agenda', 'Agenda', 'Agenda', 'Agenda kampus', None,
  f'''<ul class="clean agenda">{"".join(f'<li><span class="d">{d.split()[0]}<small>{d.split()[1]}</small></span><div><a href="#" data-open="detail:agenda-{k}"><b>{t}</b></a><div class="muted">{w}</div></div></li>' for k, d, t, w in AGENDA)}</ul>'''))
dasbor = page('dasbor', 'Dasbor', '', 'Dasbor', 'Dasbor saya', 'Permohonan, akses cepat, dan dokumen sesuai peran Anda.', 'ruang kerja',
 '<section class="sec" id="dasbor--utama" data-t="Dasbor"><div class="wrap"><div id="dash"></div></div></section>')

# details generated from page data
for n, c, e, l in UNITS:
    DETAILS['unit-' + dslug(n)] = {'k': 'Direktori · ' + (c.upper() if c == 'upt' else c.capitalize()), 't': n, 'p': ['[Tugas dan fungsi unit sesuai Statuta dan OTK.]'], 'cap': 'kantor ' + n,
        'meta': [('Email', e), ('Lokasi', l), ('Jam layanan', 'Senin–Jumat, 08.00–16.00 WITA'), ('Kepala unit', '[Nama]')],
        'lists': [('Layanan utama', ['[Layanan 1]', '[Layanan 2]', '[Layanan 3]'])],
        'a': ([('Kunjungi website', 'ext:web-' + dslug(n))] if n in UNIT_WEB else []) + [('Hubungi unit', 'form:kontak')], 'x': None}
    if n in UNIT_WEB: EXT['web-' + dslug(n)] = ('Website ' + n, 'Website resmi ' + n + '.', False)
for i, (n, sc, b, k, r) in enumerate(MITRA):
    DETAILS[f'mitra-{i}'] = {'k': 'Kerja sama · ' + ('Luar negeri' if sc == 'ln' else 'Dalam negeri'), 't': n, 'p': ['[Ruang lingkup kerja sama dan manfaat bagi kedua pihak.]'], 'cap': 'kegiatan bersama mitra',
        'meta': [('Bidang', b), ('Jenis naskah', 'MoA'), ('Masa berlaku', '[tanggal]–[tanggal]'), ('Status realisasi', r)],
        'lists': [('Kegiatan yang terealisasi', [k + ' · [tahun] · [jumlah peserta]', '[Kegiatan lain] · [tahun]'])], 'a': [('Naskah kerja sama', 'doc:' + dslug('Naskah kerja sama ' + n)), ('Ajukan kerja sama baru', 'form:ajukan-kerjasama')], 'x': None}
    DOCREG[dslug('Naskah kerja sama ' + n)] = {'t': 'Naskah kerja sama ' + n, 'm': 'MoA · Biro HKA', 'acc': 'lock'}
for k, n, pr in [(f[0], f[2], f[3]) for f in FAC if f[0] != 'fk']:
    DETAILS['fak-' + k] = {'k': 'Fakultas', 't': 'Fakultas ' + n, 'p': ['[Profil singkat fakultas, keunggulan, dan fasilitas.]', 'Halaman lengkap fakultas tersedia di website fakultas.'], 'cap': 'kegiatan Fakultas ' + n,
        'meta': [('Dekan', '[Nama]'), ('Program studi', pr.replace(' · ', ', ')), ('Lokasi', '[Gedung]')], 'lists': [], 'a': [('Website fakultas', 'ext:web-fak-' + k), ('Daftar PMB', 'ext:pmb')], 'x': None}
    EXT['web-fak-' + k] = ('Website Fakultas ' + n, 'Website resmi Fakultas ' + n + '.', False)
DETAILS['prodi-x'] = {'k': 'Program studi', 't': 'Program studi', 'p': ['[Profil singkat prodi, capaian pembelajaran, dan prospek karier.]', 'Pola halaman lengkap mengikuti contoh Prodi Pendidikan Dokter.'], 'cap': 'kegiatan prodi',
    'meta': [('Jenjang', 'S1'), ('Akreditasi', '[peringkat] · SK [nomor]'), ('Ketua prodi', '[Nama]')], 'lists': [], 'a': [('Contoh halaman prodi lengkap', '#prodi-pendidikan-dokter'), ('Website prodi', 'ext:web'), ('Daftar PMB', 'ext:pmb')], 'x': None}
for k, t, p in [('intl-mhs', 'Mobilitas mahasiswa', 'Pertukaran pelajar, summer course, dan magang luar negeri bersama universitas mitra.'), ('intl-dosen', 'Mobilitas dosen', 'Visiting lecturer, riset bersama, dan konferensi internasional.'), ('intl-pendaftar', 'Mahasiswa internasional', 'Informasi pendaftaran, visa, akomodasi, dan pendampingan bagi mahasiswa asing.')]:
    DETAILS[k] = {'k': 'Internasional', 't': t, 'p': [p, '[Syarat, jadwal, dan pendanaan.]'], 'cap': t, 'meta': [('Pengelola', 'Biro Humas, Kerja Sama & Alumni'), ('Batas pendaftaran', '[tanggal]')],
        'lists': [('Program tersedia', ['[Program 1] · [Mitra]', '[Program 2] · [Mitra]'])], 'a': [('Ajukan / daftar', 'form:kontak'), ('Mitra luar negeri', '#kerjasama|mitra')], 'x': None}
DETAILS['disabilitas'] = {'k': 'Layanan mahasiswa', 't': 'Unit layanan disabilitas', 'p': ['Pendampingan sejak pendaftaran: akomodasi ujian, akses gedung, dan materi belajar yang aksesibel.'], 'cap': 'pendampingan mahasiswa',
    'meta': [('Kontak', '[email] · [WhatsApp]'), ('Lokasi', '[Gedung]')], 'lists': [('Layanan', ['Pendamping belajar', 'Materi format aksesibel', 'Akomodasi ujian', 'Akses gedung & parkir'])], 'a': [('Ajukan pendampingan', 'form:kontak')], 'x': None}
DETAILS['ukm'] = {'k': 'Kemahasiswaan', 't': 'Organisasi mahasiswa & UKM', 'p': ['Wadah pengembangan minat, bakat, dan kepemimpinan mahasiswa.'], 'cap': 'kegiatan UKM',
    'meta': [('Pembina', 'Biro Kemahasiswaan')], 'lists': [('Organisasi', ['BEM Universitas', 'DPM', 'UKM Kerohanian', 'UKM Tahfidz', 'UKM Olahraga', 'UKM Seni & Budaya', 'UKM Pecinta Alam', 'UKM Jurnalistik', 'UKM Penelitian', 'UKM Kewirausahaan', 'UKM Bahasa Asing', 'KSR PMI'])],
    'a': [('Pinjam ruang kegiatan', 'form:peminjaman-ruang')], 'x': None}
EXT['web'] = ('Website unit', 'Website resmi unit di lingkungan UNIZAR.', False)
missing = [k for k in FORMS if k not in FORMS]

# ------------------------------------------------------------------ SEARCH INDEX
idx = []
for k, l, e, p, desc, subs, feat in NAV:
    idx.append({'t': l, 'p': p, 'g': 'Menu', 'pop': k in ('pendidikan', 'penjaminan-mutu')})
    for sl, se, pp, ss, sd in subs:
        idx.append({'t': sl, 'p': pp, 's': ss, 'g': l, 'k': sd})
for pid, t in [('layanan', 'Layanan'), ('kerjasama', 'Kerjasama & Internasional'), ('mahasiswa-alumni', 'Mahasiswa & Alumni'), ('masuk', 'Masuk'), ('peta-bukti', 'Peta Bukti BAN-PT')]:
    idx.append({'t': t, 'p': pid, 'g': 'Halaman', 'pop': pid in ('layanan', 'peta-bukti')})
for n, c, m, a in DOCS:
    idx.append({'t': n, 'p': 'pusdatin', 'g': 'Dokumen', 'k': m + ' ' + c, 'pop': n.startswith('Statuta')})
for t, d, a, c, lg in SERV:
    idx.append({'t': t, 'p': 'layanan', 's': 'katalog', 'g': 'Layanan', 'k': d})
for n, (t, links) in IND.items():
    lab, p, s = links[0]
    idx.append({'t': f'Ind. {n} · {t}', 'p': p, 's': s, 'g': 'Bukti akreditasi', 'k': f'indikator {n} iapt'})
idx.append({'t': 'JDIH UNIZAR (produk hukum)', 'p': 'pusdatin', 's': 'jdih', 'g': 'Pusdatin', 'k': 'peraturan rektor statuta keputusan jdih'})
idx.append({'t': 'Arsip sertifikat akreditasi', 'p': 'penjaminan-mutu', 's': 'arsip', 'g': 'Penjaminan Mutu', 'pop': True, 'k': 'alumni sertifikat akreditasi lama'})
for fk, fv in FORMS.items():
    if fk != 'kolaborasi-pkm': idx.append({'t': fv['t'], 'o': 'form:' + fk, 'p': 'layanan', 'g': 'Layanan · ' + fv['u'], 'k': fv['i']})
idx.append({'t': 'Berita & agenda', 'p': 'berita', 'g': 'Halaman'})
idx.append({'t': 'UNIZAR untuk SDGs', 'p': 'profil', 's': 'sdgs', 'g': 'Profil', 'k': 'sdgs sdg keberlanjutan sustainable'})
idx.append({'t': 'Portal Kinerja & Risiko (internal)', 'p': 'kinerja', 'g': 'Sistem internal', 'k': 'portal kinerja risk register risiko iku kementerian triwulan'})
idx.append({'t': 'Beasiswa & keringanan UKT', 'p': 'pendidikan', 's': 'penerimaan', 'g': 'Pendidikan', 'pop': True, 'k': 'kip kuliah'})
idx.append({'t': 'Lapor kekerasan / pelanggaran', 'p': 'tata-kelola', 's': 'integritas', 'g': 'Tata Kelola', 'pop': True, 'k': 'ppkpt wbs whistleblowing'})

# ------------------------------------------------------------------ CHROME
util = f'''<div class="util"><div class="wrap">
<div class="util-l"><span id="sess"></span></div>
<div class="util-r"><a href="#pendidikan" data-sec="penerimaan">PMB 2027</a><a class="hide-s" href="#berita" data-en="News">Berita</a><a class="hide-s" href="#tata-kelola" data-sec="ppid">PPID</a><a class="hide-s" href="#pusdatin" data-sec="jdih">JDIH</a><a class="hide-s" href="#direktori" data-sec="kontak" data-en="Contact">Kontak</a>
<button class="util-search" type="button" data-open-search>{I("search")}<span data-en="Search">Cari</span></button>
<div class="lang" role="group" aria-label="Bahasa"><button type="button" data-l="id" aria-pressed="true">ID</button><button type="button" data-l="en" aria-pressed="false">EN</button></div></div></div></div>'''
header = f'''<header class="hdr"><div class="wrap">
<nav class="nav l" aria-label="Menu utama">{nav_buttons(LEFT)}</nav>
<a class="seal" href="#beranda" aria-label="Beranda Universitas Islam Al-Azhar"><img src="{LOGO}" alt="Logo Universitas Islam Al-Azhar"><span>UNIZAR</span></a>
<nav class="nav r" aria-label="Menu utama lanjutan">{nav_buttons(RIGHT)}</nav></div>
<div class="hdr-m"><button class="icon-btn" type="button" data-open-drawer aria-label="Buka menu">{I("menu")}</button><a class="brand" href="#beranda"><img src="{LOGO}" alt="">UNIZAR</a><button class="icon-btn" type="button" data-open-search aria-label="Cari">{I("search")}</button></div>
{"".join(mega(n) for n in NAV)}</header>'''
rail = '<nav class="rail" aria-label="Akses cepat"><div class="rail-label">AKSES</div>' + ''.join(f'<a class="{c.strip()}" href="#{p}">{I(ic)}<span data-en="{e}">{l}</span></a>' + ('<hr>' if p == 'masuk' else '') for p, ic, l, e, c in RAIL) + '</nav>'
drawer = f'''<div class="drawer" id="drawer" hidden><div class="panel" role="dialog" aria-label="Menu">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><a class="brand" href="#beranda" style="display:flex;gap:8px;align-items:center;font-weight:800;text-decoration:none;color:var(--em-800)"><img src="{LOGO}" alt="" style="width:36px">UNIZAR</a><button class="icon-btn" type="button" data-close-drawer aria-label="Tutup menu">{I("close")}</button></div>
<div class="quick">{"".join(f'<a href="#{p}">{I(ic)}{l}</a>' for p, ic, l, e, c in RAIL)}</div>
{"".join(f'<details><summary>{l}</summary><a href="#{p}">Ringkasan {l}</a>{"".join(f"<a {href(pp, ss)}>{sl}</a>" for sl, se, pp, ss, sd in subs)}</details>' for k, l, e, p, desc, subs, feat in NAV)}
<div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center"><span class="muted">Bahasa</span><div class="lang" style="border-color:var(--line)"><button type="button" data-l="id" aria-pressed="true" style="color:var(--ink)">ID</button><button type="button" data-l="en" aria-pressed="false" style="color:var(--ink)">EN</button></div></div>
</div></div>'''
search = f'''<div class="overlay" id="search" hidden><div class="search-box" role="dialog" aria-label="Pencarian">
<div class="in">{I("search")}<label for="search-q" class="skip">Cari</label><input id="search-q" type="search" placeholder="Cari halaman, layanan, dokumen, atau nomor indikator" autocomplete="off"><button class="icon-btn" type="button" data-close-search aria-label="Tutup pencarian">{I("close")}</button></div>
<ul class="clean" id="search-res"></ul><div class="hint">Tips: tekan <b>/</b> untuk membuka pencarian dari halaman mana pun.</div></div></div>'''
footer = f'''<footer><div class="wrap"><div class="f-grid">
<div><div class="f-id"><img src="{LOGO}" alt=""><b>Universitas Islam<br>Al-Azhar</b></div><p style="font-size:14px">Jl. Unizar No. 20, Turida, Sandubaya, Mataram, NTB 83232<br>(0370) 6175555 · humas@unizar.ac.id</p><p style="font-size:13px;margin-top:10px">Instagram · YouTube · Facebook · TikTok</p></div>
<div><h4 data-en="University">Universitas</h4><a href="#profil">Profil</a><a href="#fakultas">Fakultas</a><a href="#direktori">Direktori</a><a href="#tata-kelola">Tata Kelola</a></div>
<div><h4 data-en="Academics">Akademik</h4><a href="#pendidikan">Pendidikan</a><a href="#penelitian">Penelitian</a><a href="#pengabdian">Pengabdian</a><a href="#penjaminan-mutu">Penjaminan Mutu</a></div>
<div><h4 data-en="Quick access">Akses cepat</h4><a href="#layanan">Layanan</a><a href="#kerjasama">Kerjasama</a><a href="#mahasiswa-alumni">Mahasiswa & Alumni</a><a href="#pusdatin">Pusdatin</a><a href="#" data-open="ext:jdih">JDIH UNIZAR ↗</a></div>
<div><h4 data-en="National systems">Sistem nasional</h4><a href="#" data-open="ext:pddikti">PD Dikti ↗</a><a href="#" data-open="ext:sinta">SINTA ↗</a><a href="#" data-open="ext:spada">SPADA ↗</a><a href="#" data-open="ext:sierra">SIERRA (RPL) ↗</a></div>
</div><div class="f-bot"><span>© 2026 Universitas Islam Al-Azhar</span><span><a href="#" data-open="detail:privasi" style="display:inline">Kebijakan privasi</a> · <a href="#" data-open="detail:sangkalan" style="display:inline">Pernyataan sangkalan</a> · <a href="#" data-open="detail:aksesibilitas" style="display:inline">Aksesibilitas</a> · <a href="#" data-open="ext:arsip-lama" style="display:inline">Arsip situs lama</a></span></div></div></footer>'''
bbar = f'<nav class="bbar" aria-label="Navigasi bawah"><a href="#beranda">{I("home")}Beranda</a><a href="#layanan">{I("grid")}Layanan</a><button type="button" data-open-search>{I("search")}Cari</button><a href="#masuk">{I("login")}Masuk</a></nav>'

css = (D / 'style.css').read_text().replace('--hdr:84px;', f'--hdr:84px;\n  --pattern:{PATTERN};', 1)
js = (D / 'app.js').read_text() + '\n' + (D / 'flows.js').read_text() + '\n' + (D / 'kinerja.js').read_text()
html = f'''<title>Website UNIZAR · Mockup v2</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Amiri:wght@700&display=swap">
<style>{css}</style>
<noscript><style>#p-beranda{{display:block!important}}.page:not(#p-beranda){{display:none!important}}</style><div style="background:#FFF4CF;color:#6B4E00;padding:12px 20px;font:600 14px system-ui;text-align:center">Pratinjau tanpa JavaScript. Buka file ini dengan Safari atau Chrome (klik dua kali, bukan pratinjau spasi) agar semua menu berfungsi.</div></noscript>
<a class="skip" href="#main">Lewati ke konten</a>
{util}{header}
{rail}
<main id="main">{home}{profil}{fakultas}{fkp}{prodi}{direktori}{pusdok}{tatakelola}{kinerja}{pendidikan}{penelitian}{publikasi}{pengabdian}{mutu}{peta}{layanan}{kerjasama}{mhs}{masuk}{berita}{dasbor}</main>
{footer}{bbar}{drawer}{search}
<div class="mock-pill" role="note">Mockup UI/UX · teks & angka ilustratif <button type="button" aria-label="Sembunyikan catatan">×</button></div>
<script type="application/json" id="flow-data">{json.dumps({'forms': FORMS, 'details': DETAILS, 'ext': EXT, 'docs': DOCREG, 'prodi': PRODI}, ensure_ascii=False).replace('</', '<\\/')}</script>
<script type="application/json" id="kin-data">{json.dumps(KIN, ensure_ascii=False).replace('</', '<\\/')}</script>
<script type="application/json" id="search-index">{json.dumps(idx, ensure_ascii=False)}</script>
<script>document.body.classList.add('has-rail');</script>
<script>{js}</script>
'''
OUT.write_text(html, encoding='utf-8')
print('written', OUT, len(html) // 1024, 'KB')
