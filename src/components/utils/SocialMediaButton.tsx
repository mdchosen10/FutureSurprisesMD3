import Image from "next/image";
import React, { FC } from "react";

interface SocialMediaButtonProps {
  name: string;
  icon?: any;
  className?: string;
  onClick: () => void;
}

const SocialMediaButton: FC<
  SocialMediaButtonProps
> = props => {
  const { name, icon, className, onClick } = props;
  return (
    <button
      className={`${className} flex w-full flex-row items-center justify-center gap-5 rounded-full px-6 py-2 md:px-14 md:py-3 lg:w-full`}
      onClick={onClick}
    >
      <Image
        src={icon}
        alt="social"
        width={25}
        height={25}
        className="max-h-[25px] max-w-[25px]"
      />
      <p>{name}</p>
    </button>
  );
};

export default SocialMediaButton;
