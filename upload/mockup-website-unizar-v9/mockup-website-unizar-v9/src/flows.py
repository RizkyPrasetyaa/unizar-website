"""Registries for every end-point of the mockup: forms, detail sheets, external systems.
Field spec: (id, label, type, options_or_placeholder, required, full_width)
types: text email tel number date select radio checks textarea file slots likert consent
"""

def F(id, label, type='text', opt=None, req=True, full=False):
    return {'id': id, 'l': label, 't': type, 'o': opt, 'r': req, 'f': full}

PRODI = ['Pendidikan Dokter', 'Profesi Dokter', 'Teknik Sipil', 'Ilmu Komputer', 'Ilmu Hukum', 'Akuntansi', 'Ekonomi Pembangunan',
         'Agribisnis', 'Agroekoteknologi', 'Biologi', 'Ekonomi Syariah', 'Manajemen Bisnis Syariah']
GEDUNG = ['Gedung Rektorat', 'Gedung Kuliah Bersama', 'Fakultas Kedokteran', 'Fakultas Teknik', 'Perpustakaan', 'Masjid kampus', 'Area parkir / taman']

FORMS = {
 'peminjaman-ruang': dict(t='Peminjaman Ruang & Fasilitas', u='Biro Umum', role=None, sla='Konfirmasi paling lambat 2 hari kerja',
   i='Cek jadwal kosong, pilih jam, lalu isi data kegiatan. Peminjaman terbuka untuk unit, organisasi mahasiswa, dan pihak luar.',
   s=[('Ruang & waktu', [F('ruang', 'Ruang / fasilitas', 'select', ['Aula Rektorat · 300 orang', 'Ruang Sidang Senat · 40 orang', 'Gedung Serbaguna · 500 orang', 'Lab Komputer PUSTIK · 40 orang', 'Lapangan olahraga']),
                              F('tgl', 'Tanggal kegiatan', 'date'), F('jam', 'Pilih jam (blok yang tersedia)', 'slots', None, True, True)]),
      ('Data kegiatan', [F('keg', 'Nama kegiatan'), F('pemohon', 'Unit / organisasi / instansi'), F('peserta', 'Perkiraan peserta', 'number'),
                         F('perlu', 'Kebutuhan tambahan', 'checks', ['Sound system', 'Proyektor & layar', 'Kursi tambahan', 'Dokumentasi Humas', 'Petugas kebersihan'], False, True)]),
      ('Penanggung jawab', [F('pj', 'Nama penanggung jawab'), F('hp', 'Nomor WhatsApp', 'tel'), F('email', 'Email', 'email'), F('surat', 'Surat permohonan (PDF)', 'file')])],
   st=['Diajukan', 'Diverifikasi Biro Umum', 'Disetujui · jadwal dikunci', 'Serah terima ruang']),
 'surat-aktif': dict(t='Surat Keterangan Aktif Kuliah', u='Biro Akademik', role=['mhs'], sla='Terbit dalam 1 hari kerja, bertanda tangan elektronik',
   i='Surat dikirim ke email kampus dan dapat diunduh dari Dasbor.',
   s=[('Keperluan', [F('perlu', 'Keperluan', 'select', ['Tunjangan orang tua', 'Beasiswa', 'Pengurusan visa', 'Magang', 'Lainnya']), F('bhs', 'Bahasa', 'radio', ['Indonesia', 'Inggris']),
                     F('jml', 'Jumlah salinan', 'number'), F('cat', 'Catatan untuk petugas', 'textarea', None, False, True)])],
   st=['Diajukan', 'Diverifikasi Biro Akademik', 'Ditandatangani elektronik', 'Siap diunduh']),
 'legalisir': dict(t='Legalisir Ijazah & Transkrip', u='Biro Akademik', role=None, sla='Selesai dalam 3 hari kerja',
   i='Untuk alumni. Unggah pindaian ijazah agar petugas dapat mencocokkan arsip.',
   s=[('Data alumni', [F('nama', 'Nama lengkap'), F('nim', 'NIM'), F('prodi', 'Program studi', 'select', PRODI), F('lulus', 'Tahun lulus', 'number')]),
      ('Permintaan', [F('dok', 'Dokumen', 'checks', ['Ijazah', 'Transkrip nilai']), F('lbr', 'Jumlah lembar per dokumen', 'number'),
                      F('ambil', 'Cara pengambilan', 'radio', ['Ambil di loket', 'Kirim pos (ongkir ditanggung pemohon)'], True, True), F('alamat', 'Alamat pengiriman (bila dikirim)', 'textarea', None, False, True)]),
      ('Kontak & berkas', [F('email', 'Email', 'email'), F('hp', 'Nomor WhatsApp', 'tel'), F('scan', 'Pindaian ijazah (PDF/JPG)', 'file', None, True, True)])],
   st=['Diajukan', 'Dicocokkan dengan arsip', 'Dilegalisir', 'Siap diambil / dikirim']),
 'keringanan-ukt': dict(t='Pengajuan Keringanan UKT', u='Biro Keuangan', role=['mhs'], sla='Keputusan dalam 7 hari kerja',
   i='Untuk mahasiswa yang kondisi ekonominya berubah. Data dijaga kerahasiaannya.',
   s=[('Pengajuan', [F('smt', 'Semester', 'select', ['Ganjil 2026/2027', 'Genap 2026/2027']), F('alasan', 'Alasan utama', 'select', ['Orang tua/wali meninggal dunia', 'Orang tua/wali terkena PHK', 'Terdampak bencana', 'Penurunan penghasilan', 'Lainnya']),
                     F('hasil', 'Penghasilan orang tua per bulan', 'select', ['< Rp1 juta', 'Rp1–3 juta', 'Rp3–5 juta', '> Rp5 juta']), F('urai', 'Uraian singkat', 'textarea', None, True, True),
                     F('bukti', 'Dokumen pendukung (PDF)', 'file', None, True, True)])],
   st=['Diajukan', 'Verifikasi berkas', 'Rapat penetapan', 'Keputusan terbit']),
 'reset-sso': dict(t='Aktivasi / Reset Akun SSO', u='PUSTIK', role=None, sla='Diproses dalam 1 jam kerja',
   i='Untuk aktivasi email kampus atau lupa kata sandi.',
   s=[('Data akun', [F('id', 'NIM / NIDN / NIP'), F('jenis', 'Permintaan', 'radio', ['Aktivasi akun baru', 'Reset kata sandi']), F('email', 'Email pemulihan', 'email'), F('hp', 'Nomor WhatsApp', 'tel')])],
   st=['Diajukan', 'Verifikasi identitas', 'Akun diperbarui', 'Selesai']),
 'helpdesk': dict(t='Tiket Helpdesk', u='PUSTIK', role=None, sla='Respons pertama paling lambat 1 hari kerja',
   i='Sampaikan kendala layanan TIK atau layanan lain yang tidak tercantum.',
   s=[('Kendala', [F('kat', 'Kategori', 'select', ['SIAKAD', 'E-learning', 'Email & SSO', 'Jaringan / Wi-Fi', 'Website', 'Lainnya']), F('judul', 'Judul singkat'),
                   F('urai', 'Uraian kendala', 'textarea', None, True, True), F('lamp', 'Tangkapan layar (opsional)', 'file', None, False), F('email', 'Email untuk balasan', 'email')])],
   st=['Tiket dibuat', 'Ditugaskan ke petugas', 'Ditangani', 'Selesai']),
 'konseling': dict(t='Janji Temu Klinik & Konseling', u='Klinik & Layanan Konseling', role=['mhs', 'dsn'], sla='Konfirmasi jadwal via WhatsApp',
   i='Kerahasiaan Anda dijaga. Keluhan boleh dikosongkan dan disampaikan langsung saat bertemu.',
   s=[('Jadwal', [F('lay', 'Layanan', 'radio', ['Klinik umum', 'Konseling psikolog']), F('tgl', 'Tanggal', 'date'), F('sesi', 'Sesi', 'select', ['08.00–09.00', '10.00–11.00', '13.00–14.00', '15.00–16.00']),
                  F('kel', 'Keluhan singkat (opsional)', 'textarea', None, False, True), F('hp', 'Nomor WhatsApp', 'tel')])],
   st=['Diajukan', 'Jadwal dikonfirmasi', 'Sesi berlangsung', 'Selesai']),
 'lapor-k3': dict(t='Lapor Kerusakan / Insiden K3', u='Unit K3', role=None, sla='Darurat ditangani segera, lainnya dalam 1 hari kerja',
   i='Keadaan darurat yang membahayakan jiwa: hubungi petugas keamanan kampus di [nomor darurat] sekarang, lalu isi laporan ini.',
   s=[('Kejadian', [F('jenis', 'Jenis laporan', 'radio', ['Kerusakan fasilitas', 'Insiden / kecelakaan', 'Kondisi berbahaya / hampir celaka'], True, True),
                    F('urg', 'Tingkat urgensi', 'radio', ['Darurat', 'Segera', 'Biasa'], True, True), F('gedung', 'Gedung / area', 'select', GEDUNG), F('ruang', 'Lantai / ruang'),
                    F('urai', 'Uraian', 'textarea', None, True, True), F('foto', 'Foto (opsional)', 'file', None, False)]),
      ('Pelapor (opsional)', [F('nama', 'Nama', 'text', None, False), F('hp', 'Nomor WhatsApp', 'tel', None, False)])],
   st=['Dilaporkan', 'Diperiksa Unit K3', 'Diperbaiki / ditangani', 'Ditutup']),
 'ppid-permohonan': dict(t='Permohonan Informasi Publik', u='PPID UNIZAR', role=None, sla='Dijawab paling lambat 10 hari kerja (dapat diperpanjang 7 hari)',
   i='Sesuai UU Keterbukaan Informasi Publik. Nomor registrasi dikirim ke email Anda.',
   s=[('Pemohon', [F('nama', 'Nama lengkap'), F('ident', 'Nomor identitas (KTP / KTM)'), F('email', 'Email', 'email'), F('hp', 'Nomor telepon', 'tel')]),
      ('Informasi', [F('info', 'Informasi yang diminta', 'textarea', None, True, True), F('tujuan', 'Tujuan penggunaan', 'textarea', None, True, True),
                     F('cara', 'Cara memperoleh', 'radio', ['Melihat / membaca', 'Salinan elektronik', 'Salinan cetak'], True, True)])],
   st=['Teregistrasi', 'Diteruskan ke unit pemilik informasi', 'Jawaban disiapkan', 'Informasi diberikan']),
 'ppid-keberatan': dict(t='Pengajuan Keberatan Informasi', u='Atasan PPID', role=None, sla='Tanggapan paling lambat 30 hari kerja',
   i='Ajukan bila permohonan informasi Anda tidak ditanggapi atau tidak dipenuhi.',
   s=[('Keberatan', [F('no', 'Nomor registrasi permohonan'), F('email', 'Email', 'email'),
                     F('alasan', 'Alasan keberatan', 'checks', ['Permohonan ditolak', 'Informasi berkala tidak disediakan', 'Permohonan tidak ditanggapi', 'Tidak dipenuhi sesuai permintaan', 'Biaya tidak wajar', 'Melebihi jangka waktu'], True, True),
                     F('urai', 'Uraian', 'textarea', None, True, True)])],
   st=['Diterima', 'Ditelaah atasan PPID', 'Tanggapan tertulis', 'Selesai']),
 'lapor-ppkpt': dict(t='Lapor ke Satgas PPKPT', u='Satgas PPKPT', role=None, sla='Dihubungi Satgas paling lambat 1x24 jam',
   i='Anda tidak sendiri. Identitas pelapor dan korban dirahasiakan. Bila dalam bahaya, hubungi [nomor darurat Satgas] sekarang.',
   s=[('Kejadian', [F('sbg', 'Anda melapor sebagai', 'radio', ['Korban', 'Saksi', 'Pihak lain']), F('jenis', 'Bentuk kekerasan', 'select', ['Kekerasan fisik', 'Kekerasan psikis', 'Perundungan', 'Kekerasan seksual', 'Diskriminasi & intoleransi', 'Lainnya']),
                    F('kapan', 'Perkiraan waktu kejadian', 'date', None, False), F('lokasi', 'Lokasi', 'text', None, False), F('krono', 'Ceritakan yang terjadi', 'textarea', None, True, True), F('bukti', 'Bukti pendukung (opsional)', 'file', None, False, True)]),
      ('Kontak aman', [F('kontak', 'Kontak yang aman dihubungi (email / WA)'), F('ok', 'Saya memahami bahwa laporan ini dijaga kerahasiaannya dan Satgas akan menghubungi saya melalui kontak di atas.', 'consent', None, True, True)])],
   st=['Laporan diterima', 'Pemeriksaan awal & pendampingan', 'Penanganan', 'Rekomendasi & pemulihan']),
 'wbs': dict(t='Whistleblowing System', u='Satuan Pengawasan Internal', role=None, sla='Ditelaah dalam 5 hari kerja',
   i='Laporkan dugaan pelanggaran. Anda boleh melapor tanpa nama; simpan nomor tiket untuk memantau tindak lanjut.',
   s=[('Pelanggaran', [F('jenis', 'Jenis dugaan pelanggaran', 'select', ['Korupsi', 'Gratifikasi', 'Penyalahgunaan wewenang', 'Benturan kepentingan', 'Pelanggaran kode etik', 'Pengadaan barang/jasa']),
                       F('unit', 'Unit terkait'), F('urai', 'Uraian (apa, siapa, kapan, di mana, bagaimana)', 'textarea', None, True, True), F('bukti', 'Bukti (opsional)', 'file', None, False, True)]),
      ('Identitas', [F('anon', 'Saya ingin melapor tanpa nama', 'consent', None, False, True), F('kontak', 'Kontak (opsional)', 'text', None, False)])],
   st=['Laporan diterima', 'Telaah awal SPI', 'Investigasi', 'Rekomendasi ke pimpinan']),
 'survei-kepuasan': dict(t='Survei Kepuasan Tata Kelola', u='Badan Penjaminan Mutu', role=None, sla='Hasil diumumkan setiap akhir tahun beserta tindak lanjutnya',
   i='Lima menit untuk membantu kami memperbaiki layanan.',
   s=[('Penilaian', [F('resp', 'Anda adalah', 'radio', ['Mahasiswa', 'Dosen', 'Tenaga kependidikan', 'Alumni', 'Mitra'], True, True),
                     F('lik', 'Seberapa puas Anda dengan…', 'likert', ['Kejelasan kebijakan', 'Keterbukaan informasi', 'Kecepatan layanan', 'Keadilan perlakuan', 'Integritas pimpinan dan unit'], True, True),
                     F('saran', 'Saran perbaikan', 'textarea', None, False, True)])],
   st=['Terkirim', 'Direkap BPM', 'Dibahas di RTM', 'Tindak lanjut diumumkan']),
 'kontak': dict(t='Hubungi Kami', u='Humas UNIZAR', role=None, sla='Dibalas dalam 1 hari kerja',
   i='Pertanyaan umum, liputan media, atau saran untuk universitas.',
   s=[('Pesan', [F('nama', 'Nama'), F('email', 'Email', 'email'), F('topik', 'Topik', 'select', ['Informasi umum', 'Media & liputan', 'Kerja sama', 'Saran & masukan']), F('pesan', 'Pesan', 'textarea', None, True, True)])],
   st=['Terkirim', 'Diteruskan ke unit', 'Dibalas', 'Selesai']),
 'permintaan-data': dict(t='Permintaan Data', u='Pusdatin', role=None, sla='Diproses dalam 5 hari kerja',
   i='Untuk keperluan penelitian, akreditasi, atau pelaporan instansi. Data pribadi tidak dibagikan.',
   s=[('Permintaan', [F('nama', 'Nama'), F('inst', 'Instansi'), F('email', 'Email', 'email'), F('tujuan', 'Tujuan', 'select', ['Penelitian', 'Akreditasi', 'Pelaporan instansi', 'Lainnya']),
                      F('data', 'Data yang diminta', 'textarea', None, True, True), F('fmt', 'Format', 'radio', ['Excel', 'PDF'])])],
   st=['Diajukan', 'Verifikasi Pusdatin', 'Data disiapkan', 'Data dikirim']),
 'hki-ajukan': dict(t='Pengajuan Kekayaan Intelektual', u='Sentra HKI · LPPM', role=['dsn'], sla='Pendampingan dalam 7 hari kerja',
   i='Sentra HKI membantu pemeriksaan kebaruan dan pendaftaran ke DJKI.',
   s=[('Karya', [F('judul', 'Judul karya / invensi', 'text', None, True, True), F('jenis', 'Jenis', 'select', ['Paten', 'Paten sederhana', 'Hak cipta', 'Desain industri', 'Merek']),
                 F('inv', 'Inventor / pencipta', 'textarea'), F('abs', 'Abstrak', 'textarea', None, True, True), F('berkas', 'Berkas pendukung', 'file', None, True, True)])],
   st=['Diajukan', 'Pemeriksaan kebaruan', 'Didaftarkan ke DJKI', 'Sertifikat terbit']),
 'ajukan-kerjasama': dict(t='Pengajuan Kerja Sama', u='Biro Humas, Kerja Sama & Alumni', role=None, sla='Respons dalam 5 hari kerja',
   i='Untuk perguruan tinggi, pemerintah, industri, dan lembaga di dalam maupun luar negeri.',
   s=[('Institusi', [F('inst', 'Nama institusi'), F('negara', 'Kota / negara'), F('jenis', 'Jenis institusi', 'radio', ['Perguruan tinggi', 'Pemerintah', 'Industri', 'Lembaga / LSM'], True, True)]),
      ('Rencana kerja sama', [F('bidang', 'Bidang', 'checks', ['Pendidikan', 'Penelitian', 'Pengabdian', 'Magang / MBKM', 'Pertukaran'], True, True), F('lingkup', 'Ruang lingkup & kegiatan awal', 'textarea', None, True, True),
                              F('durasi', 'Durasi', 'select', ['1 tahun', '3 tahun', '5 tahun']), F('draft', 'Draf naskah (opsional)', 'file', None, False)]),
      ('Narahubung', [F('cp', 'Nama narahubung'), F('email', 'Email', 'email')])],
   st=['Diajukan', 'Telaah Biro HKA', 'Penyusunan naskah', 'Penandatanganan']),
 'kolaborasi-pkm': dict(t='Ajukan Kolaborasi Pengabdian', u='LPPM', role=None, sla='Dicocokkan dengan pakar dalam 7 hari kerja', i='', s=[], st=['Diajukan', 'Pencocokan pakar', 'Pertemuan awal', 'Program berjalan']),
 'unggah-prestasi': dict(t='Unggah Prestasi Mahasiswa', u='Biro Kemahasiswaan', role=['op-kmhs'], sla='Terbit di website setelah diverifikasi',
   i='Diisi oleh operator Biro Kemahasiswaan. Data juga disinkronkan ke SIMKATMAWA.',
   s=[('Mahasiswa', [F('nim', 'NIM'), F('nama', 'Nama mahasiswa / tim'), F('prodi', 'Program studi', 'select', PRODI)]),
      ('Prestasi', [F('keg', 'Nama kegiatan / lomba', 'text', None, True, True), F('kat', 'Kategori', 'radio', ['Akademik', 'Non-akademik']), F('tingkat', 'Tingkat', 'select', ['Internasional', 'Nasional', 'Provinsi / wilayah', 'Universitas']),
                    F('capai', 'Capaian', 'select', ['Juara 1', 'Juara 2', 'Juara 3', 'Harapan', 'Finalis', 'Peserta']), F('peny', 'Penyelenggara'), F('tgl', 'Tanggal', 'date')]),
      ('Bukti & publikasi', [F('sert', 'Sertifikat (PDF)', 'file'), F('foto', 'Foto kegiatan', 'file', None, False), F('pub', 'Tampilkan di beranda dan berita', 'consent', None, False, True)])],
   st=['Diunggah', 'Diverifikasi', 'Terbit di website', 'Tersinkron SIMKATMAWA']),
 'tracer': dict(t='Tracer Study Alumni', u='Pusat Karier', role=None, sla='Hasil direkap setiap tahun untuk perbaikan kurikulum',
   i='Sepuluh menit dari Anda membantu adik-adik tingkat mendapat kurikulum yang lebih relevan.',
   s=[('Data alumni', [F('nama', 'Nama'), F('nim', 'NIM'), F('prodi', 'Program studi', 'select', PRODI), F('lulus', 'Tahun lulus', 'number')]),
      ('Pekerjaan', [F('status', 'Status saat ini', 'radio', ['Bekerja', 'Wirausaha', 'Studi lanjut', 'Mencari kerja'], True, True), F('tunggu', 'Waktu tunggu kerja pertama', 'select', ['< 3 bulan', '3–6 bulan', '6–12 bulan', '> 12 bulan', 'Belum bekerja']),
                     F('sesuai', 'Kesesuaian bidang kerja', 'radio', ['Sangat sesuai', 'Sesuai', 'Kurang sesuai', 'Tidak sesuai']), F('inst', 'Nama instansi / usaha', 'text', None, False), F('atasan', 'Email atasan untuk survei pengguna (opsional)', 'email', None, False)])],
   st=['Terkirim', 'Divalidasi', 'Direkap', 'Dilaporkan ke prodi']),
 'gabung-alumni': dict(t='Gabung Ikatan Alumni', u='Ikatan Alumni UNIZAR', role=None, sla='Kartu anggota digital dikirim via email',
   i='Terhubung dengan sesama alumni, info lowongan, dan kegiatan almamater.',
   s=[('Data alumni', [F('nama', 'Nama'), F('prodi', 'Program studi', 'select', PRODI), F('angk', 'Angkatan', 'number'), F('kerja', 'Pekerjaan saat ini'), F('kota', 'Kota domisili'),
                       F('email', 'Email', 'email'), F('mentor', 'Saya bersedia menjadi mentor mahasiswa', 'consent', None, False, True)])],
   st=['Terdaftar', 'Diverifikasi', 'Kartu anggota terbit', 'Aktif']),
 'daftar-agenda': dict(t='Daftar Hadir Acara', u='Humas UNIZAR', role=None, sla='E-tiket dan pengingat dikirim ke email',
   i='Tempat terbatas. Pendaftaran ditutup H-1.',
   s=[('Peserta', [F('nama', 'Nama'), F('inst', 'Instansi / prodi'), F('email', 'Email', 'email'), F('hp', 'Nomor WhatsApp', 'tel')])],
   st=['Terdaftar', 'E-tiket dikirim', 'Hadir', 'Sertifikat terbit']),
}

