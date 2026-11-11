# Website UNIZAR — Frontend (React + TailwindCSS)

Mockup website Universitas Islam Al-Azhar v9, di-port ke **Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript**. Frontend only — backend akan di-hook up nanti.

Desain **pixel-perfect** dengan mockup asli: CSS orisinal (`src/styles/unizar.css`) dipertahankan verbatim, markup dikonversi ke JSX per-section.

---

## Struktur folder

```
.
├── src/
│   ├── app/                      # Next.js App Router — 1 route per menu
│   │   ├── layout.tsx            # Root layout (header/footer/drawer/search providers)
│   │   ├── page.tsx              # / (Beranda)
│   │   ├── globals.css           # Tailwind + import unizar.css
│   │   ├── beranda/page.tsx
│   │   ├── profil/page.tsx
│   │   ├── fakultas/page.tsx
│   │   ├── fakultas/kedokteran/page.tsx       # sub-route
│   │   ├── prodi/pendidikan-dokter/page.tsx   # sub-route
│   │   ├── direktori/page.tsx
│   │   ├── pusdatin/page.tsx
│   │   ├── tata-kelola/page.tsx
│   │   ├── kinerja/page.tsx
│   │   ├── pendidikan/page.tsx
│   │   ├── penelitian/page.tsx
│   │   ├── publikasi-inovasi/page.tsx
│   │   ├── pengabdian/page.tsx
│   │   ├── penjaminan-mutu/page.tsx
│   │   ├── peta-bukti/page.tsx
│   │   ├── layanan/page.tsx
│   │   ├── kerjasama/page.tsx
│   │   ├── mahasiswa-alumni/page.tsx
│   │   ├── masuk/page.tsx
│   │   ├── berita/page.tsx
│   │   └── dasbor/page.tsx
│   │
│   ├── components/
│   │   ├── layout/               # Shared layout (rendered once in root layout)
│   │   │   ├── SiteHeader.tsx           # Header + 8 mega menu (interactive)
│   │   │   ├── UtilBar.tsx              # Top utility bar (search + ID/EN)
│   │   │   ├── MobileDrawer.tsx         # Mobile nav drawer
│   │   │   ├── SearchOverlay.tsx        # Full-text search overlay
│   │   │   ├── SiteFooter.tsx           # Footer
│   │   │   ├── BottomBar.tsx            # Mobile bottom nav
│   │   │   ├── MockupPill.tsx           # "Mockup UI" dismissable pill
│   │   │   ├── UnizarProviders.tsx      # Context: mega menu/drawer/search/lang state
│   │   │   └── PageInteractivity.tsx    # Auto-wire subnav/filters/tabs/forms per route
│   │   │
│   │   ├── sections/             # Per-menu page content — EDIT HERE
│   │   │   ├── beranda/                  # 1 folder per menu
│   │   │   │   ├── PageShell.tsx         # Page wrapper (hero + subnav + placeholders)
│   │   │   │   └── index.tsx             # Page entry, composes shell + sections
│   │   │   ├── profil/
│   │   │   │   ├── PageShell.tsx
│   │   │   │   ├── TentangSection.tsx    # Each sub-section = its own file
│   │   │   │   ├── SejarahSection.tsx
│   │   │   │   ├── PimpinanSection.tsx
│   │   │   │   ├── AngkaSection.tsx
│   │   │   │   ├── SdgsSection.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── fakultas/
│   │   │   ├── fakultas-kedokteran/
│   │   │   ├── prodi-pendidikan-dokter/
│   │   │   ├── direktori/
│   │   │   ├── pusdatin/
│   │   │   ├── tata-kelola/
│   │   │   ├── kinerja/
│   │   │   ├── pendidikan/
│   │   │   ├── penelitian/
│   │   │   ├── publikasi-inovasi/
│   │   │   ├── pengabdian/
│   │   │   ├── penjaminan-mutu/
│   │   │   ├── peta-bukti/
│   │   │   ├── layanan/
│   │   │   ├── kerjasama/
│   │   │   ├── mahasiswa-alumni/
│   │   │   ├── masuk/
│   │   │   ├── berita/
│   │   │   └── dasbor/
│   │   │
│   │   └── ui/                   # shadcn/ui components (button, card, dialog, dll.)
│   │
│   ├── data/                     # JSON data (dari mockup asli, untuk backend nanti)
│   │   ├── search_index.json     # Search index (dipake sama SearchOverlay)
│   │   ├── flow_data.json        # Form & flow definitions
│   │   ├── kin_data.json         # Kinerja portal data (IKU/IKT/Risiko)
│   │   └── akr_data.json         # Akreditasi archive data
│   │
│   ├── hooks/
│   │   ├── use-section-interactivity.ts   # Subnav builder + filter chips + tabs + mock forms
│   │   ├── use-toast.ts                   # shadcn toast hook
│   │   └── use-mobile.ts                  # shadcn responsive hook
│   │
│   ├── lib/
│   │   └── utils.ts               # cn() className merge utility (shadcn)
│   │
│   └── styles/
│       └── unizar.css            # CSS orisinal dari mockup v9 — JANGAN DIMODIFIKASI
│                                  # kalau mau ubah styling, edit di sini atau
│                                  # tambah Tailwind class di JSX component
│
├── public/
│   └── unizar/
│       └── logo144.png           # Logo UNIZAR
│
├── tools/                        # Python scripts (build-time only, bukan bagian dari app)
│   ├── extract_unizar.py         # Extract CSS/JSON/sections dari index.html asli
│   ├── extract_layout.py         # Extract header/footer/drawer/dll.
│   ├── html_to_jsx.py            # Convert HTML sections → JSX components
│   ├── html_to_layout_jsx.py     # Convert layout HTML → JSX
│   └── strip_base64.py           # Replace base64 logo → URL file
│
├── _archive/                     # Mockup asli (referensi, di-gitignore)
│   ├── mockup-website-unizar-v9.zip
│   └── mockup-original/
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json               # shadcn/ui config
├── Caddyfile                     # Gateway config (auto)
└── README.md                     # File ini
```

