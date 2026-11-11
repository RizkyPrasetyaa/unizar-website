// Section: profil--pimpinan
// Originally from 'p-profil' page. Edit this file to change this section.
export function PimpinanSection() {
  return (
    <section className="sec" id="profil--pimpinan" data-t="Pimpinan & Organisasi">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Pimpinan</span>
            <h2>Pimpinan universitas</h2>
          </div>
        </div>
        <div className="grid g5">
          <a className="card" href="#" data-open="detail:pimpinan-rektor" style={{ padding: "0", overflow: "hidden" }}>
            <div
              className="ph "
              data-cap="Foto: potret resmi"
              role="img"
              aria-label="Tempat foto: potret resmi"
              style={{ height: "190px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "16px 18px" }}>
              <span className="eyebrow">Rektor</span>
              <h3 style={{ fontSize: "17px", marginTop: "4px" }}>[Nama & gelar]</h3>
              <p style={{ fontSize: "13.5px" }}>Memimpin penyelenggaraan universitas</p>
            </div>
          </a>
          <a
            className="card"
            href="#"
            data-open="detail:pimpinan-wakil-rektor-i"
            style={{ padding: "0", overflow: "hidden" }}
          >
            <div
              className="ph "
              data-cap="Foto: potret resmi"
              role="img"
              aria-label="Tempat foto: potret resmi"
              style={{ height: "190px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "16px 18px" }}>
              <span className="eyebrow">Wakil Rektor I</span>
              <h3 style={{ fontSize: "17px", marginTop: "4px" }}>[Nama & gelar]</h3>
              <p style={{ fontSize: "13.5px" }}>[Bidang]</p>
            </div>
          </a>
          <a
            className="card"
            href="#"
            data-open="detail:pimpinan-wakil-rektor-ii"
            style={{ padding: "0", overflow: "hidden" }}
          >
            <div
              className="ph "
              data-cap="Foto: potret resmi"
              role="img"
              aria-label="Tempat foto: potret resmi"
              style={{ height: "190px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "16px 18px" }}>
              <span className="eyebrow">Wakil Rektor II</span>
              <h3 style={{ fontSize: "17px", marginTop: "4px" }}>[Nama & gelar]</h3>
              <p style={{ fontSize: "13.5px" }}>[Bidang]</p>
            </div>
          </a>
          <a
            className="card"
            href="#"
            data-open="detail:pimpinan-wakil-rektor-iii"
            style={{ padding: "0", overflow: "hidden" }}
          >
            <div
              className="ph "
              data-cap="Foto: potret resmi"
              role="img"
              aria-label="Tempat foto: potret resmi"
              style={{ height: "190px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "16px 18px" }}>
              <span className="eyebrow">Wakil Rektor III</span>
              <h3 style={{ fontSize: "17px", marginTop: "4px" }}>[Nama & gelar]</h3>
              <p style={{ fontSize: "13.5px" }}>[Bidang]</p>
            </div>
          </a>
          <a
            className="card"
            href="#"
            data-open="detail:pimpinan-wakil-rektor-iv"
            style={{ padding: "0", overflow: "hidden" }}
          >
            <div
              className="ph "
              data-cap="Foto: potret resmi"
              role="img"
              aria-label="Tempat foto: potret resmi"
              style={{ height: "190px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "16px 18px" }}>
              <span className="eyebrow">Wakil Rektor IV</span>
              <h3 style={{ fontSize: "17px", marginTop: "4px" }}>[Nama & gelar]</h3>
              <p style={{ fontSize: "13.5px" }}>[Bidang]</p>
            </div>
          </a>
        </div>
        <div className="slim" style={{ marginTop: "20px" }}>
          <p>Struktur organisasi serta tugas dan fungsi setiap unit tersedia lengkap.</p>
          <div className="btn-row">
            <a className="btn line" href="#" data-open="doc:bagan-organisasi">
              Bagan & SK organisasi
            </a>
            <a className="btn line" href="#direktori" data-sec="unit">
              Direktori unit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
