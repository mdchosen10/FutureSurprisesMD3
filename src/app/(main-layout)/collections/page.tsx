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
import ProductListing from "@/components/ProductListing";
import FilterIcon from "@/../public/icons/filter-icon.svg";
import Image from "next/image";
import * as collectionAction from "@/redux/collections/actions";
import { useAppDispatch, useAppSelector } from "@/hooks";
import PageLoader from "@/app/loading";

const Collections = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { products, categories, loading } = useAppSelector(
    state => state.collectionSlice,
  );

  const [categoryFilters, setCategoryFilters] =
    useState<any>([]);
  const [priceFilters, setPriceFilters] = useState<any>([]);
  const [mobileFilterVisible, setMobileFilterVisible] =
    useState(false);
  const [priceOptions, setPriceOptions] = useState<
    number[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(collectionAction.getCategories()),
        dispatch(
          collectionAction.getProducts({
            options: { params: { expand: "categories" } },
          }),
        ),
      ]);
    };

    fetchData();
  }, [dispatch]);

  // Set priceOptions based on categories
  useEffect(() => {
    if (categories) {
      const prices = categories
        .filter((category: any) => !isNaN(category?.handle))
        .map((category: any) => Number(category?.handle));
      setPriceOptions(prices);
    }
  }, [categories]);

  useEffect(() => {
    const categoryParams =
      searchParams?.getAll("category") || [];
    const priceParams = searchParams?.getAll("price") || [];

    if (categoryParams.length > 0) {
      const selectedCategories =
        categories?.filter((cat: any) =>
          categoryParams.includes(cat.handle),
        ) || [];
      setCategoryFilters(selectedCategories);
    }

    if (priceParams.length > 0) {
      setPriceFilters(
        priceParams.map((price: any) => parseInt(price)),
      );
    }
  }, [searchParams, categories]);

  useEffect(() => {
    if (
      categoryFilters.length === 0 &&
      priceFilters.length === 0
    ) {
      router.push("/collections");
      return;
    }

    const categoryParams = categoryFilters
      .map((category: any) => `category=${category.handle}`)
      .join("&");

    const priceParams = priceFilters
      .map((price: any) => `price=${price}`)
      .join("&");

    const queryString = [categoryParams, priceParams]
      .filter(Boolean)
      .join("&");

    router.push(`/collections/?${queryString}`);
  }, [categoryFilters, priceFilters, router]);

  const toggleCategoryFilter = useCallback(
    (category: any) => {
      setCategoryFilters((prevFilters: any) => {
        const isSelected = prevFilters.some(
          (item: any) => item.handle === category.handle,
        );
        return isSelected
          ? prevFilters.filter(
              (item: any) =>
                item.handle !== category.handle,
            )
          : [...prevFilters, category];
      });
    },
    [],
  );

  const togglePriceFilter = useCallback(
    (priceValue: any) => {
      setPriceFilters((prevFilters: any) => {
        const isSelected = prevFilters.includes(priceValue);
        return isSelected
          ? prevFilters.filter(
              (price: any) => price !== priceValue,
            )
          : [...prevFilters, priceValue];
      });
    },
    [],
  );

  const clearAllFilters = () => {
    setCategoryFilters([]);
    setPriceFilters([]);
    router.push("/collections");
  };

  const filteredProducts = products?.filter(
    (product: any) => {
      if (
        categoryFilters?.length === 0 &&
        priceFilters?.length === 0
      ) {
        return true;
      }

      const matchesCategory =
        categoryFilters?.length === 0 ||
        product.categories?.some((category: any) =>
          categoryFilters.some(
            (filter: any) =>
              filter?.handle === category?.handle,
          ),
        );

      const matchesPrice =
        priceFilters?.length === 0 ||
        product.categories?.some((category: any) =>
          priceFilters.some(
            (filter: any) =>
              filter === Number(category?.handle),
          ),
        );

      return matchesCategory && matchesPrice;
    },
  );

  // Filter section component to avoid repetition
  const FilterSection = ({ isMobile = false }) => (
    <>
      <div className="mt-4 flex flex-col gap-4">
        {isMobile && (
          <div className="flex justify-between">
            <h1>Filter</h1>
            <h3
              className="cursor-pointer text-primaryViolet"
              onClick={() => setMobileFilterVisible(false)}
            >
              Close
            </h3>
          </div>
        )}
        {priceOptions?.length ? (
          <>
            <h1 className="font-semibold text-primaryViolet">
              Price
            </h1>
            {priceOptions.map((price: number) => (
              <CheckboxInput
                key={`price-${price}`}
                label={`Under ${price}`}
                onChange={() => togglePriceFilter(price)}
                checked={priceFilters.includes(price)}
              />
            ))}
          </>
        ) : (
          ""
        )}
      </div>

      {categories?.length ? (
        <>
          <div
            className={`${
              isMobile ? "mb-14" : "mb-10"
            } mt-6 flex flex-col gap-4`}
          >
            <h1 className="font-semibold text-primaryViolet">
              Categories
            </h1>
            {categories?.map(
              (category: any) =>
                !priceOptions?.includes(
                  Number(category?.handle),
                ) && (
                  <CheckboxInput
                    key={`category-${category?.handle}`}
                    label={category?.name}
                    onChange={() =>
                      toggleCategoryFilter(category)
                    }
                    checked={categoryFilters.some(
                      (item: any) =>
                        item.handle === category.handle,
                    )}
                  />
                ),
            )}
          </div>
          <button
            onClick={clearAllFilters}
            type="button"
            className={`rounded-full border ${
              isMobile
                ? "border-gray-300"
                : "border-gray-500"
            } px-4 py-2`}
          >
            Clear
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="grid-flow-col grid-cols-4 gap-4 pt-[96px] font-mainText md:grid md:max-lg:px-8 lg:px-[116px]">
          <div
            className={
              mobileFilterVisible
                ? "fixed left-0 top-[70px] z-40 w-full bg-white p-6 md:hidden"
                : "fixed left-[-100%] md:hidden"
            }
          >
            <FilterSection isMobile={true} />
          </div>

          <div className="hidden border-r border-[#a93cc93f] md:block md:min-h-[500px]">
            <FilterSection />
          </div>

          <div
            className={`${
              mobileFilterVisible && "hidden"
            } col-span-3 flex flex-col items-center`}
          >
            <ProductListing products={filteredProducts} />
          </div>

          <Image
            src={FilterIcon}
            alt="filter"
            onClick={() =>
              setMobileFilterVisible(!mobileFilterVisible)
            }
            className="fixed bottom-20 right-8 z-50 h-14 w-14 cursor-pointer md:hidden"
          />
        </div>
      )}
    </>
  );
};

export default Collections;
