import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const sections = [
    { title: t("historyTitle"), body: t("historyBody") },
    { title: t("missionTitle"), body: t("missionBody") },
    { title: t("visionTitle"), body: t("visionBody") },
    { title: t("objectivesTitle"), body: t("objectivesBody") },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 text-black/70 dark:text-white/70">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