EXT = {
 'siakad': ('SIAKAD UNIZAR', 'KRS, KHS, transkrip, jadwal kuliah, dan pembayaran UKT.', True),
 'elearning': ('E-learning UNIZAR', 'Kelas daring, bahan ajar, tugas, dan forum diskusi.', True),
 'perpus': ('Perpustakaan Digital', 'Katalog, e-book, e-journal, dan cek kemiripan karya ilmiah.', True),
 'pmb': ('Portal PMB UNIZAR', 'Pendaftaran, pembayaran, tes, dan pengumuman mahasiswa baru.', False),
 'simpeg': ('SIMPEG UNIZAR', 'Data dosen dan tendik, usulan kenaikan jabatan akademik.', True),
 'simlppm': ('SIM-LPPM', 'Usulan proposal, laporan kemajuan, dan luaran penelitian & pengabdian.', True),
 'repositori': ('Repositori UNIZAR', 'Artikel, skripsi, tesis, dan laporan berlisensi terbuka.', False),
 'sinta': ('SINTA Kemdiktisaintek', 'Profil kinerja publikasi institusi dan dosen.', False),
 'pddikti': ('PD Dikti', 'Pangkalan data pendidikan tinggi nasional.', False),
 'spada': ('SPADA Indonesia', 'Sistem pembelajaran daring nasional.', False),
 'sierra': ('SIERRA', 'Sistem rekognisi pembelajaran lampau (RPL) nasional.', False),
 'jdih': ('JDIH UNIZAR', 'Statuta, peraturan rektor, keputusan, dan produk hukum universitas.', False),
 'simkatmawa': ('SIMKATMAWA', 'Sistem informasi prestasi mahasiswa nasional.', False),
 'arsip-lama': ('Arsip situs lama', 'Salinan website UNIZAR sebelumnya untuk keperluan arsip.', False),
 'ukt': ('Pembayaran UKT', 'Tagihan dan virtual account di SIAKAD.', True),
 'karier': ('Pusat Karier UNIZAR', 'Lowongan kerja, magang, dan pelatihan kesiapan kerja.', False),
}

