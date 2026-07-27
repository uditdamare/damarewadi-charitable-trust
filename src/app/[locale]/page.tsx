import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { InitiativeCard } from "@/components/public/InitiativeCard";
import { CommitteeMemberCard } from "@/components/public/CommitteeMemberCard";
import { initiatives } from "@/content/initiatives";
import { committeeMembers } from "@/content/committee";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const featuredInitiative = initiatives[0];
  const featuredCommittee = committeeMembers
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-secondary">
        <Image
          src={featuredInitiative.coverImagePath}
          alt=""
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-secondary/10" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center text-secondary-foreground">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("heroTitle")}</h1>
          <p className="mt-4 text-lg text-secondary-foreground/90">{t("heroSubtitle")}</p>
          <Link
            href="/initiatives"
            className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 hover:bg-primary-hover"
          >
            {t("heroCta")}
          </Link>
        </div>
      </section>

      {/* About summary */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-foreground">{t("aboutTitle")}</h2>
        <p className="mt-4 text-foreground/70">{t("aboutSummary")}</p>
        <Link href="/about" className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4">
          {t("aboutLink")}
        </Link>
      </section>

      {/* Featured initiative */}
      <section className="bg-surface-muted py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground">{t("initiativeSectionTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{t("initiativeSectionSubtitle")}</p>
          </div>
          <div className="mx-auto grid max-w-2xl gap-6">
            {initiatives.map((initiative) => (
              <InitiativeCard key={initiative.slug} initiative={initiative} />
            ))}
          </div>
        </div>
      </section>

      {/* Committee preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground">{t("committeeSectionTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("committeeSectionSubtitle")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {featuredCommittee.map((member) => (
            <CommitteeMemberCard key={member.id} member={member} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/committee" className="text-sm font-medium text-primary underline underline-offset-4">
            {t("committeeSectionLink")}
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 text-center text-secondary-foreground">
        <h2 className="text-2xl font-semibold">{t("ctaTitle")}</h2>
        <p className="mt-2 text-secondary-foreground/80">{t("ctaSubtitle")}</p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 hover:bg-primary-hover"
        >
          {t("ctaButton")}
        </Link>
      </section>
    </div>
  );
}
