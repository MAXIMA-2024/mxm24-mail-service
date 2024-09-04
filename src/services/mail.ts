import { createTransport } from "nodemailer";
import { google } from "googleapis";

// singleton instance using global
const mailerSingleton = async () => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      Bun.env.APP_MAIL_CLIENT_ID,
      Bun.env.APP_MAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: Bun.env.APP_MAIL_REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    if (!accessToken.token) {
      throw new Error("Failed to get access token");
    }

    const transporter = createTransport({
      service: "gmail",
      pool: true,
      auth: {
        type: "OAuth2",
        user: Bun.env.APP_MAIL_USER,
        accessToken: accessToken.token,
        clientId: Bun.env.APP_MAIL_CLIENT_ID,
        clientSecret: Bun.env.APP_MAIL_CLIENT_SECRET,
        refreshToken: Bun.env.APP_MAIL_REFRESH_TOKEN,
      },

      maxMessages: 20,
      maxConnections: 3,
    });

    return transporter;
  } catch (e) {
    console.log(e);
  }
};

declare global {
  var mailerGlobal: undefined | Awaited<ReturnType<typeof mailerSingleton>>;
}

const mailer = globalThis.mailerGlobal ?? (await mailerSingleton())!;

globalThis.mailerGlobal = mailer;

export default mailer;
