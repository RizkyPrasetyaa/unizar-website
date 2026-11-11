// Section: layanan--katalog
// Originally from 'p-layanan' page. Edit this file to change this section.
export function KatalogSection() {
  return (
    <section className="sec" id="layanan--katalog" data-t="Katalog layanan">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Katalog</span>
            <h2>Layanan apa yang Anda perlukan?</h2>
          </div>
        </div>
        <div data-filter>
          <div className="toolbar">
            <div className="field">
              <label htmlFor="ly-q">Cari layanan</label>
              <input id="ly-q" data-filter-text placeholder="mis. legalisir, UKT, reset password" />
            </div>
          </div>
          <div
            className="chips"
            data-chips="aud"
            role="group"
            aria-label="Untuk siapa"
            style={{ marginBottom: "10px" }}
          >
            <button type="button" data-v="all" aria-pressed="true">
              Semua
            </button>
            <button type="button" data-v="mhs" aria-pressed="false">
              Mahasiswa
            </button>
            <button type="button" data-v="dsn" aria-pressed="false">
              Dosen & tendik
            </button>
            <button type="button" data-v="alumni" aria-pressed="false">
              Alumni
            </button>
            <button type="button" data-v="publik" aria-pressed="false">
              Publik
            </button>
          </div>
          <div className="chips" data-chips="cat" role="group" aria-label="Kategori" style={{ marginBottom: "18px" }}>
            <button type="button" data-v="all" aria-pressed="true">
              Semua kategori
            </button>
            <button type="button" data-v="akademik" aria-pressed="false">
              Akademik
            </button>
            <button type="button" data-v="keuangan" aria-pressed="false">
              Keuangan
            </button>
            <button type="button" data-v="tik" aria-pressed="false">
              TIK
            </button>
            <button type="button" data-v="perpustakaan" aria-pressed="false">
              Perpustakaan
            </button>
            <button type="button" data-v="kesehatan" aria-pressed="false">
              Kesehatan
            </button>
            <button type="button" data-v="kepegawaian" aria-pressed="false">
              Kepegawaian
            </button>
            <button type="button" data-v="sarpras" aria-pressed="false">
              Sarpras & K3
            </button>
          </div>
          <div className="grid g3">
            <a className="card" href="#" data-open="ext:siakad" data-item data-aud="mhs dsn" data-cat="akademik">
              <span className="pill">Akademik</span>
              <h3 style={{ fontSize: "17px" }}>SIAKAD</h3>
              <p style={{ fontSize: "14px" }}>KRS, KHS, transkrip, jadwal kuliah</p>
              <span className="more">Buka sistem ↗</span>
            </a>
            <a className="card" href="#" data-open="form:surat-aktif" data-item data-aud="mhs" data-cat="akademik">
              <span className="pill">Akademik</span>
              <h3 style={{ fontSize: "17px" }}>Surat keterangan aktif kuliah</h3>
              <p style={{ fontSize: "14px" }}>Terbit dengan tanda tangan elektronik · 1 hari kerja</p>
              <span className="more">Ajukan →</span>
            </a>
            <a className="card" href="#" data-open="form:legalisir" data-item data-aud="alumni" data-cat="akademik">
              <span className="pill">Akademik</span>
              <h3 style={{ fontSize: "17px" }}>Legalisir ijazah & transkrip</h3>
              <p style={{ fontSize: "14px" }}>Ajukan daring · 3 hari kerja</p>
              <span className="more">Ajukan →</span>
            </a>
            <a className="card" href="#" data-open="ext:ukt" data-item data-aud="mhs" data-cat="keuangan">
              <span className="pill">Keuangan</span>
              <h3 style={{ fontSize: "17px" }}>Pembayaran UKT</h3>
              <p style={{ fontSize: "14px" }}>Virtual account berbagai bank</p>
              <span className="more">Buka sistem ↗</span>
            </a>
            <a className="card" href="#" data-open="form:keringanan-ukt" data-item data-aud="mhs" data-cat="keuangan">
              <span className="pill">Keuangan</span>
              <h3 style={{ fontSize: "17px" }}>Keringanan UKT</h3>
              <p style={{ fontSize: "14px" }}>Verifikasi berkas daring · 7 hari kerja</p>
              <span className="more">Ajukan →</span>
            </a>
            <a className="card" href="#" data-open="form:reset-sso" data-item data-aud="mhs dsn" data-cat="tik">
              <span className="pill">Tik</span>
              <h3 style={{ fontSize: "17px" }}>Email & SSO UNIZAR</h3>
              <p style={{ fontSize: "14px" }}>Aktivasi akun, reset kata sandi</p>
              <span className="more">Ajukan →</span>
            </a>
            <a className="card" href="#" data-open="ext:elearning" data-item data-aud="mhs dsn" data-cat="tik">
              <span className="pill">Tik</span>
              <h3 style={{ fontSize: "17px" }}>E-learning</h3>
              <p style={{ fontSize: "14px" }}>Kelas daring dan bahan ajar</p>
              <span className="more">Buka sistem ↗</span>
            </a>
            <a
              className="card"
              href="#"
              data-open="ext:perpus"
              data-item
              data-aud="mhs dsn alumni"
              data-cat="perpustakaan"
            >
              <span className="pill">Perpustakaan</span>
              <h3 style={{ fontSize: "17px" }}>Perpustakaan digital</h3>
              <p style={{ fontSize: "14px" }}>Katalog, e-book, e-journal, cek kemiripan</p>
              <span className="more">Buka sistem ↗</span>
            </a>
            <a className="card" href="#" data-open="form:konseling" data-item data-aud="mhs dsn" data-cat="kesehatan">
              <span className="pill">Kesehatan</span>
              <h3 style={{ fontSize: "17px" }}>Klinik & konseling</h3>
              <p style={{ fontSize: "14px" }}>Layanan kesehatan dan psikolog kampus</p>
              <span className="more">Ajukan →</span>
            </a>
            <a className="card" href="#" data-open="ext:simpeg" data-item data-aud="dsn" data-cat="kepegawaian">
              <span className="pill">Kepegawaian</span>
              <h3 style={{ fontSize: "17px" }}>Kepegawaian & jabatan akademik</h3>
              <p style={{ fontSize: "14px" }}>Data dosen dan tendik, usulan kenaikan jabatan</p>
              <span className="more">Buka sistem ↗</span>
            </a>
            <a
              className="card"
              href="#"
              data-open="form:peminjaman-ruang"
              data-item
              data-aud="mhs dsn publik"
              data-cat="sarpras"
            >
              <span className="pill">Sarpras</span>
              <h3 style={{ fontSize: "17px" }}>Peminjaman ruang & fasilitas</h3>
              <p style={{ fontSize: "14px" }}>Jadwal dan formulir daring</p>
              <span className="more">Ajukan →</span>
            </a>
            <a
              className="card"
              href="#"
              data-open="form:lapor-k3"
              data-item
              data-aud="mhs dsn publik"
              data-cat="sarpras"
            >
              <span className="pill">Sarpras</span>
              <h3 style={{ fontSize: "17px" }}>Lapor kerusakan / insiden K3</h3>
              <p style={{ fontSize: "14px" }}>Tindak lanjut dapat dipantau</p>
              <span className="more">Ajukan →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
