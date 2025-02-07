import React, { useState } from "react";
import Button from "./shared/Button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperInstance } from "swiper";

import ImageGrid from "./layout/ImageGrid";

import "swiper/css";
import "swiper/css/pagination";

const SwiperWrapper = ({
  images,
  active,
  tabs,
  handleActive,
}: {
  images: string[];
  active: "Him" | "Her" | "Kids" | "Milestones";
  tabs: string[];
  /* eslint-disable no-unused-vars */
  handleActive: (
    tab: "Him" | "Her" | "Kids" | "Milestones",
  ) => void;
}) => {
  const [desktopSwiperRef, setDesktopSwiperRef] = useState<
    SwiperInstance | undefined
  >(undefined);
  const [mobileSwiperRef, setMobileSwiperRef] = useState<
    SwiperInstance | undefined
  >(undefined);

  const handleNext = (swiper: SwiperInstance) => {
    if (!swiper.isEnd) {
      swiper.slideNext();
    } else {
      const nextTabIndex =
        (tabs.indexOf(active) + 1) % tabs.length;
      const nextTab = tabs[nextTabIndex] as
        | "Him"
        | "Her"
        | "Kids"
        | "Milestones";
      handleActive(nextTab);
    }
  };

  const handlePrev = (swiper: SwiperInstance) => {
    if (!swiper.isBeginning) {
      swiper.slidePrev();
    } else {
      const prevTabIndex =
        (tabs.indexOf(active) - 1 + tabs.length) %
        tabs.length;
      const prevTab = tabs[prevTabIndex] as
        | "Him"
        | "Her"
        | "Kids"
        | "Milestones";
      handleActive(prevTab);
    }
  };

  const handleSwipe = (swiper: SwiperInstance) => {
    if (swiper.swipeDirection === "next")
      if (swiper.isEnd) {
        const nextTabIndex =
          (tabs.indexOf(active) + 1) % tabs.length;
        const nextTab = tabs[nextTabIndex] as
          | "Him"
          | "Her"
          | "Kids"
          | "Milestones";
        handleActive(nextTab);
      } else {
        return;
      }
    else if (swiper.swipeDirection === "prev") {
      if (swiper.isBeginning) {
        const prevTabIndex =
          (tabs.indexOf(active) - 1 + tabs.length) %
          tabs.length;
        const prevTab = tabs[prevTabIndex] as
          | "Him"
          | "Her"
          | "Kids"
          | "Milestones";
        handleActive(prevTab);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <Button
          className="absolute -left-[25px] top-[50%] z-20 h-fit w-fit translate-y-[-50%] transform"
          variant="primary"
          onClick={() =>
            handlePrev(desktopSwiperRef as SwiperInstance)
          }
        >
          <Image
            height={24}
            width={24}
            unoptimized
            src="/icons/arrow-left.svg"
            alt="arrow-left"
          />
        </Button>
        <Swiper
          slidesPerView={1}
          onSwiper={swiper => setDesktopSwiperRef(swiper)}
          onBeforeSlideChangeStart={swiper =>
            handleSwipe(swiper)
          }
        >
          <SwiperSlide className="h-full w-full">
            <ImageGrid images={images?.slice(0, 4)} />
          </SwiperSlide>
          {images?.length > 4 ? (
            <SwiperSlide className="h-full w-full">
              <ImageGrid images={images?.slice(4, 8)} />
            </SwiperSlide>
          ) : (
            ""
          )}
        </Swiper>
        <Button
          className="absolute -right-[25px] top-[50%] z-20 h-fit w-fit translate-y-[-50%] transform"
          variant="primary"
          onClick={() =>
            handleNext(desktopSwiperRef as SwiperInstance)
          }
        >
          <Image
            height={24}
            width={24}
            unoptimized
            src="/icons/arrow-right.svg"
            alt="arrow right"
          />
        </Button>
      </div>
      <div className="block lg:hidden">
        <Button
          className="absolute -left-[25px] top-[50%] z-20 h-fit w-fit translate-y-[-50%] transform"
          variant="primary"
          onClick={() =>
            handlePrev(mobileSwiperRef as SwiperInstance)
          }
        >
          <Image
            height={24}
            width={24}
            unoptimized
            src="/icons/arrow-left.svg"
            alt="arrow-left"
          />
        </Button>
        <Swiper
          slidesPerView={1}
          onSwiper={swiper => setMobileSwiperRef(swiper)}
          onBeforeSlideChangeStart={swiper =>
            handleSwipe(swiper)
          }
        >
          {images?.map((image: string) => (
            <SwiperSlide
              key={image}
              className="h-full w-full"
            >
              <div className="h-72 w-full">
                <Image
                  height={0}
                  width={0}
                  unoptimized
                  src={image}
                  alt="Gift"
                  className="h-full w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          className="absolute -right-[25px] top-[50%] z-20 h-fit w-fit translate-y-[-50%] transform"
          variant="primary"
          onClick={() =>
            handleNext(mobileSwiperRef as SwiperInstance)
          }
        >
          <Image
            height={24}
            width={24}
            unoptimized
            src="/icons/arrow-right.svg"
            alt="arrow right"
          />
        </Button>
      </div>
    </>
  );
};

export default SwiperWrapper;
