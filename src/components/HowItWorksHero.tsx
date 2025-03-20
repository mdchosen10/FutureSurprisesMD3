import React from "react";
import Button from "./Button";

const HowItWorksHero = () => {
  return (
    <div className="bg-custom-image flex w-[100%] flex-col items-center justify-center gap-10 lg:h-[654px]">
      <h2 className="font-mainHeading text-lg font-normal lg:text-5xl lg:font-bold">
        Easy to give & fun to get
      </h2>
      <p className="text-center font-mainText lg:w-[698px]">
        Every gift is uniquely personalized with
        choice-based gifting. Browse gift collections and
        deliver the best gifting experience right to their
        inbox.
      </p>
      <div className="relative flex gap-4 font-mainText">
        <Button
          name="Start Gifting"
          bgClass="bg-primary shadow-md"
          textClass="text-white"
          extraClass="shadow-[0px_20px_20px_0px_rgba(202,108,230,0.25)]"
        />
        <Button
          name="Watch Video"
          bgClass="bg-white"
          textClass="text-black"
          extraClass="shadow-[0px_20px_20px_0px_rgba(202,108,230,0.25)]"
        />
        <p className="absolute left-[186px] top-[53px] font-Sedgwick text-xs ">
          See it step-by-step
        </p>
      </div>
    </div>
  );
};

export default HowItWorksHero;
