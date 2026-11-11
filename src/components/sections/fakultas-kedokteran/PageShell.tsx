// Page wrapper: p-fakultas-kedokteran
// This is the top-level shell for the 'fakultas-kedokteran' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { TentangSection } from "./TentangSection";
import { ProdiSection } from "./ProdiSection";
import { FasilitasSection } from "./FasilitasSection";
import { KabarSection } from "./KabarSection";
export function PageShell() {
  return (
    <section className="page" id="p-fakultas-kedokteran" data-title="Fakultas Kedokteran" data-nav="fakultas">
      <div className="pagehero">
        <div className="pat"></div>
        <div className="wrap">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="#beranda">Beranda</a> / <a href="#fakultas">Fakultas</a> / Kedokteran
            </nav>
            <h1>Fakultas Kedokteran</h1>
            <p>Contoh pola halaman fakultas: satu halaman yang bercerita, dengan dua program studi di dalamnya.</p>
            <div className="btn-row" style={{ marginTop: "20px" }}>
              <a className="btn ghost" href="#" title="Alamat website menyusul" data-web>
                Website Fakultas Kedokteran{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                </svg>
              </a>
            </div>
          </div>
          <div
            className="ph "
            data-cap="Foto: mahasiswa di skills lab"
            role="img"
            aria-label="Tempat foto: mahasiswa di skills lab"
            style={{}}
          ></div>
        </div>
      </div>
      <div className="subnav">
        <div className="wrap"></div>
      </div>
      <TentangSection />
      <ProdiSection />
      <FasilitasSection />
      <KabarSection />
    </section>
  );
}
