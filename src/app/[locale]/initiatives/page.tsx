import { setRequestLocale, getTranslations } from "next-intl/server";
import { InitiativeCard } from "@/components/public/InitiativeCard";
import { initiatives } from "@/content/initiatives";

export default async function InitiativesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("initiatives");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl gap-6">
        {initiatives.map((initiative) => (
          <InitiativeCard key={initiative.slug} initiative={initiative} />
        ))}
      </div>
    </div>
  );
}
