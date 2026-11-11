// Section: pusdatin--daftar
// Originally from 'p-pusdatin' page. Edit this file to change this section.
export function DaftarSection() {
  return (
    <section className="sec" id="pusdatin--daftar" data-t="Daftar dokumen">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Cari dokumen</span>
            <h2>Temukan dokumen resmi</h2>
          </div>
        </div>
        <div data-filter>
          <div className="toolbar">
            <div className="field">
              <label htmlFor="pd-q">Judul, nomor SK, atau unit</label>
              <input id="pd-q" data-filter-text placeholder="mis. Statuta, SPMI, keuangan" />
            </div>
            <div className="chips" data-chips="k" role="group" aria-label="Jenis dokumen">
              <button type="button" data-v="all" aria-pressed="true">
                Semua
              </button>
              <button type="button" data-v="peraturan" aria-pressed="false">
                Peraturan
              </button>
              <button type="button" data-v="rencana" aria-pressed="false">
                Rencana
              </button>
              <button type="button" data-v="pedoman" aria-pressed="false">
                Pedoman
              </button>
              <button type="button" data-v="mutu" aria-pressed="false">
                Mutu
              </button>
              <button type="button" data-v="laporan" aria-pressed="false">
                Laporan
              </button>
            </div>
          </div>
          <p className="muted" style={{ marginBottom: "10px" }}>
            Menampilkan <b data-filter-count>14</b> dokumen
          </p>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Dokumen</th>
                  <th>Jenis</th>
                  <th>Akses</th>
                </tr>
              </thead>
              <tbody>
                <tr data-item data-k="peraturan">
                  <td>
                    <a href="#" data-open="doc:statuta-universitas-islam-al-azhar">
                      <b>Statuta Universitas Islam Al-Azhar</b>
                    </a>
                    <span className="sub">Yayasan · SK [nomor] · v3.0</span>
                  </td>
                  <td>Peraturan</td>
                  <td>
                    <a href="#" data-open="doc:statuta-universitas-islam-al-azhar">
                      Lihat →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="rencana">
                  <td>
                    <a href="#" data-open="doc:rencana-induk-pengembangan-2025-2045">
                      <b>Rencana Induk Pengembangan 2025–2045</b>
                    </a>
                    <span className="sub">Rektor · SK [nomor] · ringkasan publik</span>
                  </td>
                  <td>Rencana</td>
                  <td>
                    <a href="#" data-open="doc:rencana-induk-pengembangan-2025-2045">
                      Ringkasan →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="rencana">
                  <td>
                    <a href="#" data-open="doc:renstra-2025-2029">
                      <b>Renstra 2025–2029</b>
                    </a>
                    <span className="sub">Rektor · SK [nomor] · v1.2</span>
                  </td>
                  <td>Rencana</td>
                  <td>
                    <a href="#" data-open="doc:renstra-2025-2029">
                      Lihat →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="peraturan">
                  <td>
                    <a href="#" data-open="doc:struktur-organisasi-tata-kerja">
                      <b>Struktur Organisasi & Tata Kerja</b>
                    </a>
                    <span className="sub">Rektor · SK [nomor] · v2.0</span>
                  </td>
                  <td>Peraturan</td>
                  <td>
                    <a href="#" data-open="doc:struktur-organisasi-tata-kerja">
                      Lihat →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="pedoman">
                  <td>
                    <a href="#" data-open="doc:kode-etik-dosen-tendik-mahasiswa">
                      <b>Kode Etik Dosen, Tendik & Mahasiswa</b>
                    </a>
                    <span className="sub">Rektor · SK [nomor]</span>
                  </td>
                  <td>Pedoman</td>
                  <td>
                    <a href="#" data-open="doc:kode-etik-dosen-tendik-mahasiswa">
                      Lihat →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="pedoman">
                  <td>
                    <a href="#" data-open="doc:pedoman-pencegahan-penanganan-kekerasan-ppkpt">
                      <b>Pedoman Pencegahan & Penanganan Kekerasan (PPKPT)</b>
                    </a>
                    <span className="sub">Satgas PPKPT · SK [nomor]</span>
                  </td>
                  <td>Pedoman</td>
                  <td>
                    <a href="#" data-open="doc:pedoman-pencegahan-penanganan-kekerasan-ppkpt">
                      Lihat →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="pedoman">
                  <td>
                    <a href="#" data-open="doc:pedoman-kurikulum-obe">
                      <b>Pedoman Kurikulum OBE</b>
                    </a>
                    <span className="sub">WR I · SK [nomor] · v2.1</span>
                  </td>
                  <td>Pedoman</td>
                  <td>
                    <a href="#" data-open="doc:pedoman-kurikulum-obe">
                      Lihat →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="mutu">
                  <td>
                    <a href="#" data-open="doc:kebijakan-manual-standar-spmi">
                      <b>Kebijakan, Manual & Standar SPMI</b>
                    </a>
                    <span className="sub">BPM · SK [nomor] · v4.0</span>
                  </td>
                  <td>Mutu</td>
                  <td>
                    <a href="#" data-open="doc:kebijakan-manual-standar-spmi" className="lock">
                      <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>{" "}
                      Masuk
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="mutu">
                  <td>
                    <a href="#" data-open="doc:ikhtisar-kebijakan-standar-spmi">
                      <b>Ikhtisar Kebijakan & Standar SPMI</b>
                    </a>
                    <span className="sub">BPM · ringkasan 4 halaman</span>
                  </td>
                  <td>Mutu</td>
                  <td>
                    <a href="#" data-open="doc:ikhtisar-kebijakan-standar-spmi">
                      Lihat →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="mutu">
                  <td>
                    <a href="#" data-open="doc:laporan-audit-mutu-internal-2025">
                      <b>Laporan Audit Mutu Internal 2025</b>
                    </a>
                    <span className="sub">BPM · siklus 2025</span>
                  </td>
                  <td>Mutu</td>
                  <td>
                    <a href="#" data-open="doc:laporan-audit-mutu-internal-2025" className="lock">
                      <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>{" "}
                      Masuk
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="laporan">
                  <td>
                    <a href="#" data-open="doc:laporan-tahunan-2025">
                      <b>Laporan Tahunan 2025</b>
                    </a>
                    <span className="sub">Rektor · ringkasan publik</span>
                  </td>
                  <td>Laporan</td>
                  <td>
                    <a href="#" data-open="doc:laporan-tahunan-2025">
                      Ringkasan →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="laporan">
                  <td>
                    <a href="#" data-open="doc:laporan-keuangan-teraudit-2025">
                      <b>Laporan Keuangan Teraudit 2025</b>
                    </a>
                    <span className="sub">KAP [nama] · opini dan ikhtisar</span>
                  </td>
                  <td>Laporan</td>
                  <td>
                    <a href="#" data-open="doc:laporan-keuangan-teraudit-2025">
                      Ringkasan →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="rencana">
                  <td>
                    <a href="#" data-open="doc:renstra-penelitian-pkm-2025-2029">
                      <b>Renstra Penelitian & PkM 2025–2029</b>
                    </a>
                    <span className="sub">LPPM · SK [nomor]</span>
                  </td>
                  <td>Rencana</td>
                  <td>
                    <a href="#" data-open="doc:renstra-penelitian-pkm-2025-2029">
                      Lihat →
                    </a>
                  </td>
                </tr>
                <tr data-item data-k="laporan">
                  <td>
                    <a href="#" data-open="doc:data-pribadi-pegawai">
                      <b>Data Pribadi Pegawai</b>
                    </a>
                    <span className="sub">Biro SDM</span>
                  </td>
                  <td>Laporan</td>
                  <td>
                    <a href="#" data-open="doc:data-pribadi-pegawai" className="lock">
                      <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>{" "}
                      Masuk
                    </a>
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
