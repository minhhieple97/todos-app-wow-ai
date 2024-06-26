import React from "react";
import classnames from "classnames";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      className={classnames(
        "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
        {
          "text-gray-500 placeholder-gray-400": !value,
        }
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export { Input };
