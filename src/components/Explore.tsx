"use client";

import React, { useState } from "react";
import Button from "./shared/Button";

import {
  giftForHim,
  giftForKids,
  giftsForHer,
  mileStone,
} from "../lib/data";
import SwiperWrapper from "./SwiperWrapper";

import "swiper/css";
import "swiper/css/pagination";

const Explore = () => {
  const tabs = ["Him", "Her", "Kids", "Milestones"];
  const [active, setActive] = useState<
    "Him" | "Her" | "Kids" | "Milestones"
  >("Him");

  const images = {
    Him: giftForHim,
    Her: giftsForHer,
    Kids: giftForKids,
    Milestones: mileStone,
  };

  const handleTabChange = (
    tab: "Him" | "Her" | "Kids" | "Milestones",
  ) => {
    setActive(tab);
    const elem = document.getElementById(tab);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-20">
      <h2 className="mb-15 text-center font-lora text-2xl font-bold lg:text-5xl lg:leading-[60px] 2xl:text-[54px]">
        Explore our{" "}
        <span className="text-[#9B79B6]">Gift</span>{" "}
        Selection
      </h2>
      <p className="mx-auto mt-6 max-w-4xl text-center text-lg text-[#2C2C34] 2xl:text-2xl">
        This is a showcase of sample gifts to inspire you.
        Each surprise is uniquely tailored, ensuring the
        perfect pick for your loved ones.
      </p>

      <div className="relative mx-auto mt-20 max-w-5xl">
        <div className="mx-auto flex w-full max-w-4xl justify-between gap-10 overflow-x-auto">
          {tabs.map(tab => (
            <Button
              id={tab}
              key={tab}
              variant={
                active === tab ? "primary" : "transparent"
              }
              onClick={() =>
                handleTabChange(
                  tab as
                    | "Him"
                    | "Her"
                    | "Kids"
                    | "Milestones",
                )
              }
              className={`${
                active === tab
                  ? "text-white dark:text-white"
                  : "!font-normal text-primary hover:underline dark:text-white"
              } w-fit whitespace-nowrap rounded-[30px] px-8 font-bold 2xl:text-2xl`}
            >
              For {tab}
            </Button>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <SwiperWrapper
            key={active}
            tabs={tabs}
            active={active}
            images={images[active]}
            handleActive={(
              tab: "Him" | "Her" | "Kids" | "Milestones",
            ) => {
              setActive(tab);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
