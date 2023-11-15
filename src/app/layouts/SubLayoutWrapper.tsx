"use client";

// Layout with Navbar and Footer on desktop and back arrow on small devices

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React, { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackArrow from "../../../public/images/back-icon.svg";

interface LayoutProps {
  children?: ReactNode;
}

const buttonLinkMapper: any = {
  recipients: {
    show: true,
    link: "/add-or-edit-recipient",
  },
  payment: {
    show: true,
    link: "/add-payment-details",
    buttonText: "new card",
  },
  orders: {
    show: true,
    link: "/add-or-edit-recipient",
  },
};

export default function SubLayoutWrapper({
  children,
}: LayoutProps) {
  const router = useRouter();

  let tab = usePathname();

  return (
    <div className="m-auto flex min-h-screen flex-col">
      <div className="fixed left-0 top-0 z-50 hidden w-full lg:block">
        <Navbar />
      </div>
      <div className="left-0 top-0 flex h-[60px] items-center justify-between bg-white px-3 pt-10 lg:hidden">
        <button
          onClick={() => history.back()}
          className="flex h-[44px] w-[44px] items-center justify-center rounded-full border"
        >
          <Image src={BackArrow} alt="back-arrow" />
        </button>
        {tab && buttonLinkMapper?.[tab]?.show ? (
          <button
            onClick={() =>
              tab &&
              router.push(buttonLinkMapper?.[tab]?.link)
            }
            className="rounded-[10px] border border-[#A93CC9] px-[10px] py-[5px] font-mainText text-[14px]"
          >
            Add{" "}
            {buttonLinkMapper?.[tab]?.buttonText ||
              `${tab?.charAt(0)?.toUpperCase()}${tab?.slice(
                1,
              )}`}
          </button>
        ) : (
          ""
        )}
      </div>
      <main className="mx-auto w-full max-w-[1400px] flex-grow">
        {children}
      </main>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
}
