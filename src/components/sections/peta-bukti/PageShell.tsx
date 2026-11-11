// Page wrapper: p-peta-bukti
// This is the top-level shell for the 'peta-bukti' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { PetaSection } from './PetaSection';
export function PageShell() {
  return (
    <section className="page" id="p-peta-bukti" data-title="Peta Bukti BAN-PT" data-nav="penjaminan-mutu">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / <a href="#penjaminan-mutu">Penjaminan Mutu</a> / Peta Bukti</nav><h1>Peta Bukti BAN-PT</h1><p>Ke-39 indikator Instrumen Akreditasi Perguruan Tinggi (IAPT 4.1) beserta tautan langsung ke buktinya di website ini.</p></div><div className="ph " data-cap="Foto: tim mutu menyusun dokumen" role="img" aria-label="Tempat foto: tim mutu menyusun dokumen" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<PetaSection />
</section>
  );
}
