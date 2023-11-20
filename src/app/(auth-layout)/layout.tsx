// "use client";

import React, { ReactNode } from "react";
import LayoutWrapper from "../layouts/LayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Future Surprises",
  icons: {
    icon: "https://images.squarespace-cdn.com/content/v1/65417fc1188fee42b071f876/ff26a069-ee8a-4c72-96a9-c59c79c71b3b/favicon.ico?format=100w",
  },
};

interface LayoutProps {
  children?: ReactNode;
}

export default function MainLayout({
  children,
}: LayoutProps) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
