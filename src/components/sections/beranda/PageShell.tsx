// Page wrapper: p-beranda
// This is the top-level shell for the 'beranda' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.

export function PageShell() {
  return (
    <section className="page" id="p-beranda" data-title="Beranda" data-nav="">
<div className="hero" data-hero-media="emerald"><div className="hero-bg" aria-hidden="true"></div>
{/*  Latar beranda: warna emerald bergerak. Operator web dapat menggantinya dengan foto atau video melalui CMS (atribut data-hero-media).  */}
<div className="wrap"><div>
<p className="hero-kicker">UNIVERSITAS ISLAM AL-AZHAR</p>
<h1 data-en="Welcome to the campus of <em>Rahmatan lil 'Alamin</em>">Selamat Datang di Kampus <em>Rahmatan lil 'Alamin</em></h1>
<div className="btn-row"><a className="btn pri" href="#pendidikan" data-sec="penerimaan"><span data-en="Apply for 2027">Daftar PMB 2027</span> <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn ghost" href="#profil"><span data-en="Discover UNIZAR">Kenali UNIZAR</span></a></div>
</div></div></div>

<div className="aud"><div className="wrap"><span data-en="I am a">Saya adalah</span>
<a href="#pendidikan" data-sec="penerimaan" data-en="Prospective student">Calon mahasiswa</a><a href="#layanan" data-en="Student">Mahasiswa</a><a href="#layanan" data-en="Lecturer & staff">Dosen & tendik</a><a href="#mahasiswa-alumni" data-sec="alumni" data-en="Alumni">Alumni</a><a href="#kerjasama" data-en="Partner">Mitra & industri</a></div></div>

<section className="sec"><div className="wrap">
<div className="stats">
<div className="stat"><b>1981</b><span data-en="Founded in Mataram">Berdiri di Mataram</span></div>
<div className="stat"><b>7</b><span data-en="Faculties">Fakultas</span></div>
<div className="stat"><b>13</b><span data-en="Study programmes">Program studi</span></div>
<div className="stat"><b style={{'fontSize': '20px', 'lineHeight': '1.3', 'paddingTop': '8px'}}>Fakta lengkap & sumber data</b><span><a href="#profil" data-sec="angka" data-en="UNIZAR in Numbers →">UNIZAR dalam Angka →</a></span></div>
</div></div></section>

<section className="sec"><div className="wrap">
<div className="sec-h"><div><span className="eyebrow" data-en="What sets us apart">Keunggulan</span><h2 data-en="Three focus areas that define UNIZAR">Tiga fokus yang membedakan UNIZAR</h2><p data-en="Three commitments that shape our teaching, research, and service.">Tiga komitmen yang menjiwai pendidikan, riset, dan pengabdian di UNIZAR.</p></div><a className="btn line" href="#profil" data-sec="tentang">Baca diferensiasi misi <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></div>
<div className="focus">
<a className="card" href="#" data-open="detail:fokus-pendidikan"><div className="ph " data-cap="Foto: mahasiswa berdiskusi di kelas" role="img" aria-label="Tempat foto: mahasiswa berdiskusi di kelas" style={{}}></div><div className="body"><span className="pill">Pendidikan</span><h3>Misi Pendidikan Berkualitas</h3><p>Kurikulum berbasis luaran, pembelajaran berbasis kasus dan proyek, serta dosen yang terus bertumbuh. Setiap lulusan kami siapkan kompeten, beretika, dan siap bersaing.</p></div></a>
<a className="card" href="#" data-open="detail:fokus-rahmatan"><div className="ph warm" data-cap="Foto: sivitas lintas latar belakang di masjid kampus" role="img" aria-label="Tempat foto: sivitas lintas latar belakang di masjid kampus" style={{}}></div><div className="body"><span className="pill gold">Nilai</span><h3>Kampus Rahmatan lil 'Alamin</h3><p>Islam yang menebar rahmat bagi semua. Kampus yang aman, inklusif, dan berintegritas, terbuka bagi siapa pun tanpa memandang suku, agama, dan latar belakang.</p></div></a>
<a className="card" href="#" data-open="detail:fokus-pariwisata"><div className="ph sky" data-cap="Foto: pantai dan desa wisata di Lombok" role="img" aria-label="Tempat foto: pantai dan desa wisata di Lombok" style={{}}></div><div className="body"><span className="pill">Pariwisata</span><h3>Berwawasan Kepariwisataan Berkelanjutan</h3><p>Lombok adalah rumah kami sekaligus destinasi dunia. Setiap prodi menghadirkan wawasan kepariwisataan, dari kesehatan wisata dan ekonomi halal sampai pelestarian alam dan budaya Sasak.</p></div></a>
</div></div></section>

<section className="sec" style={{'background': '#fff'}}><div className="wrap">
<div className="sec-h"><div><span className="eyebrow" data-en="Study with us">Belajar di UNIZAR</span><h2 data-en="Seven faculties, thirteen programmes">Tujuh fakultas, tiga belas program studi</h2></div><a className="btn line" href="#fakultas">Semua fakultas <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></div>
<div className="fac-scroll"><a className="fac-chip" href="#fakultas-kedokteran"><span className="abbr">FK</span><b>Kedokteran</b><small>Pendidikan Dokter · Profesi Dokter</small></a><a className="fac-chip" href="#fakultas" data-sec="ft"><span className="abbr">FT</span><b>Teknik</b><small>Teknik Sipil · Ilmu Komputer</small></a><a className="fac-chip" href="#fakultas" data-sec="fh"><span className="abbr">FH</span><b>Hukum</b><small>Ilmu Hukum</small></a><a className="fac-chip" href="#fakultas" data-sec="feb"><span className="abbr">FEB</span><b>Ekonomi & Bisnis</b><small>Akuntansi · Ekonomi Pembangunan</small></a><a className="fac-chip" href="#fakultas" data-sec="fp"><span className="abbr">FP</span><b>Pertanian</b><small>Agribisnis · Agroekoteknologi</small></a><a className="fac-chip" href="#fakultas" data-sec="fmipa"><span className="abbr">FMIPA</span><b>MIPA</b><small>Biologi</small></a><a className="fac-chip" href="#fakultas" data-sec="fai"><span className="abbr">FAI</span><b>Agama Islam</b><small>Ekonomi Syariah · Manajemen Bisnis Syariah</small></a></div>
</div></section>

<section className="sec"><div className="wrap">
<div className="sec-h"><div><span className="eyebrow" data-en="Stories">Kabar & kisah</span><h2 data-en="What our campus is doing">Yang sedang terjadi di kampus</h2></div><a className="btn line" href="#berita">Semua berita <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></div>
<div className="stories">
<a className="story" href="#" data-open="detail:berita-posyandu"><div className="ph " data-cap="Foto: posyandu di desa binaan Lombok Tengah" role="img" aria-label="Tempat foto: posyandu di desa binaan Lombok Tengah" style={{}}></div><div className="t"><span className="pill red">Pengabdian</span><h3>Mahasiswa kedokteran dampingi posyandu di tiga desa binaan</h3><p className="muted">Program berkelanjutan bersama puskesmas setempat, berfokus pada gizi balita dan kesehatan ibu.</p><small className="muted">[tanggal]</small></div></a>
<div className="story-stack">
<a className="story sm" href="#" data-open="detail:berita-hibah"><div className="ph sky" data-cap="Foto: laboratorium biologi" role="img" aria-label="Tempat foto: laboratorium biologi" style={{}}></div><div className="t"><span className="pill">Penelitian</span><h3>Dosen UNIZAR raih hibah riset kolaborasi internasional</h3><small className="muted">[tanggal]</small></div></a>
<a className="story sm" href="#" data-open="detail:berita-juara"><div className="ph warm" data-cap="Foto: tim debat di panggung" role="img" aria-label="Tempat foto: tim debat di panggung" style={{}}></div><div className="t"><span className="pill gold">Prestasi</span><h3>Tim mahasiswa juara kompetisi ilmiah tingkat nasional</h3><small className="muted">[tanggal]</small></div></a>
</div></div></div></section>

<section className="sec" style={{'background': '#fff'}}><div className="wrap split">
<div><div className="sec-h"><div><span className="eyebrow" data-en="Agenda">Agenda</span><h2 data-en="Coming up">Segera di kampus</h2></div></div>
<ul className="clean agenda"><li><span className="d">20<small>NOV</small></span><div><a href="#" data-open="detail:agenda-kuliah-umum"><b>Kuliah umum: Kesehatan wisatawan di destinasi super prioritas</b></a><div className="muted">Aula Rektorat · 09.00–12.00 WITA · terbuka untuk umum</div></div></li><li><span className="d">28<small>NOV</small></span><div><a href="#" data-open="detail:agenda-expo"><b>Expo UMKM halal mahasiswa FAI & FEB</b></a><div className="muted">Halaman kampus · 08.00–16.00 WITA</div></div></li><li><span className="d">05<small>DES</small></span><div><a href="#" data-open="detail:agenda-wisuda"><b>Wisuda Periode II 2026</b></a><div className="muted">Gedung Serbaguna · siaran langsung di kanal YouTube UNIZAR</div></div></li></ul></div>
<div className="band" style={{'alignSelf': 'stretch'}}><div><span className="eyebrow" style={{'color': 'var(--gold)'}}>PMB 2027</span><h2>Mulai perjalananmu di UNIZAR</h2><p>Lima jalur masuk, beasiswa KIP-Kuliah dan beasiswa internal, serta pendaftaran sepenuhnya daring.</p></div><a className="btn pri" href="#pendidikan" data-sec="penerimaan">Lihat jalur masuk <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></div>
</div></section>

<section className="sec"><div className="wrap">
<div className="sec-h"><div><span className="eyebrow" data-en="Partners">Mitra</span><h2 data-en="We work with">Bekerja bersama</h2></div><a className="btn line" href="#kerjasama">Semua kerja sama <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></div>
<div className="partners"><a href="#" data-open="detail:mitra-0">[Logo mitra 1]</a><a href="#" data-open="detail:mitra-1">[Logo mitra 2]</a><a href="#" data-open="detail:mitra-2">[Logo mitra 3]</a><a href="#" data-open="detail:mitra-3">[Logo mitra 4]</a><a href="#" data-open="detail:mitra-4">[Logo mitra 5]</a><a href="#" data-open="detail:mitra-5">[Logo mitra 6]</a></div>
<div className="slim" style={{'marginTop': '28px'}}><p><b style={{'color': 'var(--ink)'}}>Mencari dokumen mutu atau bukti akreditasi?</b> Semua tersedia di Penjaminan Mutu dan Pusdatin.</p><div className="btn-row"><a className="btn line" href="#peta-bukti">Peta Bukti BAN-PT</a><a className="btn line" href="#pusdatin">Pusdatin</a></div></div>
</div></section>
</section>
  );
}
