"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = routing.locales.find((l) => l !== locale) ?? locale;

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      className="rounded-full border border-current/20 px-3 py-1 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10"
      aria-label="Switch language"
    >
      {t("switchTo")}
    </button>
  );
}
