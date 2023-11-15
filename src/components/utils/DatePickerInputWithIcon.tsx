"use client";

import { forwardRef } from "react";

const DatepickerInputWithIcon = forwardRef(
  (
    { value, onClick, onChange, disabled }: any,
    ref: any,
  ) => {
    // console.log(disabled);

    return (
      <input
        value={value}
        className="example-custom-input rounded-lg border border-gray-300"
        onClick={onClick}
        placeholder="Pick date"
        onChange={onChange}
        disabled={disabled}
        ref={ref}
      ></input>
    );
  },
);

DatepickerInputWithIcon.displayName =
  "DatepickerInputWithIcon";

export default DatepickerInputWithIcon;
