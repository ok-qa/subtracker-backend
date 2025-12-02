import fetch from "node-fetch";
import { env } from "./env.js";

export async function sendEmail({ to, subject, html }) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": env("MAIL_API_KEY"),
    },
    body: JSON.stringify({
      sender: { name: "Subscription Tracker", email: env("EMAIL_FROM") },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Email failed: ${res.status} ${await res.text()}`);
  }
}
