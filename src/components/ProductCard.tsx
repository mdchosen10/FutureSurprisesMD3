import Image from "next/image";
import React from "react";

const ProductCard = (props: any) => {
  const { product, onClick } = props;

  return (
    <div
      className="border-[rgba(108, 102, 114, 0.10)]
    flex h-full w-full transform cursor-pointer 
    flex-col items-center gap-y-4 rounded-lg 
    border p-4 transition-transform hover:scale-105 hover:shadow-2xl"
      onClick={onClick}
    >
      <div className="h-[150px] w-full overflow-hidden">
        <Image
          src={
            product?.thumbnail ??
            "/images/placeholder-image.jpg"
          }
          alt="product"
          className="h-full w-full object-cover"
          width={0}
          height={0}
          unoptimized
        />
      </div>
      <h3 className="w-full overflow-hidden text-ellipsis break-all text-center text-xs font-bold capitalize md:text-sm">
        {product?.title}
      </h3>
    </div>
  );
};

export default ProductCard;
