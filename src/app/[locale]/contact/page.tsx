import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/public/ContactForm";
import { trustSettings } from "@/content/trust-settings";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{t("pocLabel")}</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">{t("emailLabel")}</dt>
              <dd>
                <a href={`mailto:${trustSettings.contactEmail}`} className="font-medium text-foreground hover:underline">
                  {trustSettings.contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{t("phoneLabel")}</dt>
              <dd>
                <a
                  href={`tel:${trustSettings.contactPhone.replace(/\s+/g, "")}`}
                  className="font-medium text-foreground hover:underline"
                >
                  {trustSettings.contactPhone}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
