// Page wrapper: p-kerjasama
// This is the top-level shell for the 'kerjasama' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { MitraSection } from './MitraSection';
import { InternasionalSection } from './InternasionalSection';
import { AjukanSection } from './AjukanSection';
export function PageShell() {
  return (
    <section className="page" id="p-kerjasama" data-title="Kerjasama & Internasional" data-nav="">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / Kerjasama & Internasional</nav><h1>Kerjasama & Internasional</h1><p>Setiap kerja sama ditampilkan bersama kegiatannya, karena yang penting adalah hasilnya.</p></div><div className="ph " data-cap="Foto: penandatanganan kerja sama" role="img" aria-label="Tempat foto: penandatanganan kerja sama" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<MitraSection /><InternasionalSection /><AjukanSection />
</section>
  );
}
