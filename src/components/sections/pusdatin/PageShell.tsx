// Page wrapper: p-pusdatin
// This is the top-level shell for the 'pusdatin' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { DaftarSection } from "./DaftarSection";
import { DataSection } from "./DataSection";
import { JdihSection } from "./JdihSection";
export function PageShell() {
  return (
    <section className="page" id="p-pusdatin" data-title="Pusat Data dan Informasi" data-nav="direktori">
      <div className="pagehero">
        <div className="pat"></div>
        <div className="wrap">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="#beranda">Beranda</a> / <a href="#direktori">Direktori</a> / Pusdatin
            </nav>
            <h1>Pusat Data dan Informasi</h1>
            <p>
              Dokumen resmi, data, dan statistik universitas di satu tempat. Dokumen bertanda gembok dapat dibuka oleh
              sivitas dan asesor setelah masuk.
            </p>
          </div>
          <div
            className="ph "
            data-cap="Foto: arsip dokumen"
            role="img"
            aria-label="Tempat foto: arsip dokumen"
            style={{}}
          ></div>
        </div>
      </div>
      <div className="subnav">
        <div className="wrap"></div>
      </div>
      <DaftarSection />
      <DataSection />
      <JdihSection />
    </section>
  );
}
