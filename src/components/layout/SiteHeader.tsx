"use client";

import { useRef } from "react";
import { useMegaMenu, useDrawer, useSearch } from "./UnizarProviders";

type MegaKey =
  | "profil"
  | "fakultas"
  | "direktori"
  | "tata-kelola"
  | "pendidikan"
  | "penelitian"
  | "pengabdian"
  | "penjaminan-mutu";

const NAV_LEFT: { key: MegaKey; label: string; en: string }[] = [
  { key: "profil", label: "Profil", en: "Profile" },
  { key: "fakultas", label: "Fakultas", en: "Faculties" },
  { key: "direktori", label: "Direktori", en: "Directory" },
  { key: "tata-kelola", label: "Tata Kelola", en: "Governance" },
];

const NAV_RIGHT: { key: MegaKey; label: string; en: string }[] = [
  { key: "pendidikan", label: "Pendidikan", en: "Education" },
  { key: "penelitian", label: "Penelitian", en: "Research" },
  { key: "pengabdian", label: "Pengabdian", en: "Community Service" },
  { key: "penjaminan-mutu", label: "Penjaminan Mutu", en: "Quality Assurance" },
];

function NavButton({ k, label, en }: { k: MegaKey; label: string; en: string }) {
  const { openMenu, openMega, closeMega } = useMegaMenu();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOn = openMenu === k;

  return (
    <button
      type="button"
      data-menu={k}
      aria-expanded={isOn ? "true" : "false"}
      aria-controls={`mega-${k}`}
      onClick={() => (isOn ? closeMega() : openMega(k))}
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          if (hoverTimer.current) clearTimeout(hoverTimer.current);
          hoverTimer.current = setTimeout(() => openMega(k), 140);
        }
      }}
      onMouseLeave={() => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
      }}
    >
      <span data-en={en}>{label}</span>
      <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}

function MegaShell({
  menuKey,
  children,
}: {
  menuKey: MegaKey;
  children: React.ReactNode;
}) {
  const { openMenu } = useMegaMenu();
  const isOn = openMenu === menuKey;
  return (
    <div className="mega" id={`mega-${menuKey}`} hidden={!isOn}>
      {children}
    </div>
  );
}

