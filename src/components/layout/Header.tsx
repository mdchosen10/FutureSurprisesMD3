"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import { useRouter } from "next/navigation";

const Header = () => {
  const user = useAuth();
  const router = useRouter();

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
        <div className="hidden items-center gap-8 md:flex">
          <Link
            className="font-bold hover:underline"
            href="/about"
          >
            About
          </Link>
          <Link
            className="font-bold hover:underline"
            href="/faq"
          >
            FAQ
          </Link>
          <Link
            className="font-bold hover:underline"
            href="/contact"
          >
            Contact
          </Link>
          {!user?.id && (
            <div className="hidden justify-between gap-1 md:flex lg:gap-4">
              <Button
                name="Sign in"
                bgClass=""
                textClass="text-white"
                extraClass="px-2 lg:px-4"
                onClick={() => router.push("/login")}
              />
              <Button
                name="Get started"
                bgClass="bg-white"
                textClass="text-primaryViolet"
                extraClass="px-2 lg:px-4"
                onClick={() => router.push("/register")}
              />
            </div>
          )}
          {!user?.id ? (
            <div className="flex max-w-[200px] flex-col gap-2 pb-4 md:hidden lg:gap-4">
              <Link
                className="font-bold hover:underline"
                href={"/login"}
              >
                Sign in
              </Link>
              <Link
                className="font-bold hover:underline"
                href={"/register"}
              >
                Get started
              </Link>
            </div>
          ) : (
            <li className="p-4">
              <Avatar user={user} />
            </li>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
