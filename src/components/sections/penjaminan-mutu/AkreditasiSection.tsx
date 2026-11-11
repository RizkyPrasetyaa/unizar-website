// Section: penjaminan-mutu--akreditasi
// Originally from 'p-penjaminan-mutu' page. Edit this file to change this section.
export function AkreditasiSection() {
  return (
    <section className="sec" id="penjaminan-mutu--akreditasi" data-t="Akreditasi">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Akreditasi</span>
            <h2>Akreditasi institusi & program studi</h2>
            <p>
              Diambil dari BAN-PT, LAM, dan PD Dikti. Setiap baris menampilkan nomor SK, masa berlaku, dan sertifikat.
            </p>
          </div>
        </div>
        <div className="slim" style={{ marginBottom: "18px" }}>
          <p>
            <b style={{ color: "var(--ink)" }}>Akreditasi institusi:</b> [status sesuai SK BAN-PT] · SK [nomor] ·
            berlaku sampai [tanggal]
          </p>
          <a className="btn line" href="#" data-open="doc:sertifikat-institusi">
            Sertifikat{" "}
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <path d="M14 3v6h6" />
            </svg>
          </a>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Program studi</th>
                <th>Jenjang</th>
                <th>Lembaga</th>
                <th>Peringkat</th>
                <th>Berlaku sampai</th>
                <th>Sertifikat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Pendidikan Dokter</b>
                </td>
                <td>S1</td>
                <td>LAM-PTKes</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-pendidikan-dokter-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Profesi Dokter</b>
                </td>
                <td>Profesi</td>
                <td>LAM-PTKes</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-profesi-dokter-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Teknik Sipil</b>
                </td>
                <td>S1</td>
                <td>LAM Teknik</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-teknik-sipil-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Ilmu Komputer</b>
                </td>
                <td>S1</td>
                <td>LAM INFOKOM</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-ilmu-komputer-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Ilmu Hukum</b>
                </td>
                <td>S1</td>
                <td>BAN-PT</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-ilmu-hukum-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Akuntansi</b>
                </td>
                <td>S1</td>
                <td>LAMEMBA</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-akuntansi-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Ekonomi Pembangunan</b>
                </td>
                <td>S1</td>
                <td>LAMEMBA</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-ekonomi-pembangunan-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Agribisnis</b>
                </td>
                <td>S1</td>
                <td>BAN-PT</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-agribisnis-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Agroekoteknologi</b>
                </td>
                <td>S1</td>
                <td>BAN-PT</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-agroekoteknologi-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Biologi</b>
                </td>
                <td>S1</td>
                <td>LAMSAMA</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-biologi-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Ekonomi Syariah</b>
                </td>
                <td>S1</td>
                <td>LAMEMBA</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-ekonomi-syariah-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Manajemen Bisnis Syariah</b>
                </td>
                <td>S1</td>
                <td>LAMEMBA</td>
                <td>[peringkat]</td>
                <td>[tanggal]</td>
                <td>
                  <a href="#" data-open="doc:sertifikat-akreditasi-manajemen-bisnis-syariah-terkini">
                    Lihat →
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="note" style={{ marginTop: "12px" }}>
          Nama lembaga akreditasi pada tabel ini masih contoh. Isi sesuai SK yang berlaku untuk tiap prodi.
        </p>
        <div id="penjaminan-mutu--arsip" style={{ marginTop: "44px", scrollMarginTop: "150px" }}>
          <span className="eyebrow">Arsip</span>
          <h3 style={{ fontSize: "26px", margin: "6px 0 8px" }}>Arsip sertifikat akreditasi</h3>
          <p className="muted" style={{ maxWidth: "64ch" }}>
            Seluruh sertifikat sejak UNIZAR berdiri. Alumni dapat langsung mengunduh sertifikat yang berlaku saat mereka
            lulus.
          </p>
          <form className="card akr-find" data-akr style={{ marginTop: "18px" }}>
            <h3>Cari sertifikat berdasarkan tahun lulus</h3>
            <div className="toolbar" style={{ margin: "0" }}>
              <div className="field">
                <label htmlFor="akr-p">Program studi</label>
                <select id="akr-p">
                  <option>Pendidikan Dokter</option>
                  <option>Profesi Dokter</option>
                  <option>Teknik Sipil</option>
                  <option>Ilmu Komputer</option>
                  <option>Ilmu Hukum</option>
                  <option>Akuntansi</option>
                  <option>Ekonomi Pembangunan</option>
                  <option>Agribisnis</option>
                  <option>Agroekoteknologi</option>
                  <option>Biologi</option>
                  <option>Ekonomi Syariah</option>
                  <option>Manajemen Bisnis Syariah</option>
                </select>
              </div>
              <div className="field" style={{ flex: "0 1 180px" }}>
                <label htmlFor="akr-y">Tahun lulus</label>
                <input id="akr-y" type="number" min="1985" max="2026" value="2015" inputMode="numeric" />
              </div>
              <button className="btn dark" type="submit">
                Tampilkan sertifikat
              </button>
            </div>
            <div className="akr-result" aria-live="polite"></div>
          </form>
          <div style={{ marginTop: "20px" }}>
            <details className="crit">
              <summary>
                <span>
                  <b>Institusi (Perguruan Tinggi)</b>
                  <br />
                  <small>5 dokumen · sejak 1981</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2023–2028{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi institusi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-institusi-perguruan-tinggi-2023-2028">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2018–2023</td>
                      <td>Akreditasi institusi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-institusi-perguruan-tinggi-2018-2023">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2013–2018</td>
                      <td>Akreditasi institusi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-institusi-perguruan-tinggi-2013-2018">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1984–2013</td>
                      <td>Status terdaftar</td>
                      <td>Mendikbud</td>
                      <td>SK 0378/0/1984</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-institusi-perguruan-tinggi-1984-2013">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1981–1984</td>
                      <td>Pendirian</td>
                      <td>Yayasan</td>
                      <td>SK 01/YPLA/1981</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-institusi-perguruan-tinggi-1981-1984">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Pendidikan Dokter</b>
                  <br />
                  <small>5 dokumen · sejak 2004</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2023–2028{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>LAM-PTKes</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-pendidikan-dokter-2023-2028">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2018–2023</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-pendidikan-dokter-2018-2023">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2013–2018</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-pendidikan-dokter-2013-2018">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2008–2013</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-pendidikan-dokter-2008-2013">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2004–2008</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-pendidikan-dokter-2004-2008">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Profesi Dokter</b>
                  <br />
                  <small>4 dokumen · sejak 2010</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2024–2029{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>LAM-PTKes</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-profesi-dokter-2024-2029">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2019–2024</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-profesi-dokter-2019-2024">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2014–2019</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-profesi-dokter-2014-2019">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2010–2014</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-profesi-dokter-2010-2014">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Teknik Sipil</b>
                  <br />
                  <small>7 dokumen · sejak 1981</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2023–2028{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>LAM Teknik</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-teknik-sipil-2023-2028">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2018–2023</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-teknik-sipil-2018-2023">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2013–2018</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-teknik-sipil-2013-2018">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2008–2013</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-teknik-sipil-2008-2013">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2003–2008</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-teknik-sipil-2003-2008">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1998–2003</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-teknik-sipil-1998-2003">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1981–1998</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-teknik-sipil-1981-1998">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Ilmu Komputer</b>
                  <br />
                  <small>2 dokumen · sejak 2022</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2026–2031{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>LAM INFOKOM</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ilmu-komputer-2026-2031">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2022–2026</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ilmu-komputer-2022-2026">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Ilmu Hukum</b>
                  <br />
                  <small>7 dokumen · sejak 1981</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2023–2028{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ilmu-hukum-2023-2028">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2018–2023</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ilmu-hukum-2018-2023">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2013–2018</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ilmu-hukum-2013-2018">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2008–2013</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ilmu-hukum-2008-2013">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2003–2008</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ilmu-hukum-2003-2008">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1998–2003</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ilmu-hukum-1998-2003">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1981–1998</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ilmu-hukum-1981-1998">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Akuntansi</b>
                  <br />
                  <small>3 dokumen · sejak 2016</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2025–2030{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>LAMEMBA</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-akuntansi-2025-2030">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2020–2025</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-akuntansi-2020-2025">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2016–2020</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-akuntansi-2016-2020">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Ekonomi Pembangunan</b>
                  <br />
                  <small>7 dokumen · sejak 1981</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2023–2028{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>LAMEMBA</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ekonomi-pembangunan-2023-2028">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2018–2023</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ekonomi-pembangunan-2018-2023">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2013–2018</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ekonomi-pembangunan-2013-2018">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2008–2013</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ekonomi-pembangunan-2008-2013">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2003–2008</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ekonomi-pembangunan-2003-2008">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1998–2003</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ekonomi-pembangunan-1998-2003">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1981–1998</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ekonomi-pembangunan-1981-1998">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Agribisnis</b>
                  <br />
                  <small>7 dokumen · sejak 1981</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2023–2028{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-agribisnis-2023-2028">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2018–2023</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-agribisnis-2018-2023">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2013–2018</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-agribisnis-2013-2018">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2008–2013</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-agribisnis-2008-2013">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2003–2008</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-agribisnis-2003-2008">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1998–2003</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-agribisnis-1998-2003">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1981–1998</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-agribisnis-1981-1998">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Agroekoteknologi</b>
                  <br />
                  <small>2 dokumen · sejak 2020</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2024–2029{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-agroekoteknologi-2024-2029">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2020–2024</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-agroekoteknologi-2020-2024">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Biologi</b>
                  <br />
                  <small>7 dokumen · sejak 1992</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2023–2028{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Akreditasi</td>
                      <td>LAMSAMA</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-biologi-2023-2028">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2018–2023</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-biologi-2018-2023">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2013–2018</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-biologi-2013-2018">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2008–2013</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-biologi-2008-2013">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2003–2008</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-biologi-2003-2008">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1998–2003</td>
                      <td>Akreditasi</td>
                      <td>BAN-PT</td>
                      <td>[peringkat]</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-biologi-1998-2003">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1992–1998</td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-biologi-1992-1998">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Ekonomi Syariah</b>
                  <br />
                  <small>1 dokumen · sejak 2023</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2023–2030{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-ekonomi-syariah-2023-2030">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
            <details className="crit">
              <summary>
                <span>
                  <b>Manajemen Bisnis Syariah</b>
                  <br />
                  <small>1 dokumen · sejak 2023</small>
                </span>
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="tbl-wrap" style={{ border: "0", borderTop: "1px solid var(--line)", borderRadius: "0" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Periode</th>
                      <th>Jenis</th>
                      <th>Lembaga</th>
                      <th>Status</th>
                      <th>Nomor SK</th>
                      <th>Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        2023–2030{" "}
                        <span className="pill" style={{ fontSize: "10.5px" }}>
                          Terkini
                        </span>
                      </td>
                      <td>Izin / status terdaftar</td>
                      <td>Kementerian</td>
                      <td>SK izin</td>
                      <td>SK [nomor]</td>
                      <td>
                        <a href="#" data-open="doc:sertifikat-manajemen-bisnis-syariah-2023-2030">
                          Lihat →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
          </div>
          <p className="note" style={{ marginTop: "12px" }}>
            Periode pada arsip ini masih contoh untuk memperlihatkan pola. BAN-PT berdiri tahun 1994, sehingga dokumen
            sebelum masa itu berupa SK pendirian atau status terdaftar.
          </p>
        </div>
      </div>
    </section>
  );
}
