import Image from "next/image";
import React from "react";
import FlowerAndLovers from "@/../public/images/flower-and-lovers.png";

const ForTheGiftGiver = () => {
  return (
    <div
      id="how-it-works"
      className="flex w-full max-w-[1400px] flex-col-reverse items-center px-5 phone:max-lg:px-14 md:mx-auto md:flex-row md:justify-between lg:px-[96px]"
    >
      <div className="flex max-w-lg flex-col gap-4">
        <h2 className="heading-gradient text-2xl font-bold md:pb-4 md:text-4xl">
          For the gift giver:
        </h2>
        <ol className="list-number-bg list-decimal font-mainText">
          <li className="flex">
            <div className="flex flex-col">
              <h4 className="font-bold text-[#301d38]">
                Create account
              </h4>
              {/* <p className="text-sm md:text-sm xl:text-base">
                Browse by brand, price-point, occasion, or
                vibe to send the perfect set of gifts for
                your recipient to choose from.
              </p> */}
            </div>
          </li>
          <li className="flex">
            <div className="flex flex-col">
              <h4 className="font-bold text-[#301d38]">
                Add your recipients-
              </h4>
              <p className="text-sm md:text-sm xl:text-base">
                Enter the name name, address, and birthday
                for your recipient Select the relevant
                holidays for gifting, and the budget for
                each gift Enter anything else we should
                know.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="flex flex-col">
              <h4 className="font-bold text-[#301d38]">
                Sit back and relax
              </h4>
              {/* <p className="text-sm md:text-sm xl:text-base">
                Choose a send date and add their email; we
                will collect their mailing address on
                redemption.
              </p> */}
              <div>
                <p className="text-sm md:text-sm xl:text-base">
                  - We take care of selecting an appropriate
                  gift based on the information you shared
                </p>
                <p className="text-sm md:text-sm xl:text-base">
                  - We take care of selecting an appropriate
                  gift based on the information you shared
                </p>
                <p className="text-sm md:text-sm xl:text-base">
                  - We take care of selecting an appropriate
                  gift based on the information you shared
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div className="pb-8 md:my-auto md:pb-0">
        <Image
          src={FlowerAndLovers}
          alt="flower"
          className="max-w-[320px] md:max-lg:max-w-[330px] xl:max-w-[500px]"
        />
      </div>
    </div>
  );
};

export default ForTheGiftGiver;
