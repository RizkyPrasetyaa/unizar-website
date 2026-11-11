// Page wrapper: p-masuk
// This is the top-level shell for the 'masuk' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { FormSection } from "./FormSection";
export function PageShell() {
  return (
    <section className="page" id="p-masuk" data-title="Masuk" data-nav="">
      <div className="pagehero">
        <div className="pat"></div>
        <div className="wrap">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="#beranda">Beranda</a> / Masuk
            </nav>
            <h1>Masuk ke UNIZAR</h1>
            <p>
              Satu akun untuk layanan dan dokumen terbatas. Asesor menggunakan akun berbatas waktu dari Penjaminan Mutu.
            </p>
          </div>
          <div
            className="ph "
            data-cap="Foto: gedung kampus malam hari"
            role="img"
            aria-label="Tempat foto: gedung kampus malam hari"
            style={{}}
          ></div>
        </div>
      </div>
      <div className="subnav">
        <div className="wrap"></div>
      </div>
      <FormSection />
    </section>
  );
}
