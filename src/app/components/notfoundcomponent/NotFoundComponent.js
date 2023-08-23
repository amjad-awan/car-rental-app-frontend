import React from "react";

const NotFoundComponent = ({text}) => {
  return (
    <div className="w-[100%] mx-auto mt-[20px] flex justify-center items-center h-[300px] border-dashed border-[5px]">
      <h3 className="font-[600] uppercase text-[20px] text-[#c0bfbf]">{text}</h3>
    </div>
  );
};

export default NotFoundComponent;
