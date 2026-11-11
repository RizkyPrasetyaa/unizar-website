// Section: publikasi-inovasi--repositori
// Originally from 'p-publikasi-inovasi' page. Edit this file to change this section.
export function RepositoriSection() {
  return (
    <section className="sec" id="publikasi-inovasi--repositori" data-t="Repositori">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Akses terbuka</span>
            <h2>Repositori institusi</h2>
            <p>Artikel, skripsi, tesis, dan laporan penelitian dengan lisensi terbuka.</p>
          </div>
        </div>
        <div className="split">
          <div>
            <div className="toolbar">
              <div className="field">
                <label htmlFor="repo-q">Cari di repositori</label>
                <input id="repo-q" placeholder="judul, penulis, atau kata kunci" />
              </div>
              <button className="btn dark" type="button" data-open="ext:repositori">
                Cari
              </button>
            </div>
            <ul className="clean">
              <li className="doc">
                <div>
                  <b>[Judul artikel terbaru]</b>
                  <small>[Penulis] · Artikel · 2026</small>
                </div>
                <a href="#" data-open="doc:judul-artikel-terbaru">
                  Lihat dokumen →
                </a>
              </li>
              <li className="doc">
                <div>
                  <b>[Judul skripsi terbaru]</b>
                  <small>[Penulis] · Skripsi · 2026</small>
                </div>
                <a href="#" data-open="doc:judul-skripsi-terbaru">
                  Lihat dokumen →
                </a>
              </li>
              <li className="doc">
                <div>
                  <b>[Judul laporan penelitian]</b>
                  <small>[Tim peneliti] · Laporan · 2025</small>
                </div>
                <a href="#" data-open="doc:judul-laporan-penelitian">
                  Lihat dokumen →
                </a>
              </li>
            </ul>
          </div>
          <div className="card flat">
            <span className="eyebrow">Koleksi</span>
            <div className="grid g2" style={{ marginTop: "8px" }}>
              <div>
                <b style={{ fontSize: "28px", color: "var(--em-800)" }}>[n]</b>
                <p>Artikel</p>
              </div>
              <div>
                <b style={{ fontSize: "28px", color: "var(--em-800)" }}>[n]</b>
                <p>Skripsi & tesis</p>
              </div>
              <div>
                <b style={{ fontSize: "28px", color: "var(--em-800)" }}>[n]</b>
                <p>Laporan riset</p>
              </div>
              <div>
                <b style={{ fontSize: "28px", color: "var(--em-800)" }}>[n]</b>
                <p>Buku & modul</p>
              </div>
            </div>
            <a className="btn line" href="#" data-open="ext:repositori">
              Buka repositori
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
