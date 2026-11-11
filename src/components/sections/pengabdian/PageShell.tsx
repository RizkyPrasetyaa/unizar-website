// Page wrapper: p-pengabdian
// This is the top-level shell for the 'pengabdian' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { ProgramSection } from './ProgramSection';
import { KepakaranSection } from './KepakaranSection';
import { DampakSection } from './DampakSection';
export function PageShell() {
  return (
    <section className="page" id="p-pengabdian" data-title="Pengabdian" data-nav="pengabdian">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / Pengabdian</nav><h1>Pengabdian kepada Masyarakat</h1><p>Ilmu yang hadir di desa, sekolah, puskesmas, dan pasar di seluruh Nusa Tenggara Barat.</p><div className="btn-row" style={{'marginTop': '20px'}}><a className="btn ghost" href="#" title="Alamat website menyusul" data-web>Website LPPM <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg></a></div></div><div className="ph " data-cap="Foto: kegiatan di desa binaan" role="img" aria-label="Tempat foto: kegiatan di desa binaan" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<ProgramSection /><KepakaranSection /><DampakSection />
</section>
  );
}
