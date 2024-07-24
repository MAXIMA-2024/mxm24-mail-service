/*
    faridh's mail queue service for MAXIMA 24
*/

import express from "express";
import db from "./services/db";
import {
  internalServerError,
  notFound,
  parseZodError,
  success,
  validationError,
} from "./utils/responses";
import { idSchema } from "./validator/id";

// mailer
import mailer from "./services/mail";
import {
  welcomeFactory,
  malpunExternalFactory,
  malpunInternalFactory,
  welcomeInternalPanitiaFactory,
  welcomeInternalOrganisatorFactory,
  internalVerificationFactory,
} from "./utils/mail-factory";
import { startQueueMailJob, stateReminderJob } from "./services/cron";
import { verificationSchema } from "./validator/verification";

const app = express();
app.use(express.json());

// get pending mail from database
app.get("/mail/", async (req, res) => {
  try {
    const mails = await db.mail.findMany({
      where: {
        sentAt: null,
      },
    });

    return success(res, "Berhasil mendapatkan pending email queue", mails);
  } catch (e) {
    console.error(e);
    return internalServerError(res);
  }
});

app.post("/mail/welcome", async (req, res) => {
  try {
    const validate = await idSchema.safeParseAsync(req.body);
    if (!validate.success) {
      return validationError(res, parseZodError(validate.error));
    }

    const mahasiswa = await db.mahasiswa.findUnique({
      where: {
        id: validate.data.id,
      },
    });

    if (!mahasiswa) {
      return notFound(res, "Mahasiswa tidak ditemukan");
    }

    const mail = await db.mail.create({
      data: {
        category: "WELCOME",
        mahasiswa: {
          connect: {
            id: mahasiswa.id,
          },
        },
      },
    });

    // send email beneran disini

    mailer.sendMail(
      welcomeFactory(mahasiswa.email, { name: mahasiswa.name }),
      async (err, info) => {
        if (err) {
          console.log(err);
          return;
        }

        // update sentAt
        await db.mail.update({
          where: {
            id: mail.id,
          },
          data: {
            sentAt: new Date(),
          },
        });
      }
    );

    return success(res, "Berhasil mengirim email welcome");
  } catch (e) {
    console.error(e);
    return internalServerError(res);
  }
});

app.post("/mail/welcome/internal/panitia", async (req, res) => {
  try {
    const validate = await idSchema.safeParseAsync(req.body);
    if (!validate.success) {
      return validationError(res, parseZodError(validate.error));
    }

    const panitia = await db.panitia.findUnique({
      where: {
        id: validate.data.id,
      },
      include: {
        divisi: true,
      },
    });

    if (!panitia) {
      return notFound(res, "Panitia tidak ditemukan");
    }

    const mail = await db.mail.create({
      data: {
        category: "INTERNAL_VERIFICATION",
        panitia: {
          connect: {
            id: panitia.id,
          },
        },
      },
    });

    mailer.sendMail(
      welcomeInternalPanitiaFactory(panitia.email, {
        name: panitia.name,
        divisi: panitia.divisi.name,
      }),
      async (err, info) => {
        if (err) {
          console.log(err);
          return;
        }

        // update sentAt
        await db.mail.update({
          where: {
            id: mail.id,
          },
          data: {
            sentAt: new Date(),
          },
        });
      }
    );

    return success(res, "Berhasil mengirim email welcome internal panitia");
  } catch (e) {
    console.error(e);
    return internalServerError(res);
  }
});

