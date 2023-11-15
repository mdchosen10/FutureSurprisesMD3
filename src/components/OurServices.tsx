import Image from "next/image";
import React from "react";
import MotherGift from "@/../public/images/mother-gift.png";
import FlowerGift from "@/../public/images/flower-gift.png";
import LoversGift from "@/../public/images/lovers-gift.png";

const OurServices = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center gap-11 px-5 md:px-6">
      <h2 className="heading-gradient text-2xl font-bold md:text-4xl">
        Our services
      </h2>
      <div className="flex w-full flex-col items-center justify-between gap-10 font-mainText md:flex-row md:gap-5">
        <div className="flex max-w-[400px] flex-col items-center justify-center gap-4 md:max-w-[348px] ">
          <Image src={MotherGift} alt="mother" />
          <h3 className="text-lg font-semibold text-[#301d38] md:text-[18px]">
            Simplified Gift-Giving Process
          </h3>
          <p className="text-center text-sm md:text-base">
            Easily select recipients, holidays, and set gift
            amounts in advance. Receive reminders to confirm
            and customize.
          </p>
        </div>

        <div className="flex max-w-[400px] flex-col items-center justify-center gap-4 md:max-w-[348px]">
          <Image src={FlowerGift} alt="mother" />
          <h3 className="text-lg font-semibold text-[#301d38] md:text-[18px]">
            Automatic Gift Selection
          </h3>
          <p className="text-center text-sm md:text-base">
            No time to choose a gift? Relax. We’ll
            automatically select and send a thoughtful gift
            on your behalf.
          </p>
        </div>

        <div className="flex max-w-[400px] flex-col items-center justify-center gap-4 md:max-w-[348px]">
          <Image src={LoversGift} alt="mother" />
          <h3 className="text-lg font-semibold text-[#301d38] md:text-[18px]">
            Remember Important Dates
          </h3>
          <p className="text-center text-sm md:text-base">
            Never miss a special occasion again. Our service
            helps you remember and celebrate with meaningful
            gifts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
