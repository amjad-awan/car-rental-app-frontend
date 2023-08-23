
"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { BiLogoFacebook, BiLogoTwitter, BiLogoLinkedin } from "react-icons/bi";
import { TfiYoutube } from "react-icons/tfi";
import { AiOutlineGoogle, AiOutlineInstagram } from "react-icons/ai";
import { LuMapPin } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { BsHeadphones } from "react-icons/bs";
import { RxCaretRight } from "react-icons/rx";

import footerLogo from "../../assets/images/footer-logotype-min-1.png";
const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="bg-[#121820] pt-[100px] w-[100%] relative ">
      {isVisible && (
        <button
          className="bg-[#d01818] w-[50px] h-[50px] fixed right-2 bottom-2 uppercase text-[22px] mt-[30px] text-[#fff]"
          onClick={scrollToTop}
        >
          {/* You can add a top-scrolling icon or any other content here */}
          <span>&uarr;</span>
        </button>
      )}

      <div className="container mx-auto px-[20px]">
        <div className="flex justify-center flex-col items-center gap-8">
          <Image
            src={footerLogo}
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
          />
          <div className="flex gap-3">
            <a
              href="#"
              className="h-[35px] w-[35px] rounded-full text-[#a9aeb3] hover:text-[#fff] bg-[#253241] hover:bg-[#d01818] flex justify-center items-center"
            >
              <BiLogoFacebook />
            </a>
            <a
              href="#"
              className="h-[35px] w-[35px] rounded-full text-[#a9aeb3] hover:text-[#fff] bg-[#253241] hover:bg-[#d01818] flex justify-center items-center"
            >
              <BiLogoTwitter />
            </a>
            <a
              href="#"
              className="h-[35px] w-[35px] rounded-full text-[#a9aeb3] hover:text-[#fff] bg-[#253241] hover:bg-[#d01818] flex justify-center items-center"
            >
              <BiLogoLinkedin />
            </a>
            <a
              href="#"
              className="h-[35px] w-[35px] rounded-full text-[#a9aeb3] hover:text-[#fff] bg-[#253241] hover:bg-[#d01818] flex justify-center items-center"
            >
              <TfiYoutube />
            </a>
            <a
              href="#"
              className="h-[35px] w-[35px] rounded-full text-[#a9aeb3] hover:text-[#fff] bg-[#253241] hover:bg-[#d01818] flex justify-center items-center"
            >
              <AiOutlineGoogle />
            </a>
            <a
              href="#"
              className="h-[35px] w-[35px] rounded-full text-[#a9aeb3] hover:text-[#fff] bg-[#253241] hover:bg-[#d01818] flex justify-center items-center"
            >
              <AiOutlineInstagram />
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 mt-[80px]">
          <div className="w-[100%]">
            <h3 className="text-[22px] font-[700] text-[#fff] mb-[30px]">
              About Us
            </h3>
            <p className="text-[#a9aeb3]">
              Ceipisicing elit sed do eiusmod tempor laboe dolore magna aliqa.
            </p>
            <div className="mt-[50px] mb-2 flex justify-start items-center gap-[20px]">
              <LuMapPin className="text-[#a9aeb3] text-[22px]" />
              <p className="text-[#a9aeb3] capitalize mb-2 text-[18px] font-[400] hover:text-[#a9aeb3]">
                3135 Oliver St, Fort Worth TX 76134
              </p>
            </div>
            <div className="flex justify-start items-center gap-[20px]">
              <HiOutlineMail className="text-[#a9aeb3] text-[22px]" />
              <a
                href="mailto:support@domain.com"
                className="text-[#a9aeb3] capitalize mb-2 text-[18px] font-[400] hover:text-[#a9aeb3]"
              >
                support@domain.com
              </a>
            </div>
            <div className="flex justify-start items-center gap-[20px]">
              <BsHeadphones className="text-[#a9aeb3] text-[22px]" />
              <p className="text-[#a9aeb3] capitalize mb-2 text-[18px] font-[400] hover:text-[#a9aeb3]">
                Phone:+ (123) 456 74700
              </p>
            </div>
          </div>
          <div className="w-[100%]">
            <h3 className="text-[22px] font-[700] text-[#fff] mb-[30px]">
              Customer Links
            </h3>
            <div className="sm:w-[100%] lg:w-[90%]">
              <div className="flex justify-between mb-[10px] gap-10 items-center">
                <a
                  href="#"
                  className="flex justify-start items-center gap-1 w-[50%] text-[#a9aeb3] capitalize mb-2 text-[17px] font-[400] hover:text-[#a9aeb3]"
                >
                  <RxCaretRight /> Latest Cars
                </a>
                <a
                  href="#"
                  className="flex justify-start items-center gap-1 w-[50%] text-[#a9aeb3] capitalize mb-2 text-[17px] font-[400] hover:text-[#a9aeb3]"
                >
                  <RxCaretRight /> Services
                </a>
              </div>
              <div className="flex justify-between mb-[10px] gap-10 items-center">
                <a
                  href="#"
                  className="flex justify-start items-center gap-1 w-[50%] text-[#a9aeb3] capitalize mb-2 text-[17px] font-[400] hover:text-[#a9aeb3]"
                >
                  <RxCaretRight /> Featured Cars
                </a>
                <a
                  href="#"
                  className="flex justify-start items-center gap-1 w-[50%] text-[#a9aeb3] capitalize mb-2 text-[17px] font-[400] hover:text-[#a9aeb3]"
                >
                  <RxCaretRight />
                  About Us
                </a>
              </div>
              <div className="flex justify-between mb-[10px] gap-10 items-center">
                <a
                  href="#"
                  className="flex justify-start items-center gap-1 w-[50%] text-[#a9aeb3] capitalize mb-2 text-[17px] font-[400] hover:text-[#a9aeb3]"
                >
                  <RxCaretRight /> Sell Your Car
                </a>
                <a
                  href="#"
                  className="flex justify-start items-center gap-1 w-[50%] text-[#a9aeb3] capitalize mb-2 text-[17px] font-[400] hover:text-[#a9aeb3]"
                >
                  <RxCaretRight /> Inventory
                </a>
              </div>
              <div className="flex justify-between mb-[10px] gap-10 items-center">
                <a
                  href="#"
                  className="flex justify-start items-center gap-1 w-[50%] text-[#a9aeb3] capitalize mb-2 text-[17px] font-[400] hover:text-[#a9aeb3]"
                >
                  <RxCaretRight /> Reviews
                </a>
                <a
                  href="#"
                  className="flex justify-start items-center gap-1 w-[50%] text-[#a9aeb3] capitalize mb-2 text-[17px] font-[400] hover:text-[#a9aeb3]"
                >
                  <RxCaretRight /> Contacts
                </a>
              </div>
            </div>
          </div>
          <div className="w-[100%]">
            <h3 className="text-[22px] font-[700] text-[#fff] mb-[30px]">
              Subscribe Newsletter
            </h3>
            <p className="text-[#a9aeb3]">
              Get our weekly newsletter for latest car news exclusive offers and
              deals and more.
            </p>

            <form action="" className="mt-[20px]">
              <input
                type="text"
                className="py-[15px] px-5 bg-[#fff] w-[100%]"
                placeholder="YOUR EMAIL*"
              />
            </form>
            <button className="bg-[#d01818] uppercase text-[22px] mt-[30px] px-[20px] py-[15px] text-[#fff]">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="w-[100%] mt-[100px] border-t-[1px] border-t-[#a9aeb31a] py-[50px] ">
        <p className="text-[#a9aeb3] text-center  capitalize mb-2 text-[18px] font-[400] hover:text-[#a9aeb3]">
          Copyrights (c) 2020 Revus - Auto Dealer Theme. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
