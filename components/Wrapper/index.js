import React from "react";

const Wrapper = ({ children, last = false }) => {
  return (
    <div
      className={`max-w-[999px] m-[0_auto] mt-20 ${last ? "mb-20" : ""} h-full`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
