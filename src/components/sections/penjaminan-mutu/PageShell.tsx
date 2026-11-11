// Page wrapper: p-penjaminan-mutu
// This is the top-level shell for the 'penjaminan-mutu' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { TentangSection } from './TentangSection';
import { DokumenSection } from './DokumenSection';
import { AkreditasiSection } from './AkreditasiSection';
import { BuktiSection } from './BuktiSection';
export function PageShell() {
  return (
    <section className="page" id="p-penjaminan-mutu" data-title="Penjaminan Mutu" data-nav="penjaminan-mutu">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / Penjaminan Mutu</nav><h1>Penjaminan Mutu</h1><p>Sistem mutu yang berjalan sepanjang tahun: menetapkan, melaksanakan, mengevaluasi, mengendalikan, dan meningkatkan.</p><div className="btn-row" style={{'marginTop': '20px'}}><a className="btn ghost" href="#" title="Alamat website menyusul" data-web>Website BPM <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg></a></div></div><div className="ph " data-cap="Foto: rapat tinjauan manajemen" role="img" aria-label="Tempat foto: rapat tinjauan manajemen" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<TentangSection /><DokumenSection /><AkreditasiSection /><BuktiSection />
</section>
  );
}
