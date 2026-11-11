// Page wrapper: p-tata-kelola
// This is the top-level shell for the 'tata-kelola' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { KebijakanSection } from "./KebijakanSection";
import { IntegritasSection } from "./IntegritasSection";
import { PengawasanSection } from "./PengawasanSection";
import { PpidSection } from "./PpidSection";
export function PageShell() {
  return (
    <section className="page" id="p-tata-kelola" data-title="Tata Kelola" data-nav="tata-kelola">
      <div className="pagehero">
        <div className="pat"></div>
        <div className="wrap">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="#beranda">Beranda</a> / Tata Kelola
            </nav>
            <h1>Tata Kelola</h1>
            <p>Kami melaporkan apa yang kami kerjakan, menjaga integritas, dan membuka informasi publik.</p>
          </div>
          <div
            className="ph "
            data-cap="Foto: rapat senat universitas"
            role="img"
            aria-label="Tempat foto: rapat senat universitas"
            style={{}}
          ></div>
        </div>
      </div>
      <div className="subnav">
        <div className="wrap"></div>
      </div>
      <KebijakanSection />
      <IntegritasSection />
      <PengawasanSection />
      <PpidSection />
    </section>
  );
}
