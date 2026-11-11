// Section: publikasi-inovasi--hki
// Originally from 'p-publikasi-inovasi' page. Edit this file to change this section.
export function HkiSection() {
  return (
    <section className="sec" id="publikasi-inovasi--hki" data-t="Kekayaan Intelektual">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">HKI</span>
            <h2>Kekayaan intelektual</h2>
            <p>
              Paten, hak cipta, dan desain industri hasil riset dosen dan mahasiswa, terhubung dengan pangkalan data
              PDKI.
            </p>
          </div>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Judul</th>
                <th>Jenis</th>
                <th>Inventor / pencipta</th>
                <th>Nomor</th>
                <th>Tahun</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>[Judul paten sederhana]</b>
                </td>
                <td>Paten sederhana</td>
                <td>[Inventor]</td>
                <td>[Nomor]</td>
                <td>2026</td>
              </tr>
              <tr>
                <td>
                  <b>[Judul modul ajar]</b>
                </td>
                <td>Hak cipta</td>
                <td>[Pencipta]</td>
                <td>[Nomor]</td>
                <td>2025</td>
              </tr>
              <tr>
                <td>
                  <b>[Judul aplikasi]</b>
                </td>
                <td>Hak cipta (program komputer)</td>
                <td>[Pencipta]</td>
                <td>[Nomor]</td>
                <td>2025</td>
              </tr>
              <tr>
                <td>
                  <b>[Judul desain alat]</b>
                </td>
                <td>Desain industri</td>
                <td>[Pendesain]</td>
                <td>[Nomor]</td>
                <td>2024</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="btn-row" style={{ marginTop: "16px" }}>
          <a className="btn dark" href="#" data-open="form:hki-ajukan">
            Ajukan HKI
          </a>
          <a className="btn line" href="#" data-open="doc:panduan-hki">
            Panduan pengajuan HKI
          </a>
        </div>
      </div>
    </section>
  );
}
