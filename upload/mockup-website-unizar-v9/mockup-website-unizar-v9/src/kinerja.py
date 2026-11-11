"""Data registry for the Kinerja & Risiko dashboards (Renstra IKU/IKT, IKU Kementerian, SDGs, Risk Register)."""
import json, re
from pathlib import Path
from renstra_data import IKU, IKT, IKU_GROUPS, IKT_GROUPS, LOWER_BETTER

D = Path(__file__).parent
X = json.loads((D / 'kin_extract.json').read_text())

def bidang(pj):
    s = set()
    if re.search(r'(^|, )Rektor\b', pj): s.add('R')
    if 'Wakil Rektor I, II, III, IV' in pj: s |= {'I', 'II', 'III', 'IV'}
    for m in re.finditer(r'Wakil Rektor (IV|III|II|I)\b', pj): s.add(m.group(1))
    if 'Penjaminan Mutu' in pj: s.add('BPM')
    if 'Dewan Etik' in pj: s.add('ETIK')
    return sorted(s)

def kind(t):
    if t.endswith('%'): return 'pct'
    if t.startswith('1:'): return 'ratio'
    return 'num'

IND = []
for pre, rows, groups in (('IKU', IKU, IKU_GROUPS), ('IKT', IKT, IKT_GROUPS)):
    for n, star, t, pj, a, b in rows:
        g = next(gg for gg in groups if gg[3] <= n <= gg[4])
        i = f'{pre}-{n}'
        IND.append({'id': i, 'jenis': pre, 'n': n, 'src': star, 't': t, 'pj': pj, 'bd': bidang(pj), 'g': g[0],
                    't26': a, 't27': b, 'k': kind(a if a != '0' else b), 'low': i in LOWER_BETTER})
GROUPS = [{'id': g[0], 'p': g[1], 's': g[2]} for g in IKU_GROUPS + IKT_GROUPS]
SRC = {'*': 'Standar UNIZAR (lama)', '**': 'Permendiktisaintek 39/2025 & Standar UNIZAR (pembaruan)',
       '***': 'IKU Wajib Kepmendiktisaintek 358/M/Kep/2026 (IKT: IKU Partisipatif)', '****': 'IKU Pilihan Kepmendiktisaintek 358/M/Kep/2026'}

