// Section: direktori--kontak
// Originally from 'p-direktori' page. Edit this file to change this section.
export function KontakSection() {
  return (
    <section className="sec" id="direktori--kontak" data-t="Kontak & Peta">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Kontak</span>
            <h2>Kontak & peta kampus</h2>
          </div>
        </div>
        <div className="split">
          <div className="card">
            <h3>Universitas Islam Al-Azhar</h3>
            <p>
              Jl. Unizar No. 20, Turida, Sandubaya
              <br />
              Mataram, Nusa Tenggara Barat 83232
            </p>
            <p>
              <b style={{ color: "var(--ink)" }}>Telepon</b> (0370) 6175555
              <br />
              <b style={{ color: "var(--ink)" }}>Email</b> humas@unizar.ac.id
            </p>
            <p>
              <b style={{ color: "var(--ink)" }}>Jam layanan</b> Senin–Jumat, 08.00–16.00 WITA
            </p>
            <div className="btn-row">
              <button className="btn dark" type="button" data-open="form:kontak">
                Kirim pesan
              </button>
              <button className="btn line" type="button" data-open="detail:aksesibilitas">
                Pengaturan tampilan
              </button>
            </div>
          </div>
          <div
            className="ph sky"
            data-cap="Foto: denah kampus interaktif (tautan ke peta)"
            role="img"
            aria-label="Tempat foto: denah kampus interaktif (tautan ke peta)"
            style={{ height: "260px" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
