import React, { ReactNode } from "react";
import SubLayoutWrapper from "../layouts/SubLayoutWrapper";
import { Metadata } from "next";

interface LayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: "Future Surprises",
};

export default function LayoutWrapper({
  children,
}: LayoutProps) {
  return <SubLayoutWrapper>{children}</SubLayoutWrapper>;
}