# ---- IKU Kementerian (Template Arah Kinerja PTS 2026), linked to Renstra where the indicator is the same
# (id, kelompok, sasaran program, kode, uraian, satuan, target 2026, link, chosen, tw1, tw2, catatan)
KM = [
 ('KM-1', 'Wajib', 'Talenta', 'IKU 1', 'Angka Efisiensi Edukasi Perguruan Tinggi (AEE PT) — gabungan jenjang', '%', '90.38', None, True, '13.1', '74.30', 'Rerata jenjang S1 dan profesi'),
 ('KM-1e', 'Wajib', 'Talenta', 'IKU 1 · e', 'AEE PT jenjang S1', '%', '90', 'IKU-5', True, None, None, ''),
 ('KM-1h', 'Wajib', 'Talenta', 'IKU 1 · h', 'AEE PT jenjang profesi/spesialis/subspesialis', '%', '90.76', None, True, '0', '56.95', ''),
 ('KM-1.1', 'Wajib', 'Talenta', 'Sub IKU 1.1', 'Persentase mahasiswa pascasarjana terhadap total mahasiswa', '%', '-', None, True, None, None, 'Diisi bila memiliki jenjang tersebut'),
 ('KM-1.2', 'Wajib', 'Talenta', 'Sub IKU 1.2', 'Persentase mahasiswa internasional', '%', '0.05', 'IKU-34', True, None, None, ''),
 ('KM-2', 'Wajib', 'Talenta', 'IKU 2', 'Persentase lulusan yang langsung bekerja/melanjutkan studi/berwirausaha dalam 1 tahun setelah lulus', '%', '95', 'IKU-9', True, None, None, ''),
 ('KM-3', 'Wajib', 'Talenta', 'IKU 3', 'Persentase mahasiswa S1/D4/D3/D2/D1 berkegiatan atau meraih prestasi di luar program studi', '%', '5.5', 'IKU-35', True, None, None, ''),
 ('KM-5', 'Wajib', 'Inovasi', 'IKU 5', 'Persentase luaran hasil kerja sama antara PT dan start-up/industri/lembaga', '%', '30', 'IKU-106', True, None, None, ''),
 ('KM-7', 'Wajib', 'Kontribusi pada masyarakat', 'IKU 7', 'Persentase keterlibatan PT dalam SDG 1, SDG 4, SDG 17, dan 2 SDGs lain sesuai keunggulan', '%', '70', 'IKU-118', True, None, None, ''),
 ('KM-7.1', 'Wajib', 'Kontribusi pada masyarakat', 'Sub IKU 7.1', 'Peringkat PT pada QS World University Ranking', 'Peringkat', '11000', 'IKU-119', True, None, None, ''),
 ('KM-7.2', 'Wajib', 'Kontribusi pada masyarakat', 'Sub IKU 7.2', 'Peringkat PT pada THE Impact Ranking', 'Peringkat', '11000', 'IKU-120', True, None, None, 'Proses submit'),
 ('KM-9', 'Wajib', 'Tata kelola berintegritas', 'IKU 9', 'Persentase pendapatan non-pendidikan/UKT terhadap total pendapatan', '%', '5', 'IKU-56', True, None, None, ''),
 ('KM-9.1', 'Wajib', 'Tata kelola berintegritas', 'Sub IKU 9.1', 'Persentase pendapatan terhadap total aset', '%', '50.4', 'IKU-57', True, None, None, ''),
 ('KM-9.1.1', 'Wajib', 'Tata kelola berintegritas', 'Sub IKU 9.1.1', 'DIPA/APBN pemerintah terhadap total pendapatan (grant pemerintah/LPDP)', '%', '-', None, True, None, None, ''),
 ('KM-9.1.2', 'Wajib', 'Tata kelola berintegritas', 'Sub IKU 9.1.2', 'Pendapatan industri terhadap total pendapatan', '%', '0.1', 'IKU-58', True, None, None, ''),
 ('KM-9.1.3', 'Wajib', 'Tata kelola berintegritas', 'Sub IKU 9.1.3', 'Dana abadi terhadap total aset', '%', '-', None, True, None, None, ''),
 ('KM-9.2a', 'Wajib', 'Tata kelola berintegritas', 'Sub IKU 9.2 · a', 'Alokasi pendapatan dana masyarakat untuk peningkatan riset', '%', '-', 'IKU-62', True, None, None, ''),
 ('KM-9.2b', 'Wajib', 'Tata kelola berintegritas', 'Sub IKU 9.2 · b', 'Alokasi pendapatan dana masyarakat untuk upskilling dan upgrading dosen', '%', '-', 'IKU-71', True, None, None, ''),
 ('KM-9.2c', 'Wajib', 'Tata kelola berintegritas', 'Sub IKU 9.2 · c', 'Alokasi pendapatan dana masyarakat untuk updating laboratorium', '%', '-', 'IKU-64', True, None, None, ''),
 ('KM-12', 'Wajib', 'Tata kelola berintegritas', 'IKU 12', 'Ketersediaan perencanaan strategis peningkatan kesejahteraan dosen', 'Dokumen', '-', 'IKU-70', True, None, None, ''),
 ('KM-4', 'Pilihan', 'Talenta', 'IKU 4', 'Persentase dosen PT yang mendapatkan rekognisi internasional', '%', '-', None, False, None, None, ''),
 ('KM-4.1', 'Pilihan', 'Talenta', 'Sub IKU 4.1', 'Persentase dosen berpendidikan S3', '%', '15', 'IKU-53', True, None, None, ''),
 ('KM-6', 'Pilihan', 'Inovasi', 'IKU 6', 'Publikasi bereputasi internasional (Scopus/WoS)', '%', '1.40', 'IKU-82', True, None, None, ''),
 ('KM-6.1', 'Pilihan', 'Inovasi', 'Sub IKU 6.1', 'Total publikasi bereputasi internasional', 'Artikel', '-', None, False, None, None, ''),
 ('KM-6.2', 'Pilihan', 'Inovasi', 'Sub IKU 6.2', 'Persentase penelitian berkolaborasi internasional', '%', '-', None, False, None, None, ''),
 ('KM-8', 'Pilihan', 'Kontribusi pada masyarakat', 'IKU 8', 'Persentase SDM PT yang terlibat langsung dalam penyusunan kebijakan (nasional/daerah/industri)', '%', '-', None, False, None, None, ''),
 ('KM-10', 'Pilihan', 'Tata kelola berintegritas', 'IKU 10', 'Jumlah usulan Zona Integritas WBK/WBBM', 'Unit kerja', '-', None, False, None, None, ''),
 ('KM-11a', 'Pilihan', 'Tata kelola berintegritas', 'IKU 11 · a', 'Opini WTP atas laporan keuangan perguruan tinggi', 'Opini', 'WTP', None, False, None, 'WTP', ''),
 ('KM-11b', 'Pilihan', 'Tata kelola berintegritas', 'IKU 11 · b', 'Jumlah laporan pelanggaran integritas akademik', 'Jumlah', '-', None, False, None, None, ''),
 ('KM-11c', 'Pilihan', 'Tata kelola berintegritas', 'IKU 11 · c', 'Pencegahan dan penanganan antikekerasan, antinarkoba, dan antikorupsi', '%', '-', None, False, None, None, ''),
 ('KM-P1', 'Partisipatif', 'Kontribusi pada masyarakat', 'IKU Partisipatif', 'Jumlah desa binaan aktif', 'Angka', '3', 'IKT-59', True, None, None, ''),
]
KMROWS = [{'id': a, 'grp': b, 'sp': c, 'kode': d, 't': e, 'sat': f, 'tg': g, 'link': h, 'pick': i, 'cat': l} for a, b, c, d, e, f, g, h, i, j, k, l in KM]
# Values reported to the ministry in TW I and TW II 2026 (from the attached template) -> seeds
SEED = {
 'KM-1': {'2026-1': '13.1', '2026-2': '74.30'}, 'KM-1h': {'2026-1': '0', '2026-2': '56.95'},
 'IKU-5': {'2026-1': '26.2', '2026-2': '91.64'}, 'IKU-34': {'2026-1': '0.05', '2026-2': '0'},
 'IKU-9': {'2026-1': '94.3'}, 'IKU-35': {'2026-1': '1.82', '2026-2': '16.1'}, 'IKU-106': {'2026-1': '27'},
 'IKU-118': {'2026-1': '70.5', '2026-2': '75'}, 'IKU-56': {'2026-1': '0.06', '2026-2': '0.064'},
 'IKU-57': {'2026-1': '16.9', '2026-2': '22.8'}, 'IKU-58': {'2026-1': '0.06', '2026-2': '0.064'},
 'IKU-53': {'2026-1': '12'}, 'IKU-82': {'2026-1': '1.37'}, 'IKT-59': {'2026-1': '2'}, 'KM-11a': {'2026-2': 'WTP'},
}
SEED_NOTE = {'IKU-5': {'2026-2': 'Pada TW II target telah tercapai (91,64%) melampaui target 90%, didukung peningkatan jumlah mahasiswa lulus tepat waktu serta monitoring dan pendampingan akademik mahasiswa tingkat akhir.'}}

