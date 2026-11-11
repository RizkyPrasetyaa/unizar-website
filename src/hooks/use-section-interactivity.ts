"use client";

import { useEffect, useRef } from "react";

/**
 * Hook that wires up the interactive behaviors the original app.js did:
 * - Sub-nav: build buttons for each .sec[data-t] inside a .page, with
 *   smooth scroll on click and IntersectionObserver to highlight the
 *   active section.
 * - Chips + text filters: any [data-filter] box gets filter logic.
 * - Tabs: [data-tabs] groups toggle aria-selected and panel visibility.
 * - Mock forms: form[data-mock] shows the data-mock message on submit.
 * - Internal/public view toggle on the evidence map.
 *
 * The hook attaches a single delegated click handler and runs setup
 * once on mount, then again whenever the URL changes (so it re-runs
 * after Next.js route transitions bring in new content).
 */
export function useSectionInteractivity() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current ?? document.querySelector("main");
    if (!root) return;

    /* ---- Sub-nav builder ---- */
    const buildSubnav = (page: Element) => {
      const bar = page.querySelector(".subnav .wrap");
      if (!bar) return;
      const secs = Array.from(page.querySelectorAll<HTMLElement>(".sec[data-t]"));
      if (!secs.length) return;
      bar.innerHTML = "";
      secs.forEach((s, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = s.getAttribute("data-t") ?? "";
        if (i === 0) b.classList.add("on");
        b.addEventListener("click", () => {
          s.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        bar.appendChild(b);
      });

      // IntersectionObserver to highlight active section
      if (!("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const idx = secs.indexOf(en.target as HTMLElement);
            const btns = Array.from(bar.querySelectorAll("button"));
            btns.forEach((bb, j) => bb.classList.toggle("on", j === idx));
            const on = btns[idx];
            if (on) bar.scrollTo({ left: (on as HTMLElement).offsetLeft - 20, behavior: "smooth" });
          });
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      secs.forEach((s) => io.observe(s));
      // Store on element so we can disconnect later
      (bar as any).__io = io;
    };

    /* ---- Filters (chips + text) ---- */
    const norm = (s: string) =>
      s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const wireFilter = (box: HTMLElement) => {
      if ((box as any).__wired) return;
      (box as any).__wired = true;
      const items = Array.from(box.querySelectorAll<HTMLElement>("[data-item]"));
      const state: Record<string, string> = {};
      const txt = box.querySelector<HTMLInputElement>("[data-filter-text]");
      const count = box.querySelector<HTMLElement>("[data-filter-count]");
      const apply = () => {
        const q = txt ? norm(txt.value.trim()) : "";
        let n = 0;
        items.forEach((it) => {
          let ok = Object.keys(state).every(
            (k) =>
              state[k] === "all" ||
              (" " + (it.getAttribute("data-" + k) || "") + " ").indexOf(
                " " + state[k] + " ",
              ) > -1,
          );
          if (ok && q) ok = norm(it.textContent || "").indexOf(q) > -1;
          it.hidden = !ok;
          if (ok) n++;
        });
        if (count) count.textContent = String(n);
      };
      box.querySelectorAll<HTMLElement>("[data-chips]").forEach((grp) => {
        const key = grp.getAttribute("data-chips") || "";
        state[key] = "all";
        grp.querySelectorAll("button").forEach((b) => {
          b.addEventListener("click", () => {
            state[key] = b.getAttribute("data-v") || "all";
            grp.querySelectorAll("button").forEach((x) =>
              x.setAttribute("aria-pressed", String(x === b)),
            );
            apply();
          });
        });
      });
      if (txt) txt.addEventListener("input", apply);
      apply();
    };

    /* ---- Tabs ---- */
    const wireTabs = (box: HTMLElement) => {
      if ((box as any).__wired) return;
      (box as any).__wired = true;
      const btns = Array.from(box.querySelectorAll<HTMLElement>('[role="tab"]'));
      const panes = Array.from(
        box.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
      );
      btns.forEach((b, i) => {
        b.addEventListener("click", () => {
          btns.forEach((x, j) =>
            x.setAttribute("aria-selected", String(i === j)),
          );
          panes.forEach((p, j) => (p.hidden = i !== j));
        });
      });
    };

    /* ---- Mock forms ---- */
    const wireMockForm = (f: HTMLFormElement) => {
      if ((f as any).__wired) return;
      (f as any).__wired = true;
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const m = f.querySelector(".form-msg");
        if (m) m.textContent = f.getAttribute("data-mock") || "";
      });
    };

    /* ---- Evidence map view toggle ---- */
    const wireViewToggle = () => {
      document.querySelectorAll<HTMLElement>("[data-view]").forEach((b) => {
        if ((b as any).__wired) return;
        (b as any).__wired = true;
        b.addEventListener("click", () => {
          document.body.classList.toggle(
            "internal",
            b.getAttribute("data-view") === "internal",
          );
          document.querySelectorAll("[data-view]").forEach((x) =>
            x.setAttribute("aria-pressed", String(x === b)),
          );
        });
      });
    };

    /* ---- Wire everything inside <main> ---- */
    const wireAll = () => {
      const page = root.querySelector(".page");
      if (page) buildSubnav(page);
      root.querySelectorAll<HTMLElement>("[data-filter]").forEach(wireFilter);
      root.querySelectorAll<HTMLElement>("[data-tabs]").forEach(wireTabs);
      root.querySelectorAll<HTMLFormElement>("form[data-mock]").forEach(
        wireMockForm,
      );
      wireViewToggle();
    };

    wireAll();

    // Re-wire on URL change (Next.js client navigation)
    const onUrlChange = () => wireAll();
    window.addEventListener("popstate", onUrlChange);
    // Also observe DOM mutations to catch async-rendered content
    const mo = new MutationObserver(() => wireAll());
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("popstate", onUrlChange);
      mo.disconnect();
    };
  }, []);

  return rootRef;
}
