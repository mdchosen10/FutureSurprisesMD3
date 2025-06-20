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
  Poppins,
  Sedgwick_Ave,
  Ysabeau_Office,
} from "next/font/google";
import { Metadata } from "next";

const mainHeading = Ysabeau_Office({
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
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.svg"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K47RPBDF');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K47RPBDF"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
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
      <Script id="clarity" strategy="lazyOnload">
        {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "s0q58ptu3i");`}
      </Script>
    </html>
  );
}
