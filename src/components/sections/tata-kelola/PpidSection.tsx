// Section: tata-kelola--ppid
// Originally from 'p-tata-kelola' page. Edit this file to change this section.
export function PpidSection() {
  return (
    <section className="sec" id="tata-kelola--ppid" data-t="Transparansi & PPID">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Informasi publik</span>
            <h2>Transparansi & PPID</h2>
            <p>Kami terbuka secara bawaan dan hanya mengecualikan informasi yang dilindungi peraturan.</p>
          </div>
        </div>
        <div className="split">
          <div data-tabs>
            <div className="tabs-l" role="tablist" aria-label="Kategori informasi">
              <button type="button" role="tab" aria-selected="true">
                Berkala
              </button>
              <button type="button" role="tab" aria-selected="false">
                Serta-merta
              </button>
              <button type="button" role="tab" aria-selected="false">
                Setiap saat
              </button>
              <button type="button" role="tab" aria-selected="false">
                Dikecualikan
              </button>
            </div>
            <div role="tabpanel" style={{ marginTop: "12px" }}>
              <ul className="clean">
                <li className="doc">
                  <div>
                    <b>Profil, struktur organisasi, dan pimpinan</b>
                    <small>Diperbarui setiap 6 bulan</small>
                  </div>
                  <a href="#" data-open="doc:profil-struktur-organisasi-dan-pimpinan">
                    Lihat dokumen →
                  </a>
                </li>
                <li className="doc">
                  <div>
                    <b>Laporan tahunan dan ikhtisar keuangan</b>
                    <small>Tiap tahun</small>
                  </div>
                  <a href="#" data-open="doc:laporan-tahunan-dan-ikhtisar-keuangan">
                    Lihat ringkasan →
                  </a>
                </li>
                <li className="doc">
                  <div>
                    <b>Laporan layanan informasi publik</b>
                    <small>Tiap tahun</small>
                  </div>
                  <a href="#" data-open="doc:laporan-layanan-informasi-publik">
                    Lihat dokumen →
                  </a>
                </li>
              </ul>
            </div>
            <div role="tabpanel" hidden style={{ marginTop: "12px" }}>
              <ul className="clean">
                <li className="doc">
                  <div>
                    <b>Peringatan dini bencana & prosedur evakuasi</b>
                    <small>Diumumkan tanpa penundaan</small>
                  </div>
                  <a href="#" data-open="doc:peringatan-dini-bencana-prosedur-evakuasi">
                    Lihat dokumen →
                  </a>
                </li>
                <li className="doc">
                  <div>
                    <b>Gangguan layanan sistem penting</b>
                    <small>Status sistem</small>
                  </div>
                  <a href="#" data-open="doc:gangguan-layanan-sistem-penting">
                    Lihat dokumen →
                  </a>
                </li>
              </ul>
            </div>
            <div role="tabpanel" hidden style={{ marginTop: "12px" }}>
              <ul className="clean">
                <li className="doc">
                  <div>
                    <b>Statuta, peraturan, dan keputusan pimpinan</b>
                    <small>Pusdatin</small>
                  </div>
                  <a href="#" data-open="doc:statuta-peraturan-dan-keputusan-pimpinan">
                    Lihat dokumen →
                  </a>
                </li>
                <li className="doc">
                  <div>
                    <b>Daftar kerja sama</b>
                    <small>Kerjasama</small>
                  </div>
                  <a href="#" data-open="doc:daftar-kerja-sama">
                    Lihat dokumen →
                  </a>
                </li>
                <li className="doc">
                  <div>
                    <b>Kebijakan penerimaan dan biaya pendidikan</b>
                    <small>Pendidikan</small>
                  </div>
                  <a href="#" data-open="doc:kebijakan-penerimaan-dan-biaya-pendidikan">
                    Lihat dokumen →
                  </a>
                </li>
              </ul>
            </div>
            <div role="tabpanel" hidden style={{ marginTop: "12px" }}>
              <ul className="clean">
                <li className="doc">
                  <div>
                    <b>Data pribadi sivitas</b>
                    <small>Dilindungi UU Pelindungan Data Pribadi</small>
                  </div>
                  <a href="#" data-open="doc:data-pribadi-sivitas" className="lock">
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>{" "}
                    Masuk untuk membuka
                  </a>
                </li>
                <li className="doc">
                  <div>
                    <b>Laporan audit rinci</b>
                    <small>Untuk pimpinan dan asesor</small>
                  </div>
                  <a href="#" data-open="doc:laporan-audit-rinci" className="lock">
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>{" "}
                    Masuk untuk membuka
                  </a>
                </li>
                <li className="doc">
                  <div>
                    <b>Identitas pelapor</b>
                    <small>Dirahasiakan</small>
                  </div>
                  <a href="#" data-open="doc:identitas-pelapor" className="lock">
                    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>{" "}
                    Masuk untuk membuka
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <h3>Ajukan permohonan informasi</h3>
            <ol className="clean steps" style={{ gridTemplateColumns: "minmax(0,1fr)", gap: "8px" }}>
              <li style={{ padding: "12px 14px" }}>
                <b>Ajukan</b>
                <p>Isi formulir daring</p>
              </li>
              <li style={{ padding: "12px 14px" }}>
                <b>Registrasi</b>
                <p>Nomor permohonan dikirim ke email</p>
              </li>
              <li style={{ padding: "12px 14px" }}>
                <b>Jawaban</b>
                <p>Paling lambat 10 hari kerja</p>
              </li>
              <li style={{ padding: "12px 14px" }}>
                <b>Keberatan</b>
                <p>Bila tidak puas, ajukan ke atasan PPID</p>
              </li>
            </ol>
            <div className="btn-row">
              <a className="btn dark" href="#" data-open="form:ppid-permohonan">
                Ajukan permohonan
              </a>
              <a className="btn line" href="#" data-open="track:">
                Lacak permohonan
              </a>
              <a className="btn line" href="#" data-open="form:ppid-keberatan">
                Ajukan keberatan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
