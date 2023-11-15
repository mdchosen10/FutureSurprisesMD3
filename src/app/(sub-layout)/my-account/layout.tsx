"use client";

import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Tooltip } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";

import { useAppDispatch } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import Alert from "@/../public/images/alert.png";
import * as authActions from "@/redux/auth/actions";

interface LayoutProps {
  children?: ReactNode;
}

const tooltipMessage = `It is required to input the birthdate and
  phone number to 
  finish the getting started process.`;

export default function LayoutWrapper({
  children,
}: LayoutProps) {
  const router = useRouter();
  const active = usePathname()?.split("/").slice(-1)[0];
  const dispatch = useAppDispatch();
  const user = useAuth();
  let isAccessDisabled: any = useRef();

  const [hydrated, setHydrated] = useState(false);
  const recipientRef = useRef<HTMLButtonElement>(null);
  const paymentRef = useRef<HTMLButtonElement>(null);
  const orderRef = useRef<HTMLButtonElement>(null);
  const userRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollHorizontally = (
    ref: MutableRefObject<HTMLButtonElement | null>,
  ) => {
    if (containerRef.current && ref.current) {
      const container = containerRef.current;
      const element = ref.current;
      container.scrollLeft =
        element.offsetLeft - container.offsetLeft;
    }
  };

  const checkAccessIfSocialSignIn = useCallback(() => {
    if (!user) return;
    isAccessDisabled.current =
      !user?.metadata?.birthdate || !user?.phone;
    if (isAccessDisabled.current) {
      router.push("/my-account/user");
    }
  }, [user]);

  useEffect(() => {
    checkAccessIfSocialSignIn();
  }, [checkAccessIfSocialSignIn]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const divElement = containerRef.current as HTMLElement;
    const element = document?.querySelector(
      ".active",
    ) as HTMLElement;
    if (divElement) {
      divElement.scrollTo({
        left: element?.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [active]);

  useEffect(() => {
    dispatch(authActions.getCurrentCustomer());
  }, [dispatch]);

  useEffect(() => {
    if (!user)
      return (window.location.href =
        "https://futuresurprises.co/login");
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <div className="mt-[0px] flex flex-col gap-0 px-3 lg:mt-[96px] lg:grid lg:grid-cols-12 lg:px-10 3xl:px-0">
      <div
        ref={containerRef}
        className="hide-scrollbar col-span-2 flex overflow-x-scroll pt-10 lg:flex-col"
      >
        <button
          ref={recipientRef}
          onClick={() => {
            router.push("/my-account/recipients");
            scrollHorizontally(recipientRef);
          }}
          className={`sidebar-link  mx-3 
          flex items-center gap-1
          pb-1 
          text-left 
          font-mainText 
          lg:mx-0 
          lg:pb-0 
          ${active === "recipients" ? "active" : ""}`}
          disabled={isAccessDisabled.current}
        >
          <span>Recipient</span>
          {isAccessDisabled.current && (
            <Tooltip
              content={tooltipMessage}
              className="!z-50 max-w-[200px] text-xs"
              placement="right"
              arrow={false}
            >
              <Image
                src={Alert}
                alt="help"
                width={15}
                height={15}
                className="mb-[2px] min-w-[15px]"
              />
            </Tooltip>
          )}
        </button>
        <button
          ref={paymentRef}
          onClick={() => {
            router.push("/my-account/payment");
            scrollHorizontally(paymentRef);
          }}
          className={`sidebar-link  mx-3 
          flex items-center gap-1
          pb-1 
          text-left 
          font-mainText 
          lg:mx-0 
          lg:pb-0 ${active === "payment" ? "active" : ""}`}
          disabled={isAccessDisabled.current}
        >
          <span>Payment Details</span>
          {isAccessDisabled.current && (
            <Tooltip
              content={tooltipMessage}
              className="!z-50 max-w-[200px] text-xs"
              placement="right"
              arrow={false}
            >
              <Image
                src={Alert}
                alt="help"
                width={15}
                height={15}
                className="mb-[2px] min-w-[15px]"
              />
            </Tooltip>
          )}
        </button>
        <button
          ref={orderRef}
          onClick={() => {
            router.push("/my-account/orders");
            scrollHorizontally(orderRef);
          }}
          className={`sidebar-link  mx-3 
          flex items-center gap-1
          pb-1 
          text-left 
          font-mainText 
          lg:mx-0 
          lg:pb-0  ${active === "orders" ? "active" : ""}`}
          disabled={isAccessDisabled.current}
        >
          <span>Order History</span>
          {isAccessDisabled.current && (
            <Tooltip
              content={tooltipMessage}
              className="!z-50 max-w-[200px] text-xs"
              placement="right"
              arrow={false}
            >
              <Image
                src={Alert}
                alt="help"
                width={15}
                height={15}
                className="mb-[2px] min-w-[15px]"
              />
            </Tooltip>
          )}
        </button>
        <button
          ref={userRef}
          onClick={() => {
            router.push("/my-account/user");
            scrollHorizontally(userRef);
          }}
          className={`sidebar-link mx-3 inline whitespace-nowrap pb-1 text-left font-mainText lg:mx-0 lg:pb-0 ${
            active === "user" ? "active" : ""
          }`}
        >
          Account Details
        </button>
      </div>
      <div className="col-span-10 mb-10 flex flex-col pt-10 lg:border-l">
        {children}
      </div>
    </div>
  );
}
