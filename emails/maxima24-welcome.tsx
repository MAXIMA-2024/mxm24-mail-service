import { Heading, Text, Row, Button } from "@react-email/components";

import * as React from "react";
import BaseDesign from "../components/base";

//

type MaximaWelcomeEmailProps = {
  name: string;
};

const MaximaWelcomeEmail = ({ name }: MaximaWelcomeEmailProps) => {
  return (
    <BaseDesign
      bannerUrl="https://cdn.maximaumn.id/email_assets/banner_welcome.png"
      preview={`Hi, ${name} Selamat datang di MAXIMA 2024!`}
    >
      <Row>
        <Heading
          style={{
            fontSize: "24px",
            textAlign: "center",
            margin: "24px 0px 0px 0px",
            color: "#111111",
          }}
        >
          Hi, {name}
        </Heading>
        <Heading
          style={{
            fontSize: "16px",
            // fontWeight: "bold",
            textAlign: "center",
            color: "#111111",
          }}
        >
          Selamat datang di MAXIMA 2024!
        </Heading>
      </Row>
      <Row>
        <Text
          style={{
            textAlign: "justify",
          }}
        >
          Kami senang banget bisa menyambut kamu di acara tahunan ini, yang
          bertujuan untuk mengenalkan berbagai UKM, Komunitas, Media Kampus,
          LSO, dan organisasi lainnya di UMN.
        </Text>
        <Text
          style={{
            textAlign: "justify",
          }}
        >
          Tema tahun ini adalah{" "}
          <span
            style={{
              color: "#111111",
              fontWeight: "bold",
            }}
          >
            Passion Quest Unleashed
          </span>
          . Kami yakin setiap mahasiswa punya passion dan keunikan
          masing-masing. Di MAXIMA, kamu akan melihat berbagai penampilan seru
          dan bisa menemukan kegiatan yang cocok dengan minatmu. Ini adalah
          kesempatan yang tepat untuk menemukan tempat yang pas buat
          mengembangkan passion kamu di kampus.
        </Text>
        <Text
          style={{
            textAlign: "justify",
          }}
        >
          Semoga kamu menikmati setiap momen di MAXIMA 2024 dan menemukan banyak
          hal baru yang menarik. Jangan ragu untuk menjelajahi semua yang ada
          dan bergabung dengan komunitas yang sesuai dengan minat mu.
        </Text>
        <Text>Bersiaplah menjelajah, dalam petualangan mencari passion!</Text>
      </Row>
    </BaseDesign>
  );
};

MaximaWelcomeEmail.PreviewProps = {
  name: "Muhammad Fathan Ridhwan",
} as MaximaWelcomeEmailProps;

export default MaximaWelcomeEmail;
