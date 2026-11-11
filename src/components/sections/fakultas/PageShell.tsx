// Page wrapper: p-fakultas
// This is the top-level shell for the 'fakultas' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { DaftarSection } from "./DaftarSection";
export function PageShell() {
  return (
    <section className="page" id="p-fakultas" data-title="Fakultas" data-nav="fakultas">
      <div className="pagehero">
        <div className="pat"></div>
        <div className="wrap">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="#beranda">Beranda</a> / Fakultas
            </nav>
            <h1>Fakultas & Program Studi</h1>
            <p>Tujuh fakultas dengan tiga belas program studi sarjana dan profesi.</p>
          </div>
          <div
            className="ph "
            data-cap="Foto: gedung kuliah"
            role="img"
            aria-label="Tempat foto: gedung kuliah"
            style={{}}
          ></div>
        </div>
      </div>
      <div className="subnav">
        <div className="wrap"></div>
      </div>
      <DaftarSection />
    </section>
  );
}
