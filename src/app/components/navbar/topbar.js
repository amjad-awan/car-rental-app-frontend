import React from "react";
import "./style.css";
import { BiSolidUserCircle } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import useMenuToggle from "@/app/helpers";
import Link from "next/link";

const Topbar = ({ showMenu }) => {
  return (
    <div className="flex relative bg-[#253241] justify-between items-center px-[20px] py-3 min-h-[63px]">
      <span
        className="md:hidden flex cursor-pointer justify-center items-center p-[10px] text-[#fff] border"
        onClick={showMenu}
      >
        <FaBars />
      </span>
      <div className=" hidden lg:flex absolute left-0 top-[0%] h-[100%] w-[200px] bg-white topbar-after">
        <div className="triangle"></div>
      </div>
      <div className="max-w-[900px] hidden mx-auto lg:flex justify-center md:justify-end items-center  ">
        <a
          href="mailto:support@domain.com"
          className="text-[#fff] relative px-[20px] transition duration-150 ease-in-out hover:text-[#d01818]"
        >
          support@domain.com
          <span className="absolute right-0 top-[50%] bottom-[50%] h-[15px] w-[.5px] translate-x-[-50%] translate-y-[-50%] bg-white"></span>
        </a>
        <p className="text-[#fff] relative px-[20px]">
          Mon to Fri : 9:00am to 6:00pm
          <span className="absolute right-0 top-[50%] bottom-[50%] h-[15px] w-[.5px] translate-x-[-50%] translate-y-[-50%] bg-white"></span>
        </p>
        <p className="text-[#fff] px-[20px]">
          Fairview Ave, El Monte, CA 91732
        </p>
      </div>
      {!localStorage.getItem("user") && (
        <div className="lg:hidden flex cursor-pointer items-center justify-center gap-4 text-[#fff] pr-3">
          <Link
            href="/login"
            className="flex text-[#fff] cursor-pointer items-center justify-center gap-2"
          >
            <BiSolidUserCircle />
            Login
          </Link>
          <Link
            href="/register"
            className="flex text-[#fff] cursor-pointer items-center justify-center gap-2"
          >
            <FiUserPlus />
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Topbar;
