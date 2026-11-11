// Page wrapper: p-dasbor
// This is the top-level shell for the 'dasbor' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { UtamaSection } from './UtamaSection';
export function PageShell() {
  return (
    <section className="page" id="p-dasbor" data-title="Dasbor" data-nav="">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / Dasbor</nav><h1>Dasbor saya</h1><p>Permohonan, akses cepat, dan dokumen sesuai peran Anda.</p></div><div className="ph " data-cap="Foto: ruang kerja" role="img" aria-label="Tempat foto: ruang kerja" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<UtamaSection />
</section>
  );
}
