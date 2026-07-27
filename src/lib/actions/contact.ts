"use server";

import { z } from "zod";

// Hardcoded intentionally for now (trust's own call — see chat) instead of
// DISCORD_CONTACT_WEBHOOK_URL. Rotate this in Discord + move back to an env
// var if the repo ever becomes public or access needs tightening.
const DISCORD_CONTACT_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1531362644492157110/Get9UCkLo6VQGHyWKhbhcAUWWskTk4O_h7gOXO_tdwW1qomHXvEwkenFbfpvMLrf7rQm";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
  // Honeypot: a real visitor never fills this (it's visually hidden in the form);
  // a non-empty value here means it's very likely a bot.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Please check the form and try again." };
  }

  // Silently "succeed" on the honeypot so bots don't learn it was rejected.
  if (parsed.data.website) {
    return { status: "success" };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    const response = await fetch(DISCORD_CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "New website contact form submission",
            color: 0x2b6cb0,
            fields: [
              { name: "Name", value: name, inline: true },
              { name: "Email", value: email, inline: true },
              { name: "Phone", value: phone && phone.length > 0 ? phone : "—", inline: true },
              { name: "Message", value: message.slice(0, 1000) },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Discord webhook failed", response.status, await response.text());
      return { status: "error", message: "Something went wrong sending your message. Please try again." };
    }

    return { status: "success" };
  } catch (err) {
    console.error("Discord webhook request threw", err);
    return { status: "error", message: "Something went wrong sending your message. Please try again." };
  }
}
