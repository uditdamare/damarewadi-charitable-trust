import { useLocale, useTranslations } from "next-intl";
import type { CommitteeMember } from "@/content/types";

function initialsFor(positionKey: string) {
  return positionKey.slice(0, 2).toUpperCase();
}

export function CommitteeMemberCard({ member }: { member: CommitteeMember }) {
  const t = useTranslations("committee");
  const locale = useLocale();

  const displayName =
    (locale === "en" ? member.fullNameEn : member.fullName) ?? member.fullName ?? t("namePending");

  return (
    <div className="flex flex-col items-center rounded-2xl border border-black/10 bg-white p-6 text-center dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-black/5 text-lg font-semibold text-black/50 dark:bg-white/10 dark:text-white/60">
        {initialsFor(member.positionKey)}
      </div>
      <p className="font-medium">{displayName}</p>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        {t(`positions.${member.positionKey}`)}
      </p>
    </div>
  );
}
