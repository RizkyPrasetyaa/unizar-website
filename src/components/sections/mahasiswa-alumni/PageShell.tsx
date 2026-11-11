// Page wrapper: p-mahasiswa-alumni
// This is the top-level shell for the 'mahasiswa-alumni' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { LayananSection } from './LayananSection';
import { PrestasiSection } from './PrestasiSection';
import { AlumniSection } from './AlumniSection';
export function PageShell() {
  return (
    <section className="page" id="p-mahasiswa-alumni" data-title="Mahasiswa & Alumni" data-nav="">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / Mahasiswa & Alumni</nav><h1>Mahasiswa & Alumni</h1><p>Tumbuh selama kuliah, tetap terhubung setelah lulus.</p></div><div className="ph " data-cap="Foto: kegiatan UKM mahasiswa" role="img" aria-label="Tempat foto: kegiatan UKM mahasiswa" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<LayananSection /><PrestasiSection /><AlumniSection />
</section>
  );
}
