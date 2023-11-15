/* eslint-disable no-unused-vars */
import React, { FC, useCallback } from "react";
import ProductCategoryCard from "./ProductCategoryCard";
import Button from "./Button";

const ProductCategoryListing: FC<{
  categories: any;
  categoryCardClick: Function;
  onClickViewAll: Function;
}> = props => {
  const { categories, categoryCardClick, onClickViewAll } =
    props;

  return (
    <div className="col-span-2 flex flex-col items-center">
      <div className="mt-6 flex flex-col justify-center gap-4 md:flex-row md:flex-wrap">
        {categories?.map((category: any) => (
          <div
            key={category.id}
            onClick={() => categoryCardClick(category)}
          >
            <ProductCategoryCard
              image={category.img}
              name={category.name}
            />
          </div>
        ))}
      </div>
      <div className="my-6">
        <Button
          type="button"
          name="View all"
          onClick={onClickViewAll}
          bgClass="bg-gradient-to-r from-[#2c2434] to-[#bc66d7] shadow-md"
          textClass="text-white"
          extraClass="max-w-[130px] px-4"
        />
      </div>
    </div>
  );
};

export default ProductCategoryListing;