def D(k, t, p, cap=None, meta=None, lists=None, a=None, extra=None):
    return {'k': k, 't': t, 'p': p, 'cap': cap, 'meta': meta or [], 'lists': lists or [], 'a': a or [], 'x': extra}

NEWS = [
 ('posyandu', 'Pengabdian', 'Mahasiswa kedokteran dampingi posyandu di tiga desa binaan', 'posyandu di desa binaan Lombok Tengah', '[tanggal]',
  ['Program berkelanjutan bersama puskesmas setempat ini berfokus pada gizi balita dan kesehatan ibu.', '[Isi berita: kegiatan, kutipan dosen pendamping dan kepala desa, capaian, dan rencana lanjutan.]']),
 ('hibah', 'Penelitian', 'Dosen UNIZAR raih hibah riset kolaborasi internasional', 'laboratorium biologi', '[tanggal]',
  ['Tim peneliti lintas fakultas memperoleh hibah kolaborasi bersama mitra luar negeri.', '[Isi berita: judul riset, mitra, durasi, luaran yang ditargetkan.]']),
 ('juara', 'Prestasi', 'Tim mahasiswa juara kompetisi ilmiah tingkat nasional', 'tim debat di panggung', '[tanggal]',
  ['Tim mahasiswa mengalahkan [n] tim dari seluruh Indonesia.', '[Isi berita: nama tim, prodi, pembimbing, perjalanan lomba.]']),
 ('ami', 'Penjaminan Mutu', 'BPM gelar Audit Mutu Internal siklus 2026 di seluruh fakultas', 'pembukaan audit mutu internal', '[tanggal]',
  ['Audit melibatkan [n] auditor internal bersertifikat dan seluruh unit kerja.', '[Isi berita: ruang lingkup audit, jadwal, dan tindak lanjut.]']),
 ('kuliah-umum', 'Akademik', 'Kuliah umum kesehatan wisatawan di destinasi super prioritas', 'kuliah umum di Aula Rektorat', '[tanggal]',
  ['Kuliah umum menghadirkan [narasumber] dan terbuka untuk masyarakat.', '[Isi berita.]']),
 ('expo-umkm', 'Kemahasiswaan', 'Expo UMKM halal mahasiswa FAI dan FEB', 'stan UMKM mahasiswa', '[tanggal]',
  ['[n] usaha mahasiswa memamerkan produk halal yang sudah didampingi sejak awal semester.', '[Isi berita.]']),
]
DETAILS = {}
for key, cat, title, cap, date, paras in NEWS:
    DETAILS['berita-' + key] = D(cat, title, paras, cap, [('Tanggal', date), ('Penulis', 'Humas UNIZAR')],
                                 a=[('Bagikan berita', 'share'), ('Berita lainnya', '#berita')])
