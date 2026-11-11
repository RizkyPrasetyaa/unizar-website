// Section: pengabdian--kepakaran
// Originally from 'p-pengabdian' page. Edit this file to change this section.
export function KepakaranSection() {
  return (
    <section className="sec" id="pengabdian--kepakaran" data-t="Kepakaran & Kolaborasi">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Kolaborasi</span>
            <h2>Ajukan kolaborasi dengan pakar UNIZAR</h2>
            <p>
              Untuk pemerintah desa dan daerah, sekolah, komunitas, UMKM, dan industri. Permintaan dicocokkan dengan
              pakar dalam 7 hari kerja.
            </p>
          </div>
        </div>
        <form
          className="card"
          data-inline-form="kolaborasi-pkm"
          style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "14px" }}
        >
          <div className="field">
            <label htmlFor="k-org">Nama lembaga / komunitas</label>
            <input id="k-org" required />
          </div>
          <div className="field">
            <label htmlFor="k-kab">Kabupaten / kota</label>
            <select id="k-kab">
              <option>Pilih…</option>
              <option>Kota Mataram</option>
              <option>Lombok Barat</option>
              <option>Lombok Tengah</option>
              <option>Lombok Timur</option>
              <option>Lombok Utara</option>
              <option>Sumbawa</option>
            </select>
          </div>
          <div className="field" style={{ gridColumn: "1/-1" }}>
            <label htmlFor="k-need">Kebutuhan atau permasalahan</label>
            <textarea id="k-need" rows={3} required></textarea>
          </div>
          <div className="field">
            <label htmlFor="k-cp">Narahubung</label>
            <input id="k-cp" placeholder="email atau WhatsApp" />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn dark" type="submit">
              Kirim permintaan
            </button>
            <span className="form-msg" aria-live="polite"></span>
          </div>
        </form>
      </div>
    </section>
  );
}
