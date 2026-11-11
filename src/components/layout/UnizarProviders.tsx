"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/* ---------------- Mega Menu Context ---------------- */
type MegaKey =
  | "profil"
  | "fakultas"
  | "direktori"
  | "tata-kelola"
  | "pendidikan"
  | "penelitian"
  | "pengabdian"
  | "penjaminan-mutu";

interface MegaMenuState {
  openMenu: MegaKey | null;
  openMega: (key: MegaKey) => void;
  closeMega: () => void;
}

const MegaMenuContext = createContext<MegaMenuState | null>(null);

export function useMegaMenu() {
  const ctx = useContext(MegaMenuContext);
  if (!ctx) throw new Error("useMegaMenu must be used inside UnizarProviders");
  return ctx;
}

/* ---------------- Drawer Context ---------------- */
interface DrawerState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DrawerContext = createContext<DrawerState | null>(null);

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used inside UnizarProviders");
  return ctx;
}

/* ---------------- Search Context ---------------- */
interface SearchState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SearchContext = createContext<SearchState | null>(null);

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside UnizarProviders");
  return ctx;
}

/* ---------------- Language Context ---------------- */
type Lang = "id" | "en";
interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangState | null>(null);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside UnizarProviders");
  return ctx;
}

/* ---------------- Providers ---------------- */
export function UnizarProviders({ children }: { children: React.ReactNode }) {
  /* Mega menu */
  const [openMenu, setOpenMenu] = useState<MegaKey | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = useCallback((key: MegaKey) => {
    setOpenMenu(key);
  }, []);
  const closeMega = useCallback(() => setOpenMenu(null), []);

  /* Drawer */
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Search */
  const [searchOpen, setSearchOpen] = useState(false);

  /* Language */
  // Initialize from localStorage synchronously to avoid cascading renders.
  // SSR will default to "id"; client picks up stored preference on hydration.
  const [lang, setLangState] = useState<Lang>("id");

  // Load language preference from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("unizar-lang");
      if (stored === "en" || (stored === "id" && stored !== lang)) {
        setLangState(stored as Lang);
      }
    } catch {
      // ignore
    }
  }, []);

  // Apply language: swap textContent of [data-en] elements
  useEffect(() => {
    const applyLang = () => {
      document.documentElement.lang = lang;
      const els = document.querySelectorAll<HTMLElement>("[data-en]");
      els.forEach((el) => {
        if (!el.hasAttribute("data-id")) {
          el.setAttribute("data-id", el.innerHTML);
        }
        const idVal = el.getAttribute("data-id");
        const enVal = el.getAttribute("data-en");
        el.innerHTML = lang === "en" ? (enVal ?? idVal ?? "") : (idVal ?? "");
      });
      const buttons = document.querySelectorAll<HTMLButtonElement>(".lang button");
      buttons.forEach((b) => {
        const bLang = b.getAttribute("data-l");
        b.setAttribute("aria-pressed", String(bLang === lang));
      });
    };
    applyLang();
    try {
      localStorage.setItem("unizar-lang", lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  /* Close overlays on Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setDrawerOpen(false);
        setSearchOpen(false);
      }
      // "/" opens search (when not in input)
      if (e.key === "/") {
        const active = document.activeElement as HTMLElement | null;
        const tag = active?.tagName?.toLowerCase() ?? "";
        if (!["input", "textarea", "select"].includes(tag)) {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Close mega menu when clicking outside header */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!openMenu) return;
      const target = e.target as HTMLElement | null;
      if (target && !target.closest(".hdr")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openMenu]);

  return (
    <MegaMenuContext.Provider value={{ openMenu, openMega, closeMega }}>
      <DrawerContext.Provider
        value={{ isOpen: drawerOpen, open: () => setDrawerOpen(true), close: () => setDrawerOpen(false) }}
      >
        <SearchContext.Provider
          value={{ isOpen: searchOpen, open: () => setSearchOpen(true), close: () => setSearchOpen(false) }}
        >
          <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
        </SearchContext.Provider>
      </DrawerContext.Provider>
    </MegaMenuContext.Provider>
  );
}
