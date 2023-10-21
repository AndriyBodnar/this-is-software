import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="py-2.5 px-6 rounded-lg font-medium transition-all bg-[#3772FF] text-[#e6e8e6] uppercase  text-base border active:border-[#FDCA40] hover:bg-[#FDCA40] hover:text-[#e6e8e6] cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