AGENDA = [('kuliah-umum', '20 NOV', 'Kuliah umum: Kesehatan wisatawan di destinasi super prioritas', 'Aula Rektorat · 09.00–12.00 WITA · terbuka untuk umum'),
          ('expo', '28 NOV', 'Expo UMKM halal mahasiswa FAI & FEB', 'Halaman kampus · 08.00–16.00 WITA'),
          ('wisuda', '05 DES', 'Wisuda Periode II 2026', 'Gedung Serbaguna · siaran langsung di kanal YouTube UNIZAR')]
for key, d, title, where in AGENDA:
    DETAILS['agenda-' + key] = D('Agenda', title, ['[Deskripsi acara, narasumber, dan susunan acara.]'], 'suasana acara', [('Tanggal', d + ' 2026'), ('Tempat & waktu', where), ('Penyelenggara', '[Unit]')],
                                 lists=[('Susunan acara', ['[Waktu] Pembukaan', '[Waktu] Sesi utama', '[Waktu] Tanya jawab', '[Waktu] Penutupan'])],
                                 a=[('Daftar hadir', 'form:daftar-agenda'), ('Tambahkan ke kalender', 'toast:Mockup: berkas kalender (.ics) akan diunduh.')])
for r in ['Rektor', 'Wakil Rektor I', 'Wakil Rektor II', 'Wakil Rektor III', 'Wakil Rektor IV']:
    DETAILS['pimpinan-' + r.lower().replace(' ', '-')] = D(r, '[Nama dan gelar]', ['[Profil singkat: latar belakang, fokus kepemimpinan, dan program prioritas periode ini.]'], 'potret resmi',
        [('Jabatan', r + ' Universitas Islam Al-Azhar'), ('Bidang', '[Bidang tugas]'), ('Periode', '[tahun]–[tahun]'), ('SK pengangkatan', 'SK [nomor]')],
        lists=[('Unit yang dibina', ['[Unit 1]', '[Unit 2]', '[Unit 3]']), ('Pendidikan', ['[S3 · universitas · tahun]', '[S2 · universitas · tahun]', '[S1 · universitas · tahun]'])],
        a=[('Kirim surat ke pimpinan', 'form:kontak')])