SDG_META = {'SDG 1': ('Tanpa Kemiskinan', 'No Poverty', '#E5243B'), 'SDG 4': ('Pendidikan Berkualitas', 'Quality Education', '#C5192D'),
            'SDG 8': ('Pekerjaan Layak dan Pertumbuhan Ekonomi', 'Decent Work and Economic Growth', '#A21942'),
            'SDG 16': ('Perdamaian, Keadilan, dan Kelembagaan yang Tangguh', 'Peace, Justice and Strong Institutions', '#00689D'),
            'SDG 17': ('Kemitraan untuk Mencapai Tujuan', 'Partnerships for the Goals', '#19486A')}
SDG = [{'sdg': r['sdg'].split('\n')[0], 'n': r['n'], 't': r['t'], 'src': r['src'], 'link': r['link'], 'pj': r['pj']} for r in X['sdg']]

# ---- Risk register
PARENT = {'BAK': 'REK', 'BKM': 'REK', 'BKU': 'REK', 'SDM': 'REK', 'BUM': 'REK', 'LPPM': 'REK', 'HKA': 'REK', 'RSB': 'REK', 'TI': 'REK', 'HUK': 'REK',
          'BPM': 'REK', 'SPI': 'BPM', 'ETIK': 'REK', 'UPTPUS': 'REK', 'UPTBIS': 'REK', 'UPTBHS': 'REK', 'UPTK3': 'REK', 'FAK': 'REK', 'PPS': 'REK', 'PRODI': 'FAK'}
UNIT_BIDANG = {'REK': ['R', 'I', 'II', 'III', 'IV'], 'BAK': ['I'], 'BKM': ['I'], 'UPTBHS': ['I'], 'FAK': ['I'], 'PPS': ['I'], 'PRODI': ['I'],
               'BKU': ['II'], 'SDM': ['II'], 'BUM': ['II'], 'UPTPUS': ['II'], 'LPPM': ['III'], 'HKA': ['III'],
               'RSB': ['IV'], 'TI': ['IV'], 'HUK': ['IV'], 'UPTBIS': ['IV'], 'UPTK3': ['IV'], 'BPM': ['BPM'], 'SPI': ['BPM'], 'ETIK': ['ETIK']}
