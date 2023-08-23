"use client";
import Image from "next/image";
import React from "react";
import "./style.css";
import { useLatLongContext } from "@/app/context/latLongContext";
import BookingDropUp from "../bookingDropUp/BookingDropUp";
import { useVehicleContext } from "@/app/context/vehicleContext";
import Link from "next/link";
import { useOrdersContext } from "@/app/context/orderContext";
const VehicleCard = ({ data, setModal, index }) => {
  const { vehicleLatLong, location, addUserLatLong, getSingleVehicleLatLong } =
    useLatLongContext();
  const { distance, getSingleVehicle, singleVehicle, isLoading } =
    useVehicleContext();
  const { setVehicleId } = useOrdersContext();
  const handleLatLong = async (vehicleId) => {
    try {
      setModal(true);
      await getSingleVehicle(vehicleId);
      await getSingleVehicleLatLong(vehicleId);
      await vehicleLatLong(vehicleId);
      setVehicleId(vehicleId);
      const getUserid = JSON.parse(localStorage.getItem("user"));
      await addUserLatLong(getUserid._id);
    } catch (error) {
      console.log("error in lat long", error);
    }
  };

  return (
    <>
      <div
        className={`${
          isLoading ? "animate-pulse" : ""
        } flex flex-col rounded-md overflow-hidden shadow-md border-[5px] border-[#fff]`}
      >
        <div className="relative hoverme w-[100%] h-[200px] overflow-hidden">
          {isLoading && (
            <div className="absolute flex justify-center items-center z-[333] bg-white opacity-[.8] left-0 right-0 top-0 bottom-0">
              <span class="animate-ping absolute inline-flex h-[20px] w-[20px] rounded-full bg-[#d01818] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-[#d01818]"></span>{" "}
            </div>
          )}{" "}
          <div className="Book-now absolute flex justify-center items-center z-[333] bg-[#00000036] left-0 right-0  bottom-0">
            <button
              disabled={data?.isbooked}
              onClick={() => handleLatLong(data?._id)}
              className={`${
                data?.isbooked ? "bg-[#a7a5a5ab]" : "bg-[#d01818]"
              } z-[500] text-[13px] flex justify-center items-center h-[50px] uppercase px-[20px]  text-white font-[400] rounded focus:outline-none focus:shadow-outline`}
            >
              {data?.isbooked ? "Booked" : "Book now"}
            </button>
          </div>
          <a
            href={`tel:${data.phone}`}
            className="absolute z-[1000] py-2 px-5 bg-[#d01818] hover:text-[#fff] text-[#fff] text-[15px] font-[500] left-0  top-2 rounded-r-[30px] "
          >
            call: {data.phone}
          </a>
          <Image
            src={data.picture}
            width={200}
            height={200}
            alt={data?.vehiclename}
            className="object-cover -z-1 h-[100%] w-[100%] duration-500 transition-all ease-in hover:scale-[1.1]"
          />
        </div>
        <div className="bg-[#253241] h-[200px]">
          <p className="text-[12px] text-center font-[500] w-[100%] text-[#fff] uppercase py-[10px] px-[10px]">
            {distance === "NaN" ? "0..." : distance[index]?.toFixed(2)} km away
          </p>
          <div className="w-[100%] h-[1px] bg-[#DDDDDD33]"></div>
          <h2 className="text-[#fff] uppercase text-[18px] font-[600] pt-5 text-center">
            {data.vehiclename}
          </h2>
          <div className="flex justify-between items-center mt-[20px] w-[100] mx-auto">
            <p className="text-[10px] w-[100%] text-center  text-[#fff] uppercase border-r-[1px] border-[#DDDDDD33] px-[10px]">
              {data.cc}
            </p>
            <p className="text-[10px] text-center w-[100%] text-[#fff] uppercase border-r-[1px] border-[#DDDDDD33] px-[10px]">
              {data.vehiclemodal}
            </p>
            <p className="text-[10px] text-center w-[100%] text-[#fff] uppercase border-r-[1px] border-[#DDDDDD33] px-[10px]">
              {data.fueltype}
            </p>
          </div>
          <div className="w-[100%] h-[1px] bg-[#DDDDDD33] mt-[10px]"></div>
          <h2 className="text-[#fff] text-[19px] uppercase font-[600] pt-5 text-center">
            {data.rent} RS/Km
          </h2>
        </div>
      </div>
    </>
  );
};

export default React.memo(VehicleCard);
