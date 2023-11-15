/* eslint-disable no-unused-vars */
import React, { FC, forwardRef } from "react";

interface TextAreaProps {
  name?: string;
  label?: string;
  placeholder: string;
  value?: string | number;
  errors?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  disabled?: boolean;
  className?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const TextArea: FC<TextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>((props, ref) => {
  const {
    // name,
    // label,
    // errors,
    placeholder,
    value,
    onChange,
    disabled,
    className,
  } = props;

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      disabled={disabled}
      className={className}
      rows={3}
    />
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
