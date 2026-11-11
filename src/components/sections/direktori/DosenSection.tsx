// Section: direktori--dosen
// Originally from 'p-direktori' page. Edit this file to change this section.
export function DosenSection() {
  return (
    <section className="sec" id="direktori--dosen" data-t="Dosen & Pakar">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Dosen & pakar</span>
            <h2>Cari dosen dan kepakarannya</h2>
            <p>
              Profil publik memuat jabatan akademik, bidang keahlian, dan tautan SINTA/Google Scholar. Data pribadi
              tidak ditampilkan.
            </p>
          </div>
        </div>
        <div data-filter>
          <div className="toolbar">
            <div className="field">
              <label htmlFor="d-q2">Nama atau bidang keahlian</label>
              <input id="d-q2" data-filter-text placeholder="mis. ergonomi, hukum agraria, agribisnis" />
            </div>
            <div className="field" style={{ flex: "0 1 220px" }}>
              <label htmlFor="d-f2">Fakultas</label>
              <select id="d-f2">
                <option>Semua fakultas</option>
                <option>Kedokteran</option>
                <option>Teknik</option>
                <option>Hukum</option>
                <option>Ekonomi & Bisnis</option>
                <option>Pertanian</option>
                <option>MIPA</option>
                <option>Agama Islam</option>
              </select>
            </div>
          </div>
          <div className="grid g4">
            <a
              className="card"
              href="#"
              data-open="detail:dosen"
              data-item
              style={{ flexDirection: "row", gap: "12px", alignItems: "center" }}
            >
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--em-100)",
                  flex: "none",
                }}
              ></span>
              <div>
                <b style={{ fontSize: "14.5px" }}>[Nama dosen]</b>
                <p style={{ fontSize: "13px" }}>Guru Besar · hukum agraria</p>
              </div>
            </a>
            <a
              className="card"
              href="#"
              data-open="detail:dosen"
              data-item
              style={{ flexDirection: "row", gap: "12px", alignItems: "center" }}
            >
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--em-100)",
                  flex: "none",
                }}
              ></span>
              <div>
                <b style={{ fontSize: "14.5px" }}>[Nama dosen]</b>
                <p style={{ fontSize: "13px" }}>Lektor Kepala · ergonomi</p>
              </div>
            </a>
            <a
              className="card"
              href="#"
              data-open="detail:dosen"
              data-item
              style={{ flexDirection: "row", gap: "12px", alignItems: "center" }}
            >
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--em-100)",
                  flex: "none",
                }}
              ></span>
              <div>
                <b style={{ fontSize: "14.5px" }}>[Nama dosen]</b>
                <p style={{ fontSize: "13px" }}>Lektor Kepala · agribisnis</p>
              </div>
            </a>
            <a
              className="card"
              href="#"
              data-open="detail:dosen"
              data-item
              style={{ flexDirection: "row", gap: "12px", alignItems: "center" }}
            >
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--em-100)",
                  flex: "none",
                }}
              ></span>
              <div>
                <b style={{ fontSize: "14.5px" }}>[Nama dosen]</b>
                <p style={{ fontSize: "13px" }}>Lektor · akuntansi</p>
              </div>
            </a>
            <a
              className="card"
              href="#"
              data-open="detail:dosen"
              data-item
              style={{ flexDirection: "row", gap: "12px", alignItems: "center" }}
            >
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--em-100)",
                  flex: "none",
                }}
              ></span>
              <div>
                <b style={{ fontSize: "14.5px" }}>[Nama dosen]</b>
                <p style={{ fontSize: "13px" }}>Lektor · teknik sipil</p>
              </div>
            </a>
            <a
              className="card"
              href="#"
              data-open="detail:dosen"
              data-item
              style={{ flexDirection: "row", gap: "12px", alignItems: "center" }}
            >
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--em-100)",
                  flex: "none",
                }}
              ></span>
              <div>
                <b style={{ fontSize: "14.5px" }}>[Nama dosen]</b>
                <p style={{ fontSize: "13px" }}>Lektor · biologi</p>
              </div>
            </a>
            <a
              className="card"
              href="#"
              data-open="detail:dosen"
              data-item
              style={{ flexDirection: "row", gap: "12px", alignItems: "center" }}
            >
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--em-100)",
                  flex: "none",
                }}
              ></span>
              <div>
                <b style={{ fontSize: "14.5px" }}>[Nama dosen]</b>
                <p style={{ fontSize: "13px" }}>Asisten Ahli · ekonomi syariah</p>
              </div>
            </a>
            <a
              className="card"
              href="#"
              data-open="detail:dosen"
              data-item
              style={{ flexDirection: "row", gap: "12px", alignItems: "center" }}
            >
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--em-100)",
                  flex: "none",
                }}
              ></span>
              <div>
                <b style={{ fontSize: "14.5px" }}>[Nama dosen]</b>
                <p style={{ fontSize: "13px" }}>Asisten Ahli · ilmu komputer</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
