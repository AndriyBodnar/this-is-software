import React, { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { useLockBodyScroll } from "@uidotdev/usehooks";

const Loading = () => {
  useLockBodyScroll();
  return (
    <div className=" h-[900px] flex items-center justify-center">
      <TypeAnimation
        sequence={[`This\nIs\nSoftware...`, 1000, ""]}
        speed={25}
        style={{ whiteSpace: "pre-line", fontSize: "3rem" }}
        repeat={Infinity}
      />
    </div>
  );
};

export default Loading;
