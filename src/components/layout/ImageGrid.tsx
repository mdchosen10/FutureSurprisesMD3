import Image from "next/image";
import React from "react";

const ImageGrid = ({ images }: { images: string[] }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="flex w-full flex-col gap-5 py-3">
        {images?.length > 0 ? (
          <div className="h-[296px] w-full rounded-lg bg-white shadow-md">
            <Image
              unoptimized
              width={0}
              height={0}
              src={images[0]}
              className="h-full w-full object-contain"
              alt="Gift"
            />
          </div>
        ) : (
          " "
        )}
        {images?.length > 1 ? (
          <div className="h-[387px] w-full rounded-lg bg-white shadow-md">
            <Image
              height={0}
              width={0}
              unoptimized
              src={images[1]}
              className="h-full w-full object-contain"
              alt="Gift"
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex w-full flex-col gap-5 py-3">
        {images?.length > 2 ? (
          <div className="h-[387px] w-full rounded-lg bg-white shadow-md">
            <Image
              height={0}
              width={0}
              unoptimized
              src={images[2]}
              className="h-full w-full object-contain"
              alt="Gift"
            />
          </div>
        ) : (
          ""
        )}{" "}
        {images?.length > 3 ? (
          <div className="h-[296px] w-full rounded-lg bg-white shadow-md">
            <Image
              height={0}
              width={0}
              unoptimized
              src={images[3]}
              className="h-full w-full object-contain"
              alt="Gift"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
