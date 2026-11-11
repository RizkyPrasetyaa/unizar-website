// Page wrapper: p-direktori
// This is the top-level shell for the 'direktori' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { UnitSection } from './UnitSection';
import { DosenSection } from './DosenSection';
import { DokumenSection } from './DokumenSection';
import { KontakSection } from './KontakSection';
export function PageShell() {
  return (
    <section className="page" id="p-direktori" data-title="Direktori" data-nav="direktori">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / Direktori</nav><h1>Direktori</h1><p>Satu tempat untuk menemukan unit kerja, dosen dan pakar, dokumen, serta lokasi di kampus.</p></div><div className="ph " data-cap="Foto: denah kampus" role="img" aria-label="Tempat foto: denah kampus" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<UnitSection /><DosenSection /><DokumenSection /><KontakSection />
</section>
  );
}
