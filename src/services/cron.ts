import { CronJob } from "cron";
import db from "./db";
import mailer from "./mail";
import {
  welcomeFactory,
  malpunExternalFactory,
  malpunInternalFactory,
  stateReminderFactory,
  welcomeInternalPanitiaFactory,
  welcomeInternalOrganisatorFactory,
  internalVerificationFactory,
} from "../utils/mail-factory";

const queueMailJob = CronJob.from({
  cronTime: "0 0 8-17 * * *",
  timeZone: "Asia/Jakarta",
  onTick: async function () {
    console.log("re-sending mail queue");
    const mails = await db.mail.findMany({
      where: {
        sentAt: null,
      },
    });

    mails.map(async (mail) => {
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
                stateTime: `17.00 - 21.00`,
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
        /*
            stop job buat hari ini, biarin aja yang sisanya error
         */

        if (e.responseCode && e.responseCode === 554 && this.running) {
          this.stop();
        }
      }
    });
  },
});

/*
    queueMailJob starter
*/
export const startQueueMailJob = CronJob.from({
  cronTime: "0 0 8 * * *",
  timeZone: "Asia/Jakarta",
  runOnInit: true,
  onTick: function () {
    console.log("starting queue mail job");
    if (!queueMailJob.running) {
      queueMailJob.start();
    }
  },
});

/*
    STATE reminder job
*/
export const stateReminderJob = CronJob.from({
  cronTime: "0 0 8 * * *",
  timeZone: "Asia/Jakarta",
  // runOnInit: false,
  onTick: async () => {
    console.log("sending state reminder");
    const days = await db.day.findMany();
    const today = new Date();

    const day = days.find((day) => {
      const date = new Date(day.date);
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth()
      );
    });

    if (!day) {
      return;
    }

    const stateRegistrations = await db.stateRegistration.findMany({
      where: {
        state: {
          dayId: day.id,
        },
      },
      include: {
        mahasiswa: {
          select: {
            name: true,
            email: true,
          },
        },
        state: {
          select: {
            name: true,
            logo: true,
            location: true,
          },
        },
      },
    });

    stateRegistrations.map(async (reg) => {
      const mail = await db.mail.create({
        data: {
          category: "STATE_REMINDER",
          stateRegistration: {
            connect: {
              id: reg.id,
            },
          },
        },
      });

      mailer.sendMail(
        stateReminderFactory(reg.mahasiswa.email, {
          name: reg.mahasiswa.name,
          stateName: reg.state.name,
          stateLogo: `${Bun.env.APP_CDN_URL}${reg.state.logo}`,
          stateLocation: reg.state.location,
          stateTime: `17.00 - 21.00`,
        }),
        async (err, info) => {
          if (err) {
            console.log(err);
            return;
          }

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
    });
  },
});
