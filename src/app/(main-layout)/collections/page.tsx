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

const Collections = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { products, categories } = useAppSelector(
    state => state.collectionSlice,
  );

  const [categoryFilters, setCategoryFilters] = useState(
    [],
  );
  const [priceFilters, setPriceFilters] = useState([]);
  const [mobileFilterVisible, setMobileFilterVisible] =
    useState(false);

  // Price options for filter UI
  const priceOptions = [30, 40, 60, 100];

  // Load data on component mount
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

  // Initialize filters from URL on page load
  useEffect(() => {
    const categoryParams =
      searchParams?.getAll("category") || [];
    const priceParams = searchParams?.getAll("price") || [];

    if (categoryParams.length > 0) {
      const selectedCategories =
        categories?.filter(cat =>
          categoryParams.includes(cat.handle),
        ) || [];
      setCategoryFilters(selectedCategories);
    }

    if (priceParams.length > 0) {
      setPriceFilters(
        priceParams.map(price => parseInt(price)),
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
      .map(category => `category=${category.handle}`)
      .join("&");

    const priceParams = priceFilters
      .map(price => `price=${price}`)
      .join("&");

    const queryString = [categoryParams, priceParams]
      .filter(Boolean)
      .join("&");

    router.push(`/collections/?${queryString}`);
  }, [categoryFilters, priceFilters, router]);

  const toggleCategoryFilter = useCallback(category => {
    setCategoryFilters(prevFilters => {
      const isSelected = prevFilters.some(
        item => item.handle === category.handle,
      );
      return isSelected
        ? prevFilters.filter(
            item => item.handle !== category.handle,
          )
        : [...prevFilters, category];
    });
  }, []);

  const togglePriceFilter = useCallback(priceValue => {
    setPriceFilters(prevFilters => {
      const isSelected = prevFilters.includes(priceValue);
      return isSelected
        ? prevFilters.filter(price => price !== priceValue)
        : [...prevFilters, priceValue];
    });
  }, []);

  const clearAllFilters = () => {
    setCategoryFilters([]);
    setPriceFilters([]);
    router.push("/collections");
  };

  const filteredProducts = products?.filter(product => {
    if (
      categoryFilters.length === 0 &&
      priceFilters.length === 0
    ) {
      return true;
    }

    const matchesCategory =
      categoryFilters.length === 0 ||
      product.categories?.some(category =>
        categoryFilters.some(
          filter => filter.handle === category.handle,
        ),
      );

    const productPrice = parseInt(
      product.metadata?.price || 0,
    );
    const matchesPrice =
      priceFilters.length === 0 ||
      priceFilters.some(
        maxPrice => productPrice == maxPrice,
      );

    return matchesCategory && matchesPrice;
  });

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
        <h1 className="font-semibold text-primaryViolet">
          Price
        </h1>
        {priceOptions.map(price => (
          <CheckboxInput
            key={`price-${price}`}
            label={`Under ${price}`}
            onChange={() => togglePriceFilter(price)}
            checked={priceFilters.includes(price)}
          />
        ))}
      </div>

      <div
        className={`${
          isMobile ? "mb-14" : "mb-10"
        } mt-6 flex flex-col gap-4`}
      >
        <h1 className="font-semibold text-primaryViolet">
          Categories
        </h1>
        {categories?.map(category => (
          <CheckboxInput
            key={`category-${category.handle}`}
            label={category.name}
            onChange={() => toggleCategoryFilter(category)}
            checked={categoryFilters.some(
              item => item.handle === category.handle,
            )}
          />
        ))}
      </div>

      <button
        onClick={clearAllFilters}
        type="button"
        className={`rounded-full border ${
          isMobile ? "border-gray-300" : "border-gray-500"
        } px-4 py-2`}
      >
        Clear
      </button>
    </>
  );

  return (
    <div className="grid-flow-col grid-cols-4 gap-4 pt-[96px] font-mainText md:grid md:max-lg:px-8 lg:px-[116px]">
      <div
        className={
          mobileFilterVisible
            ? "fixed left-0 top-[70px] z-50 w-full bg-white p-6 md:hidden"
            : "fixed left-[-100%] md:hidden"
        }
      >
        <FilterSection isMobile={true} />
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden border-r border-[#a93cc93f] md:block md:min-h-[500px]">
        <FilterSection />
      </div>

      {/* Product Grid */}
      <div
        className={`${
          mobileFilterVisible && "hidden"
        } col-span-3 flex flex-col items-center`}
      >
        <ProductListing products={filteredProducts || []} />
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
  );
};

export default Collections;
