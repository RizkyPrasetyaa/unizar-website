// Section: mahasiswa-alumni--alumni
// Originally from 'p-mahasiswa-alumni' page. Edit this file to change this section.
export function AlumniSection() {
  return (
    <section className="sec" id="mahasiswa-alumni--alumni" data-t="Alumni & karier">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Alumni</span>
            <h2>Alumni & karier</h2>
            <p>Hasil tracer study digunakan untuk memperbaiki kurikulum setiap tahun.</p>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <b>[n] bln</b>
            <span>Masa tunggu kerja</span>
          </div>
          <div className="stat">
            <b>[n]%</b>
            <span>Bekerja sesuai bidang</span>
          </div>
          <div className="stat">
            <b>[n]%</b>
            <span>Berwirausaha</span>
          </div>
          <div className="stat">
            <b>[n]%</b>
            <span>Kepuasan pengguna lulusan</span>
          </div>
        </div>
        <div className="btn-row" style={{ marginTop: "18px" }}>
          <a className="btn dark" href="#" data-open="form:tracer">
            Isi tracer study
          </a>
          <a className="btn line" href="#" data-open="detail:lowongan">
            Lowongan & magang
          </a>
          <a className="btn line" href="#" data-open="form:gabung-alumni">
            Gabung ikatan alumni
          </a>
          <a className="btn line" href="#" data-open="form:legalisir">
            Legalisir ijazah
          </a>
        </div>
      </div>
    </section>
  );
}
