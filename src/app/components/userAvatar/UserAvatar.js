"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import userImage from "../../assets/images/User-avatar.png";
import Image from "next/image";
import { useUserContext } from "@/app/context/authContext";

import { BiUserCircle } from "react-icons/bi";
import { FiLogOut, FiEdit } from "react-icons/fi";
import { GoListUnordered } from "react-icons/go";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrdersContext } from "@/app/context/orderContext";

const UserAvatar = ({ user }) => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const { orders, getOrder } = useOrdersContext();
  const [ordersLength, setOrdersLength] = useState(null);

  useEffect(() => {
    getOrder();
    getOrdersLength();
  }, []);
  const getOrdersLength = () => {
    let count = 0;
    orders.map((order) => {
      if (order.orderstatus == "not accepted") {
        ++count;
      }
    });
    setOrdersLength(count);
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };
  return (
    <div class="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
      <div class="flex items-center justify-center">
        <div class=" relative inline-block text-left dropdown">
          <span class="rounded-md shadow-sm">
            <button
              class="relative inline-flex justify-center items-center w-[50px] h-[50px] rounded-[50%] px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300  hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              type="button"
              aria-haspopup="true"
              aria-expanded="true"
              aria-controls="headlessui-menu-items-117"
            >
              <Image
                src={userImage}
                alt=""
                width={50}
                height={50}
                className="rounded-[50%]"
              />
              {ordersLength > 0 && (
                <div className="absolute top-[-10px] text-[#fff] left-[-10px] w-[30px] h-[30px] rounded-full bg-[#d01818] flex justify-center items-center ">
                  {ordersLength}
                </div>
              )}
            </button>
          </span>
          <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
            <div
              class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              aria-labelledby="headlessui-menu-button-1"
              id="headlessui-menu-items-117"
              role="menu"
            >
              <div class="px-4 py-3">
                <p class="text-sm leading-5">Signed in as</p>
                <p class="text-sm font-medium leading-5 text-gray-900 truncate">
                  {user?.username}
                </p>
              </div>
              <div class="py-1">
                <a
                  href="javascript:void(0)"
                  tabindex="0"
                  class="text-gray-700 flex justify-start items-center gap-2 w-full px-4 py-2 text-sm leading-5 text-left"
                  role="menuitem"
                >
                  <BiUserCircle />
                  {user?.phone}
                </a>
              </div>
              {user?.vehicleadded && (
                <div class="py-1">
                  <Link
                    href="/orders"
                    target="_blank"
                    tabindex="3"
                    class="text-gray-700 flex justify-start items-center gap-2 w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                  >
                    <GoListUnordered />
                    your bookings
                  </Link>
                </div>
              )}
              {user?.vehicleadded && (
                <div class="py-1">
                  <Link
                    href={`/update-vehicle/${user?.vehicleid}`}
                    target="_blank"
                    tabindex="3"
                    class="text-gray-700 flex justify-start items-center gap-2 w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                  >
                    <FiEdit />
                    Edit vehicle
                  </Link>
                </div>
              )}

              <div class="py-1">
                <a
                  href="javascript:void(0)"
                  tabindex="3"
                  class="text-gray-700 flex justify-start items-center gap-2 w-full px-4 py-2 text-sm leading-5 text-left"
                  role="menuitem"
                  onClick={handleLogOut}
                >
                  <FiLogOut />
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
