"use client";

import React from "react";
import GoBack from "@/../public/icons/go-back.svg";
import Confetti from "@/../public/icons/confetti.svg";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Hurray = () => {
  const router = useRouter();
  return (
    <div className="mx-auto flex h-[500px] max-w-[1000px] flex-col px-2 pt-[100px]">
      <Image
        src={GoBack}
        alt="back"
        className="cursor-pointer rounded-full border border-gray-300 md:hidden"
        width={35}
        height={35}
        onClick={() => router.back()}
      />
      <div className=" my-auto flex flex-col items-center gap-4">
        <Image src={Confetti} alt="back" />
        <h1 className="heading-gradient pb-4 text-center font-mainHeading text-3xl font-bold phone:text-left md:text-4xl">
          Hurray
        </h1>
        <p className="text-center font-mainText">
          You are all done. Now just sit back and relax and
          know that we have got you covered!
        </p>
        <Button
          name="Go to My Account"
          bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md"
          textClass="text-white font-mainText"
          extraClass="px-6"
          type="submit"
          onClick={() => router.push("/my-account/payment")}
        />
      </div>
    </div>
  );
};

export default Hurray;