---

## Cara edit per menu (git branch workflow)

Tiap menu = 1 folder di `src/components/sections/<menu>/`. Edit 1 menu = touch 1 folder = 1 branch clean, gak akan conflict dengan orang yang lagi edit menu lain.

```bash
# Contoh: edit halaman Profil
git checkout -b edit-profil-sejarah
# Edit src/components/sections/profil/SejarahSection.tsx
git push origin edit-profil-sejarah
# Bikin PR — gak conflict dengan yang lagi edit Fakultas
```

### File penting per folder menu

- `<menu>/PageShell.tsx` — wrapper halaman (hero + subnav + section placeholders)
- `<menu>/<Nama>Section.tsx` — 1 file per sub-section (e.g. `TentangSection.tsx`, `SejarahSection.tsx`)
- `<menu>/index.tsx` — entry point, composes shell + semua sections

---

## Yang sudah jalan

- **22 route** Next.js App Router (1 per menu, plus sub-route `/fakultas/kedokteran` dan `/prodi/pendidikan-dokter`)
- **Mega menu** 8 kategori (Profil, Fakultas, Direktori, Tata Kelola, Pendidikan, Penelitian, Pengabdian, Penjaminan Mutu) — hover + click, with timeout
- **Mobile drawer** — toggle open/close, click outside untuk close
- **Search overlay** — full-text search pake `search_index.json`, shortcut `/` buka, `Esc` tutup
- **Language ID/EN** — swap text via `data-en` attribute, persist ke localStorage
- **Subnav per page** — built dinamis dari `.sec[data-t]`, IntersectionObserver buat highlight active section
- **Filter chips + text search** — di Direktori, Penjaminan Mutu, dll.
- **Tabs** — di Profil (Misi/Tujuan/Sasaran/Strategi), PPID, login form
- **Mock forms** — `form[data-mock]` show confirmation message on submit

## Yang sengaja belum di-port (frontend only — nanti pas backend)

- **Login & session flows** (`flows.js` 80KB) — form mockup sudah ada, logic backend belum
- **Kinerja portal tables** (`kinerja.js` 96KB) — page shell + section HTML sudah ada, dynamic table rendering via localStorage belum (data JSON sudah disiapin di `src/data/kin_data.json`)
- **Excel export, role simulation, SSO** — semua butuh backend

---

## Development

```bash
bun install           # install dependencies
bun run dev           # dev server di port 3000
bun run lint          # ESLint check
```

Buka `http://localhost:3000` di browser — semua route harus return 200.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + `src/styles/unizar.css` (orisinal mockup)
- **UI Library**: shadcn/ui (New York) + Lucide icons
- **Font**: Plus Jakarta Sans + Amiri (via `next/font/google`)

## Catatan

- CSS orisinal di `src/styles/unizar.css` sengaja dipertahankan verbatim — ini jaminan pixel-perfect dengan mockup v9. Tailwind utility class bisa dipake alongside.
- Data JSON di `src/data/` adalah extract dari `<script type="application/json">` blocks di mockup asli. Pas backend di-hook up, data ini bisa dipindah ke database dan di-fetch via API route.
- Tools Python di `tools/` dipake buat konversi awal HTML→JSX. Gak dipake pas runtime. Edit JSX langsung untuk modify content.
