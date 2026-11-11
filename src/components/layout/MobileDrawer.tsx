"use client";

import { useDrawer, useLang } from "./UnizarProviders";

export function MobileDrawer() {
  const { isOpen, close } = useDrawer();
  const { lang, setLang } = useLang();

  return (
    <div
      className="drawer"
      id="drawer"
      hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
        const target = e.target as HTMLElement;
        if (target.closest("[data-close-drawer]")) close();
      }}
    >
      <div className="panel" role="dialog" aria-label="Menu">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <a
            className="brand"
            href="/beranda"
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              fontWeight: "800",
              textDecoration: "none",
              color: "var(--em-800)",
            }}
          >
            <img src="/unizar/logo144.png" alt="" style={{ width: "36px" }} />
            UNIZAR
          </a>
          <button
            className="icon-btn"
            type="button"
            data-close-drawer
            aria-label="Tutup menu"
            onClick={close}
          >
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="quick">
          <a href="/masuk">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
            Masuk
          </a>
          <a href="/layanan">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Layanan
          </a>
          <a href="/kerjasama">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 11l3-3 3 2 4-4 4 4-7 7-3-2-3 3-4-4z" />
              <path d="M3 12l4-1" />
            </svg>
            Kerjasama &amp; Internasional
          </a>
          <a href="/mahasiswa-alumni">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 9L12 4 2 9l10 5 10-5z" />
              <path d="M6 11v5c3 2 9 2 12 0v-5" />
            </svg>
            Mahasiswa &amp; Alumni
          </a>
        </div>
        <details>
          <summary>Profil</summary>
          <a href="/profil">Ringkasan Profil</a>
          <a href="/profil" data-sec="tentang">
            Tentang UNIZAR
          </a>
          <a href="/profil" data-sec="sejarah">
            Sejarah
          </a>
          <a href="/profil" data-sec="pimpinan">
            Pimpinan &amp; Organisasi
          </a>
          <a href="/profil" data-sec="angka">
            UNIZAR dalam Angka
          </a>
          <a href="/profil" data-sec="sdgs">
            UNIZAR untuk SDGs
          </a>
        </details>
        <details>
          <summary>Fakultas</summary>
          <a href="/fakultas">Ringkasan Fakultas</a>
          <a href="/fakultas/kedokteran">Kedokteran</a>
          <a href="/fakultas" data-sec="ft">
            Teknik
          </a>
          <a href="/fakultas" data-sec="fh">
            Hukum
          </a>
          <a href="/fakultas" data-sec="feb">
            Ekonomi &amp; Bisnis
          </a>
          <a href="/fakultas" data-sec="fp">
            Pertanian
          </a>
          <a href="/fakultas" data-sec="fmipa">
            MIPA
          </a>
          <a href="/fakultas" data-sec="fai">
            Agama Islam
          </a>
        </details>
        <details>
          <summary>Direktori</summary>
          <a href="/direktori">Ringkasan Direktori</a>
          <a href="/direktori" data-sec="unit">
            Unit Kerja
          </a>
          <a href="/direktori" data-sec="dosen">
            Dosen &amp; Pakar
          </a>
          <a href="/pusdatin">Pusat Data &amp; Informasi (Pusdatin)</a>
          <a href="/direktori" data-sec="kontak">
            Kontak &amp; Peta Kampus
          </a>
        </details>
        <details>
          <summary>Tata Kelola</summary>
          <a href="/tata-kelola">Ringkasan Tata Kelola</a>
          <a href="/tata-kelola" data-sec="kebijakan">
            Kebijakan &amp; Laporan
          </a>
          <a href="/tata-kelola" data-sec="integritas">
            Integritas &amp; Kampus Aman
          </a>
          <a href="/tata-kelola" data-sec="pengawasan">
            Pengawasan Internal
          </a>
          <a href="/tata-kelola" data-sec="ppid">
            Transparansi &amp; PPID
          </a>
        </details>
        <details>
          <summary>Pendidikan</summary>
          <a href="/pendidikan">Ringkasan Pendidikan</a>
          <a href="/pendidikan" data-sec="penerimaan">
            Penerimaan &amp; Beasiswa
          </a>
          <a href="/pendidikan" data-sec="kurikulum">
            Kurikulum &amp; Pembelajaran
          </a>
          <a href="/pendidikan" data-sec="kalender">
            Kalender &amp; Panduan
          </a>
          <a href="/pendidikan" data-sec="suasana">
            Suasana Akademik
          </a>
        </details>
        <details>
          <summary>Penelitian</summary>
          <a href="/penelitian">Ringkasan Penelitian</a>
          <a href="/penelitian" data-sec="riset">
            Riset UNIZAR
          </a>
          <a href="/publikasi-inovasi">Publikasi &amp; Inovasi</a>
          <a href="/penelitian" data-sec="tata-kelola">
            Tata Kelola Riset
          </a>
        </details>
        <details>
          <summary>Pengabdian</summary>
          <a href="/pengabdian">Ringkasan Pengabdian</a>
          <a href="/pengabdian" data-sec="program">
            Program &amp; Desa Binaan
          </a>
          <a href="/pengabdian" data-sec="kepakaran">
            Kepakaran &amp; Kolaborasi
          </a>
          <a href="/pengabdian" data-sec="dampak">
            Dampak &amp; Luaran
          </a>
        </details>
        <details>
          <summary>Penjaminan Mutu</summary>
          <a href="/penjaminan-mutu">Ringkasan Penjaminan Mutu</a>
          <a href="/penjaminan-mutu" data-sec="tentang">
            Tentang &amp; Kalender Mutu
          </a>
          <a href="/penjaminan-mutu" data-sec="dokumen">
            Dokumen &amp; Audit
          </a>
          <a href="/penjaminan-mutu" data-sec="akreditasi">
            Akreditasi
          </a>
          <a href="/peta-bukti">Peta Bukti BAN-PT</a>
        </details>
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="muted">Bahasa</span>
          <div className="lang" style={{ borderColor: "var(--line)" }}>
            <button
              type="button"
              data-l="id"
              aria-pressed={lang === "id" ? "true" : "false"}
              style={{ color: "var(--ink)" }}
              onClick={() => setLang("id")}
            >
              ID
            </button>
            <button
              type="button"
              data-l="en"
              aria-pressed={lang === "en" ? "true" : "false"}
              style={{ color: "var(--ink)" }}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
