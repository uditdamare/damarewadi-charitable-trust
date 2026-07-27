import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trustSettings } from "@/content/trust-settings";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");

  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold">{tMeta("siteName")}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
            {t("quickLinks")}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:underline">{tNav("about")}</Link></li>
            <li><Link href="/committee" className="hover:underline">{tNav("committee")}</Link></li>
            <li><Link href="/initiatives" className="hover:underline">{tNav("initiatives")}</Link></li>
            <li><Link href="/contact" className="hover:underline">{tNav("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
            {t("contactInfo")}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${trustSettings.contactEmail}`} className="hover:underline">
                {trustSettings.contactEmail}
              </a>
            </li>
            <li>
              <a href={`tel:${trustSettings.contactPhone.replace(/\s+/g, "")}`} className="hover:underline">
                {trustSettings.contactPhone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10 px-4 py-4 text-center text-xs text-black/50 sm:px-6 dark:border-white/10 dark:text-white/50">
        © {year} {tMeta("siteName")}. {t("rightsReserved")}
      </div>
    </footer>
  );
}
