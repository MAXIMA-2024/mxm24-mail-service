import { Text, Button, Img, Section, Link } from "@react-email/components";

import * as React from "react";
import BaseDesign from "../components/base";

type MaximaInternalVerificationEmailProps = {
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
};

const MaximaInternalVerificationEmail = ({
  name,
  data,
}: MaximaInternalVerificationEmailProps) => {
  return (
    <BaseDesign
      bannerUrl="https://cdn.maximaumn.id/email_assets/banner_state.png"
      preview={`Hi ${name}, Selamat! akun kamu telah di verifikasi oleh SUPERADMIN ...`}
    >
      <Section>
        <Text
          style={{
            fontWeight: "bold",
            color: "#111111",
          }}
        >
          Hi {name},
        </Text>
        <Text
          style={{
            marginTop: "0px",
          }}
        >
          Selamat! akun kamu telah di verifikasi oleh SUPERADMIN. Berikut ini
          daftar data yang telah di verifikasi:
        </Text>
        <Section
          style={{
            backgroundColor: "#F8F8F8",
            borderRadius: "8px",
            padding: "16px",
            color: "black",
            fontWeight: "bold",
          }}
        >
          <Text
            style={{
              margin: "0px",
            }}
          >
            Nama: {name}
          </Text>
          {data.role === "panitia" && (
            <>
              <Text
                style={{
                  margin: "0px",
                }}
              >
                Role: Panitia
              </Text>
              <Text
                style={{
                  margin: "0px",
                }}
              >
                Divisi: {data.divisi}
              </Text>
            </>
          )}

          {data.role === "organisator" && (
            <>
              <Text
                style={{
                  margin: "0px",
                }}
              >
                Role: Organisator
              </Text>
              <Text
                style={{
                  margin: "0px",
                }}
              >
                STATE: {data.state}
              </Text>
            </>
          )}
        </Section>

        <Text>
          Kamu sudah dapat login ke website internal dengan SSO UMN menggunakan
          email yang telah terdaftar yaa!
        </Text>

        <Section>
          <Button
            href={"https://internal.maximaumn.id"}
            style={{
              backgroundColor: "#46002C",
              color: "white",
              width: "100%",
              textAlign: "center",
              padding: "16px 0px",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            Website Internal MAXIMA 2024
          </Button>

          <Section
            style={{
              textAlign: "center",
              margin: "16px 0px",
            }}
          >
            <Link
              href={"https://internal.maximaumn.id"}
              target="_blank"
              style={{
                fontSize: "12px",
              }}
            >
              https://internal.maximaumn.id
            </Link>
          </Section>
        </Section>
      </Section>
    </BaseDesign>
  );
};

MaximaInternalVerificationEmail.PreviewProps = {
  name: "Muhammad Fathan Ridhwan",
  data: {
    role: "panitia",
    divisi: "Charta (Website)",
  },
} as MaximaInternalVerificationEmailProps;

export default MaximaInternalVerificationEmail;
