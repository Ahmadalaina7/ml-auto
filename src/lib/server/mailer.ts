import nodemailer from "nodemailer";
import { loadSmtpConfig } from "@/lib/env";
import { logger } from "@/lib/server/logger";

export type MailPayload =
  | { kind: "contact"; name: string; email: string; message: string }
  | { kind: "afspraak"; name: string; email: string; phone: string; summary: string }
  | { kind: "taxatie"; name: string; email: string; phone: string; summary: string };

function subjectFor(payload: MailPayload): string {
  switch (payload.kind) {
    case "contact":
      return `Nieuw contactbericht van ${payload.name}`;
    case "afspraak":
      return `Nieuwe werkplaatsafspraak van ${payload.name}`;
    case "taxatie":
      return `Nieuwe taxatie-aanvraag van ${payload.name}`;
  }
}

function textFor(payload: MailPayload): string {
  const common = [
    `Naam: ${payload.name}`,
    `E-mail: ${payload.email}`,
  ];
  if (payload.kind !== "contact") common.push(`Telefoon: ${payload.phone}`);
  switch (payload.kind) {
    case "contact":
      return [...common, "", "Bericht:", payload.message, "", "Beantwoord via de inbox in het beheerpanel of reply-to."].join("\n");
    case "afspraak":
      return [...common, "", "Afspraak:", payload.summary, "", "Beantwoord via de inbox in het beheerpanel of reply-to."].join("\n");
    case "taxatie":
      return [...common, "", "Taxatie:", payload.summary, "", "Beantwoord via de inbox in het beheerpanel of reply-to."].join("\n");
  }
}

/** Stuurt een niet-blokkerende notificatie-e-mail. Zal nooit gooien. */
export async function sendNotification(payload: MailPayload): Promise<void> {
  const config = loadSmtpConfig();

  if (!config) {
    logger.warn({ event: "mail.skip", reason: "SMTP niet geconfigureerd" });
    return;
  }

  try {
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.user && config.pass ? { user: config.user, pass: config.pass } : undefined,
    });
    await transport.sendMail({
      from: config.from,
      to: config.to,
      replyTo: payload.email,
      subject: subjectFor(payload),
      text: textFor(payload),
    });
    logger.info({ event: "mail.sent", kind: payload.kind, to: config.to });
    transport.close();
  } catch (err) {
    logger.error({ event: "mail.error", err: (err as Error).message });
  }
}