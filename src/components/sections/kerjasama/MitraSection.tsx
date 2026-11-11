// Section: kerjasama--mitra
// Originally from 'p-kerjasama' page. Edit this file to change this section.
export function MitraSection() {
  return (
    <section className="sec" id="kerjasama--mitra" data-t="Mitra">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Mitra</span>
            <h2>Mitra kerja sama</h2>
          </div>
        </div>
        <div data-filter>
          <div className="chips" data-chips="s" role="group" aria-label="Cakupan" style={{ marginBottom: "16px" }}>
            <button type="button" data-v="all" aria-pressed="true">
              Semua
            </button>
            <button type="button" data-v="dn" aria-pressed="false">
              Dalam negeri
            </button>
            <button type="button" data-v="ln" aria-pressed="false">
              Luar negeri
            </button>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Mitra</th>
                  <th>Bidang</th>
                  <th>Kegiatan</th>
                  <th>Realisasi</th>
                </tr>
              </thead>
              <tbody>
                <tr data-item data-s="ln">
                  <td>
                    <a href="#" data-open="detail:mitra-0">
                      <b>[Universitas mitra, Malaysia]</b>
                    </a>
                  </td>
                  <td>Pendidikan</td>
                  <td>Pertukaran mahasiswa</td>
                  <td>
                    <span className="st-up">Berjalan</span>
                  </td>
                </tr>
                <tr data-item data-s="ln">
                  <td>
                    <a href="#" data-open="detail:mitra-1">
                      <b>[Universitas mitra, Jepang]</b>
                    </a>
                  </td>
                  <td>Penelitian</td>
                  <td>Riset bersama</td>
                  <td>
                    <span className="st-up">Berjalan</span>
                  </td>
                </tr>
                <tr data-item data-s="dn">
                  <td>
                    <a href="#" data-open="detail:mitra-2">
                      <b>[Rumah sakit jejaring]</b>
                    </a>
                  </td>
                  <td>Pendidikan</td>
                  <td>Kepaniteraan klinik</td>
                  <td>
                    <span className="st-ok">Terealisasi</span>
                  </td>
                </tr>
                <tr data-item data-s="dn">
                  <td>
                    <a href="#" data-open="detail:mitra-3">
                      <b>[Pemerintah Provinsi NTB]</b>
                    </a>
                  </td>
                  <td>Pengabdian</td>
                  <td>Desa binaan</td>
                  <td>
                    <span className="st-ok">Terealisasi</span>
                  </td>
                </tr>
                <tr data-item data-s="dn">
                  <td>
                    <a href="#" data-open="detail:mitra-4">
                      <b>[Perusahaan mitra]</b>
                    </a>
                  </td>
                  <td>Magang</td>
                  <td>Magang MBKM</td>
                  <td>
                    <span className="st-up">Berjalan</span>
                  </td>
                </tr>
                <tr data-item data-s="dn">
                  <td>
                    <a href="#" data-open="detail:mitra-5">
                      <b>[Perguruan tinggi nasional]</b>
                    </a>
                  </td>
                  <td>Penelitian</td>
                  <td>Hibah kolaborasi</td>
                  <td>
                    <span className="st-ok">Terealisasi</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
