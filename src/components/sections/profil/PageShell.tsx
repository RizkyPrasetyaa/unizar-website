// Page wrapper: p-profil
// This is the top-level shell for the 'profil' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { TentangSection } from "./TentangSection";
import { SejarahSection } from "./SejarahSection";
import { PimpinanSection } from "./PimpinanSection";
import { AngkaSection } from "./AngkaSection";
import { SdgsSection } from "./SdgsSection";
export function PageShell() {
  return (
    <section className="page" id="p-profil" data-title="Profil" data-nav="profil">
      <div className="pagehero">
        <div className="pat"></div>
        <div className="wrap">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="#beranda">Beranda</a> / Profil
            </nav>
            <h1>Mengenal UNIZAR</h1>
            <p>
              Universitas Islam di jantung Kota Mataram yang tumbuh bersama masyarakat Nusa Tenggara Barat sejak 1981.
            </p>
          </div>
          <div
            className="ph "
            data-cap="Foto: Gedung Rektorat UNIZAR"
            role="img"
            aria-label="Tempat foto: Gedung Rektorat UNIZAR"
            style={{}}
          ></div>
        </div>
      </div>
      <div className="subnav">
        <div className="wrap"></div>
      </div>
      <TentangSection />
      <SejarahSection />
      <PimpinanSection />
      <AngkaSection />
      <SdgsSection />
    </section>
  );
}
