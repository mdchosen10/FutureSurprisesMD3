"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Avatar from "../Avatar";
import Button from "../shared/Button";
import { usePathname, useRouter } from "next/navigation";
import BurgerMenuOpen from "@/../public/icons/burger-menu.svg";
import Sidebar from "./Sidebar";
import GetStartedButton from "../GetStartedButton";

const Header = () => {
  const user = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <nav
      className={`${
        pathname !== "/surprise" ? "fixed" : ""
      } left-0 top-0 z-30 flex h-[90px] w-full items-center justify-between bg-primary font-poppins text-white dark:text-white`}
    >
      <div className="mx-auto hidden w-full max-w-screen-2xl justify-between px-5 lg:flex lg:px-16">
        <div className="ms-5 flex">
          <Link
            href="/"
            className="h-24 w-auto items-center"
          >
            <Image
              src="/images/Future-Surprises-Logo-White.png"
              height={0}
              width={0}
              unoptimized
              alt="logo"
              className="h-full w-full object-contain"
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
            href="/collections"
          >
            Gallery
          </Link>
          <Link
            className="hidden font-bold hover:underline md:flex"
            href="/contact-us"
          >
            Contact
          </Link>

          {!user?.id ? (
            <>
              <Button
                variant="transparent"
                className="font-bold hover:underline "
                onClick={() => {
                  router.push("/login");
                }}
              >
                Sign in
              </Button>
              {/* <Link
                className="hidden rounded-md !border px-3 py-2 font-bold hover:bg-white hover:text-primary md:flex"
                href="/surprise"
              >
                Get Started
              </Link> */}
              <GetStartedButton
                className="hidden rounded-md !border px-3 py-2 font-bold hover:bg-white hover:text-primary md:flex"
                gtagLabel="desktop_header_get_started_button"
              />
            </>
          ) : (
            <li className="list-none p-4">
              <Avatar user={user} />
            </li>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between px-5 lg:hidden">
        <div className="flex items-center gap-x-3">
          <Button className="!px-0">
            <Image
              src={BurgerMenuOpen}
              alt="menu"
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          </Button>
          <div className="">
            <Link href="/">
              <Image
                src="/images/Future-Surprises-Logo-White.png"
                height={47}
                width={160}
                alt="logo"
              />
            </Link>
          </div>
        </div>
        {!user || !user?.id ? (
          // <Link
          //   className="flex items-center rounded-md !border px-3 py-2 text-xs font-bold hover:bg-white hover:text-primary md:text-sm lg:text-lg"
          //   href="/surprise"
          // >
          //   Get Started
          // </Link>
          <GetStartedButton
            className="flex items-center rounded-md !border px-3 py-2 text-xs font-bold hover:bg-white hover:text-primary md:text-sm lg:text-lg"
            gtagLabel="mobile_header_get_started_button"
          />
        ) : (
          <li className="list-none p-4">
            <Avatar user={user} />
          </li>
        )}
      </div>
      <div className="lg:hidden">
        <Sidebar
          isOpen={isOpen}
          handleClose={handleClose}
        />
      </div>
    </nav>
  );
};

export default Header;
