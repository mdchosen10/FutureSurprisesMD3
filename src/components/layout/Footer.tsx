import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white dark:text-white">
      <div className="mx-auto max-w-screen-2xl p-10 pt-20 lg:px-20">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="w-sm mb-7 h-20 lg:w-[340px]">
              <Link href="/">
                <Image
                  height={0}
                  width={0}
                  unoptimized
                  src="/images/logo-large.png"
                  className="h-full w-full object-contain"
                  alt="Logo"
                />
              </Link>
            </div>
            <p>Delivering Happiness, One Gift at a Time.</p>
          </div>
          <div className="flex w-full flex-col">
            <div className="mb-14 flex w-full items-center justify-center gap-10 md:justify-end">
              <Link
                className="font-bold text-white hover:underline dark:text-white lg:text-lg"
                href="/about"
              >
                About
              </Link>
              <Link
                className="font-bold text-white hover:underline dark:text-white lg:text-lg"
                href="/faq"
              >
                FAQ
              </Link>
              <Link
                className="font-bold text-white hover:underline dark:text-white lg:text-lg"
                href="/contact"
              >
                Contact
              </Link>
              <Link
                className="font-bold text-white hover:underline dark:text-white lg:text-lg"
                href="/account"
              >
                Account
              </Link>
            </div>
            <div className="flex w-full items-center justify-end gap-10  ">
              <Link href="/">
                <Image
                  height={33}
                  width={33}
                  unoptimized
                  src="/icons/fb.svg"
                  alt="Facebook"
                />
              </Link>
              <Link href="https://www.instagram.com/future_surprises_">
                <Image
                  height={33}
                  width={33}
                  unoptimized
                  src="/icons/insta.svg"
                  alt="Instagram"
                />
              </Link>
              <Link href="/">
                <Image
                  height={33}
                  width={33}
                  unoptimized
                  src="/icons/youtube.svg"
                  alt="youtube"
                />
              </Link>
              <Link href="/">
                <Image
                  height={33}
                  width={33}
                  unoptimized
                  src="/icons/tiktok white.svg"
                  alt="Tiktok"
                />
              </Link>
              <Link href="/">
                <Image
                  height={33}
                  width={33}
                  unoptimized
                  src="/icons/pintrest.svg"
                  alt="pintrest"
                />
              </Link>
            </div>
          </div>
        </div>
        <hr className="mt-16 h-[1px] w-full bg-[#9B79B6]" />
        <div className="mt-7 flex flex-wrap justify-between gap-3">
          <p>
            All rights reserved @ 2025 future surprises inc
          </p>
          <Link
            className="hover:underline dark:text-white"
            href="/terms"
          >
            Terms And Conditions
          </Link>
          <Link
            className="hover:underline dark:text-white"
            href="/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className="hover:underline dark:text-white"
            href="/cookies"
          >
            Cookies Policy
          </Link>
          <Link
            className="hover:underline dark:text-white"
            href="/sitemap"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
