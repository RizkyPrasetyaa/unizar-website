"use client";

import { useSearch } from "./UnizarProviders";

export function BottomBar() {
  const search = useSearch();

  return (
    <nav className="bbar" aria-label="Navigasi bawah">
      <a href="/beranda">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
        Beranda
      </a>
      <a href="/layanan">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
        Layanan
      </a>
      <button type="button" onClick={() => search.open()}>
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        Cari
      </button>
      <a href="/masuk">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
        </svg>
        Masuk
      </a>
    </nav>
  );
}
