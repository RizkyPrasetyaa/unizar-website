"use client";

import { useEffect, useState } from "react";

export function MockupPill() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("unizar-pill") === "off") setHidden(true);
    } catch {
      // ignore
    }
  }, []);

  if (hidden) return null;

  return (
    <div className="mock-pill" role="note">
      Mockup UI/UX · teks &amp; angka ilustratif{" "}
      <button
        type="button"
        aria-label="Sembunyikan catatan"
        onClick={() => {
          setHidden(true);
          try {
            localStorage.setItem("unizar-pill", "off");
          } catch {
            // ignore
          }
        }}
      >
        ×
      </button>
    </div>
  );
}
