// Section: tata-kelola--pengawasan
// Originally from 'p-tata-kelola' page. Edit this file to change this section.
export function PengawasanSection() {
  return (
    <section className="sec" id="tata-kelola--pengawasan" data-t="Pengawasan Internal">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Pengawasan</span>
            <h2>Pengawasan internal & manajemen risiko</h2>
          </div>
        </div>
        <div className="grid g3">
          <a className="card" href="#" data-open="detail:unit-satuan-pengawasan-internal">
            <span className="pill">SPI</span>
            <h3>Satuan Pengawasan Internal</h3>
            <p>Audit internal non-akademik, konsultasi, dan pendampingan unit kerja.</p>
            <span className="more">Selengkapnya →</span>
          </a>
          <a className="card" href="#" data-open="doc:pedoman-risiko">
            <span className="pill">Pedoman</span>
            <h3>Manajemen risiko</h3>
            <p>
              Diterapkan di seluruh unit kerja sesuai SNI ISO 31000:2018, dipantau tiap triwulan, dan direviu SPI setiap
              tahun.
            </p>
            <span className="more">Selengkapnya →</span>
          </a>
          <a className="card" href="#" data-open="doc:zona-integritas">
            <span className="pill">WBK/WBBM</span>
            <h3>Zona integritas</h3>
            <p>
              Program menuju Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM), beserta
              capaiannya.
            </p>
            <span className="more">Selengkapnya →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
