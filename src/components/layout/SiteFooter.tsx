export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div>
            <div className="f-id">
              <img src="/unizar/logo144.png" alt="" />
              <b>
                Universitas Islam
                <br />
                Al-Azhar
              </b>
            </div>
            <p style={{ fontSize: "14px" }}>
              Jl. Unizar No. 20, Turida, Sandubaya, Mataram, NTB 83232
              <br />
              (0370) 6175555 · humas@unizar.ac.id
            </p>
            <p style={{ fontSize: "13px", marginTop: "10px" }}>Instagram · YouTube · Facebook · TikTok</p>
          </div>
          <div>
            <h4 data-en="University">Universitas</h4>
            <a href="/profil">Profil</a>
            <a href="/fakultas">Fakultas</a>
            <a href="/direktori">Direktori</a>
            <a href="/tata-kelola">Tata Kelola</a>
          </div>
          <div>
            <h4 data-en="Academics">Akademik</h4>
            <a href="/pendidikan">Pendidikan</a>
            <a href="/penelitian">Penelitian</a>
            <a href="/pengabdian">Pengabdian</a>
            <a href="/penjaminan-mutu">Penjaminan Mutu</a>
          </div>
          <div>
            <h4 data-en="Quick access">Akses cepat</h4>
            <a href="/layanan">Layanan</a>
            <a href="/kerjasama">Kerjasama</a>
            <a href="/mahasiswa-alumni">Mahasiswa &amp; Alumni</a>
            <a href="/pusdatin">Pusdatin</a>
            <a href="#" data-open="ext:jdih">
              JDIH UNIZAR ↗
            </a>
          </div>
          <div>
            <h4 data-en="National systems">Sistem nasional</h4>
            <a href="#" data-open="ext:pddikti">
              PD Dikti ↗
            </a>
            <a href="#" data-open="ext:sinta">
              SINTA ↗
            </a>
            <a href="#" data-open="ext:spada">
              SPADA ↗
            </a>
            <a href="#" data-open="ext:sierra">
              SIERRA (RPL) ↗
            </a>
          </div>
        </div>
        <div className="f-bot">
          <span>© 2026 Universitas Islam Al-Azhar</span>
          <span>
            <a href="#" data-open="detail:privasi" style={{ display: "inline" }}>
              Kebijakan privasi
            </a>{" "}
            ·{" "}
            <a href="#" data-open="detail:sangkalan" style={{ display: "inline" }}>
              Pernyataan sangkalan
            </a>{" "}
            ·{" "}
            <a href="#" data-open="detail:aksesibilitas" style={{ display: "inline" }}>
              Aksesibilitas
            </a>{" "}
            ·{" "}
            <a href="#" data-open="ext:arsip-lama" style={{ display: "inline" }}>
              Arsip situs lama
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
