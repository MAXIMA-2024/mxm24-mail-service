import { render } from "@react-email/components";
import * as React from "react";

import MaximaWelcomeEmail from "../../emails/maxima24-welcome";
import MaximaSTATEReminderEmail from "../../emails/maxima24-state-reminder";
import MaximaMalpunInternalEmail from "../../emails/maxima24-malpun-internal";
import MaximaMalpunExternalEmail from "../../emails/maxima24-malpun-external";
import { SendMailOptions } from "nodemailer";

export const welcomeFactory = (to: string, params: { name: string }) => {
  const html = render(<MaximaWelcomeEmail {...params} />);
  const options = {
    from: `Maxi ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: "Selamat Datang di MAXIMA 2024!",
    html,
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
    from: `Xima ${Bun.env.APP_MAIL_USER}`,
    to,
    subject: `Reminder: Hari ini STATE - ${params.stateName}`,
    html,
    priority: "high",
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
