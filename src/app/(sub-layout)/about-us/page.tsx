import React from "react";
import Image from "next/image";

import FamilyImage from "../../../../public/images/family.jpg";

const AboutUs = () => {
  return (
    <div className="mx-auto mt-0 flex w-full flex-col gap-[40px] px-3 py-[60px] font-[600] md:px-5 lg:my-[96px] lg:flex-row lg:px-10 3xl:px-0">
      <div className="mx-auto w-full lg:w-[40%]">
        <Image
          className="mx-auto"
          src={FamilyImage}
          alt=""
        />
      </div>
      <div className="mx-auto flex w-full flex-col lg:w-[60%]">
        <h1 className="heading-gradient mb-[25px] text-[30px] font-bold lg:text-[36px]">
          About Us
        </h1>
        <p className="font-mainText text-[14px] font-[400] leading-8 text-[#6C6672] lg:text-[15px]">
          Future Surprises is an innovative gift-giving
          platform that simplifies the process for users.
          Our platform allows users to easily log in,
          identify their loved ones, select relevant
          holidays, and set a default gift amount per
          person. We understand the importance of
          remembering important dates and choosing
          meaningful gifts, which is why we provide a
          hassle-free solution. With our service, users
          receive timely reminders, giving them the
          opportunity to confirm, adjust the gift amount,
          and customize a heartfelt message. If no action is
          taken, we automatically select and send a
          thoughtful gift on their behalf. Future Surprises
          is here to make gift-giving a seamless and
          enjoyable experience for everyone.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
