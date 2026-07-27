"use server";

import { z } from "zod";

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

  const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("DISCORD_CONTACT_WEBHOOK_URL is not configured");
    return { status: "error", message: "The contact form isn't available right now — please email us directly." };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    const response = await fetch(webhookUrl, {
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
