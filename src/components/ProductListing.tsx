import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Modal } from "flowbite-react";
import Image from "next/image";
import CloseIcon from "@/../public/icons/close-modal.svg";
// import { Pagination } from "flowbite-react";
// import type { CustomFlowbiteTheme } from "flowbite-react";
// import { Flowbite } from "flowbite-react";

// const paginationTheme: CustomFlowbiteTheme = {
//   pagination: {
//     pages: {
//       base: "xs:mt-0 mt-2 inline-flex items-center gap-2 -space-x-px",
//       previous: {
//         base: "ml-0 rounded-full  bg-white py-2 px-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
//       },
//       next: {
//         base: "ml-0 rounded-full  bg-white py-2 px-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
//       },
//       selector: {
//         base: "w-10 rounded-full border border-gray-300 bg-white py-2 leading-tight text-black enabled:hover:bg-primaryViolet enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
//         active:
//           "bg-primaryViolet text-white hover:bg-primaryViolet hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
//       },
//     },
//   },
// };

const ProductListing = (props: any) => {
  const { products } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] =
    useState<any>(true);

  const onProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const onPageChange = (page: number) =>
  //   setCurrentPage(page);

  return (
    <>
      <Modal
        dismissible={false}
        show={isOpen}
        onClose={() => setIsOpen(false)}
        className="h-auto"
      >
        <div className="flex flex-col items-center gap-4 p-4 font-mainText ">
          <Image
            src={CloseIcon}
            alt="close"
            onClick={() => setIsOpen(false)}
            className="ml-auto cursor-pointer"
          />
          <div className="flex flex-col items-center gap-4 px-6">
            <Image
              src={selectedProduct.thumbnail}
              alt="close"
              className="bg-gray-200"
              width={200}
              height={200}
            />
            <h3>{selectedProduct.title}</h3>
            <p className="pb-9 text-center text-sm text-[#6C6672]">
              {selectedProduct.description}
            </p>
          </div>
        </div>
      </Modal>
      <div className="my-6 flex flex-wrap justify-center gap-4 md:justify-start">
        {!products?.length && (
          <p>
            Oops! There are no products for the selected
            category(s)
          </p>
        )}
        {products?.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>
      {/* <Flowbite theme={{ theme: paginationTheme }}>
        <Pagination
          currentPage={currentPage}
          onPageChange={page => {
            onPageChange(page);
          }}
          showIcons
          totalPages={100}
          nextLabel=""
          previousLabel=""
        />
      </Flowbite> */}
    </>
  );
};

export default ProductListing;
