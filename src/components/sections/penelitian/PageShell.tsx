// Page wrapper: p-penelitian
// This is the top-level shell for the 'penelitian' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { RisetSection } from "./RisetSection";
import { PublikasiSection } from "./PublikasiSection";
import { TataKelolaSection } from "./TataKelolaSection";
export function PageShell() {
  return (
    <section className="page" id="p-penelitian" data-title="Penelitian" data-nav="penelitian">
      <div className="pagehero">
        <div className="pat"></div>
        <div className="wrap">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="#beranda">Beranda</a> / Penelitian
            </nav>
            <h1>Penelitian</h1>
            <p>
              Riset yang berangkat dari persoalan Nusa Tenggara Barat dan berbicara di tingkat nasional maupun
              internasional.
            </p>
            <div className="btn-row" style={{ marginTop: "20px" }}>
              <a className="btn ghost" href="#" title="Alamat website menyusul" data-web>
                Website LPPM{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                </svg>
              </a>
            </div>
          </div>
          <div
            className="ph "
            data-cap="Foto: peneliti di laboratorium"
            role="img"
            aria-label="Tempat foto: peneliti di laboratorium"
            style={{}}
          ></div>
        </div>
      </div>
      <div className="subnav">
        <div className="wrap"></div>
      </div>
      <RisetSection />
      <PublikasiSection />
      <TataKelolaSection />
    </section>
  );
}
