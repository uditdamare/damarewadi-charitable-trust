import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Initiative } from "@/content/types";

export function InitiativeCard({ initiative }: { initiative: Initiative }) {
  const t = useTranslations(`initiatives.${initiative.messageKey}`);

  return (
    <Link
      href={`/initiatives/${initiative.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={initiative.coverImagePath}
          alt={t("title")}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground">{t("title")}</h3>
        <p className="mt-2 text-sm text-foreground/70">{t("summary")}</p>
      </div>
    </Link>
  );
}
