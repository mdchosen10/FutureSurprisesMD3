"use client";

import React from "react";
import { Accordion } from "flowbite-react";
import { faqs } from "@/helpers";

const FAQs = () => {
  return (
    <div className="mx-auto mt-0 flex w-full max-w-[800px] flex-col gap-0 px-3 font-[600] lg:mt-[96px] lg:px-10 3xl:px-0">
      <h1 className="mt-[30px] w-full text-center font-mainHeading text-[36px] text-[#301d38]">
        FAQs
      </h1>
      <div className="mb-20">
        {faqs?.map(item => (
          <Accordion
            key={item?.title}
            collapseAll
            className="my-[15px]"
          >
            <Accordion.Panel>
              <Accordion.Title className="border-[rgba(108, 102, 114, 0.25)] rounded-lg bg-white font-mainText text-[14px] font-[400] text-[#2C2434] hover:bg-white focus:ring-0">
                {item?.title}
              </Accordion.Title>
              <Accordion.Content className="border-[rgba(108, 102, 114, 0.25)] bg-white font-mainText text-[14px] font-[400] text-[#2C2434]">
                {item?.description}
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        ))}
      </div>
      <p className="my-[25px] w-full text-center font-mainText font-[400] text-[#6C6672]">
        Can’t find what you’re looking for? Reach out to our
        customer support team.
      </p>
    </div>
  );
};

export default FAQs;
