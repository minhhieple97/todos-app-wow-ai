import React from "react";

type MessageProps = {
  message: string;
};

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="bg-red-500 text-white font-semibold py-2 px-4 rounded">
      {message}
    </div>
  );
};

export { Message };
