"use client";

import React from "react";
import { Accordion } from "flowbite-react";
import { useRouter } from "next/navigation";
import { faqs } from "@/helpers";

const FAQs = () => {
  const router = useRouter();

  return (
    <div
      id="FAQs"
      className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-6 px-5"
    >
      <h2 className="font-mainHeading text-2xl font-bold text-[#301d38] md:text-4xl">
        FAQ
      </h2>

      <div className="w-full">
        <Accordion collapseAll className="border-none">
          {faqs.slice(0, 5).map((item, index) => (
            <Accordion.Panel
              className="accordion-item"
              key={index}
            >
              <Accordion.Title className="custom-accordion px-5 py-4 font-mainText">
                {item.title}
              </Accordion.Title>
              <Accordion.Content className="border-none pt-0">
                <p className="font-mainText">
                  {item.description}
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
      <p
        className="cursor-pointer font-mainText text-primaryViolet underline"
        onClick={() => router.push("/FAQs")}
      >
        see more?
      </p>
      <p className="font-mainText">
        Can’t find what you’re looking for? Reach out to our
        customer support team.
      </p>
    </div>
  );
};

export default FAQs;
