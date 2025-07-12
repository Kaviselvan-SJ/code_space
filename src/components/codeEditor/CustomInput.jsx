import React from "react";
import { classnames } from "../../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
  rows="5"
  value={customInput}
  onChange={(e) => setCustomInput(e.target.value)}
  placeholder="Custom input"
  className={classnames(
    "focus:outline-none w-full border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow transition duration-200 mt-2",
    "bg-white text-black",           // light theme
    "dark:bg-[#1e293b] dark:text-white" // dark theme
  )}
></textarea>

    </>
  );
};

export default CustomInput;