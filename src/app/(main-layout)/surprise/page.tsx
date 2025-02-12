"use client";

import FilloutForm from "@/components/FilloutForm";
import React, { useEffect, useState } from "react";

const Surprise = () => {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");
    const formData =
      sessionStorage.getItem("formData") ?? "{}";
    if (
      formData &&
      Object.keys(JSON.parse(formData))?.length > 0 &&
      redirect &&
      redirect == "true"
    ) {
      setHasData(true);
    }
  }, []);
  return (
    <div className="flex h-full min-h-screen w-screen pt-[85px]">
      <FilloutForm hasData={hasData} />
    </div>
  );
};

export default Surprise;
