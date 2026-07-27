import { setRequestLocale, getTranslations } from "next-intl/server";
import { CommitteeMemberCard } from "@/components/public/CommitteeMemberCard";
import { committeeMembers } from "@/content/committee";

export default async function CommitteePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("committee");

  const ordered = committeeMembers.slice().sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-3 text-black/60 dark:text-white/60">{t("subtitle")}</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((member) => (
          <CommitteeMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