DETAILS['dosen'] = D('Dosen & pakar', '[Nama dosen dan gelar]', ['[Ringkasan kepakaran dalam dua kalimat.]'], 'foto profil',
    [('Jabatan akademik', '[Jabatan]'), ('Program studi', '[Prodi]'), ('Bidang keahlian', '[Bidang 1], [Bidang 2]'), ('Email', '[email]@unizar.ac.id')],
    lists=[('Publikasi terbaru', ['[Judul artikel] · [Jurnal] · 2026', '[Judul artikel] · [Jurnal] · 2025']), ('Mata kuliah', ['[Mata kuliah 1]', '[Mata kuliah 2]']),
           ('Bersedia untuk', ['Narasumber', 'Saksi ahli', 'Kolaborasi riset'])],
    a=[('Profil SINTA', 'ext:sinta'), ('Ajak berkolaborasi', 'form:kolaborasi-pkm')])
FOKUS = [('kesehatan', 'Kesehatan pariwisata & pariwisata kesehatan', 'Lombok adalah destinasi wisata nasional. UNIZAR menyiapkan tenaga kesehatan dan riset yang menjaga wisatawan, pekerja pariwisata, dan warga setempat tetap sehat.'),
         ('syariah', 'Ekonomi syariah & UMKM halal', 'Fakultas Agama Islam dan Ekonomi & Bisnis mendampingi pelaku usaha NTB menuju sertifikasi halal, pembiayaan syariah, dan pasar yang lebih luas.'),
         ('pangan', 'Pertanian lahan kering & ketahanan pangan', 'Riset agribisnis dan agroekoteknologi untuk lahan kering NTB, dari benih adaptif sampai rantai pasok petani.')]
