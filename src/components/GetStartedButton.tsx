"use client";

import { useCallback } from "react";
import Link from "next/link";
import * as gtag from "@/lib/gtag";

export default function GetStartedButton({
  href = "/surprise",
  label = "Get Started",
  className = "",
  gtagLabel = "get_started_button",
}: {
  href?: string;
  label?: string;
  className?: string;
  gtagLabel: string;
}) {
  const handleClick = useCallback(() => {
    gtag.event({
      action: "click",
      category: "engagement",
      label: gtagLabel,
      value: href,
    });
  }, [href]);

  return (
    <Link href={href}>
      <button
        onClick={handleClick}
        className={`${className}`}
      >
        {label}
      </button>
    </Link>
  );
}
