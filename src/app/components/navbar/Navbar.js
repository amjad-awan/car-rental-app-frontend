"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useMenuToggle from "@/app/helpers";
const Topbar = dynamic(() => import("./topbar"), { ssr: false });
import Logo from "../../assets/images/revus-rental.png";
import UserAvatar from "../userAvatar/UserAvatar";
import { useUserContext } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
const DesktopBar = ({ user }) => {
  const router = useRouter();
  return (
    <div className="app__desktop-bar">
      <a href="" className="logo">
        <Image src={Logo} alt="this is my image" />
      </a>

      <ul className="hidden md:flex nav-links gap-10">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/past-bookings">your bookings as user</Link>{" "}
        </li>
        <li>
          <Link href="/contact">contact</Link>{" "}
        </li>
      </ul>
      {!user?.vehicleadded && (
        <button
          className="bg-[#42addb] h-[50px] flex items-center justify-center uppercase px-5 hover:bg-[#45b3e4] text-white font-bold rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => router.push("/add-vehicle")}
        >
          add Vehicle
        </button>
      )}

      {!user ? (
        <ul className="nav-links">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>{" "}
          </li>
        </ul>
      ) : (
        <>
          <UserAvatar user={user} />
        </>
      )}
    </div>
  );
};

const MobileBar = ({ openMenu, closeMenu, user }) => {
  return (
    <>
      <div
        className={`${openMenu ? "overlay z-[9999] bg-black/50" : "left-[-100%]"}`}
        onClick={closeMenu}
      ></div>

      <div
        className={`flex flex-col gap-5 z-[10000] bg-white w-[80%]  p-[50px] fixed top-0 bottom-0 transition duration-500 ease-out  ${
          openMenu ? "translate-x-[0%]" : "translate-x-[-100%]"
        }`}
      >
        <ul className="flex flex-col gap-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/past-bookings">your bookings as user</Link>{" "}
          </li>
          <li>
            <Link href="/contact">contact</Link>{" "}
          </li>
        </ul>
      </div>
    </>
  );
};

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { user } = useUserContext();

  const showMenu = () => {
    setOpenMenu(true);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setOpenMenu(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Topbar showMenu={showMenu} user={user} />
      <DesktopBar user={user} />
      <MobileBar openMenu={openMenu} user={user} closeMenu={closeMenu} />
    </>
  );
};

export default Navbar;
