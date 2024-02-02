import React from "react";
import classnames from "classnames";

interface TextAreaProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange }) => {
  return (
    <textarea
      className={classnames(
        "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
        {
          "text-gray-500 placeholder-gray-400": !value,
        }
      )}
      value={value}
      onChange={onChange}
    />
  );
};

export { TextArea };
