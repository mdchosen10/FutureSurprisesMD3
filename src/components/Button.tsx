"use client";

import React, { FC } from "react";
import { Spinner } from "flowbite-react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  variant?: string;
  bgClass?: string;
  textClass?: string;
  extraClass?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  render?: Function;
  onClick?: any;
}

const Button: FC<ButtonProps> = props => {
  const {
    name,
    bgClass,
    textClass,
    extraClass,
    type,
    isLoading,
    render,
    ...otherProps
  } = props;

  return (
    <button
      type={type}
      className={`${bgClass} ${textClass} ${extraClass} ${
        isLoading && "flex  justify-center gap-2"
      } border-b-1 rounded-full border py-2 `}
      {...otherProps}
    >
      {name}
      {render && render()}
      {isLoading && <Spinner color="purple" size="sm" />}
    </button>
  );
};

export default Button;
