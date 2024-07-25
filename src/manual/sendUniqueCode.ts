import { internalUniqueCodeFactory } from "../utils/mail-factory";
import mailer from "../services/mail";

// get argument from command line
const args = process.argv.slice(2);
const name = args[0];
const email = args[1];
const code = args[2];

// send unique code email
try {
  await mailer.sendMail(
    internalUniqueCodeFactory(email, {
      name,
      code,
    })
  );
} catch (e) {
  console.error(e);
}
