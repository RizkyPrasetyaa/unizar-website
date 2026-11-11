"use client";

import { useSearch, useLang } from "./UnizarProviders";

export function UtilBar() {
  const search = useSearch();
  const { lang, setLang } = useLang();

  return (
    <div className="util">
      <div className="wrap">
        <div className="util-l">
          <span id="sess"></span>
        </div>
        <div className="util-r">
          <a href="/pendidikan" data-sec="penerimaan">
            PMB 2027
          </a>
          <a className="hide-s" href="/berita" data-en="News">
            Berita
          </a>
          <a className="hide-s" href="/tata-kelola" data-sec="ppid">
            PPID
          </a>
          <a className="hide-s" href="/pusdatin" data-sec="jdih">
            JDIH
          </a>
          <a
            className="hide-s"
            href="/direktori"
            data-sec="kontak"
            data-en="Contact"
          >
            Kontak
          </a>
          <button
            className="util-search"
            type="button"
            onClick={() => search.open()}
          >
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <span data-en="Search">Cari</span>
          </button>
          <div className="lang" role="group" aria-label="Bahasa">
            <button
              type="button"
              data-l="id"
              aria-pressed={lang === "id" ? "true" : "false"}
              onClick={() => setLang("id")}
            >
              ID
            </button>
            <button
              type="button"
              data-l="en"
              aria-pressed={lang === "en" ? "true" : "false"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
