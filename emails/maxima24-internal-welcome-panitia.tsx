import { Heading, Text, Row, Button, Section } from "@react-email/components";

import * as React from "react";
import BaseDesign from "../components/base";

//

type MaximaInternalWelcomePanitiaEmailProps = {
  name: string;
  divisi: string;
};

const MaximaInternalWelcomePanitiaEmail = ({
  name,
  divisi,
}: MaximaInternalWelcomePanitiaEmailProps) => {
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
          Aku Maxi, bersama partnerku Xima sangat senang bisa menyambut kalian
          di acara tahunan yang luar biasa ini. Sebagai Nobles, kalian memainkan
          peran penting dalam mengenalkan berbagai UKM, Komunitas, Media Kampus,
          LSO, dan organisasi lainnya di UMN kepada mahasiswa baru.
        </Text>
        <Text
          style={{
            textAlign: "justify",
          }}
        >
          Ingat, sebagai Nobles, tanggung jawab kalian sangat besar. Pastikan
          untuk menggunakan website internal dengan jujur dan penuh tanggung
          jawab. Informasi yang ada di website tolong dikelola dengan baik dan
          tidak untuk disebarluaskan tanpa sepengetahuan yang bersangkutan.
          Pastikan semua yang kalian bagikan akurat dan bermanfaat. Kerja keras
          dan integritas kalian akan sangat berpengaruh pada kesuksesan MAXIMA
          2024.
        </Text>
        <Text>Berikut adalah informasi akun yang telah didaftarkan:</Text>
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
            Divisi: {divisi}
          </Text>
        </Section>
        <Text
          style={{
            textAlign: "justify",
          }}
        >
          Harap menunggu verifikasi dari SUPERADMIN sebelum kalian bisa login ke
          website internal. Proses ini memastikan bahwa semua informasi yang
          kalian masukkan telah diverifikasi dengan benar dan sesuai dengan
          prosedur. Kami akan mengirimkan notifikasi ketika akun kalian siap
          digunakan.
        </Text>

        <Text
          style={{
            textAlign: "justify",
          }}
        >
          Terima kasih atas dedikasi dan kerja keras kalian. Bersiaplah
          menjelajah, dalam petualangan mencari passion bersama MAXIMA 2024!
        </Text>

        <Text>
          Salam Hangat, <br />
          Maxi dan Xima
        </Text>
      </Row>
    </BaseDesign>
  );
};

MaximaInternalWelcomePanitiaEmail.PreviewProps = {
  name: "Muhammad Fathan Ridhwan",
  divisi: "Charta (Website)",
} as MaximaInternalWelcomePanitiaEmailProps;

export default MaximaInternalWelcomePanitiaEmail;