for k, t, p in FOKUS:
    DETAILS['fokus-' + k] = D('Fokus keunggulan', t, [p, '[Usulan: sesuaikan dengan RIP. Jelaskan capaian, mitra, dan target lima tahun.]'], 'kegiatan unggulan',
        [('Fakultas penggerak', '[Fakultas]'), ('Indikator capaian', '[IKU/IKT terkait]')],
        lists=[('Bukti & capaian', ['[Program pendidikan terkait]', '[Riset unggulan terkait]', '[Pengabdian terkait]', '[Rekognisi eksternal]'])],
        a=[('Riset terkait', '#penelitian|riset'), ('UNIZAR dalam Angka', '#profil|angka')])
for k, t, p in [('desa-kesehatan', 'Desa binaan kesehatan', 'Pendampingan posyandu dan kesehatan ibu-anak bersama puskesmas.'), ('umkm-halal', 'Klinik UMKM halal', 'Pendampingan legalitas, sertifikasi halal, dan pemasaran digital.'), ('sekolah-lapang', 'Sekolah lapang petani', 'Teknik budidaya lahan kering dan pascapanen.')]:
    DETAILS['pkm-' + k] = D('Program pengabdian', t, [p, '[Uraian program: latar masalah, kegiatan, dan hasil.]'], 'kegiatan program',
        [('Lokasi', '[Desa, kabupaten]'), ('Mitra', '[Mitra]'), ('Periode', '2025–2027'), ('Ketua tim', '[Nama dosen]')],
        lists=[('Luaran', ['[Modul / produk]', '[Artikel pengabdian]', '[Liputan media]'])], a=[('Ajukan program serupa', 'form:kolaborasi-pkm')])
