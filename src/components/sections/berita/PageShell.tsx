// Page wrapper: p-berita
// This is the top-level shell for the 'berita' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { BeritaSection } from "./BeritaSection";
import { AgendaSection } from "./AgendaSection";
export function PageShell() {
  return (
    <section className="page" id="p-berita" data-title="Berita & Agenda" data-nav="">
      <div className="pagehero">
        <div className="pat"></div>
        <div className="wrap">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="#beranda">Beranda</a> / Berita & Agenda
            </nav>
            <h1>Berita & Agenda</h1>
            <p>Kabar terbaru dari kampus dan acara yang akan datang.</p>
          </div>
          <div
            className="ph "
            data-cap="Foto: liputan kegiatan kampus"
            role="img"
            aria-label="Tempat foto: liputan kegiatan kampus"
            style={{}}
          ></div>
        </div>
      </div>
      <div className="subnav">
        <div className="wrap"></div>
      </div>
      <BeritaSection />
      <AgendaSection />
    </section>
  );
}
