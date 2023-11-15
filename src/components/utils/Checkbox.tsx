"use client";

import React, { forwardRef } from "react";

interface CheckboxInputProps {
  name?: string;
  disabled?: boolean;
  label?: string;
  id?: string;
  onChange?: () => void;
  onBlur?: () => void;
  checked?: boolean;
  defaultChecked?: boolean;
  labelClassName?: string;
  classes?: string;
  isCustomHolidayCheckbox?: boolean;
}

const CheckboxInput = forwardRef<
  HTMLInputElement,
  CheckboxInputProps
>((props, ref) => {
  const {
    name,
    label,
    onChange,
    onBlur,
    checked,
    disabled,
    defaultChecked,
    labelClassName,
    classes,
    isCustomHolidayCheckbox,
  } = props;

  return (
    <div className="mr-4 flex items-start">
      <input
        checked={checked}
        id={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        type="checkbox"
        disabled={disabled}
        // title="test"
        defaultChecked={defaultChecked}
        className={`h-4
          w-4
          ${
            isCustomHolidayCheckbox
              ? "gray cursor-default"
              : ""
          } 
          cursor-pointer 
          rounded
          border-gray-300	
          bg-gray-100 
          bg-none 
          text-purple-600 
          focus:ring-2 
          focus:ring-white dark:border-gray-600 
          dark:bg-gray-700
          dark:ring-offset-gray-800 dark:focus:ring-purple-600 ${classes}`}
      />
      <label
        // htmlFor={name}
        // onClick={onChange}
        className={`${labelClassName} ml-2  font-normal text-gray-900 dark:text-gray-300`}
      >
        {label}
      </label>
    </div>
  );
});

CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
