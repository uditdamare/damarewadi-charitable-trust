import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { initiatives } from "@/content/initiatives";

export function generateStaticParams() {
  return initiatives.map((initiative) => ({ slug: initiative.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const initiative = initiatives.find((i) => i.slug === slug);
  if (!initiative) return {};

  const t = await getTranslations({ locale, namespace: `initiatives.${initiative.messageKey}` });

  return {
    title: t("title"),
    description: t("summary"),
    openGraph: {
      title: t("title"),
      description: t("summary"),
      images: [{ url: initiative.coverImagePath }],
    },
  };
}

export default async function InitiativeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const initiative = initiatives.find((i) => i.slug === slug);
  if (!initiative) notFound();

  const t = await getTranslations(`initiatives.${initiative.messageKey}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("title"),
    description: t("summary"),
    image: initiative.coverImagePath,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <Image
          src={initiative.coverImagePath}
          alt={t("title")}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <div className="prose prose-neutral mt-6 max-w-none whitespace-pre-line text-black/80 dark:text-white/80">
        {t("body")}
      </div>

      <h2 className="mt-12 text-xl font-semibold">{t("galleryTitle")}</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {initiative.images.map((image) => (
          <div key={image.path} className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={image.path}
              alt={image.caption ?? t("title")}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
