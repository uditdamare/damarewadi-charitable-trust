"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 text-sm dark:border-white/10 dark:bg-white/5">
        {t("formSuccess")}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Honeypot field — hidden from real visitors via CSS, not display:none (some bots skip those) */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <input
        name="name"
        required
        placeholder={t("formName")}
        className="w-full rounded-lg border border-black/15 px-4 py-3 text-sm dark:border-white/20 dark:bg-white/5"
      />
      <input
        name="email"
        type="email"
        required
        placeholder={t("formEmail")}
        className="w-full rounded-lg border border-black/15 px-4 py-3 text-sm dark:border-white/20 dark:bg-white/5"
      />
      <input
        name="phone"
        placeholder={t("formPhone")}
        className="w-full rounded-lg border border-black/15 px-4 py-3 text-sm dark:border-white/20 dark:bg-white/5"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={t("formMessage")}
        className="w-full rounded-lg border border-black/15 px-4 py-3 text-sm dark:border-white/20 dark:bg-white/5"
      />

      {state.status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 dark:bg-white dark:text-black"
      >
        {pending ? t("formSubmitting") : t("formSubmit")}
      </button>
    </form>
  );
}
