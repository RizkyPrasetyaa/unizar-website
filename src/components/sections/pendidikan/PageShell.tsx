// Page wrapper: p-pendidikan
// This is the top-level shell for the 'pendidikan' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { PenerimaanSection } from './PenerimaanSection';
import { KurikulumSection } from './KurikulumSection';
import { KalenderSection } from './KalenderSection';
import { SuasanaSection } from './SuasanaSection';
export function PageShell() {
  return (
    <section className="page" id="p-pendidikan" data-title="Pendidikan" data-nav="pendidikan">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / Pendidikan</nav><h1>Pendidikan</h1><p>Dari pendaftaran, perkuliahan, sampai wisuda. Semua yang perlu Anda ketahui tentang belajar di UNIZAR.</p></div><div className="ph " data-cap="Foto: perkuliahan di kelas" role="img" aria-label="Tempat foto: perkuliahan di kelas" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<PenerimaanSection /><KurikulumSection /><KalenderSection /><SuasanaSection />
</section>
  );
}
