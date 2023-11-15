import Image from "next/image";
import React from "react";

const ProductCard = (props: any) => {
  const { product, onClick } = props;

  return (
    <div
      className="border-[rgba(108, 102, 114, 0.10)] md-8 
    flex w-[173px] transform cursor-pointer
    flex-col
    items-center
    gap-2 rounded-lg 
    border p-4 transition-transform 
    hover:scale-105 
    hover:shadow-2xl
    md:max-h-[325px]
    md:w-auto md:max-w-[200px]"
      onClick={onClick}
    >
      <Image
        src={product?.thumbnail}
        alt="product"
        className="max-h-[70px] max-w-[66px] md:h-[145px] md:w-[120px]"
        width={150}
        height={150}
      />
      <h3 className="break-all text-xs font-bold md:text-sm">
        {product?.title}
      </h3>
      <p className="break-all text-center text-xs text-[#6C6672] md:text-sm">
        {product?.description}
      </p>
    </div>
  );
};

export default ProductCard;
