"use client";

import React from "react";
import { Spinner } from "flowbite-react";

const PageLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner
        aria-label="page-loader"
        size="xl"
        color="purple"
      />
    </div>
  );
};

export default PageLoader;