for k, t, d in [('produk-1', '[Nama produk inovasi kesehatan]', '[Siapa penggunanya dan manfaatnya]'), ('produk-2', '[Nama produk pangan olahan]', '[Mitra UMKM yang memproduksi]'), ('produk-3', '[Nama aplikasi / teknologi]', '[Instansi pengguna]')]:
    DETAILS['hilir-' + k] = D('Produk & hilirisasi', t, [d, '[Riwayat riset, status HKI, dan cara bermitra.]'], 'produk', [('Inventor', '[Nama]'), ('Status HKI', '[Nomor]'), ('Mitra produksi', '[Mitra]')],
        a=[('Ajak bermitra', 'form:ajukan-kerjasama')])
for k, t in [('skills-lab', 'Skills Lab'), ('lab-terpadu', 'Laboratorium terpadu'), ('rs-jejaring', 'Rumah sakit jejaring')]:
    DETAILS['fas-' + k] = D('Fasilitas', t, ['[Deskripsi fasilitas, kapasitas, dan peralatan utama.]'], t, [('Lokasi', '[Gedung]'), ('Jam operasional', '[Jam]'), ('Penanggung jawab', '[Nama]')],
        a=[('Pinjam fasilitas', 'form:peminjaman-ruang')])
DETAILS['prestasi'] = D('Prestasi mahasiswa', '[Judul prestasi]', ['[Kisah singkat prestasi, pembimbing, dan perjalanan lomba.]'], 'tim juara',
    [('Mahasiswa', '[Nama · prodi]'), ('Tingkat', '[Tingkat]'), ('Penyelenggara', '[Penyelenggara]'), ('Tanggal', '[tanggal]')], a=[('Semua prestasi', '#mahasiswa-alumni|prestasi')])
DETAILS['lowongan'] = D('Pusat Karier', 'Lowongan & magang', ['Lowongan dari mitra industri dan instansi, diperbarui setiap pekan.'], None,
    lists=[('Lowongan terbaru', ['[Posisi] · [Perusahaan] · Mataram · tutup [tanggal]', '[Posisi] · [Instansi] · Lombok Tengah · tutup [tanggal]', '[Program magang] · [Mitra industri] · tutup [tanggal]'])],
    a=[('Buka Pusat Karier', 'ext:karier'), ('Isi tracer study', 'form:tracer')])
