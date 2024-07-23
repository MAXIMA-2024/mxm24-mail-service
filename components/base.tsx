import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Font,
  Column,
  Row,
  Hr,
} from "@react-email/components";

import * as React from "react";

type BaseDesignProps = {
  children: React.ReactNode;
  preview: string;
  bannerUrl: string;
};

const BaseDesign = ({ children, preview, bannerUrl }: BaseDesignProps) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>

      <Body
        style={{
          padding: "16px 16px 0px 16px",
          margin: "0px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#EDEEF0",
        }}
      >
        <Container
          style={{
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <Img
            src="https://cdn.maximaumn.id/email_assets/logo_maxima.png"
            style={{
              height: "65px",
              margin: "10px 0px",
            }}
          />

          <Section>
            <Img
              src={bannerUrl}
              style={{
                display: "block",
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "6px",
              }}
            />
          </Section>

          <Section
            style={{
              color: "#615454",
            }}
          >
            {children}
          </Section>
          <Section
            style={{
              color: "#615454",
            }}
          >
            <Hr />

            <Row>
              <Text
                style={{
                  margin: "16px 0px 0px 0px",
                }}
              >
                Jelajahi dunia MAXIMA 2024 hanya di:
                <Row
                  style={{
                    color: "#111111",
                    margin: "4px 0px",
                  }}
                >
                  <Column
                    style={{
                      width: "24px",
                    }}
                  >
                    <Img
                      src="https://cdn.maximaumn.id/email_assets/icons/line.png"
                      style={{
                        width: "18px",
                      }}
                    />
                  </Column>
                  <Column>@vuu4204x</Column>
                </Row>
                <Row
                  style={{
                    color: "#111111",
                    margin: "4px 0px",
                  }}
                >
                  <Column
                    style={{
                      width: "24px",
                    }}
                  >
                    <Img
                      src="https://cdn.maximaumn.id/email_assets/icons/instagram.png"
                      style={{
                        width: "18px",
                      }}
                    />
                  </Column>
                  <Column>@maximaumn</Column>
                </Row>
                <Row
                  style={{
                    color: "#111111",
                    margin: "4px 0px",
                  }}
                >
                  <Column
                    style={{
                      width: "24px",
                    }}
                  >
                    <Img
                      src="https://cdn.maximaumn.id/email_assets/icons/tiktok.png"
                      style={{
                        width: "18px",
                      }}
                    />
                  </Column>
                  <Column>@maximaumn</Column>
                </Row>
                <Row
                  style={{
                    color: "#111111",
                    margin: "4px 0px",
                  }}
                >
                  <Column
                    style={{
                      width: "24px",
                    }}
                  >
                    <Img
                      src="https://cdn.maximaumn.id/email_assets/icons/web.png"
                      style={{
                        width: "18px",
                      }}
                    />
                  </Column>
                  <Column>
                    <Link href="https://maxima.umn.ac.id" target="_blank">
                      maxima.umn.ac.id
                    </Link>{" "}
                    /{" "}
                    <Link href="https://www.maximaumn.id" target="_blank">
                      www.maximaumn.id
                    </Link>
                  </Column>
                </Row>
                <Row
                  style={{
                    color: "#111111",
                    margin: "4px 0px",
                  }}
                >
                  <Column
                    style={{
                      width: "24px",
                    }}
                  >
                    <Img
                      src="https://cdn.maximaumn.id/email_assets/icons/email.png"
                      style={{
                        width: "18px",
                      }}
                    />
                  </Column>
                  <Column>maxima@umn.ac.id</Column>
                </Row>
              </Text>
              {/* <Hr /> */}

              <Text>
                #MAXIMA2024
                <br />
                #PassionQuestUnleashed
                <br />
                #ExpressYourUniquenessShowItToShine
              </Text>
            </Row>
          </Section>
        </Container>
        <Text
          style={{
            opacity: "0.5",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          MAXIMA 2024 | Made with &#60;3 by Charta
        </Text>
      </Body>
    </Html>
  );
};

export default BaseDesign;
