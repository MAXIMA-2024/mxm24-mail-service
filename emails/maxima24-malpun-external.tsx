import { Text, Button, Img, Section, Link } from "@react-email/components";

import * as React from "react";
import BaseDesign from "../components/base";

type MaximaMalpunExternalEmailProps = {
  name: string;
  transactionId: string;
  transactionDate: string;
  ticketUrl: string;
};

const MaximaMalpunExternalEmail = ({
  name,
  ticketUrl,
  transactionDate,
  transactionId,
}: MaximaMalpunExternalEmailProps) => {
  return (
    <BaseDesign
      bannerUrl="https://cdn.maximaumn.id/email_assets/banner_state.png"
      preview={`Hi ${name}, Terima kasih telah membeli tiket Malam Puncak MAXIMA 2024 ...`}
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
          Terima kasih telah membeli tiket Malam Puncak MAXIMA 2024. Berikut ini
          detail pembayarannya:
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
            ID Transaksi: {transactionId}
          </Text>
          <Text
            style={{
              margin: "0px",
            }}
          >
            Tanggal: {transactionDate}
          </Text>
        </Section>

        <Text>Malam Puncak Maxima 2024 akan dilaksanakan pada:</Text>
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
            Lokasi: Lapangan Parkir UMN
          </Text>
          <Text
            style={{
              margin: "0px",
            }}
          >
            Tanggal: 7 Oktober 2024
          </Text>
          <Text
            style={{
              margin: "0px",
            }}
          >
            Waktu: 17:00 - Selesai
          </Text>
        </Section>

        <Text>Maxi dan Xima menantikan kehadiranmu, MAXIMERS!</Text>

        <Section>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Jangan lupa tunjukkan tiket ini saat check-in ya!
          </Text>
          <Button
            href={ticketUrl}
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
            Lihat Tiket
          </Button>

          <Section
            style={{
              textAlign: "center",
              margin: "16px 0px",
            }}
          >
            <Link
              href={ticketUrl}
              target="_blank"
              style={{
                fontSize: "12px",
              }}
            >
              {ticketUrl}
            </Link>
          </Section>
        </Section>
      </Section>
    </BaseDesign>
  );
};

MaximaMalpunExternalEmail.PreviewProps = {
  name: "Muhammad Fathan Ridhwan",
  ticketUrl: "https://maximaumn.id/malpun/ticket/details?code=MXM24-randomcode",
  transactionId: "123908172301",
  transactionDate: "Selasa, 23 Juli 2024 pukul 14.48",
} as MaximaMalpunExternalEmailProps;

export default MaximaMalpunExternalEmail;
