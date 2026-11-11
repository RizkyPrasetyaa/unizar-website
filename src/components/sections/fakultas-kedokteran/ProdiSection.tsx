// Section: fakultas-kedokteran--prodi
// Originally from 'p-fakultas-kedokteran' page. Edit this file to change this section.
export function ProdiSection() {
  return (
    <section className="sec" id="fakultas-kedokteran--prodi" data-t="Program studi">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Program studi</span>
            <h2>Dua tahap menjadi dokter</h2>
          </div>
        </div>
        <div className="grid g2">
          <a className="card" href="#prodi-pendidikan-dokter">
            <span className="pill">Sarjana</span>
            <h3>Pendidikan Dokter (S1)</h3>
            <p>Tahap akademik 7 semester, berbasis blok dan OBE. Gelar S.Ked.</p>
            <span className="more">Selengkapnya →</span>
          </a>
          <a className="card" href="#prodi-pendidikan-dokter">
            <span className="pill">Profesi</span>
            <h3>Profesi Dokter</h3>
            <p>Kepaniteraan klinik di rumah sakit pendidikan dan jejaring. Gelar dr.</p>
            <span className="more">Selengkapnya →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
