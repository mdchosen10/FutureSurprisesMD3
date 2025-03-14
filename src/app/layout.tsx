import React from "react";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "@/redux/Provider";
import "../styles/globals.css";
import Script from "next/script";
import * as gtag from "@/lib/gtag";

// import type { Metadata } from "next";
import {
  Lora,
  Noto_Sans,
  Playfair_Display,
  Poppins,
  Sedgwick_Ave,
} from "next/font/google";
import { Metadata } from "next";

const mainHeading = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mainHeading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const mainText = Poppins({
  display: "swap",
  style: "normal",
  variable: "--font-mainText",
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

const Sedgwick = Sedgwick_Ave({
  display: "swap",
  style: "normal",
  variable: "--font-Sedgwick",
  weight: ["400"],
  subsets: ["latin"],
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Future surprises",
  description: "Simplify your gift giving",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mainHeading.variable} ${mainText.variable} ${Sedgwick.variable} ${lora.variable} ${noto.variable}`}
    >
      <body>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              color: "#fff",
              backgroundColor: "#000",
            },
          }}
        />
        <StoreProvider>
          <div className="mx-auto overflow-hidden">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
