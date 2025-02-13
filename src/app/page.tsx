"use client";

import { useEffect, useState } from "react";
import HowItWorks from "@/components/HowItWorks";
import Explore from "@/components/Explore";
import Button from "@/components/shared/Button";
import TestimonialsCarousel from "@/components/Testimonial";
import Banner from "@/components/layout/Banner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import * as authActions from "@/redux/auth/actions";

export default function Home() {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getCurrentCustomer = async () => {
    await dispatch(authActions.getCurrentCustomer());
  };
  useEffect(() => {
    setHydrated(true);
    const token = localStorage.getItem("user_token");
    if (token) {
      getCurrentCustomer();
    }
  }, []);

  if (!hydrated) {
    // Returns null on first render,
    // so the client and server match
    return null;
  }

  return (
    <div>
      <Header />
      <div className="w-full pt-[90px]">
        <div style={{ height: "calc(100vh - 90px)" }}>
          <Banner />
        </div>
      </div>
      <div className="mx-auto max-w-screen-2xl overflow-hidden">
        <div className="px-10 lg:px-20">
          <HowItWorks />
        </div>
        <div className="px-10 lg:px-20">
          <Explore />
        </div>
        <div className="banner-2 mb-16 mt-24 flex h-[412px] flex-col items-start justify-center px-10 lg:px-20">
          <h2 className="mb-15 text-left font-lora text-2xl font-bold dark:text-secondary lg:text-5xl lg:leading-[60px] 2xl:text-[54px]">
            Start your{" "}
            <span className="text-[#4B0082]">Surprise</span>{" "}
            Journey Now
          </h2>
          <p className="mb-6 mt-4 max-w-2xl dark:text-secondary">
            Get started on the surprise gift process before
            registering. We&apos;ll save your progress for a
            smooth checkout.
          </p>
          <Button
            onClick={() => {
              router.push("/surprise");
            }}
            variant="primary"
          >
            Get Started
          </Button>
        </div>
        <div className="">
          <hr className="mx-auto mb-6 h-16 w-1 rotate-0 transform bg-primary" />
          <TestimonialsCarousel />
          <hr className="mx-auto my-8 h-16 w-1 rotate-0 transform bg-primary" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
