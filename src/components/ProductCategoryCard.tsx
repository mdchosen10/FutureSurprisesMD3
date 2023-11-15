import React from "react";
import Image, { StaticImageData } from "next/image";

interface ProductCategoryCardProps {
  image: StaticImageData;
  name: string;
}

const ProductCategoryCard = ({
  image,
  name,
}: ProductCategoryCardProps) => {
  return (
    <div className="flex  max-w-[361px] transform cursor-pointer items-center rounded-lg border border-gray-300 transition-transform hover:scale-105 hover:shadow-2xl min-[320px]:w-[361px] md:h-[250px] md:w-[250px] md:justify-center">
      <div className="ml-4 flex items-center gap-11 md:ml-0 md:flex-col">
        <Image
          src={image}
          alt="category"
          width={80}
          height={90}
        />
        <p>{name}</p>
      </div>
    </div>
  );
};

export default ProductCategoryCard;
