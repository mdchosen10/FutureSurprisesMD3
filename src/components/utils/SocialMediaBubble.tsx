import Image from "next/image";
import React, { FC } from "react";

interface SocialMediaBubbleProps {
  name?: string;
  icon?: any;
  className?: string;
  onClick?: () => void;
  type: "button";
}

const SocialMediaBubble: FC<
  SocialMediaBubbleProps
> = props => {
  const { name, icon, className, onClick, type } = props;
  return (
    <button
      className={`${className}  w-full 
      justify-center 
      rounded-full 
      p-2 
      lg:w-full `}
      onClick={onClick}
      type={type}
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

export default SocialMediaBubble;