UNITS = [{'k': k, 'n': n, 'h': h, 'p': PARENT.get(k)} for k, n, h in X['units']]
RISK = {
 'cats': ['Akademik & Kemahasiswaan', 'Sumber Daya Manusia', 'Keuangan', 'Sarana Prasarana & Aset', 'Teknologi Informasi & Keamanan Data', 'Kepatuhan & Hukum',
          'Reputasi & Kehumasan', 'Kerja Sama & Tata Kelola Kelembagaan', 'Bencana & Keberlangsungan Operasional'],
 'hazards': ['Fisik', 'Kimia', 'Biologi', 'Ergonomi', 'Psikososial', 'Mekanik/Listrik'],
 'strat': ['Hindari', 'Mitigasi', 'Transfer', 'Terima'],
 'hier': ['Eliminasi', 'Substitusi', 'Rekayasa Teknik', 'Administratif', 'APD'],
 'K': [('Sangat Jarang', 'Probabilitas < 10%; belum pernah terjadi dalam 5 tahun terakhir'), ('Jarang', 'Probabilitas 10–30%; 1 kali dalam 3–5 tahun terakhir'),
       ('Cukup Sering', 'Probabilitas 30–50%; 1–2 kali dalam 1–2 tahun terakhir'), ('Sering', 'Probabilitas 50–70%; beberapa kali dalam 1 tahun terakhir'),
       ('Hampir Pasti', 'Probabilitas > 70%; terjadi rutin/berulang')],
 'D': [('Sangat Rendah', 'Gangguan minor; kerugian < Rp50 juta; tanpa dampak reputasi'), ('Rendah', 'Gangguan kecil; Rp50–250 juta; keluhan terbatas'),
       ('Sedang', 'Mengganggu sebagian layanan; Rp250 juta–1 miliar; teguran administratif'), ('Tinggi', 'Mengganggu signifikan ≥1 prodi; Rp1–2 miliar; pemberitaan negatif'),
       ('Sangat Tinggi', 'Mengancam keberlangsungan; > Rp2 miliar; krisis reputasi/sanksi berat')],
 'lv': [('Rendah', 1, 4, 'Diterima; dipantau minimal 1 kali per tahun oleh pemilik risiko'), ('Sedang', 5, 9, 'Diterima dengan pengendalian; dipantau tiap triwulan; wajib rencana mitigasi'),
        ('Tinggi', 10, 15, 'Tidak dapat diterima; wajib mitigasi segera; dilaporkan ke pimpinan'), ('Ekstrem', 16, 25, 'Tidak dapat diterima; wajib eskalasi ke Rektor dan mitigasi segera')],
 'cycle': [('Sep', 'Penetapan konteks', 'Sosialisasi pedoman; penyelarasan konteks risiko dengan Renstra'), ('Okt–Nov', 'Identifikasi & analisis', 'Unit mengisi FR-01 dan Bagian A risk register'),
           ('Des', 'Kompilasi & reviu awal', 'Kompilasi register seluruh unit; reviu kecukupan oleh SPI'), ('Jan', 'Perencanaan mitigasi', 'FR-02 dan Bagian B; selaras RKT/RAB'),
           ('Feb', 'Laporan tengah tahun', 'Laporan manajemen risiko tengah tahun kepada Rektor'), ('Mar–Mei', 'Pelaksanaan & pemantauan', 'Mitigasi berjalan; pemantauan triwulanan'),
           ('Jun', 'Reviu SPI', 'Reviu independen tahunan'), ('Jul', 'Pemantauan triwulanan', 'Pemutakhiran status; risiko baru'), ('Agu', 'Evaluasi & laporan akhir', 'Laporan akhir tahun kepada Rektor dan Yayasan')],
}
RISKS = X['risks']

KIN = {'ind': IND, 'groups': GROUPS, 'src': SRC, 'km': KMROWS, 'seed': SEED, 'seednote': SEED_NOTE, 'sdg': SDG, 'sdgmeta': SDG_META,
       'units': UNITS, 'ubd': UNIT_BIDANG, 'risk': RISK, 'risks': RISKS}

if __name__ == '__main__':
    s = json.dumps(KIN, ensure_ascii=False)
    print(len(IND), len(SDG), len(KMROWS), len(RISKS), len(s) // 1024, 'KB')
    print([i['bd'] for i in IND[:3]], IND[106]['bd'], IND[109]['bd'], IND[110]['bd'])
    miss = [r['link'] for r in SDG if r['link'] not in {i['id'] for i in IND}]
    print('sdg links missing', miss)
