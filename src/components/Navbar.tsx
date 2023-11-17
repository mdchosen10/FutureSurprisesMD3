"use client";

import Image from "next/image";
import React, {
  // useCallback,
  useEffect,
  // useRef,
  useState,
} from "react";
import Logo from "@/../public/images/new_log_big.png";
//import Link from "next/link";
import Button from "./Button";
import {
  //usePathname,
  useSearchParams,
} from "next/navigation";
import BurgerMenuOpen from "@/../public/icons/burger-menu.svg";
import BurgerMenuClose from "@/../public/icons/burger-menu-close.svg";
import { useRouter } from "next/navigation";
// import DownArrow from "@/../public/icons/down-arrow.svg";
// import { Dropdown } from "flowbite-react";
import Avatar from "./Avatar";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const Navbar = () => {
  //const url = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();
  const user = useAuth();
  //const howItWorksRef: any = useRef();
  // const FAQsRef: any = useRef();

  const [nav, setNav] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  /* const isActive = (href: string) => {
    return url === href;
  }; */

  /*   const scrollToDiv = useCallback(
    (element: string) => {
      router.push(`/?element=${element}`);
      setNav(false);
    },
    [router],
  ); */

  useEffect(() => {
    const HowItWorksElement =
      document.getElementById("how-it-works");
    const FAQsElement = document.getElementById("FAQs");
    if (
      HowItWorksElement &&
      window.location.href.includes("how-it-works")
    ) {
      HowItWorksElement.scrollIntoView({
        behavior: "smooth",
      });
    } else if (
      FAQsElement &&
      window.location.href.includes("FAQs")
    ) {
      FAQsElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [router, searchParams]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render,
    // so the client and server match
    return null;
  }

  return (
    <div className="flex h-[70px] items-center justify-between bg-primaryViolet px-3 font-mainText md:h-[96px] lg:px-10">
      <ul
        className={
          nav
            ? "fixed left-0 top-[70px] w-full bg-primaryViolet text-white"
            : "fixed top-[-100%]"
        }
      >
        {/* <li
          className="p-4"
          onClick={() => router.push("/")}
        >
          Home
        </li>
        <li
          className="p-4"
          ref={howItWorksRef}
          onClick={() => scrollToDiv("how-it-works")}
        >
          How it works
        </li>
        <li
          className="p-4"
          ref={FAQsRef}
          onClick={() => scrollToDiv("FAQs")}
        >
          FAQs
        </li>
        <li
          className="p-4"
          onClick={() => router.push("/collections")}
        >
          Collections
        </li> */}
        {/* <li className="p-4">
          <Dropdown
            inline
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div className="flex gap-1">
                <p>More</p>
                <Image src={DownArrow} alt="down-arrow" />
              </div>
            )}
          >
            <Dropdown.Item
              onClick={() => router.push("/contact-us")}
            >
              Contact Us
            </Dropdown.Item>
          </Dropdown>
        </li> */}

        {!user?.id ? (
          <div className="flex max-w-[200px] flex-col gap-2 pb-4 md:hidden lg:gap-4">
            <Link
              className="w-fit cursor-pointer p-4"
              href={"/login"}
            >
              Sign in
            </Link>
            <Link
              className="w-fit cursor-pointer p-4"
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
      </ul>

      <div className="max-w-[1400px] items-center justify-between phone:flex md:mx-auto md:w-full md:max-lg:px-5">
        <Image
          alt="logo"
          src={Logo}
          className="w-44 cursor-pointer md:w-[200px]"
          onClick={() =>
            (window.location.href =
              "https://futuresurprises.com")
          }
        />
        <nav className="hidden items-center justify-between gap-2 text-sm font-normal text-white md:flex lg:gap-4 lg:text-base xl:gap-11">
          {/*  <span
            className={`cursor-pointer ${
              searchParams?.get("element") === "home" &&
              "border-b-2"
            }`}
            onClick={() => {
              if (user && user?.id) {
                router.push("/my-account/recipients");
              } else {
                router.push("/?element=home");
              }
            }}
          >
            Home
          </span> */}
          {/* <span
            ref={howItWorksRef}
            onClick={() => scrollToDiv("how-it-works")}
            className={`cursor-pointer ${
              searchParams?.get("element") ===
                "how-it-works" && "border-b-2"
            }`}
          >
            How it works
          </span> */}
          {/* <span
            ref={FAQsRef}
            onClick={() => scrollToDiv("FAQs")}
            className={`cursor-pointer ${
              searchParams?.get("element") === "FAQs" &&
              "border-b-2"
            }`}
          >
            FAQs
          </span> */}
          {/* <Link
            href="/collections"
            className={
              isActive("/collections") ? "border-b-2" : ""
            }
          >
            Collections
          </Link> */}

          {/* <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div className="flex cursor-pointer items-center lg:gap-1">
                <p>More</p>
                <Image src={DownArrow} alt="down-arrow" />
              </div>
            )}
          >
            <Dropdown.Item>
              <Link href="/contact-us">Contact us</Link>
            </Dropdown.Item>
          </Dropdown> */}
        </nav>

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

        {user?.id && (
          <div className="hidden md:flex">
            <Avatar user={user} />
          </div>
        )}
      </div>

      {!nav ? (
        <Image
          src={BurgerMenuOpen}
          alt="menu"
          className="mr-4 cursor-pointer md:hidden"
          onClick={() => setNav(!nav)}
        />
      ) : (
        <Image
          src={BurgerMenuClose}
          alt="menu"
          className="mr-4 cursor-pointer md:hidden"
          onClick={() => setNav(!nav)}
        />
      )}
    </div>
  );
};

export default Navbar;
