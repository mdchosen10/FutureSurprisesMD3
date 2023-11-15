"use client";

import Image from "next/image";
import React from "react";
import CurvedLine from "@/../public/images/hero-curved-line.png";
import Button from "@/components/Button";
import GirlThinking from "@/../public/images/girl-thinking.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const HeroBanner = () => {
  const router = useRouter();
  const user = useAuth();

  return (
    <div className="bg-custom-image h-[545px] md:max-lg:h-[400px] ">
      <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-between px-5 md:flex-row md:max-lg:px-14 lg:px-24">
        <div className="flex max-w-[619px] flex-col md:justify-center md:gap-4">
          <div className="flex flex-col gap-[10px] pt-5 font-mainHeading text-3xl font-bold md:gap-[20px] md:text-4xl lg:text-6xl">
            <span className="text-primaryBlack">
              Simplify
            </span>
            <span className="text-primaryViolet">
              Your Gift Giving
            </span>
          </div>
          <Image
            src={CurvedLine}
            alt="line"
            className="w-[171px] max-w-[324px] pb-4 pt-4 phone:pb-0 phone:pt-0 md:w-[250px]"
          />
          <p className="font-mainText text-sm font-normal leading-6 md:text-[16px] md:leading-9 lg:text-[20px]">
            Make gift giving hassle-free with Future
            Surprises innovative platform. Set it and forget
            it!
          </p>
          <div className="hidden pt-6 md:block md:pb-6">
            <Button
              onClick={
                user?.id
                  ? () => router.push("/my-account/user")
                  : () => router.push("/register")
              }
              name="Get Started"
              bgClass="bg-primaryViolet shadow-md"
              textClass="text-white font-mainText"
              extraClass="px-6"
            />
          </div>
        </div>
        <div className=" mx-auto flex max-w-[300px] flex-col md:mx-0 md:max-w-[400px] md:justify-end">
          <Image
            src={GirlThinking}
            alt="girl"
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
