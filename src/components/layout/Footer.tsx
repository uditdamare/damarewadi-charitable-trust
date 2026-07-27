import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trustSettings } from "@/content/trust-settings";

const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
};

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");

  const year = new Date().getFullYear();
  const socialEntries = Object.entries(trustSettings.socialLinks).filter(([, url]) => !!url);

  return (
    <footer className="mt-16 border-t border-border bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-foreground">{tMeta("siteName")}</p>
          {trustSettings.foundedYear && (
            <p className="mt-1 text-sm text-muted-foreground">
              {t("established", { year: trustSettings.foundedYear })}
            </p>
          )}
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t("quickLinks")}
          </p>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li><Link href="/about" className="hover:underline">{tNav("about")}</Link></li>
            <li><Link href="/committee" className="hover:underline">{tNav("committee")}</Link></li>
            <li><Link href="/initiatives" className="hover:underline">{tNav("initiatives")}</Link></li>
            <li><Link href="/contact" className="hover:underline">{tNav("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t("contactInfo")}
          </p>
          <ul className="space-y-2 text-sm text-foreground/80">
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

          {socialEntries.length > 0 && (
            <ul className="mt-4 flex gap-4 text-sm">
              {socialEntries.map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {SOCIAL_LABELS[key] ?? key}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {year} {tMeta("siteName")}. {t("rightsReserved")}
      </div>
    </footer>
  );
}
