import { Text, Button, Img, Section, Link } from "@react-email/components";

import * as React from "react";
import BaseDesign from "../components/base";

type MaximaInternalUniqueCodeEmailProps = {
  name: string;
  code: string;
};

const MaximaInternalUniqueCodeEmail = ({
  name,
  code,
}: MaximaInternalUniqueCodeEmailProps) => {
  return (
    <BaseDesign
      bannerUrl="https://cdn.maximaumn.id/email_assets/banner_welcome.png"
      preview={`Hi ${name}, Ini kode unik untuk login di website internal MAXIMA 2024 ...`}
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
          Berikut ini kode unik yang bisa kamu gunakan untuk login di website
          internal MAXIMA 2024:
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
            {code}
          </Text>
        </Section>

        <Text>
          Jangan berikan kode ini kepada siapapun, karena ini adalah kode unik
          yang hanya untukmu.
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

MaximaInternalUniqueCodeEmail.PreviewProps = {
  name: "Muhammad Fathan Ridhwan",
  code: "123456",
} as MaximaInternalUniqueCodeEmailProps;

export default MaximaInternalUniqueCodeEmail;
