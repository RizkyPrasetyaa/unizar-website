// Page wrapper: p-publikasi-inovasi
// This is the top-level shell for the 'publikasi-inovasi' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
import { JurnalSection } from './JurnalSection';
import { RepositoriSection } from './RepositoriSection';
import { SintaSection } from './SintaSection';
import { HkiSection } from './HkiSection';
import { KolaborasiSection } from './KolaborasiSection';
import { HilirisasiSection } from './HilirisasiSection';
export function PageShell() {
  return (
    <section className="page" id="p-publikasi-inovasi" data-title="Publikasi & Inovasi" data-nav="penelitian">
<div className="pagehero"><div className="pat"></div><div className="wrap"><div><nav className="crumb" aria-label="Breadcrumb"><a href="#beranda">Beranda</a> / <a href="#penelitian">Penelitian</a> / Publikasi & Inovasi</nav><h1>Publikasi & Inovasi</h1><p>Luaran riset dosen dan mahasiswa: jurnal, repositori, kinerja SINTA, kekayaan intelektual, kolaborasi, dan produk yang dimanfaatkan masyarakat.</p><div className="btn-row" style={{'marginTop': '20px'}}><a className="btn ghost" href="#" title="Alamat website menyusul" data-web>Website LPPM <svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg></a></div></div><div className="ph " data-cap="Foto: peneliti mempresentasikan hasil riset" role="img" aria-label="Tempat foto: peneliti mempresentasikan hasil riset" style={{}}></div></div></div>
<div className="subnav"><div className="wrap"></div></div>
<JurnalSection /><RepositoriSection /><SintaSection /><HkiSection /><KolaborasiSection /><HilirisasiSection />
</section>
  );
}
