// Section: fakultas--daftar
// Originally from 'p-fakultas' page. Edit this file to change this section.
export function DaftarSection() {
  return (
    <section className="sec" id="fakultas--daftar" data-t="Semua fakultas">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Pilih fakultas</span>
            <h2>Temukan program studi Anda</h2>
            <p>Status akreditasi setiap prodi ditarik dari data resmi dan selalu menampilkan masa berlakunya.</p>
          </div>
        </div>
        <div className="grid g3">
          <div className="card" id="fakultas--fk" style={{ padding: "0", overflow: "hidden" }}>
            <div
              className="ph "
              data-cap="Foto: kegiatan Fakultas Kedokteran"
              role="img"
              aria-label="Tempat foto: kegiatan Fakultas Kedokteran"
              style={{ height: "150px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "18px 20px 22px", display: "grid", gap: "12px" }}>
              <span className="eyebrow">FK</span>
              <h3>Fakultas Kedokteran</h3>
              <ul className="clean" style={{ display: "grid", gap: "8px" }}>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#prodi-pendidikan-dokter">Pendidikan Dokter</a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Profesi Dokter">
                    Profesi Dokter
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
              </ul>
              <div className="btn-row" style={{ gap: "8px", marginTop: "4px" }}>
                <a className="btn dark" style={{ padding: "10px 16px", fontSize: "14px" }} href="#fakultas-kedokteran">
                  Lihat fakultas
                </a>
                <a
                  className="btn line"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  title="Alamat website menyusul"
                  data-web
                >
                  Website fakultas{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="card" id="fakultas--ft" style={{ padding: "0", overflow: "hidden" }}>
            <div
              className="ph sky"
              data-cap="Foto: kegiatan Fakultas Teknik"
              role="img"
              aria-label="Tempat foto: kegiatan Fakultas Teknik"
              style={{ height: "150px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "18px 20px 22px", display: "grid", gap: "12px" }}>
              <span className="eyebrow">FT</span>
              <h3>Fakultas Teknik</h3>
              <ul className="clean" style={{ display: "grid", gap: "8px" }}>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Teknik Sipil">
                    Teknik Sipil
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Ilmu Komputer">
                    Ilmu Komputer
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
              </ul>
              <div className="btn-row" style={{ gap: "8px", marginTop: "4px" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:fak-ft"
                >
                  Lihat fakultas
                </a>
                <a
                  className="btn line"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  title="Alamat website menyusul"
                  data-web
                >
                  Website fakultas{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="card" id="fakultas--fh" style={{ padding: "0", overflow: "hidden" }}>
            <div
              className="ph warm"
              data-cap="Foto: kegiatan Fakultas Hukum"
              role="img"
              aria-label="Tempat foto: kegiatan Fakultas Hukum"
              style={{ height: "150px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "18px 20px 22px", display: "grid", gap: "12px" }}>
              <span className="eyebrow">FH</span>
              <h3>Fakultas Hukum</h3>
              <ul className="clean" style={{ display: "grid", gap: "8px" }}>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Ilmu Hukum">
                    Ilmu Hukum
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
              </ul>
              <div className="btn-row" style={{ gap: "8px", marginTop: "4px" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:fak-fh"
                >
                  Lihat fakultas
                </a>
                <a
                  className="btn line"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  title="Alamat website menyusul"
                  data-web
                >
                  Website fakultas{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="card" id="fakultas--feb" style={{ padding: "0", overflow: "hidden" }}>
            <div
              className="ph red"
              data-cap="Foto: kegiatan Fakultas Ekonomi & Bisnis"
              role="img"
              aria-label="Tempat foto: kegiatan Fakultas Ekonomi & Bisnis"
              style={{ height: "150px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "18px 20px 22px", display: "grid", gap: "12px" }}>
              <span className="eyebrow">FEB</span>
              <h3>Fakultas Ekonomi & Bisnis</h3>
              <ul className="clean" style={{ display: "grid", gap: "8px" }}>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Akuntansi">
                    Akuntansi
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Ekonomi Pembangunan">
                    Ekonomi Pembangunan
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
              </ul>
              <div className="btn-row" style={{ gap: "8px", marginTop: "4px" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:fak-feb"
                >
                  Lihat fakultas
                </a>
                <a
                  className="btn line"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  title="Alamat website menyusul"
                  data-web
                >
                  Website fakultas{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="card" id="fakultas--fp" style={{ padding: "0", overflow: "hidden" }}>
            <div
              className="ph "
              data-cap="Foto: kegiatan Fakultas Pertanian"
              role="img"
              aria-label="Tempat foto: kegiatan Fakultas Pertanian"
              style={{ height: "150px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "18px 20px 22px", display: "grid", gap: "12px" }}>
              <span className="eyebrow">FP</span>
              <h3>Fakultas Pertanian</h3>
              <ul className="clean" style={{ display: "grid", gap: "8px" }}>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Agribisnis">
                    Agribisnis
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Agroekoteknologi">
                    Agroekoteknologi
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
              </ul>
              <div className="btn-row" style={{ gap: "8px", marginTop: "4px" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:fak-fp"
                >
                  Lihat fakultas
                </a>
                <a
                  className="btn line"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  title="Alamat website menyusul"
                  data-web
                >
                  Website fakultas{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="card" id="fakultas--fmipa" style={{ padding: "0", overflow: "hidden" }}>
            <div
              className="ph sky"
              data-cap="Foto: kegiatan Fakultas MIPA"
              role="img"
              aria-label="Tempat foto: kegiatan Fakultas MIPA"
              style={{ height: "150px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "18px 20px 22px", display: "grid", gap: "12px" }}>
              <span className="eyebrow">FMIPA</span>
              <h3>Fakultas MIPA</h3>
              <ul className="clean" style={{ display: "grid", gap: "8px" }}>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Biologi">
                    Biologi
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
              </ul>
              <div className="btn-row" style={{ gap: "8px", marginTop: "4px" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:fak-fmipa"
                >
                  Lihat fakultas
                </a>
                <a
                  className="btn line"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  title="Alamat website menyusul"
                  data-web
                >
                  Website fakultas{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="card" id="fakultas--fai" style={{ padding: "0", overflow: "hidden" }}>
            <div
              className="ph warm"
              data-cap="Foto: kegiatan Fakultas Agama Islam"
              role="img"
              aria-label="Tempat foto: kegiatan Fakultas Agama Islam"
              style={{ height: "150px", borderRadius: "0" }}
            ></div>
            <div style={{ padding: "18px 20px 22px", display: "grid", gap: "12px" }}>
              <span className="eyebrow">FAI</span>
              <h3>Fakultas Agama Islam</h3>
              <ul className="clean" style={{ display: "grid", gap: "8px" }}>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Ekonomi Syariah">
                    Ekonomi Syariah
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                  }}
                >
                  <a href="#" data-open="detail:prodi-x" data-title="Program Studi Manajemen Bisnis Syariah">
                    Manajemen Bisnis Syariah
                  </a>
                  <a className="weblink" href="#" title="Alamat website menyusul" data-web>
                    Web prodi{" "}
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </li>
              </ul>
              <div className="btn-row" style={{ gap: "8px", marginTop: "4px" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:fak-fai"
                >
                  Lihat fakultas
                </a>
                <a
                  className="btn line"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  title="Alamat website menyusul"
                  data-web
                >
                  Website fakultas{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
