import { render } from "@react-email/components";
import * as React from "react";

import MaximaWelcomeEmail from "../../emails/maxima24-welcome";
import MaximaSTATEReminderEmail from "../../emails/maxima24-state-reminder";
import MaximaMalpunInternalEmail from "../../emails/maxima24-malpun-internal";
import MaximaMalpunExternalEmail from "../../emails/maxima24-malpun-external";
import { SendMailOptions } from "nodemailer";
import MaximaInternalWelcomePanitiaEmail from "../../emails/maxima24-internal-welcome-panitia";
import MaximaInternalWelcomeOrganisatorEmail from "../../emails/maxima24-internal-welcome-organisator";
import MaximaInternalVerificationEmail from "../../emails/maxima24-internal-verification";
import MaximaInternalUniqueCodeEmail from "../../emails/maxima24-internal-unique-code";

export const welcomeFactory = (to: string, params: { name: string }) => {
  const html = render(<MaximaWelcomeEmail {...params} />);
  const options = {
    from: `Maxi dan Xima ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: "Selamat Datang di MAXIMA 2024!",
    html,
  };

  return options;
};

export const welcomeInternalPanitiaFactory = (
  to: string,
  params: { name: string; divisi: string }
) => {
  const html = render(<MaximaInternalWelcomePanitiaEmail {...params} />);
  const options = {
    from: `Maxi dan Xima ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: "Selamat Datang Nobles di MAXIMA 2024!",
    html,
  };

  return options;
};

export const welcomeInternalOrganisatorFactory = (
  to: string,
  params: { name: string; state: string }
) => {
  const html = render(<MaximaInternalWelcomeOrganisatorEmail {...params} />);
  const options: SendMailOptions = {
    from: `Maxi dan Xima ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: "Selamat Datang Organisator di MAXIMA 2024!",
    html,
  };

  return options;
};

export const internalVerificationFactory = (
  to: string,
  params: {
    name: string;
    data:
      | {
          role: "panitia";
          divisi: string;
        }
      | {
          role: "organisator";
          state: string;
        };
  }
) => {
  const html = render(<MaximaInternalVerificationEmail {...params} />);
  const options: SendMailOptions = {
    from: `Maxi dan Xima ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: "Akun kamu telah diverifikasi oleh SUPERADMIN!",
    html,
    priority: "high",
  };

  return options;
};

export const stateReminderFactory = (
  to: string,
  params: {
    name: string;
    stateName: string;
    stateLogo: string;
    stateLocation: string;
    stateTime: string;
  }
) => {
  const html = render(<MaximaSTATEReminderEmail {...params} />);

  const options: SendMailOptions = {
    from: `Xima dan Xima ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: `Reminder: Hari ini STATE - ${params.stateName}`,
    html,
    priority: "high",
    attachments: [
      {
        filename: "SOP_STATE_MAXIMA_2024.pdf",
        path: "https://cdn.maximaumn.id/email_assets/SOP_STATE_MAXIMA_2024.pdf",
      },
    ],
  };

  return options;
};

export const malpunInternalFactory = (
  to: string,
  params: {
    name: string;
    ticketUrl: string;
  }
) => {
  const html = render(<MaximaMalpunInternalEmail {...params} />);

  const options: SendMailOptions = {
    from: `Maxi dan Xima ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: "Kamu berhasil mendapatkan tiket Malam Puncak MAXIMA 2024!",
    html,
  };

  return options;
};

export const malpunExternalFactory = (
  to: string,
  params: {
    name: string;
    transactionId: string;
    transactionDate: string;
    ticketUrl: string;
  }
) => {
  const html = render(<MaximaMalpunExternalEmail {...params} />);

  const options: SendMailOptions = {
    from: `Maxi dan Xima ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: "Terima kasih telah membeli tiket Malam Puncak MAXIMA 2024!",
    html,
    priority: "high",
  };

  return options;
};

export const internalUniqueCodeFactory = (
  to: string,
  params: {
    name: string;
    code: string;
  }
) => {
  const html = render(<MaximaInternalUniqueCodeEmail {...params} />);

  const options: SendMailOptions = {
    from: `Maxi dan Xima ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: "Kode Unik untuk Akses Website Internal MAXIMA 2024",
    html,
  };

  return options;
};
