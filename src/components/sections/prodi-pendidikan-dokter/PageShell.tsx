// Page wrapper: p-prodi-pendidikan-dokter
// This is the top-level shell for the 'prodi-pendidikan-dokter' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { TentangSection } from './TentangSection';
import { BelajarSection } from './BelajarSection';
import { DosenSection } from './DosenSection';
import { LulusanSection } from './LulusanSection';
export function PageShell() {
  return (
    <section className="page" id="p-prodi-pendidikan-dokter" data-title="Pendidikan Dokter" data-nav="fakultas">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / <a href="#fakultas">Fakultas</a> / <a href="#fakultas-kedokteran">Kedokteran</a> / Pendidikan Dokter</nav><h1>Pendidikan Dokter</h1><p>Contoh pola halaman program studi. Status akreditasi tampil sebagai lencana, bukan tab terpisah.</p><div className="btn-row" style={{'marginTop': '20px'}}><a className="btn ghost" href="#" title="Alamat website menyusul" data-web>Website Prodi Pendidikan Dokter <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg></a></div></div><div className="ph " data-cap="Foto: praktikum keterampilan klinis" role="img" aria-label="Tempat foto: praktikum keterampilan klinis" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<TentangSection /><BelajarSection /><DosenSection /><LulusanSection />
</section>
  );
}
