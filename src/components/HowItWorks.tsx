import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="mt-20">
      <h2
        id="how-it-works"
        className="mb-15 text-center font-mainHeading text-2xl font-bold lg:text-5xl lg:leading-[60px] 2xl:text-[54px]"
      >
        How{" "}
        <span className="text-[#511f4a]">
          future surprises
        </span>{" "}
        works
      </h2>
      <div className="mt-10 flex flex-wrap gap-8 xl:flex-nowrap">
        <div className="flex w-full flex-col items-center px-5 py-10">
          <div className="relative flex h-[242px] min-w-[300px] max-w-[374px] items-center justify-center">
            <Image
              fill
              src="/images/plan.png"
              alt="Plan"
              className="h-full w-full object-contain"
              sizes="(max-width: 374px) 100vw, 374px"
            />
          </div>
          <p className="mb-5 mt-14 text-center font-mainHeading text-2xl font-bold 2xl:text-4xl">
            Plan the Surprise
          </p>
          <p className="text-center font-poppins text-lg 2xl:text-2xl">
            Start with a few details about the recipient and
            the occasion
          </p>
        </div>

        <div className="flex w-full flex-col items-center rounded-[19px] bg-[#f0cfee] px-5 py-10">
          <div className="relative flex h-[242px] min-w-[300px] max-w-[374px] items-center justify-center">
            <Image
              fill
              src="/images/handle.png"
              alt="Handle"
              className="h-full w-full object-contain"
              sizes="(max-width: 374px) 100vw, 374px"
            />
          </div>
          <p className="mb-5 mt-14 text-center font-mainHeading text-2xl font-bold dark:text-secondary 2xl:text-4xl">
            {" "}
            We Handle the Rest
          </p>
          <p className="text-center font-poppins text-lg 2xl:text-2xl">
            Our team selects the perfect gift and ensures
            timely delivery.
          </p>
        </div>

        <div className="flex w-full flex-col items-center px-5 py-10">
          <div className="relative flex h-[242px] min-w-[300px] max-w-[374px] items-center justify-center">
            <Image
              fill
              src="/images/delivered.png"
              alt="Delivered"
              className="h-full w-full object-contain"
              sizes="(max-width: 374px) 100vw, 374px"
            />
          </div>
          <p className="mb-5 mt-14 text-center font-mainHeading text-2xl font-bold 2xl:text-4xl">
            Surprise Delivered!
          </p>
          <p className="text-center font-poppins text-lg 2xl:text-2xl">
            Watch them smile when they receive their gift.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
