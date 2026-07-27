import { setRequestLocale, getTranslations } from "next-intl/server";
import { EmptyState } from "@/components/public/EmptyState";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
      <div className="mt-10">
        <EmptyState message={t("empty")} />
      </div>
    </div>
  );
}
