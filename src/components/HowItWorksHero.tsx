import React from "react";
import Button from "./Button";

const HowItWorksHero = () => {
  return (
    <div className="w-[100%] lg:h-[654px] bg-custom-image flex flex-col gap-10 justify-center items-center">
      <h2 className="font-mainHeading font-normal text-lg lg:font-bold lg:text-5xl">
        Easy to give & fun to get
      </h2>
      <p className="lg:w-[698px] text-center font-mainText">
        Every gift is uniquely personalized with
        choice-based gifting. Browse gift collections and
        deliver the best gifting experience right to their
        inbox.
      </p>
      <div className="flex gap-4 font-mainText relative">
        <Button
          name="Start Gifting"
          bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md"
          textClass="text-white"
          extraClass="shadow-[0px_20px_20px_0px_rgba(202,108,230,0.25)]"
        />
        <Button
          name="Watch Video"
          bgClass="bg-white"
          textClass="text-black"
          extraClass="shadow-[0px_20px_20px_0px_rgba(202,108,230,0.25)]"
        />
        <p className="font-Sedgwick text-xs absolute top-[53px] left-[186px] ">
          See it step-by-step
        </p>
      </div>
    </div>
  );
};

export default HowItWorksHero;
