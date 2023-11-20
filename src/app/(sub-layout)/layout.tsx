import React, { ReactNode } from "react";
import SubLayoutWrapper from "../layouts/SubLayoutWrapper";
import { Metadata } from "next";

interface LayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: "Future Surprises",
  icons: {
    icon: "https://images.squarespace-cdn.com/content/v1/65417fc1188fee42b071f876/ff26a069-ee8a-4c72-96a9-c59c79c71b3b/favicon.ico?format=100w",
  },
};

export default function LayoutWrapper({
  children,
}: LayoutProps) {
  return <SubLayoutWrapper>{children}</SubLayoutWrapper>;
}
