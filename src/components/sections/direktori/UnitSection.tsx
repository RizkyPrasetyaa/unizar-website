// Section: direktori--unit
// Originally from 'p-direktori' page. Edit this file to change this section.
export function UnitSection() {
  return (
    <section className="sec" id="direktori--unit" data-t="Unit Kerja">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Unit kerja</span>
            <h2>Biro, lembaga, badan, dan UPT</h2>
          </div>
        </div>
        <div data-filter>
          <div className="toolbar">
            <div className="field">
              <label htmlFor="u-q">Cari unit</label>
              <input id="u-q" data-filter-text placeholder="mis. keuangan, perpustakaan" />
            </div>
            <div className="chips" data-chips="k" role="group" aria-label="Jenis unit">
              <button type="button" data-v="all" aria-pressed="true">
                Semua
              </button>
              <button type="button" data-v="biro" aria-pressed="false">
                Biro
              </button>
              <button type="button" data-v="lembaga" aria-pressed="false">
                Lembaga
              </button>
              <button type="button" data-v="badan" aria-pressed="false">
                Badan
              </button>
              <button type="button" data-v="upt" aria-pressed="false">
                UPT
              </button>
              <button type="button" data-v="satgas" aria-pressed="false">
                Satgas
              </button>
            </div>
          </div>
          <div className="grid g3">
            <div className="card" data-item data-k="biro">
              <span className="pill">Biro</span>
              <h3 style={{ fontSize: "17px" }}>Biro Akademik</h3>
              <p style={{ fontSize: "14px" }}>
                akademik@unizar.ac.id
                <br />
                Gedung Rektorat Lt. 2
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-biro-akademik"
                >
                  Detail unit
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="biro">
              <span className="pill">Biro</span>
              <h3 style={{ fontSize: "17px" }}>Biro Kemahasiswaan</h3>
              <p style={{ fontSize: "14px" }}>
                kemahasiswaan@unizar.ac.id
                <br />
                Gedung Rektorat Lt. 2
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-biro-kemahasiswaan"
                >
                  Detail unit
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="biro">
              <span className="pill">Biro</span>
              <h3 style={{ fontSize: "17px" }}>Biro Keuangan</h3>
              <p style={{ fontSize: "14px" }}>
                keuangan@unizar.ac.id
                <br />
                Gedung Rektorat Lt. 2
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-biro-keuangan"
                >
                  Detail unit
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="biro">
              <span className="pill">Biro</span>
              <h3 style={{ fontSize: "17px" }}>Biro Sumber Daya Manusia</h3>
              <p style={{ fontSize: "14px" }}>
                sdm@unizar.ac.id
                <br />
                Gedung Rektorat Lt. 2
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-biro-sumber-daya-manusia"
                >
                  Detail unit
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="biro">
              <span className="pill">Biro</span>
              <h3 style={{ fontSize: "17px" }}>Biro Humas, Kerja Sama & Alumni</h3>
              <p style={{ fontSize: "14px" }}>
                hka@unizar.ac.id
                <br />
                Gedung Rektorat Lt. 2
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-biro-humas-kerja-sama-alumni"
                >
                  Detail unit
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="biro">
              <span className="pill">Biro</span>
              <h3 style={{ fontSize: "17px" }}>Biro Umum</h3>
              <p style={{ fontSize: "14px" }}>
                biroumum@unizar.ac.id
                <br />
                Gedung Rektorat Lt. 1
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-biro-umum"
                >
                  Detail unit
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="biro">
              <span className="pill">Biro</span>
              <h3 style={{ fontSize: "17px" }}>Biro Perencanaan & Pengembangan</h3>
              <p style={{ fontSize: "14px" }}>
                renstrabang@unizar.ac.id
                <br />
                Gedung Rektorat Lt. 2
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-biro-perencanaan-pengembangan"
                >
                  Detail unit
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="biro">
              <span className="pill">Biro</span>
              <h3 style={{ fontSize: "17px" }}>Biro Hukum & Administrasi Umum</h3>
              <p style={{ fontSize: "14px" }}>
                hukum@unizar.ac.id
                <br />
                Gedung Rektorat Lt. 2
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-biro-hukum-administrasi-umum"
                >
                  Detail unit
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="lembaga">
              <span className="pill">Lembaga</span>
              <h3 style={{ fontSize: "17px" }}>LPPM</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-lppm"
                >
                  Detail unit
                </a>
                <a className="btn line" href="#" title="Alamat website menyusul" data-web>
                  Website{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="badan">
              <span className="pill">Badan</span>
              <h3 style={{ fontSize: "17px" }}>Badan Penjaminan Mutu</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-badan-penjaminan-mutu"
                >
                  Detail unit
                </a>
                <a className="btn line" href="#" title="Alamat website menyusul" data-web>
                  Website{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="badan">
              <span className="pill">Badan</span>
              <h3 style={{ fontSize: "17px" }}>Satuan Pengawasan Internal</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-satuan-pengawasan-internal"
                >
                  Detail unit
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="upt">
              <span className="pill">UPT</span>
              <h3 style={{ fontSize: "17px" }}>PUSTIK</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-pustik"
                >
                  Detail unit
                </a>
                <a className="btn line" href="#" title="Alamat website menyusul" data-web>
                  Website{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="upt">
              <span className="pill">UPT</span>
              <h3 style={{ fontSize: "17px" }}>Perpustakaan</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-perpustakaan"
                >
                  Detail unit
                </a>
                <a className="btn line" href="#" title="Alamat website menyusul" data-web>
                  Website{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="upt">
              <span className="pill">UPT</span>
              <h3 style={{ fontSize: "17px" }}>Inkubator Bisnis dan Teknologi (ITe)</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-inkubator-bisnis-dan-teknologi-ite"
                >
                  Detail unit
                </a>
                <a className="btn line" href="#" title="Alamat website menyusul" data-web>
                  Website{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="upt">
              <span className="pill">UPT</span>
              <h3 style={{ fontSize: "17px" }}>Unit Bisnis</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-unit-bisnis"
                >
                  Detail unit
                </a>
                <a className="btn line" href="#" title="Alamat website menyusul" data-web>
                  Website{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="upt">
              <span className="pill">UPT</span>
              <h3 style={{ fontSize: "17px" }}>Unizar Learning Center (ULC)</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-unizar-learning-center-ulc"
                >
                  Detail unit
                </a>
                <a className="btn line" href="#" title="Alamat website menyusul" data-web>
                  Website{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="upt">
              <span className="pill">UPT</span>
              <h3 style={{ fontSize: "17px" }}>Unit Keselamatan dan Kesehatan Kerja (K3)</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-unit-keselamatan-dan-kesehatan-kerja-k3"
                >
                  Detail unit
                </a>
                <a className="btn line" href="#" title="Alamat website menyusul" data-web>
                  Website{" "}
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="card" data-item data-k="satgas">
              <span className="pill">Satgas</span>
              <h3 style={{ fontSize: "17px" }}>Satgas PPKPT</h3>
              <p style={{ fontSize: "14px" }}>
                [email]
                <br />
                [lokasi]
              </p>
              <div className="btn-row" style={{ gap: "8px", marginTop: "auto" }}>
                <a
                  className="btn dark"
                  style={{ padding: "10px 16px", fontSize: "14px" }}
                  href="#"
                  data-open="detail:unit-satgas-ppkpt"
                >
                  Detail unit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