export function SiteHeader() {
  const { closeMega } = useMegaMenu();
  const drawer = useDrawer();
  const search = useSearch();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <header
      className="hdr"
      onMouseEnter={() => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          if (hoverTimer.current) clearTimeout(hoverTimer.current);
          hoverTimer.current = setTimeout(closeMega, 250);
        }
      }}
    >
      <div className="wrap">
        <nav className="nav l" aria-label="Menu utama">
          {NAV_LEFT.map((n) => (
            <NavButton key={n.key} k={n.key} label={n.label} en={n.en} />
          ))}
        </nav>
        <a
          className="seal"
          href="/beranda"
          aria-label="Beranda Universitas Islam Al-Azhar"
        >
          <img src="/unizar/logo144.png" alt="Logo Universitas Islam Al-Azhar" />
          <span>UNIZAR</span>
        </a>
        <nav className="nav r" aria-label="Menu utama lanjutan">
          {NAV_RIGHT.map((n) => (
            <NavButton key={n.key} k={n.key} label={n.label} en={n.en} />
          ))}
        </nav>
      </div>

      <div className="hdr-m">
        <button
          className="icon-btn"
          type="button"
          aria-label="Buka menu"
          onClick={() => drawer.open()}
        >
          <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
        </button>
        <a className="brand" href="/beranda">
          <img src="/unizar/logo144.png" alt="" />
          UNIZAR
        </a>
        <button
          className="icon-btn"
          type="button"
          aria-label="Cari"
          onClick={() => search.open()}
        >
          <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      </div>

      {/* Mega menus - kept inside header for correct positioning */}
      <MegaShell menuKey="profil">
        <div className="wrap">
          <div className="mega-intro">
            <span className="eyebrow">Jelajahi</span>
            <h3 data-en="Profile">Profil</h3>
            <p>Siapa kami, dari mana kami datang, dan ke mana kami melangkah.</p>
            <p style={{ marginTop: "14px" }}>
              <a className="btn dark" href="/profil">
                Buka halaman{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>
          <div className="mega-links">
            <a href="/profil" data-sec="tentang">
              <b>
                <span data-en="About UNIZAR">Tentang UNIZAR</span>
              </b>
              <small>Sambutan rektor, visi, misi, dan keunggulan</small>
            </a>
            <a href="/profil" data-sec="sejarah">
              <b>
                <span data-en="History">Sejarah</span>
              </b>
              <small>Perjalanan sejak 1981</small>
            </a>
            <a href="/profil" data-sec="pimpinan">
              <b>
                <span data-en="Leadership">Pimpinan &amp; Organisasi</span>
              </b>
              <small>Rektor, wakil rektor, dan struktur organisasi</small>
            </a>
            <a href="/profil" data-sec="angka">
              <b>
                <span data-en="UNIZAR in Numbers">UNIZAR dalam Angka</span>
              </b>
              <small>Fakta ringkas yang selalu mutakhir</small>
            </a>
            <a href="/profil" data-sec="sdgs">
              <b>
                <span data-en="UNIZAR for the SDGs">UNIZAR untuk SDGs</span>
              </b>
              <small>Lima SDGs yang kami tekuni</small>
            </a>
          </div>
          <a className="mega-feat" href="/profil" data-sec="tentang">
            <div
              className="ph "
              data-cap="Foto: wisuda di halaman Rektorat"
              role="img"
              aria-label="Tempat foto: wisuda di halaman Rektorat"
            ></div>
            <div className="t">
              <b>Diferensiasi misi UNIZAR</b>
              <small>Tiga fokus keunggulan</small>
            </div>
          </a>
        </div>
      </MegaShell>

      <MegaShell menuKey="fakultas">
        <div className="wrap">
          <div className="mega-intro">
            <span className="eyebrow">Jelajahi</span>
            <h3 data-en="Faculties">Fakultas</h3>
            <p>Tujuh fakultas dan tiga belas program studi.</p>
            <p style={{ marginTop: "14px" }}>
              <a className="btn dark" href="/fakultas">
                Buka halaman{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>
          <div className="mega-links">
            <a href="/fakultas/kedokteran">
              <b>
                <span data-en="Medicine">Kedokteran</span>
              </b>
              <small>Pendidikan Dokter · Profesi Dokter</small>
            </a>
            <a href="/fakultas" data-sec="ft">
              <b>
                <span data-en="Engineering">Teknik</span>
              </b>
              <small>Teknik Sipil · Ilmu Komputer</small>
            </a>
            <a href="/fakultas" data-sec="fh">
              <b>
                <span data-en="Law">Hukum</span>
              </b>
              <small>Ilmu Hukum</small>
            </a>
            <a href="/fakultas" data-sec="feb">
              <b>
                <span data-en="Economics & Business">Ekonomi &amp; Bisnis</span>
              </b>
              <small>Akuntansi · Ekonomi Pembangunan</small>
            </a>
            <a href="/fakultas" data-sec="fp">
              <b>
                <span data-en="Agriculture">Pertanian</span>
              </b>
              <small>Agribisnis · Agroekoteknologi</small>
            </a>
            <a href="/fakultas" data-sec="fmipa">
              <b>
                <span data-en="Science">MIPA</span>
              </b>
              <small>Biologi</small>
            </a>
            <a href="/fakultas" data-sec="fai">
              <b>
                <span data-en="Islamic Studies">Agama Islam</span>
              </b>
              <small>Ekonomi Syariah · Manajemen Bisnis Syariah</small>
            </a>
          </div>
          <a className="mega-feat" href="/prodi/pendidikan-dokter">
            <div
              className="ph "
              data-cap="Foto: praktikum keterampilan klinis"
              role="img"
              aria-label="Tempat foto: praktikum keterampilan klinis"
            ></div>
            <div className="t">
              <b>Contoh halaman prodi</b>
              <small>Pendidikan Dokter</small>
            </div>
          </a>
        </div>
      </MegaShell>

      <MegaShell menuKey="direktori">
        <div className="wrap">
          <div className="mega-intro">
            <span className="eyebrow">Jelajahi</span>
            <h3 data-en="Directory">Direktori</h3>
            <p>Temukan unit, orang, dokumen, dan lokasi.</p>
            <p style={{ marginTop: "14px" }}>
              <a className="btn dark" href="/direktori">
                Buka halaman{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>
          <div className="mega-links">
            <a href="/direktori" data-sec="unit">
              <b>
                <span data-en="Units">Unit Kerja</span>
              </b>
              <small>Biro, lembaga, badan, UPT, dan satgas</small>
            </a>
            <a href="/direktori" data-sec="dosen">
              <b>
                <span data-en="Lecturers & Experts">Dosen &amp; Pakar</span>
              </b>
              <small>Cari berdasarkan nama atau bidang keahlian</small>
            </a>
            <a href="/pusdatin">
              <b>
                <span data-en="Data & Information Centre">
                  Pusat Data &amp; Informasi (Pusdatin)
                </span>
              </b>
              <small>Dokumen resmi, data, statistik, dan JDIH</small>
            </a>
            <a href="/direktori" data-sec="kontak">
              <b>
                <span data-en="Contact & Map">Kontak &amp; Peta Kampus</span>
              </b>
              <small>Alamat, telepon, dan denah gedung</small>
            </a>
          </div>
          <a className="mega-feat" href="/pusdatin">
            <div
              className="ph "
              data-cap="Foto: arsip dokumen"
              role="img"
              aria-label="Tempat foto: arsip dokumen"
            ></div>
            <div className="t">
              <b>Pusdatin</b>
              <small>Dokumen, data, dan statistik resmi</small>
            </div>
          </a>
        </div>
      </MegaShell>

      <MegaShell menuKey="tata-kelola">
        <div className="wrap">
          <div className="mega-intro">
            <span className="eyebrow">Jelajahi</span>
            <h3 data-en="Governance">Tata Kelola</h3>
            <p>Akuntabel, berintegritas, dan terbuka bagi publik.</p>
            <p style={{ marginTop: "14px" }}>
              <a className="btn dark" href="/tata-kelola">
                Buka halaman{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>
          <div className="mega-links">
            <a href="/tata-kelola" data-sec="kebijakan">
              <b>
                <span data-en="Policies & Reports">Kebijakan &amp; Laporan</span>
              </b>
              <small>Laporan tahunan, keuangan teraudit, survei</small>
            </a>
            <a href="/tata-kelola" data-sec="integritas">
              <b>
                <span data-en="Integrity & Safe Campus">
                  Integritas &amp; Kampus Aman
                </span>
              </b>
              <small>Kode etik, Satgas PPKPT, pelaporan</small>
            </a>
            <a href="/tata-kelola" data-sec="pengawasan">
              <b>
                <span data-en="Internal Audit">Pengawasan Internal</span>
              </b>
              <small>SPI, manajemen risiko, zona integritas</small>
            </a>
            <a href="/tata-kelola" data-sec="ppid">
              <b>
                <span data-en="Public Information">Transparansi &amp; PPID</span>
              </b>
              <small>Daftar informasi publik dan permohonan</small>
            </a>
          </div>
          <a className="mega-feat" href="/tata-kelola" data-sec="integritas">
            <div
              className="ph "
              data-cap="Foto: layanan pengaduan"
              role="img"
              aria-label="Tempat foto: layanan pengaduan"
            ></div>
            <div className="t">
              <b>Lapor dengan aman</b>
              <small>Kanal pelaporan rahasia</small>
            </div>
          </a>
        </div>
      </MegaShell>

      <MegaShell menuKey="pendidikan">
        <div className="wrap">
          <div className="mega-intro">
            <span className="eyebrow">Jelajahi</span>
            <h3 data-en="Education">Pendidikan</h3>
            <p>Dari pendaftaran sampai wisuda.</p>
            <p style={{ marginTop: "14px" }}>
              <a className="btn dark" href="/pendidikan">
                Buka halaman{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>
          <div className="mega-links">
            <a href="/pendidikan" data-sec="penerimaan">
              <b>
                <span data-en="Admissions & Scholarships">
                  Penerimaan &amp; Beasiswa
                </span>
              </b>
              <small>Jalur masuk, biaya, dan beasiswa</small>
            </a>
            <a href="/pendidikan" data-sec="kurikulum">
              <b>
                <span data-en="Curriculum & Learning">
                  Kurikulum &amp; Pembelajaran
                </span>
              </b>
              <small>OBE, MBKM, RPL, dan e-learning</small>
            </a>
            <a href="/pendidikan" data-sec="kalender">
              <b>
                <span data-en="Calendar & Guides">Kalender &amp; Panduan</span>
              </b>
              <small>Kalender akademik dan panduan studi</small>
            </a>
            <a href="/pendidikan" data-sec="suasana">
              <b>
                <span data-en="Academic Life">Suasana Akademik</span>
              </b>
              <small>Kuliah umum, integritas akademik</small>
            </a>
          </div>
          <a className="mega-feat" href="/pendidikan" data-sec="penerimaan">
            <div
              className="ph "
              data-cap="Foto: calon mahasiswa di stan PMB"
              role="img"
              aria-label="Tempat foto: calon mahasiswa di stan PMB"
            ></div>
            <div className="t">
              <b>PMB 2027 dibuka</b>
              <small>Gelombang 1 sampai [tanggal]</small>
            </div>
          </a>
        </div>
      </MegaShell>

      <MegaShell menuKey="penelitian">
        <div className="wrap">
          <div className="mega-intro">
            <span className="eyebrow">Jelajahi</span>
            <h3 data-en="Research">Penelitian</h3>
            <p>Riset yang berangkat dari persoalan NTB.</p>
            <p style={{ marginTop: "14px" }}>
              <a className="btn dark" href="/penelitian">
                Buka halaman{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>
          <div className="mega-links">
            <a href="/penelitian" data-sec="riset">
              <b>
                <span data-en="Research at UNIZAR">Riset UNIZAR</span>
              </b>
              <small>Tema unggulan, peta jalan, hibah</small>
            </a>
            <a href="/publikasi-inovasi">
              <b>
                <span data-en="Publications & Innovation">
                  Publikasi &amp; Inovasi
                </span>
              </b>
              <small>Jurnal, repositori, SINTA, HKI, hilirisasi</small>
            </a>
            <a href="/penelitian" data-sec="tata-kelola">
              <b>
                <span data-en="Research Governance">Tata Kelola Riset</span>
              </b>
              <small>Alur, etik, dan pedoman</small>
            </a>
          </div>
          <a className="mega-feat" href="/penelitian" data-sec="riset">
            <div
              className="ph "
              data-cap="Foto: peneliti di laboratorium"
              role="img"
              aria-label="Tempat foto: peneliti di laboratorium"
            ></div>
            <div className="t">
              <b>Hibah internal 2027</b>
              <small>Proposal dibuka</small>
            </div>
          </a>
        </div>
      </MegaShell>

      <MegaShell menuKey="pengabdian">
        <div className="wrap">
          <div className="mega-intro">
            <span className="eyebrow">Jelajahi</span>
            <h3 data-en="Community Service">Pengabdian</h3>
            <p>Ilmu yang hadir di tengah masyarakat.</p>
            <p style={{ marginTop: "14px" }}>
              <a className="btn dark" href="/pengabdian">
                Buka halaman{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>
          <div className="mega-links">
            <a href="/pengabdian" data-sec="program">
              <b>
                <span data-en="Programmes & Partner Villages">
                  Program &amp; Desa Binaan
                </span>
              </b>
              <small>Program unggulan dan lokasinya</small>
            </a>
            <a href="/pengabdian" data-sec="kepakaran">
              <b>
                <span data-en="Expertise & Collaboration">
                  Kepakaran &amp; Kolaborasi
                </span>
              </b>
              <small>Ajukan kerja sama dengan pakar</small>
            </a>
            <a href="/pengabdian" data-sec="dampak">
              <b>
                <span data-en="Impact & Outputs">Dampak &amp; Luaran</span>
              </b>
              <small>Cerita perubahan dan luaran</small>
            </a>
          </div>
          <a className="mega-feat" href="/pengabdian" data-sec="kepakaran">
            <div
              className="ph "
              data-cap="Foto: kegiatan di desa binaan"
              role="img"
              aria-label="Tempat foto: kegiatan di desa binaan"
            ></div>
            <div className="t">
              <b>Ajukan kolaborasi</b>
              <small>Untuk desa, sekolah, UMKM</small>
            </div>
          </a>
        </div>
      </MegaShell>

      <MegaShell menuKey="penjaminan-mutu">
        <div className="wrap">
          <div className="mega-intro">
            <span className="eyebrow">Jelajahi</span>
            <h3 data-en="Quality Assurance">Penjaminan Mutu</h3>
            <p>Sistem mutu yang berjalan, bukan hanya tertulis.</p>
            <p style={{ marginTop: "14px" }}>
              <a className="btn dark" href="/penjaminan-mutu">
                Buka halaman{" "}
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>
          <div className="mega-links">
            <a href="/penjaminan-mutu" data-sec="tentang">
              <b>
                <span data-en="About & Quality Calendar">
                  Tentang &amp; Kalender Mutu
                </span>
              </b>
              <small>Siklus PPEPP sepanjang tahun</small>
            </a>
            <a href="/penjaminan-mutu" data-sec="dokumen">
              <b>
                <span data-en="Documents & Audit">Dokumen &amp; Audit</span>
              </b>
              <small>SPMI, AMI, RTM, dan RTL</small>
            </a>
            <a href="/penjaminan-mutu" data-sec="akreditasi">
              <b>
                <span data-en="Accreditation">Akreditasi</span>
              </b>
              <small>Institusi dan program studi</small>
            </a>
            <a href="/peta-bukti">
              <b>
                <span data-en="Accreditation Evidence Map">
                  Peta Bukti BAN-PT
                </span>
              </b>
              <small>39 indikator IAPT 4.1</small>
            </a>
          </div>
          <a className="mega-feat" href="/peta-bukti">
            <div
              className="ph "
              data-cap="Foto: rapat tinjauan manajemen"
              role="img"
              aria-label="Tempat foto: rapat tinjauan manajemen"
            ></div>
            <div className="t">
              <b>Untuk asesor</b>
              <small>Peta Bukti 39 indikator</small>
            </div>
          </a>
        </div>
      </MegaShell>
    </header>
  );
}
