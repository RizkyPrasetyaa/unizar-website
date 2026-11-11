// Section: berita--agenda
// Originally from 'p-berita' page. Edit this file to change this section.
export function AgendaSection() {
  return (
    <section className="sec" id="berita--agenda" data-t="Agenda">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Agenda</span>
            <h2>Agenda kampus</h2>
          </div>
        </div>
        <ul className="clean agenda">
          <li>
            <span className="d">
              20<small>NOV</small>
            </span>
            <div>
              <a href="#" data-open="detail:agenda-kuliah-umum">
                <b>Kuliah umum: Kesehatan wisatawan di destinasi super prioritas</b>
              </a>
              <div className="muted">Aula Rektorat · 09.00–12.00 WITA · terbuka untuk umum</div>
            </div>
          </li>
          <li>
            <span className="d">
              28<small>NOV</small>
            </span>
            <div>
              <a href="#" data-open="detail:agenda-expo">
                <b>Expo UMKM halal mahasiswa FAI & FEB</b>
              </a>
              <div className="muted">Halaman kampus · 08.00–16.00 WITA</div>
            </div>
          </li>
          <li>
            <span className="d">
              05<small>DES</small>
            </span>
            <div>
              <a href="#" data-open="detail:agenda-wisuda">
                <b>Wisuda Periode II 2026</b>
              </a>
              <div className="muted">Gedung Serbaguna · siaran langsung di kanal YouTube UNIZAR</div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
