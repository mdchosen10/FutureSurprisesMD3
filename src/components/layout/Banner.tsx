"use client";

import React from "react";
import Button from "../shared/Button";
import GetStartedButton from "../GetStartedButton";

const Banner = () => {
  return (
    <div className="relative flex h-full w-full">
      <video
        loop
        autoPlay
        muted
        disablePictureInPicture
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      >
        <source
          src="/future-surprises-video.mp4"
          type="video/mp4"
        ></source>
      </video>

      <div className="banner absolute bottom-[-2px] left-0 mx-auto flex w-full px-5 pb-5 lg:px-20">
        <div className="flex h-full w-full flex-col items-start justify-center gap-2">
          <h1 className="w-full text-center font-lora text-2xl font-bold text-black lg:text-5xl lg:leading-[60px]">
            Your Personal
            <span className="text-primary"> Gifting </span>
            Assistant
          </h1>

          <p className="w-full text-center font-poppins text-lg text-black lg:text-2xl">
            Curated gifts for every occasion. Let us do the
            work; you enjoy the smiles.
          </p>

          <div className="mx-auto mt-4 flex flex-wrap items-center gap-4">
            {/* <Button
              onClick={() => {
                router.push("/surprise");
              }}
              variant="primary"
              className="!px-10 py-3 font-semibold 2xl:text-xl"
            >
              Get Started
            </Button> */}

            <GetStartedButton
              className="rounded-md bg-primary !px-10 py-3 font-poppins font-semibold text-white 2xl:text-xl"
              gtagLabel="home_page_video_get_started_button"
            />
            <Button
              variant="transparent"
              className="text-[#9B79B6] hover:underline  2xl:text-xl"
              onClick={() => {
                const x =
                  document.getElementById("how-it-works");
                if (x) {
                  const offset = 100;
                  const topPosition =
                    x.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                  window.scrollTo({
                    top: topPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Learn How it Works
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
