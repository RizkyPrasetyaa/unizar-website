// Section: layanan--status
// Originally from 'p-layanan' page. Edit this file to change this section.
export function StatusSection() {
  return (
    <section className="sec" id="layanan--status" data-t="Status sistem">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Status</span>
            <h2>Status sistem informasi</h2>
            <p>Diperbarui otomatis. Gangguan terjadwal diumumkan sehari sebelumnya.</p>
          </div>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Sistem</th>
                <th>Uptime 30 hari</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>SIAKAD</b>
                </td>
                <td>[n]%</td>
                <td>
                  <span className="st-ok">Normal</span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>E-learning</b>
                </td>
                <td>[n]%</td>
                <td>
                  <span className="st-ok">Normal</span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>SSO & email</b>
                </td>
                <td>[n]%</td>
                <td>
                  <span className="st-ok">Normal</span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Perpustakaan digital</b>
                </td>
                <td>[n]%</td>
                <td>
                  <span className="st-up">Pemeliharaan malam ini</span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Portal PMB</b>
                </td>
                <td>[n]%</td>
                <td>
                  <span className="st-ok">Normal</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="slim" style={{ marginTop: "18px" }}>
          <p>Tidak menemukan layanan yang Anda cari?</p>
          <div className="btn-row">
            <a className="btn dark" href="#" data-open="form:helpdesk">
              Buat tiket helpdesk
            </a>
            <a className="btn line" href="#" data-open="track:">
              Lacak permohonan
            </a>
            <a className="btn line" href="#direktori" data-sec="kontak">
              Kontak kami
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
