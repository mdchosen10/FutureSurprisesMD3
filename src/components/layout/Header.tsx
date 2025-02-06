"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Avatar from "../Avatar";

const Header = () => {
  const user = useAuth();

  return (
    <nav className="fixed left-0 top-0 z-30 flex h-[90px] w-full items-center justify-between bg-primary font-poppins text-white dark:text-white">
      <div className="mx-auto flex w-full max-w-screen-2xl justify-between px-5 lg:px-16">
        <div className="ms-5">
          <Link href="/">
            <Image
              src="/images/future-surprise-logo.png"
              height={47}
              width={197}
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-8">
          {/* <Link
            className="font-bold hover:underline"
            href="/about-us"
          >
            About
          </Link> */}
          <Link
            className="hidden font-bold hover:underline md:flex"
            href="/FAQs"
          >
            FAQ
          </Link>
          <Link
            className="hidden font-bold hover:underline md:flex"
            href="/contact-us"
          >
            Contact
          </Link>

          {!user?.id ? (
            <Link
              className="font-bold hover:underline"
              href={"/login"}
            >
              Account
            </Link>
          ) : (
            <li className="list-none p-4">
              <Avatar user={user} />
            </li>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
