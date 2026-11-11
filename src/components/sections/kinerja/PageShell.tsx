// Page wrapper: p-kinerja
// This is the top-level shell for the 'kinerja' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { RenstraSection } from './RenstraSection';
import { KementerianSection } from './KementerianSection';
import { SdgsSection } from './SdgsSection';
import { RisikoSection } from './RisikoSection';
export function PageShell() {
  return (
    <section className="page" id="p-kinerja" data-title="Portal Kinerja & Risiko" data-nav="">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / <a href="#dasbor">Dasbor</a> / Portal Kinerja & Risiko</nav><h1>Portal Kinerja & Risiko</h1><p>Ruang kerja internal untuk mengisi capaian IKU/IKT, menyusun laporan Kementerian dan SDGs, serta mengelola risk register. Contoh layar: pada implementasi, portal ini berjalan di kinerja.unizar.ac.id dengan SSO.</p><span className="pill gold" style={{'marginTop': '16px'}}>Internal · perlu masuk</span></div><div className="ph " data-cap="Foto: ruang kerja unit" role="img" aria-label="Tempat foto: ruang kerja unit" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<div className="wrap kin-gate"><div className="gate"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg><p><b>Portal ini khusus sivitas yang berwenang.</b><br />Masuk sebagai operator unit, koordinator, SPI, tim mutu, atau asesor. Ringkasan publik ada di <a href="#profil" data-sec="angka">Profil › UNIZAR dalam Angka</a>.</p><a className="btn dark" href="#masuk">Masuk</a></div></div><RenstraSection /><KementerianSection /><SdgsSection /><RisikoSection />
</section>
  );
}
