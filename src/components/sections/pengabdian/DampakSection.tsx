// Section: pengabdian--dampak
// Originally from 'p-pengabdian' page. Edit this file to change this section.
export function DampakSection() {
  return (
    <section className="sec" id="pengabdian--dampak" data-t="Dampak & Luaran">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Dampak</span>
            <h2>Cerita perubahan</h2>
          </div>
        </div>
        <div className="stories">
          <a className="story" href="#" data-open="detail:berita-posyandu">
            <div
              className="ph "
              data-cap="Foto: ibu dan balita di posyandu binaan"
              role="img"
              aria-label="Tempat foto: ibu dan balita di posyandu binaan"
              style={{}}
            ></div>
            <div className="t">
              <span className="pill red">Kisah</span>
              <h3>[Judul kisah dampak program pengabdian]</h3>
              <p className="muted">[Ringkasan perubahan yang terjadi, siapa yang terbantu, dan apa yang berlanjut.]</p>
            </div>
          </a>
          <div className="story-stack">
            <div className="band" style={{ marginBottom: "22px" }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>
                  UNIZAR untuk SDGs
                </span>
                <h2>Lima SDGs yang kami tekuni</h2>
                <p>
                  Tanpa kemiskinan, pendidikan berkualitas, pekerjaan layak, kelembagaan yang tangguh, dan kemitraan.
                </p>
              </div>
              <div className="btn-row">
                <a className="btn pri" href="#profil" data-sec="sdgs">
                  Lihat capaian SDGs
                </a>
              </div>
            </div>
            <ul className="clean">
              <li className="doc">
                <div>
                  <b>Laporan monev PkM 2025</b>
                  <small>LPPM · ringkasan publik</small>
                </div>
                <a href="#" data-open="doc:laporan-monev-pkm-2025">
                  Lihat ringkasan →
                </a>
              </li>
              <li className="doc">
                <div>
                  <b>Luaran PkM 3 tahun</b>
                  <small>Artikel, modul, produk, HKI</small>
                </div>
                <a href="#" data-open="doc:luaran-pkm-3-tahun">
                  Lihat dokumen →
                </a>
              </li>
              <li className="doc">
                <div>
                  <b>Laporan akhir per judul</b>
                  <small>Untuk sivitas dan asesor</small>
                </div>
                <a href="#" data-open="doc:laporan-akhir-per-judul" className="lock">
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>{" "}
                  Masuk untuk membuka
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
