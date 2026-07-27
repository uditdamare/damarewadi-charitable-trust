"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_ITEMS = [
  "home",
  "about",
  "committee",
  "initiatives",
  "events",
  "gallery",
  "documents",
  "news",
  "contact",
] as const;

const HREFS: Record<(typeof NAV_ITEMS)[number], string> = {
  home: "/",
  about: "/about",
  committee: "/committee",
  initiatives: "/initiatives",
  events: "/events",
  gallery: "/gallery",
  documents: "/documents",
  news: "/news",
  contact: "/contact",
};

export function Header() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {tMeta("siteName")}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={HREFS[item]}
              className="text-sm font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
            >
              {t(item)}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-md border border-black/10 p-2 dark:border-white/20"
          >
            <span className="sr-only">Menu</span>
            <div className="flex h-4 w-5 flex-col justify-between">
              <span className="h-0.5 w-full bg-current" />
              <span className="h-0.5 w-full bg-current" />
              <span className="h-0.5 w-full bg-current" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/10 px-4 py-3 lg:hidden dark:border-white/10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={HREFS[item]}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t(item)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
