"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import Image from "next/image";

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      text: "FutureSurprises.com made it so easy to send a surprise to my best friend! She received a gorgeous handcrafted jewelry box, and it was exactly her style. It felt like they knew her personally!",
      author: "Emily R., New York, USA",
    },
    {
      text: "I wanted to cheer up my mom after a tough week. They delivered a beautiful, thoughtful gift, and it made her day!",
      author: "Sofia R., Austin, TX, USA",
    },
    {
      text: "FutureSurprises.com helped me send my brother a gift for his graduation. He got a personalized watch with an engraved message—absolutely loved it!",
      author: "James T., Los Angeles, CA, USA",
    },
  ];

  return (
    <div className="testimonials-carousel">
      <h2 className="text-center font-lora text-2xl font-bold lg:text-5xl lg:leading-[60px] 2xl:text-[54px]">
        What our{" "}
        <span className="text-[#9B79B6]">Customers</span>{" "}
        are Saying
      </h2>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        containerModifierClass="overflow-visible"
        centeredSlides={true}
        grabCursor={true}
        breakpoints={{
          768: {
            slidesPerView: 1.9,
          },
          0: {
            slidesPerView: 1,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            className="mt-16 overflow-visible"
            key={index}
          >
            <div className="quote-img absolute z-10">
              <Image
                height={0}
                width={0}
                unoptimized
                src="/images/double-quotes.png"
                className="h-full w-full"
                alt="quote"
              />
            </div>
            <div className="relative mx-auto max-w-[95vw] rounded-3xl bg-white px-10 pb-12 pt-24 shadow-md dark:text-secondary">
              <p className="font-poppins text-lg font-normal italic lg:text-xl">
                “{testimonial.text}”
              </p>
              <p className="mt-6 text-lg font-bold lg:text-xl">
                — {testimonial.author}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsCarousel;
