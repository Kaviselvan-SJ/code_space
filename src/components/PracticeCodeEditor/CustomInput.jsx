import React from "react";
import { classnames } from "../../utils/general";

const CustomInput = ({ readOnlyInput }) => {
  return (
    <div className="mt-2">
      <label className="block mb-1 font-medium">Test Case Input:</label>
      <textarea
        rows="5"
        value={readOnlyInput}
        readOnly
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md px-4 py-2",
          "bg-gray-100 text-black cursor-not-allowed",
          "dark:bg-[#1e293b] dark:text-white"
        )}
      />
    </div>
  );
};

export default CustomInput;
