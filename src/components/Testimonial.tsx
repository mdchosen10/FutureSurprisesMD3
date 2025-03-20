"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      text: "Future Surprises is a really convenient way to send gifts to your loved ones. I appreciate how they took care of most of the effort and found great gifts so I didn't have to. My relatives loved what I got them.",
      author: "Tarikh Campbell",
    },
    {
      text: "My mom loved her Mother's Day gift. Future Surprises truly is thoughtful. Not a boring basket or generic box like other services. I highly recommend their service. Simple, fast, and quality gifts.",
      author: "Hanzel Corella",
    },
    {
      text: "Future surprises provides a magical experience both to the gift receiver and gift giver.",
      author: "Armen Kherlopian",
    },
    {
      text: "Excellent service. Very happy with the gift",
      author: "Khalil Qato",
    },
    {
      text: "Future Surprises has helped me put gift giving for my family and close friends on autopilot. Great gift recommendations!",
      author: "Dennis Chim",
    },
  ];

  return (
    <div className="testimonials-carousel">
      <h2 className="text-center font-mainHeading text-2xl font-bold lg:text-5xl lg:leading-[60px] 2xl:text-[54px]">
        What our{" "}
        <span className="text-[#511f4a]">Customers</span>{" "}
        are Saying
      </h2>
      <Swiper
        modules={[Pagination, Autoplay]}
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
        loop
        autoplay
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
