import React from "react";
import "./style.css";
const Header = ({bennerTittle}) => {
  return (
    <div className="h-300px w-[100%] bg-no-repeat center  bg-imag">
        <div className="flex ">
        <h1 className="text-[#fff] text-[40px] font-[700] font text-center uppercase" >{bennerTittle}</h1>

        </div>
    </div>
  );
};

export default Header;
