"use client";

import Image from "next/image";
import React from "react";
import Logo from "@/../public/images/new_log_big.png";
import Instagram from "@/../public/icons/instagram.svg";
import Linkedin from "@/../public/icons/linkedin.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const Footer = () => {
  const router = useRouter();
  const user = useAuth();

  return (
    <div className="flex flex-col font-mainText">
      <div className="flex items-center justify-center rounded-t-[50px] bg-primaryViolet px-3  py-5 md:h-[159px] md:rounded-t-[100px] md:py-0 lg:px-10">
        <div className="flex  w-full max-w-[1400px] flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
          <Image
            alt="logo"
            src={Logo}
            width={268}
            height={67}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="flex flex-col items-center gap-5 text-white md:flex-row lg:gap-10">
            <p
              className="cursor-pointer"
              // onClick={() => router.push("/")}
              onClick={() => {
                if (user && user?.id) {
                  router.push("/my-account/recipients");
                } else {
                  router.push("/?element=home");
                }
              }}
            >
              Home
            </p>
            <p
              className="cursor-pointer"
              onClick={() => router.push("/collections")}
            >
              Collections
            </p>
            <p
              className="cursor-pointer"
              onClick={() => router.push("/FAQs")}
            >
              FAQs
            </p>
            {/* <p
              className="cursor-pointer"
              onClick={() => router.push("/about")}
            >
              About Us
            </p> */}
          </div>
          <div className="flex flex-col lg:gap-6">
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/company/future-surprises/">
                <Image alt="logo" src={Linkedin} />
              </Link>
              <Link href="https://www.instagram.com/future_surprises_/">
                <Image alt="instagram" src={Instagram} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[40px] items-center justify-center text-center md:h-[40px]">
        <p className="text-xs md:text-base">
          Privacy Policy Terms of Service Cookie Policy
          Sitemap © 2023 future surprises Inc. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
