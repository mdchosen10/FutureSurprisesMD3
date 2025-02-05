import React, { ReactNode } from "react";

import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: "Future Surprises",
};

export default function MainLayout({
  children,
}: LayoutProps) {
  return (
    <div className="m-auto flex min-h-screen flex-col">
      {/* <div className="fixed left-0 top-0 z-50 w-full">
        <Navbar />
      </div> */}
      <Header />
      <main className="mx-auto w-full max-w-screen-2xl flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
