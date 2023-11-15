import React, { FC, forwardRef } from "react";
import Help from "@/../public/icons/help.svg";
import Image from "next/image";
import { Tooltip } from "flowbite-react";
import EyeOpen from "@/../public/icons/eyeOpen.svg";
import EyeClosed from "@/../public/icons/eyeClosed.svg";
import { sysPhone } from "@/helpers";

interface TextInputProps {
  name?: string;
  label?: string;
  placeholder: string;
  value?: string | number;
  errors?: string;
  onChange?: (e: any) => typeof e | void;
  disabled?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  type: "text" | "number" | "email" | "password" | "phone";
  ref?: React.Ref<HTMLInputElement>;
  showHelpIcon?: boolean;
  popOverText?: string;
  isPasswordInput?: boolean;
  isPasswordShow?: boolean;
  setIsPasswordShow?: () => void;
}

const TextInputFloating: FC<TextInputProps> = forwardRef<
  HTMLInputElement,
  TextInputProps
>((props, ref) => {
  const {
    // name,
    // label,
    errors,
    type,
    placeholder,
    value,
    onChange,
    disabled,
    inputClassName,
    labelClassName,
    showHelpIcon,
    name,
    popOverText,
    isPasswordInput,
    isPasswordShow,
    setIsPasswordShow,
  } = props;

  const handleChange = (e: any) => {
    switch (type) {
      case "phone":
        !!onChange &&
          onChange({
            target: {
              name,
              value: sysPhone(e.target.value),
            },
          });
        break;
      default:
        !!onChange && onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative z-0">
        <input
          type={isPasswordShow ? "text" : type}
          name="floating_text_input"
          id={name}
          value={value}
          onChange={handleChange}
          className={`${inputClassName} peer 
            block w-full appearance-none border-0 
            border-b-2 border-gray-300 bg-transparent 
             py-2.5 
            text-sm text-gray-900 
            focus:border-blue-600 focus:outline-none 
            focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500`}
          placeholder=" "
          ref={ref}
          disabled={disabled}
          autoComplete="off"
        />
        <label
          htmlFor="floating_text_input"
          className={`${labelClassName} 
          absolute top-3 -z-10 origin-[0]  
          -translate-y-6 scale-75 transform font-mainText text-xs 
          duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 
          peer-focus:-translate-y-6 
          peer-focus:scale-75 
          peer-focus:font-medium 
          peer-focus:text-blue-600 
          dark:text-gray-400 
          peer-focus:dark:text-blue-500
          md:text-sm
          `}
        >
          {placeholder}
        </label>

        {showHelpIcon && (
          <div className="absolute right-0 top-[15px] ">
            <Tooltip
              content={popOverText}
              placement="top"
              className="w-[200px] text-xs"
            >
              <Image
                src={Help}
                alt="help"
                width={20}
                height={20}
              />
            </Tooltip>
          </div>
        )}

        {isPasswordInput && (
          <div
            className="absolute right-0 top-[8px] z-50 cursor-pointer bg-white"
            onClick={setIsPasswordShow}
          >
            {isPasswordShow ? (
              <Image
                src={EyeOpen}
                alt="help"
                width={22}
                height={22}
              />
            ) : (
              <Image
                src={EyeClosed}
                alt="help"
                width={22}
                height={22}
              />
            )}
          </div>
        )}
      </div>
      <p className="font-mainText text-xs text-red-600">
        {errors}
      </p>
    </div>
  );
});

TextInputFloating.displayName = "TextInputFloating";

export default TextInputFloating;
