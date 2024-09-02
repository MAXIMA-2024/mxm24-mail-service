import { Text, Button, Img, Section } from "@react-email/components";

import * as React from "react";
import BaseDesign from "../components/base";

type MaximaSTATEReminderEmailProps = {
  name: string;
  stateName: string;
  stateLogo: string;
  stateLocation: string;
  stateTime: string; // NOTE: date disini harus di format jadi string dari backend
};

const MaximaSTATEReminderEmail = ({
  name,
  stateName,
  stateLogo,
  stateLocation,
  stateTime,
}: MaximaSTATEReminderEmailProps) => {
  return (
    <BaseDesign
      bannerUrl="https://cdn.maximaumn.id/email_assets/banner_state.png"
      preview={`Hi ${name}, Kami mau remind untuk hari ini STATE - ${stateName} ...`}
    >
      <Img
        src={stateLogo}
        style={{
          width: "200px",
          margin: "32px auto",
        }}
      />

      <Section>
        <Text
          style={{
            fontWeight: "bold",
            color: "#111111",
            margin: "0px",
          }}
        >
          Hi {name},
        </Text>
        <Text
          style={{
            marginTop: "0px",
          }}
        >
          Kami mau remind kamu karena hari ini STATE -{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#111111",
            }}
          >
            {stateName}
          </span>{" "}
          akan dilaksanakan pada:
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
            Lokasi: {stateLocation}
          </Text>
          <Text
            style={{
              margin: "0px",
            }}
          >
            Waktu: {stateTime}
          </Text>
        </Section>

        <Text>
          Diharapkan datang tepat waktu dan jangan lupa untuk membaca SOP
          terlebih dahulu ya!
        </Text>

        <Button
          href="https://maxima.umn.ac.id/"
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
          Lanjutkan Petualanganmu!
        </Button>
      </Section>
    </BaseDesign>
  );
};

MaximaSTATEReminderEmail.PreviewProps = {
  name: "Muhammad Fathan Ridhwan",
  stateName: "NAMA STATE",
  stateLogo: "https://cdn.maximaumn.id/email_assets/logo_maxima.png",
  stateLocation: "Parkiran gedung D",
  stateTime: "17:15 - 21:00",
} as MaximaSTATEReminderEmailProps;

export default MaximaSTATEReminderEmail;
