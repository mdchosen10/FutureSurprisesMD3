import React, { ReactNode } from "react";

import { Metadata } from "next";
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
    <>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
