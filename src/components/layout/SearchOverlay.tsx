"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearch } from "./UnizarProviders";
import searchIndex from "@/data/search_index.json";

type SearchResult = {
  t: string;
  p: string;
  g: string;
  s?: string;
  k?: string;
  o?: string;
  pop?: boolean;
};

const IDX: SearchResult[] = searchIndex as SearchResult[];

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function SearchOverlay() {
  const { isOpen, open, close } = useSearch();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      // Clear query on open via direct DOM reset to avoid setState-in-effect
      if (inputRef.current) inputRef.current.value = "";
      setQuery("");
      // Slight delay so input is mounted
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return IDX.filter((r) => r.pop);
    return IDX.filter((r) =>
      norm(r.t + " " + (r.k || "")).includes(q),
    ).slice(0, 14);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="overlay"
      id="search"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
        const target = e.target as HTMLElement;
        if (target.closest("[data-close-search]")) close();
      }}
    >
      <div className="search-box" role="dialog" aria-label="Pencarian">
        <div className="in">
          <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <label htmlFor="search-q" className="skip">
            Cari
          </label>
          <input
            id="search-q"
            type="search"
            placeholder="Cari halaman, layanan, dokumen, atau nomor indikator"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
          />
          <button
            className="icon-btn"
            type="button"
            data-close-search
            aria-label="Tutup pencarian"
            onClick={close}
          >
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <ul className="clean" id="search-res">
          {results.length === 0 ? (
            <li className="hint">
              Tidak ada hasil untuk &ldquo;{query.replace(/</g, "&lt;")}
              &rdquo;. Coba kata lain, misalnya &ldquo;beasiswa&rdquo;,
              &ldquo;SPMI&rdquo;, atau &ldquo;Ind. 28&rdquo;.
            </li>
          ) : (
            results.map((r, i) => (
              <li key={i}>
                <a
                  href={r.o ? "#" : `/${r.p}${r.s ? `?sec=${r.s}` : ""}`}
                  data-sec={r.s && !r.o ? r.s : undefined}
                  onClick={(e) => {
                    if (r.o) {
                      e.preventDefault();
                      // External overlays (like login) - just close search
                      close();
                    } else {
                      close();
                    }
                  }}
                >
                  <span>{r.t}</span>
                  <small>{r.g}</small>
                </a>
              </li>
            ))
          )}
        </ul>
        <div className="hint">
          Tips: tekan <b>/</b> untuk membuka pencarian dari halaman mana pun.
        </div>
      </div>
    </div>
  );
}
