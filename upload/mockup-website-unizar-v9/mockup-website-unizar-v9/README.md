# Mockup Website UNIZAR v9

## Perubahan v9
- Perbaikan: panel samping, kotak pencarian, dan menu tidak lagi muncul sendiri saat file dibuka langsung di Safari/Chrome, dan tombol × kembali berfungsi (aturan `[hidden]` ditambahkan di style.css).
- Banner beranda kini hijau emerald polos dan tidak bergerak. IT/operator dapat menggantinya dengan foto atau video lewat CMS.

---

# Mockup Website UNIZAR v8

## Cara membuka di MacBook
Klik dua kali `index.html` sehingga terbuka di Safari atau Chrome. Jangan memakai pratinjau spasi (Quick Look) atau membuka langsung dari dalam ZIP, karena pratinjau tidak menjalankan JavaScript. Huruf Plus Jakarta Sans dimuat dari internet; tanpa internet, tampilan memakai huruf sistem.

## Perubahan v8
- Latar beranda bergerak memakai animasi GPU, sehingga mulus di Safari.
- Efek blur di header dan subnav dihapus agar ringan saat scroll.
- Pada lebar laptop 1100–1320 px, latar hijau kini penuh tanpa celah di sisi bilah Akses.
- Ada tampilan cadangan bila dibuka tanpa JavaScript.

---

# Mockup Website UNIZAR v7

## Perubahan v7
- Profil › Rencana & Kinerja dihapus. Rerata ketercapaian IKU/IKT dan ketercapaian SDGs pindah ke UNIZAR dalam Angka (diperbarui tahunan).
- Profil › UNIZAR untuk SDGs (5 kartu) menjadi bagian paling bawah Profil.
- Visi, Misi, Tujuan, Sasaran, dan Strategi Pencapaian ada di bawah Sambutan Rektor. Sasaran diambil dari 7 sasaran strategis Renstra (SK 076B/2026).
- Tiga fokus di Beranda: Misi Pendidikan Berkualitas, Kampus Rahmatan lil 'Alamin, dan Berwawasan Kepariwisataan Berkelanjutan, masing-masing dengan halaman detail.

---


## Perubahan v6: website publik dibuat ringkas, sistem kerja dipindah ke balik login
- **Publik**: ringkasan kinerja ditampilkan di UNIZAR dalam Angka dan UNIZAR untuk SDGs.
- **Portal Kinerja & Risiko (`#kinerja`)**: tidak tampil di menu publik dan terkunci tanpa login. Portal ini dibuka dari Dasbor setelah masuk. Pada implementasi, portal ini menjadi sistem tersendiri (misalnya kinerja.unizar.ac.id dengan SSO).
- Menu Tata Kelola kembali ke 4 submenu. Kartu Manajemen Risiko kini hanya menampilkan pernyataan publik dan Pedoman.

---


Buka `index.html` langsung di browser atau dengan Live Server di VS Code.

## Isi Portal Kinerja & Risiko (setelah masuk)
1. **IKU & IKT Renstra**: 120 IKU dan 71 IKT dari SK Rektor 076B/2026, dengan target 2026–2027 dan penanggung jawab. Pengisiannya kumulatif per triwulan. Bila target belum tercapai, faktor penghambat dan tindak lanjut wajib diisi. Koordinator memverifikasi atau meminta revisi. Hasilnya bisa diunduh ke Excel (rekap akhir tahun dan resume per sasaran).
2. **IKU Kementerian**: mengikuti format Arah Kinerja PTS 2026 (wajib, pilihan ✓, partisipatif) dengan kolom TW I–IV kumulatif. Ada alur status laporan: Draf, Diverifikasi, Disahkan Rektor, lalu Terkirim. Unduhannya berbentuk satu sheet per triwulan, seperti template Kementerian. Angka TW I–II diambil dari template yang dilampirkan.
3. **SDGs**: 87 implementasi untuk SDG 1, 4, 8, 16, dan 17 sesuai Keputusan Rektor. Angkanya terhubung otomatis ke IKU/IKT sumber, jadi cukup diisi sekali. Rumus ketercapaiannya sama dengan file TW III, dan rekap beserta resume bisa diunduh.
4. **Risk register**: 131 risiko dari 23 unit kerja (Monitoring Risiko UNIZAR). Fitur yang tersedia:
   - FR-01/FR-02 dengan matriks 5×5 dan jalur HIRADC.
   - Pemantauan triwulanan dan reviu SPI.
   - Usulan risiko dari dosen/tendik ke pemilik risiko.
   - Pengajuan register unit ke koordinator.
   - Laporan Lampiran 12 yang bisa dicetak atau disimpan sebagai PDF.
   - Unduhan Excel (Dashboard, satu sheet per unit, dan ALL_DATA).

## Mencoba peran (halaman Masuk › simulasi peran)
- **Operator unit / pemilik risiko**: pilih unit, misalnya BAK (bidang WR I). Peran ini mengisi IKU/IKT bidangnya dan mengelola risk register unitnya beserta unit di bawahnya.
- **Koordinator (WR IV / Biro Perencanaan)**: memverifikasi capaian, menerima pengajuan unit, dan menyusun laporan.
- **SPI**: memberi catatan reviu. **Dosen/tendik**: mengusulkan risiko. **Asesor/tim mutu**: hanya melihat.

## Catatan backend
- Data contoh tersimpan di localStorage browser. Pada sistem nyata, gunakan database dengan tabel `indikator`, `capaian(indikator, periode, realisasi, faktor, tindak_lanjut, bukti, verifikasi)`, `risiko`, `pemantauan_risiko`, `pengajuan_unit`, `usulan_risiko`, beserta SSO per peran.
- Seluruh daftar indikator dan risiko ada di `src/renstra_data.py`, `src/kinerja.py`, dan `src/kin_extract.json`.
- File Excel dibuat langsung di browser tanpa pustaka luar.