app.post("/mail/welcome/internal/organisator", async (req, res) => {
  try {
    const validate = await idSchema.safeParseAsync(req.body);
    if (!validate.success) {
      return validationError(res, parseZodError(validate.error));
    }

    const organisator = await db.organisator.findUnique({
      where: {
        id: validate.data.id,
      },
      include: {
        state: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!organisator) {
      return notFound(res, "Organisator tidak ditemukan");
    }

    const mail = await db.mail.create({
      data: {
        category: "INTERNAL_VERIFICATION",
        organisator: {
          connect: {
            id: organisator.id,
          },
        },
      },
    });

    // send email beneran disini
    mailer.sendMail(
      welcomeInternalOrganisatorFactory(organisator.email, {
        name: organisator.name,
        state: organisator.state.name,
      }),
      async (err, info) => {
        if (err) {
          console.log(err);
          return;
        }

        // update sentAt
        await db.mail.update({
          where: {
            id: mail.id,
          },
          data: {
            sentAt: new Date(),
          },
        });
      }
    );
  } catch (e) {
    console.error(e);
    return internalServerError(res);
  }
});

app.post("/mail/internal/verification", async (req, res) => {
  try {
    const validate = await verificationSchema.safeParseAsync(req.body);
    if (!validate.success) {
      return validationError(res, parseZodError(validate.error));
    }

    if (validate.data.role === "panitia") {
      const haveBeenVerified = await db.mail.findFirst({
        where: {
          category: "INTERNAL_VERIFICATION",
          panitiaId: validate.data.id,
        },
      });

      if (haveBeenVerified) {
        return success(res, "Email internal verification sudah pernah dikirim");
      }

      const panitia = await db.panitia.findUnique({
        where: {
          id: validate.data.id,
        },
        include: {
          divisi: true,
        },
      });

      if (!panitia) {
        return notFound(res, "Panitia tidak ditemukan");
      }

      const mail = await db.mail.create({
        data: {
          category: "INTERNAL_VERIFICATION",
          panitia: {
            connect: {
              id: panitia.id,
            },
          },
        },
      });

      mailer.sendMail(
        internalVerificationFactory(panitia.email, {
          name: panitia.name,
          data: {
            role: "panitia",
            divisi: panitia.divisi.name,
          },
        }),
        async (err, info) => {
          if (err) {
            console.log(err);
            return;
          }

          // update sentAt
          await db.mail.update({
            where: {
              id: mail.id,
            },
            data: {
              sentAt: new Date(),
            },
          });
        }
      );
    } else {
      const haveBeenVerified = await db.mail.findFirst({
        where: {
          category: "INTERNAL_VERIFICATION",
          organisatorId: validate.data.id,
        },
      });

      if (haveBeenVerified) {
        return success(res, "Email internal verification sudah pernah dikirim");
      }

      const organisator = await db.organisator.findUnique({
        where: {
          id: validate.data.id,
        },
        include: {
          state: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!organisator) {
        return notFound(res, "Organisator tidak ditemukan");
      }

      const mail = await db.mail.create({
        data: {
          category: "INTERNAL_VERIFICATION",
          organisator: {
            connect: {
              id: organisator.id,
            },
          },
        },
      });

      mailer.sendMail(
        internalVerificationFactory(organisator.email, {
          name: organisator.name,
          data: {
            role: "organisator",
            state: organisator.state.name,
          },
        }),
        async (err, info) => {
          if (err) {
            console.log(err);
            return;
          }

          // update sentAt
          await db.mail.update({
            where: {
              id: mail.id,
            },
            data: {
              sentAt: new Date(),
            },
          });
        }
      );
    }

    return success(res, "Berhasil mengirim email internal verification");
  } catch (e) {
    console.error(e);
    return internalServerError(res);
  }
});

app.post("/mail/malpun/internal", async (req, res) => {
  try {
    const validate = await idSchema.safeParseAsync(req.body);
    if (!validate.success) {
      return validationError(res, parseZodError(validate.error));
    }

    const malpun = await db.malpunInternal.findUnique({
      where: {
        id: validate.data.id,
      },
      include: {
        mahasiswa: true,
      },
    });

    if (!malpun) {
      return notFound(res, "MalPun entry tidak ditemukan");
    }

    const mail = await db.mail.create({
      data: {
        category: "MALPUN_INTERNAL",
        mahasiswa: {
          connect: {
            id: malpun.mahasiswa.id,
          },
        },
      },
    });

    // send email beneran disini
    mailer.sendMail(
      malpunInternalFactory(malpun.mahasiswa.email, {
        name: malpun.mahasiswa.name,
        ticketUrl:
          (Bun.env.MALPUN_TICKET_CALLBACK_URL ??
            "https://maximaumn.id/malpun/ticket/details?code=") + malpun.code,
      }),
      async (err, info) => {
        if (err) {
          console.log(err);
          return;
        }

        // update sentAt
        await db.mail.update({
          where: {
            id: mail.id,
          },
          data: {
            sentAt: new Date(),
          },
        });
      }
    );

    return success(res, "Berhasil mengirim email malpun internal");
  } catch (e) {
    console.error(e);
    return internalServerError(res);
  }
});

app.post("/mail/malpun/external", async (req, res) => {
  try {
    const validate = await idSchema.safeParseAsync(req.body);
    if (!validate.success) {
      return validationError(res, parseZodError(validate.error));
    }

    const malpun = await db.malpunExternal.findUnique({
      where: {
        id: validate.data.id,
      },
    });

    if (!malpun) {
      return notFound(res, "MalPun entry tidak ditemukan");
    }

    const mail = await db.mail.create({
      data: {
        category: "MALPUN_EXTERNAL",
        buyer: {
          connect: {
            id: malpun.id,
          },
        },
      },
    });

    // send email beneran disini
    mailer.sendMail(
      malpunExternalFactory(malpun.email, {
        name: malpun.fullName,
        ticketUrl:
          (Bun.env.MALPUN_TICKET_CALLBACK_URL ??
            "https://maximaumn.id/malpun/ticket/details?code=") + malpun.code,
        transactionId: malpun.transactionId!,
        transactionDate: new Date(malpun.validatedAt!).toLocaleString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      }),
      async (err, info) => {
        if (err) {
          console.log(err);
          return;
        }

        // update sentAt
        await db.mail.update({
          where: {
            id: mail.id,
          },
          data: {
            sentAt: new Date(),
          },
        });
      }
    );

    return success(res, "Berhasil mengirim email malpun external");
  } catch (e) {
    console.error(e);
    return internalServerError(res);
  }
});

// start cron job
startQueueMailJob.start();
stateReminderJob.start();

app.listen(Number(Bun.env.APP_PORT ?? 8085), () => {
  console.log(`Mail queue started on port ${Number(Bun.env.APP_PORT ?? 8085)}`);
});
