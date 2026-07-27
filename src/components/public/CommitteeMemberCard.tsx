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
    <div className="flex flex-col items-center rounded-2xl border border-border bg-surface p-6 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
        {initialsFor(member.positionKey)}
      </div>
      <p className="font-medium text-foreground">{displayName}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {t(`positions.${member.positionKey}`)}
      </p>
    </div>
  );
}
