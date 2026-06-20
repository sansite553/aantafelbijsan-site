import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

function formatDateLabel(dateValue: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Amsterdam"
  }).format(new Date(`${dateValue}T12:00:00+02:00`));
}

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed." }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");

    if (!smtpUser || !smtpPass) {
      throw new Error("SMTP_USER of SMTP_PASS ontbreekt in de function secrets.");
    }

    const { customerName, customerEmail, serviceDate, quantity } = await request.json();

    if (!customerName || !customerEmail || !serviceDate || !quantity) {
      throw new Error("Niet alle benodigde reserveringsgegevens zijn meegestuurd.");
    }

    const prettyDate = formatDateLabel(serviceDate);
    const quantityLabel = `${quantity} box${quantity === 1 ? "" : "en"}`;

    const transporter = nodemailer.createTransport({
      host: Deno.env.get("SMTP_HOST") || "smtp.gmail.com",
      port: Number(Deno.env.get("SMTP_PORT") || "465"),
      secure: (Deno.env.get("SMTP_SECURE") || "true") === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const subject = `Bevestiging van je borrelbox-reservering | ${prettyDate}`;

    const text = [
      `Hoi ${customerName},`,
      "",
      "Bedankt voor je reservering bij Aan Tafel Bij San.",
      "",
      "Ik heb je aanvraag goed ontvangen:",
      `- Datum: ${prettyDate}`,
      `- Aantal boxen: ${quantityLabel}`,
      "",
      "Ik neem binnenkort contact met je op voor de definitieve bevestiging en het betaalverzoek.",
      "",
      "Liefs,",
      "Suzanne",
      "Aan Tafel Bij San"
    ].join("\n");

    const html = `
      <div style="font-family: Mulish, Arial, sans-serif; color: #493a31; line-height: 1.7; max-width: 620px; margin: 0 auto; padding: 28px 22px; background: #fffaf6;">
        <p style="margin: 0 0 14px;">Hoi ${customerName},</p>
        <p style="margin: 0 0 14px;">Bedankt voor je reservering bij <strong>Aan Tafel Bij San</strong>.</p>
        <p style="margin: 0 0 14px;">Ik heb je aanvraag goed ontvangen:</p>
        <div style="margin: 0 0 18px; padding: 16px 18px; border-radius: 18px; background: #f6eee6; border: 1px solid #eaded2;">
          <p style="margin: 0 0 6px;"><strong>Datum:</strong> ${prettyDate}</p>
          <p style="margin: 0;"><strong>Aantal boxen:</strong> ${quantityLabel}</p>
        </div>
        <p style="margin: 0 0 14px;">Ik neem binnenkort contact met je op voor de definitieve bevestiging en het betaalverzoek.</p>
        <p style="margin: 0;">Liefs,<br />Suzanne<br /><strong>Aan Tafel Bij San</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `Aan Tafel Bij San <${smtpUser}>`,
      to: customerEmail,
      replyTo: smtpUser,
      subject,
      text,
      html
    });

    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Onbekende fout bij het versturen van de bevestigingsmail."
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  }
});
