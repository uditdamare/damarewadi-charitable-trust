"use client";

import { useState } from "react";
import { THEMES, DEFAULT_THEME, THEME_STORAGE_KEY, type ThemeId } from "@/lib/themes";

function readCurrentTheme(): ThemeId {
  if (typeof document === "undefined") return DEFAULT_THEME;
  return (document.documentElement.getAttribute("data-theme") as ThemeId | null) ?? DEFAULT_THEME;
}

// Preview-only tool for choosing a brand identity — not meant to ship to end
// visitors once a theme is finalized. Gate behind an env flag or remove
// entirely at that point (see docs/09-ui-components.md).
export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeId>(readCurrentTheme);

  function applyTheme(id: ThemeId) {
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // localStorage unavailable (e.g. private browsing) — theme still
      // applies for this page view, just won't persist across visits.
    }
    setActive(id);
  }

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-border bg-surface p-3 shadow-lg">
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Preview a theme
          </p>
          <ul className="space-y-1">
            {THEMES.map((theme) => (
              <li key={theme.id}>
                <button
                  type="button"
                  onClick={() => applyTheme(theme.id)}
                  aria-pressed={active === theme.id}
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted ${
                    active === theme.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <span className="flex shrink-0 -space-x-1.5">
                    {theme.swatches.map((color) => (
                      <span
                        key={color}
                        className="h-4 w-4 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-text">{theme.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {theme.description}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Preview color themes"
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-text shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <path d="M12 3a9 9 0 1 0 0 18h1.5a1.5 1.5 0 0 0 1.5-1.5c0-.4-.15-.77-.4-1.05a1.5 1.5 0 0 1 1.1-2.5H17a3 3 0 0 0 3-3c0-5-3.5-10-8-10Z" />
          <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="10.5" cy="7" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="15" cy="8" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </button>
    </div>
  );
}
