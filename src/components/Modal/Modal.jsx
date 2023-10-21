import React from "react";
import { useLockBodyScroll } from "@uidotdev/usehooks";

const Modal = ({ children, visible, setVisible }) => {
  useLockBodyScroll();

  return (
    <div
      className={
        visible
          ? "fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.5)]  flex justify-center items-center overscroll-contain "
          : "hidden"
      }
      onClick={() => setVisible(false)}
    >
      <div
        className="p-6 bg-white mx-6   min-w-[350px] rounded-2xl  "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
