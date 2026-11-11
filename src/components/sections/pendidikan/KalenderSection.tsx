// Section: pendidikan--kalender
// Originally from 'p-pendidikan' page. Edit this file to change this section.
export function KalenderSection() {
  return (
    <section className="sec" id="pendidikan--kalender" data-t="Kalender & Panduan">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Kalender</span>
            <h2>Kalender akademik 2026/2027</h2>
          </div>
        </div>
        <div className="ppepp">
          <div style={{ background: "var(--em-700)" }}>
            <b>AGU</b>
            <span>Awal semester ganjil</span>
            <small>Perkuliahan dimulai</small>
          </div>
          <div style={{ background: "var(--em-800)" }}>
            <b>OKT</b>
            <span>Ujian tengah semester</span>
            <small>Semua prodi</small>
          </div>
          <div style={{ background: "#8A6A10" }}>
            <b>DES</b>
            <span>Wisuda periode II</span>
            <small>Aula utama</small>
          </div>
          <div style={{ background: "var(--em-900)" }}>
            <b>JAN</b>
            <span>Ujian akhir semester</span>
            <small>Semester ganjil</small>
          </div>
          <div style={{ background: "var(--em-700)" }}>
            <b>FEB</b>
            <span>Awal semester genap</span>
            <small>Pengisian KRS</small>
          </div>
        </div>
        <div className="btn-row" style={{ marginTop: "18px" }}>
          <a className="btn line" href="#" data-open="doc:kalender-akademik">
            Kalender lengkap (PDF)
          </a>
          <a className="btn line" href="#" data-open="doc:panduan-akademik">
            Panduan akademik
          </a>
        </div>
      </div>
    </section>
  );
}