DETAILS['simulasi-biaya'] = D('PMB 2027', 'Simulasi biaya kuliah', ['Perkiraan biaya per semester. Nominal resmi mengikuti SK Rektor tentang biaya pendidikan.'], None,
    extra='fee', a=[('Daftar di portal PMB', 'ext:pmb'), ('Lihat beasiswa', '#pendidikan|penerimaan')])
DETAILS['privasi'] = D('Kebijakan', 'Kebijakan privasi', ['UNIZAR mengelola data pribadi sesuai Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.',
    'Data yang Anda isi di formulir hanya dipakai untuk memproses layanan yang Anda minta dan disimpan selama diperlukan.', '[Uraian lengkap: data yang dikumpulkan, dasar pemrosesan, hak pemilik data, dan kontak petugas pelindungan data.]'], None)
DETAILS['sangkalan'] = D('Kebijakan', 'Pernyataan sangkalan', ['Informasi di website ini disajikan seakurat mungkin. Dokumen resmi yang berlaku adalah dokumen bertanda tangan yang tersimpan di Pusdatin dan JDIH.', '[Uraian lengkap.]'], None)
DETAILS['aksesibilitas'] = D('Aksesibilitas', 'Pengaturan tampilan', ['Atur tampilan website sesuai kebutuhan Anda. Pengaturan disimpan di perangkat ini.'], None, extra='a11y')

# Home: three differentiation focus areas
DETAILS['fokus-pendidikan'] = D('Fokus keunggulan', 'Misi Pendidikan Berkualitas', [
    'Kurikulum berbasis luaran (OBE) di semua program studi, pembelajaran berbasis kasus dan proyek, serta dosen yang terus meningkatkan kualifikasi dan sertifikasinya.',
    'Mutu dijaga melalui siklus SPMI, akreditasi program studi, dan umpan balik dari mahasiswa serta pengguna lulusan, sehingga setiap lulusan kompeten, beretika, dan siap bersaing.'],
    'mahasiswa berdiskusi di kelas', [('Diampu oleh', 'Wakil Rektor I bersama seluruh fakultas'), ('Selaras dengan', 'SDG 4 · Pendidikan berkualitas')],
    lists=[('Wujud nyata', ['Kurikulum OBE dan RPS berbasis capaian pembelajaran', 'Pembelajaran case method dan team-based project', 'MBKM dan rekognisi pembelajaran lampau (RPL)', 'Tracer study dan survei kepuasan pengguna lulusan'])],
    a=[('Pendidikan di UNIZAR', '#pendidikan'), ('Akreditasi program studi', '#penjaminan-mutu|akreditasi')])
DETAILS['fokus-rahmatan'] = D('Fokus keunggulan', "Kampus Rahmatan lil 'Alamin", [
    'Nilai Islam yang menebar rahmat bagi semua menjadi falsafah penyelenggaraan UNIZAR: kampus yang aman, inklusif, dan berintegritas.',
    'Kampus terbuka bagi siapa pun tanpa memandang suku, agama, asal daerah, maupun disabilitas, dengan tata kelola yang bersih dan kode etik yang ditegakkan.'],
    'sivitas lintas latar belakang di masjid kampus', [('Diampu oleh', 'Rektor dan seluruh pimpinan'), ('Selaras dengan', 'SDG 16 · Kelembagaan yang tangguh')],
    lists=[('Wujud nyata', ['Falsafah KEUNIZARAN dalam tata kelola', 'Kode etik dan Satgas PPKPT untuk kampus aman', 'Layanan disabilitas dan beasiswa afirmasi', 'Kanal pelaporan rahasia (WBS)'])],
    a=[('Integritas & kampus aman', '#tata-kelola|integritas'), ('Layanan mahasiswa', '#mahasiswa-alumni|layanan')])
DETAILS['fokus-pariwisata'] = D('Fokus keunggulan', 'Berwawasan Kepariwisataan Berkelanjutan', [
    'Lombok adalah rumah kami sekaligus destinasi dunia. Setiap program studi menghadirkan mata kuliah berwawasan kepariwisataan, sehingga lulusan dari bidang apa pun siap berkontribusi pada pariwisata yang berkelanjutan.',
    'Riset dan pengabdian diarahkan pada kesehatan wisatawan dan pekerja pariwisata, ekonomi dan wisata halal, desa wisata binaan, serta pelestarian alam dan budaya Sasak.'],
    'pantai dan desa wisata di Lombok', [('Diampu oleh', 'Seluruh fakultas, dikoordinasikan Wakil Rektor I dan III'), ('Selaras dengan', 'SDG 8 · Pekerjaan layak dan pertumbuhan ekonomi')],
    lists=[('Wujud nyata', ['Minimal 2 SKS mata kuliah berwawasan kepariwisataan di setiap prodi', 'Kesehatan pariwisata dan pariwisata kesehatan (Fakultas Kedokteran)', 'Pendampingan UMKM halal dan desa wisata binaan', 'Kemitraan dengan pemerintah daerah dan pelaku industri pariwisata'])],
    a=[('Riset unggulan', '#penelitian|riset'), ('Program pengabdian', '#pengabdian|program')])
