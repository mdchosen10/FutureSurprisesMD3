// "use client";

import React, { ReactNode } from "react";
import LayoutWrapper from "../layouts/LayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Future Surprises",
};

interface LayoutProps {
  children?: ReactNode;
}

export default function MainLayout({
  children,
}: LayoutProps) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
