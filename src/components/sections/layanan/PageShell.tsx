// Page wrapper: p-layanan
// This is the top-level shell for the 'layanan' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { KatalogSection } from './KatalogSection';
import { StatusSection } from './StatusSection';
export function PageShell() {
  return (
    <section className="page" id="p-layanan" data-title="Layanan" data-nav="">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / Layanan</nav><h1>Layanan</h1><p>Semua layanan kampus di satu tempat, dipilah sesuai kebutuhan Anda.</p></div><div className="ph " data-cap="Foto: loket layanan terpadu" role="img" aria-label="Tempat foto: loket layanan terpadu" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<KatalogSection /><StatusSection />
</section>
  );
}
