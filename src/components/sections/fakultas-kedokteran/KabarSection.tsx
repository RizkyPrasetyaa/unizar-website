// Section: fakultas-kedokteran--kabar
// Originally from 'p-fakultas-kedokteran' page. Edit this file to change this section.
export function KabarSection() {
  return (
    <section className="sec" id="fakultas-kedokteran--kabar" data-t="Kabar">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Kabar fakultas</span>
            <h2>Berita terbaru</h2>
          </div>
        </div>
        <div className="grid g3">
          <a className="card" href="#" data-open="detail:berita-kuliah-umum">
            <span className="pill">Akademik</span>
            <h3>[Judul berita fakultas]</h3>
            <p>[Ringkasan satu kalimat]</p>
            <span className="more">Selengkapnya →</span>
          </a>
          <a className="card" href="#" data-open="detail:berita-hibah">
            <span className="pill">Riset</span>
            <h3>[Judul berita fakultas]</h3>
            <p>[Ringkasan satu kalimat]</p>
            <span className="more">Selengkapnya →</span>
          </a>
          <a className="card" href="#" data-open="detail:berita-posyandu">
            <span className="pill">Pengabdian</span>
            <h3>[Judul berita fakultas]</h3>
            <p>[Ringkasan satu kalimat]</p>
            <span className="more">Selengkapnya →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
