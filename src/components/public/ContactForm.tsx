"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

const inputClasses =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground";

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface-muted p-6 text-sm text-foreground">
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

      <input name="name" required placeholder={t("formName")} className={inputClasses} />
      <input
        name="email"
        type="email"
        required
        placeholder={t("formEmail")}
        className={inputClasses}
      />
      <input name="phone" placeholder={t("formPhone")} className={inputClasses} />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={t("formMessage")}
        className={inputClasses}
      />

      {state.status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 hover:bg-primary-hover disabled:opacity-60 disabled:hover:scale-100"
      >
        {pending ? t("formSubmitting") : t("formSubmit")}
      </button>
    </form>
  );
}
