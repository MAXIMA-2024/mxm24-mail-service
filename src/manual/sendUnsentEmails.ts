import prompts from "prompts";
import db from "../services/db";
import mailer from "../services/mail";
import {
  internalVerificationFactory,
  malpunExternalFactory,
  malpunInternalFactory,
  stateReminderFactory,
  welcomeFactory,
  welcomeInternalOrganisatorFactory,
  welcomeInternalPanitiaFactory,
} from "../utils/mail-factory";

const sendEmail = async (id: number) => {
  const mail = await db.mail.findUnique({
    where: {
      id,
    },
  });

  if (!mail) {
    console.log(`Email with ID ${id} not found`);
    return;
  }

  console.log("Sending email...");

  try {
    switch (mail.category) {
      case "WELCOME": {
        const mahasiswa = await db.mahasiswa.findUnique({
          where: {
            id: mail.mahasiswaId!,
          },
        });
        await mailer.sendMail(
          welcomeFactory(mahasiswa?.email!, {
            name: mahasiswa?.name!,
          })
        );
        break;
      }

      case "INTERNAL_WELCOME": {
        if (mail.panitiaId) {
          const panitia = await db.panitia.findUnique({
            where: {
              id: mail.panitiaId,
            },
            include: {
              divisi: true,
            },
          });

          await mailer.sendMail(
            welcomeInternalPanitiaFactory(panitia?.email!, {
              name: panitia?.name!,
              divisi: panitia?.divisi.name!,
            })
          );
        } else {
          const organisator = await db.organisator.findUnique({
            where: {
              id: mail.organisatorId!,
            },
            include: {
              state: {
                select: {
                  name: true,
                },
              },
            },
          });

          await mailer.sendMail(
            welcomeInternalOrganisatorFactory(organisator?.email!, {
              name: organisator?.name!,
              state: organisator?.state.name!,
            })
          );
        }

        break;
      }

      case "INTERNAL_VERIFICATION": {
        if (mail.panitiaId) {
          const panitia = await db.panitia.findUnique({
            where: {
              id: mail.panitiaId,
            },
            include: {
              divisi: true,
            },
          });

          await mailer.sendMail(
            internalVerificationFactory(panitia?.email!, {
              name: panitia?.name!,
              data: {
                role: "panitia",
                divisi: panitia?.divisi.name!,
              },
            })
          );
        } else {
          const organisator = await db.organisator.findUnique({
            where: {
              id: mail.organisatorId!,
            },
            include: {
              state: {
                select: {
                  name: true,
                },
              },
            },
          });

          await mailer.sendMail(
            internalVerificationFactory(organisator?.email!, {
              name: organisator?.name!,
              data: {
                role: "organisator",
                state: organisator?.state.name!,
              },
            })
          );
        }

        break;
      }

      case "MALPUN_INTERNAL": {
        const malpun = await db.malpunInternal.findFirst({
          where: {
            mahasiswaId: mail.mahasiswaId!,
          },
          include: {
            mahasiswa: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        });

        await mailer.sendMail(
          malpunInternalFactory(malpun?.mahasiswa.email!, {
            name: malpun?.mahasiswa?.name!,
            ticketUrl:
              (Bun.env.MALPUN_TICKET_CALLBACK_URL ??
                "https://maximaumn.id/malpun/myticket?order_id=") +
              malpun?.code,
          })
        );
        break;
      }
      case "MALPUN_EXTERNAL": {
        const malpunExternal = await db.malpunExternal.findUnique({
          where: {
            id: mail.malpunExternalId!,
          },
        });
        await mailer.sendMail(
          malpunExternalFactory(malpunExternal?.email!, {
            name: malpunExternal?.fullName!,
            ticketUrl:
              (Bun.env.MALPUN_TICKET_CALLBACK_URL ??
                "https://maximaumn.id/malpun/myticket?order_id=") +
              malpunExternal?.code,
            transactionId: malpunExternal?.transactionId!,
            transactionDate: new Date(
              malpunExternal?.validatedAt!
            ).toLocaleString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }),
          })
        );
        break;
      }
      case "STATE_REMINDER": {
        const state = await db.stateRegistration.findUnique({
          where: {
            id: mail.stateRegistrationId!,
          },
          select: {
            mahasiswa: {
              select: {
                email: true,
                name: true,
              },
            },
            state: {
              select: {
                name: true,
                logo: true,
                location: true,
                day: {
                  select: {
                    date: true,
                  },
                },
              },
            },
          },
        });

        await mailer.sendMail(
          stateReminderFactory(state?.mahasiswa.email!, {
            name: state?.mahasiswa.name!,
            stateName: state?.state.name!,
            stateLogo: `${Bun.env.APP_CDN_URL}${state?.state.logo!}`,
            stateLocation: state?.state.location!,
            stateTime: `17.15 - 21.00`,
          })
        );
        break;
      }
    }

    await db.mail.update({
      where: {
        id: mail.id,
      },
      data: {
        sentAt: new Date(),
      },
    });
  } catch (e) {
    console.error(e);
  }
};

(async () => {
  const response = await prompts([
    {
      type: "number",
      name: "id",
      message: "Enter email ID?",
      validate: async (id) => {
        const email = await db.mail.findUnique({
          where: {
            id,
          },
        });

        if (!email) {
          return `Email with ID ${id} not found`;
        }

        return true;
      },
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure you want to send this email?",
    },
  ]);

  const { id, confirm } = response;

  if (!confirm) {
    console.log("Aborted");
    return;
  }

  await sendEmail(id);
})();
