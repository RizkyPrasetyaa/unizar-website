// Section: pengabdian--program
// Originally from 'p-pengabdian' page. Edit this file to change this section.
export function ProgramSection() {
  return (
    <section className="sec" id="pengabdian--program" data-t="Program & Desa Binaan">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Program</span>
            <h2>Program unggulan & desa binaan</h2>
          </div>
        </div>
        <div className="split">
          <div className="grid g2" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
            <div className="grid g2">
              <a className="card" href="#" data-open="detail:pkm-desa-kesehatan">
                <span className="pill">Kesehatan</span>
                <h3>Desa binaan kesehatan</h3>
                <p>Pendampingan posyandu dan kesehatan ibu-anak bersama puskesmas.</p>
                <span className="more">Selengkapnya →</span>
              </a>
              <a className="card" href="#" data-open="detail:pkm-umkm-halal">
                <span className="pill">Ekonomi</span>
                <h3>Klinik UMKM halal</h3>
                <p>Pendampingan legalitas, sertifikasi halal, dan pemasaran digital.</p>
                <span className="more">Selengkapnya →</span>
              </a>
              <a className="card" href="#" data-open="detail:pkm-sekolah-lapang">
                <span className="pill">Pangan</span>
                <h3>Sekolah lapang petani</h3>
                <p>Teknik budidaya lahan kering dan pascapanen.</p>
                <span className="more">Selengkapnya →</span>
              </a>
            </div>
          </div>
          <div
            className="ph sky"
            data-cap="Foto: peta sebaran program di NTB (interaktif)"
            role="img"
            aria-label="Tempat foto: peta sebaran program di NTB (interaktif)"
            style={{ height: "100%", minHeight: "320px" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
