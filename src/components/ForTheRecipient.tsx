import Image from "next/image";
import React from "react";
import GirlFriendsGift from "@/../public/images/girlfirends-and-gift.png";

const ForTheRecipient = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col justify-between px-5  phone:max-lg:px-14 md:flex-row lg:px-[96px]">
      <div className="mx-auto pb-8 md:mx-0 md:my-auto md:pb-0">
        <Image
          src={GirlFriendsGift}
          alt="flower"
          className="max-w-[260px] phone:max-w-[280px] md:max-lg:max-w-[330px] xl:max-w-[500px]"
        />
      </div>
      <div className="max-w-[500px]">
        <h2 className="heading-gradient pb-8 text-2xl font-bold md:text-4xl">
          For the gift recipient:
        </h2>
        <ol className="list-number-bg list-decimal font-mainText">
          <li className="flex">
            <div className="flex flex-col">
              <h4 className="font-bold text-[#301d38]">
                On time delivery:
              </h4>
              <p className="text-sm md:text-sm xl:text-base">
                We ensure on-time delivery of the the gift
                right to the recipients door step.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="flex flex-col">
              <h4 className="font-bold text-[#301d38]">
                Thoughtful:
              </h4>
              <p className="text-sm md:text-sm xl:text-base">
                We work hard to make sure every gift feels
                meaningful and delights the recipient.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="flex flex-col">
              <h4 className="font-bold text-[#301d38]">
                From you!
              </h4>
              <p className="text-sm md:text-sm xl:text-base">
                We don&apos;t brand the message or any of
                the packaging with Future Surprises&apos;s
                branding so the only one who get&apos;s
                credit for the gift is you.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ForTheRecipient;
