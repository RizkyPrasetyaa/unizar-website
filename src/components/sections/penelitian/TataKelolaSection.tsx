// Section: penelitian--tata-kelola
// Originally from 'p-penelitian' page. Edit this file to change this section.
export function TataKelolaSection() {
  return (
    <section className="sec" id="penelitian--tata-kelola" data-t="Tata Kelola Riset">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Tata kelola</span>
            <h2>Alur penelitian di UNIZAR</h2>
          </div>
        </div>
        <ol className="clean steps">
          <li>
            <b>Usulan</b>
            <p>Unggah proposal sesuai tema peta jalan</p>
          </li>
          <li>
            <b>Telaah</b>
            <p>Penilaian oleh reviewer yang ditetapkan</p>
          </li>
          <li>
            <b>Etik & kontrak</b>
            <p>Kelaikan etik dan surat penugasan</p>
          </li>
          <li>
            <b>Pelaksanaan & monev</b>
            <p>Catatan kemajuan dan seminar hasil</p>
          </li>
          <li>
            <b>Luaran</b>
            <p>Publikasi terbuka, HKI, repositori</p>
          </li>
        </ol>
        <div className="btn-row" style={{ marginTop: "18px" }}>
          <a className="btn line" href="#" data-open="doc:pedoman-penelitian">
            Pedoman penelitian
          </a>
          <a className="btn line" href="#" data-open="doc:kode-etik-penelitian">
            Kode etik penelitian
          </a>
        </div>
      </div>
    </section>
  );
}
