"use client";

import React from "react";
import PinkGiftBox from "@/../public/images/pink-gift-box.png";
import YellowGiftBox from "@/../public/images/yellow-gift-box.png";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const SignUpFooter = () => {
  const user = useAuth();

  const router = useRouter();
  return (
    <div className="relative mx-auto mb-14 mt-24 flex max-w-[1400px] items-center justify-center">
      <Image
        src={PinkGiftBox}
        alt="pink-box"
        className="absolute left-[5px] top-[-58px] w-14 md:left-[-150px] md:top-[-35px] md:w-24 "
      />
      <div className="">
        <div className="flex flex-col items-center justify-center md:gap-2">
          <h2 className="heading-gradient text-2xl font-bold md:h-[42px] md:text-4xl">
            Start gifting right now
          </h2>
          <h2 className="heading-gradient mb-[2.75rem] text-2xl font-bold md:mb-7 md:h-[42px] md:text-4xl">
            no subscription required
          </h2>

          {!user?.id && (
            <Button
              name="Sign up"
              bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md"
              textClass="text-white"
              extraClass="px-5 font-mainText"
              onClick={() => router.push("/register")}
            />
          )}
        </div>
      </div>
      <Image
        src={YellowGiftBox}
        alt="yellow-box"
        className="absolute left-[240px] top-[68px] w-20 md:left-[418px] md:top-[78px] md:w-[149px]  lg:left-[482px]"
      />
    </div>
  );
};

export default SignUpFooter;
