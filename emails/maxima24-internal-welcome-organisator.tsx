import { Heading, Text, Row, Section } from "@react-email/components";

import * as React from "react";
import BaseDesign from "../components/base";

//

type MaximaInternalWelcomeOrganisatorEmailProps = {
  name: string;
  state: string;
};

const MaximaInternalWelcomeOrganisatorEmail = ({
  name,
  state,
}: MaximaInternalWelcomeOrganisatorEmailProps) => {
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
          di acara tahunan yang luar biasa ini. Melalui peran kalian sebagai
          organisator, kita bersama-sama akan memperkenalkan berbagai UKM,
          Komunitas, Media Kampus, LSO, dan organisasi lainnya di UMN kepada
          mahasiswa baru.
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
            Role: Organisator
          </Text>
          <Text
            style={{
              margin: "0px",
            }}
          >
            STATE: {state}
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
          prosedur. Kami akan mengirimkan notifikasi begitu akun kalian siap
          digunakan.
        </Text>

        <Text
          style={{
            textAlign: "justify",
          }}
        >
          Hal-Hal Penting yang Harus Diperhatikan di Website Internal MAXIMA UMN
          2024:
        </Text>

        <Text
          style={{
            textAlign: "justify",
          }}
        >
          ✔️ Website Internal MAXIMA UMN 2024 adalah internal.maximaumn.id dan
          Website External MAXIMA UMN 2024 adalah maximaumn.id <br />
          <br />
          ✔️ Akun SSO: Akun SSO adalah akun mahasiswa yang biasa dipakai untuk
          login E-Learning UMN atau MyUMN.
          <br />
          <br />
          ✔️ Simpan Perubahan: Jangan lupa untuk selalu klik tombol save setelah
          mengedit.
          <br />
          <br />
          ✔️ Format dan Ukuran File: Untuk logo dan galeri, pastikan format file
          sesuai (png, jpg, jpeg, dan webp).
          <br />
          <br />
          ✔️ Logo: Akan dikompres otomatis menjadi 512x512 piksel, pastikan
          kontennya tetap sesuai setelah dikompres.
          <br />
          <br />
          ✔️ Galeri: Kalian dapat mengunggah hingga 3 gambar, namun hanya bisa
          mengunggah 1 gambar dalam 1 waktu. Setiap kali pilih 1 gambar, lakukan
          save dan ulangi untuk gambar berikutnya. Foto di galeri akan dikompres
          otomatis menjadi 768x768 piksel, pastikan kontennya tetap masuk (tidak
          terpotong) jika dikompres.
          <br />
          <br />
          ✔️ Penggunaan Web Internal: Pastikan untuk menggunakan website
          internal dengan jujur dan penuh tanggung jawab. Jangan asal sebar
          informasi, tetapi pastikan semua yang kalian bagikan akurat dan
          bermanfaat.
          <br />
        </Text>

        <Text
          style={{
            textAlign: "justify",
          }}
        >
          Kami berharap kalian menikmati setiap momen dalam persiapan dan
          pelaksanaan MAXIMA 2024. Jangan ragu untuk mengeksplorasi dan ingatlah
          bahwa kalian adalah bagian penting dari petualangan ini.
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

MaximaInternalWelcomeOrganisatorEmail.PreviewProps = {
  name: "Muhammad Fathan Ridhwan",
  state: "BEM",
} as MaximaInternalWelcomeOrganisatorEmailProps;

export default MaximaInternalWelcomeOrganisatorEmail;
