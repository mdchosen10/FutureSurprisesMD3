"use client";

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import CheckboxInput from "@/components/utils/Checkbox";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import ProductCategoryListing from "@/components/ProductCategoryListing";
import ProductListing from "@/components/ProductListing";
import FilterIcon from "@/../public/icons/filter-icon.svg";
import Image from "next/image";
import * as collectionAction from "@/redux/collections/actions";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { categoryList, checkboxes } from "@/helpers";

const Collections = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params: any = searchParams?.getAll("category");

  const dispatch = useAppDispatch();
  const { products }: any = useAppSelector(
    state => state.collectionSlice,
  );

  const [filter, setFilter] = useState<string[]>([]);

  const [toggleFilterMob, setToggleFilterMob] =
    useState<boolean>(false);

  const isProductListing = params?.length;

  const filteredProducts =
    searchParams?.get("category") === "all"
      ? products
      : products?.filter((product: any) => {
          return product.categories.some((category: any) =>
            params.includes(category.handle),
          );
        });

  const onClickViewAll = () => {
    router.push("/collections/?category=all");
  };

  const onFilterSelection = useCallback(
    (checkbox: any) => {
      const isPresent = filter.some(
        (item: any) => item.value === checkbox.value,
      );
      if (isPresent)
        return setFilter(
          filter.filter(
            (item: any) => item.value !== checkbox.value,
          ),
        );
      setFilter([...filter, checkbox]);
    },
    [filter],
  );

  const categoryCardClick = useCallback(
    (category: any) => {
      onFilterSelection(category);
    },
    [onFilterSelection],
  );

  const onClickClear = () => {
    setFilter([]);
    router.push("/collections");
  };

  useEffect(() => {
    const options = {
      params: {
        expand: "categories",
      },
    };
    const getAllProducts = async () => {
      await dispatch(
        collectionAction.getProducts({ options }),
      );
    };

    getAllProducts();
  }, [dispatch]);

  useEffect(() => {
    if (!filter?.length) return router.push("/collections");
    const queryParams = filter
      .map((checkbox: any) => `category=${checkbox.value}`)
      .join("&");

    router.push(`/collections/?${queryParams}`);
  }, [filter, router]);

  return (
    <div className="grid-flow-col grid-cols-4 gap-4 pt-[96px] font-mainText md:grid md:max-lg:px-8 lg:px-[116px]">
      {/* Filter for mobile */}
      <div
        className={
          toggleFilterMob
            ? "fixed left-0 top-[70px] w-full bg-white p-6 md:hidden"
            : "fixed left-[-100%] md:hidden"
        }
      >
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <h1>Filter</h1>
            <h3
              className="text-primaryViolet"
              onClick={() =>
                setToggleFilterMob(!toggleFilterMob)
              }
            >
              Close
            </h3>
          </div>
          <h1 className="font-semibold text-primaryViolet">
            Price
          </h1>
          {checkboxes.map(
            (item, index) =>
              item.type === "price" && (
                <CheckboxInput
                  key={index}
                  label={item.name}
                  onChange={() => onFilterSelection(item)}
                  checked={filter.some(
                    (checkbox: any) =>
                      checkbox.value === item.value,
                  )}
                />
              ),
          )}
        </div>
        <div className="mb-14 mt-6 flex flex-col gap-4">
          <h1 className="font-semibold text-primaryViolet">
            Categories
          </h1>
          {checkboxes.map(
            (item, index) =>
              item.type === "category" && (
                <CheckboxInput
                  key={index}
                  label={item.name}
                  onChange={() => onFilterSelection(item)}
                  checked={filter?.some(
                    (checkbox: any) =>
                      checkbox.value === item.value,
                  )}
                />
              ),
          )}
        </div>
        <span
          className="ml-2 cursor-pointer rounded-full border border-gray-300 px-4 py-2"
          onClick={onClickClear}
        >
          Clear
        </span>
      </div>

      {/* Desktop */}
      <div className="hidden border-r border-[#a93cc93f] md:block md:min-h-[500px]">
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex justify-between md:hidden">
            <h1>Filter</h1>
            <h3
              className="text-primaryViolet"
              onClick={() =>
                setToggleFilterMob(!toggleFilterMob)
              }
            >
              Close
            </h3>
          </div>
          <h1 className="font-semibold text-primaryViolet">
            Price
          </h1>
          {checkboxes.map(
            (item, index) =>
              item.type === "price" && (
                <CheckboxInput
                  key={index}
                  label={item.name}
                  onChange={() => onFilterSelection(item)}
                  checked={filter?.some(
                    (checkbox: any) =>
                      checkbox.value === item.value,
                  )}
                />
              ),
          )}
        </div>
        <div className="mb-10 mt-6 flex flex-col gap-4">
          <h1 className="font-semibold text-primaryViolet">
            Categories
          </h1>
          {checkboxes.map(
            (item, index) =>
              item.type === "category" && (
                <CheckboxInput
                  key={index}
                  label={item.name}
                  onChange={() => onFilterSelection(item)}
                  checked={filter?.some(
                    (checkbox: any) =>
                      checkbox.value === item.value,
                  )}
                />
              ),
          )}
        </div>
        <button
          onClick={onClickClear}
          type="button"
          className="rounded-full border border-gray-500 px-2 py-1"
        >
          Clear
        </button>
      </div>

      {
        <div
          className={`${
            toggleFilterMob && "hidden"
          } col-span-3 flex flex-col items-center`}
        >
          {isProductListing ? (
            <ProductListing products={filteredProducts} />
          ) : (
            <ProductCategoryListing
              onClickViewAll={onClickViewAll}
              categories={categoryList}
              categoryCardClick={categoryCardClick}
            />
          )}
        </div>
      }
      <Image
        src={FilterIcon}
        alt="filter"
        onClick={() => setToggleFilterMob(!toggleFilterMob)}
        className={`fixed bottom-20 right-8 z-50 h-14 w-14 md:hidden`}
      />
    </div>
  );
};

export default Collections;
