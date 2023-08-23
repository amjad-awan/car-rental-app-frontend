"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import ReactSelect from "./components/reactselect/ReactSelect";
import RangeInut from "./components/rangeinput/Range";
import VehicleCard from "./components/vehicleCard/VehicleCard";
import Pagination from "./components/pagination/Pagination";
import BookingDropUp from "./components/bookingDropUp/BookingDropUp";
import { useVehicleContext } from "./context/vehicleContext";
import FumesCursor from "./components/CursorGlow/CursorGlow";
import ModalSelect from "./components/modalselect/modalselect";
import NotFoundComponent from "./components/notfoundcomponent/NotFoundComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const { doFilterVehicles, vehicles, isLoading, getVehicles, allVehicles } =
    useVehicleContext();

  // states
  const [modal, setModal] = useState(false);
  const [vehcileType, setVehcileType] = useState(null);

  const options = allVehicles.map((vehcile) => {
    return { value: vehcile.vehiclemodal, label: vehcile.vehiclemodal };
  });

  const uniqueObj = {};

  options.forEach((item) => {
    const key = JSON.stringify(item);
    uniqueObj[key] = item;
  });

  const uniqueSelectOptions = [...Object.values(uniqueObj)].sort(
    (a, b) => b.value - a.value
  );

  const fetchData = async () => {
    try {
      await doFilterVehicles(0);
      await getVehicles();
    } catch (error) {
      console.log(error);
    }
  };

  // const clearFilter=()=>{
  //   getVehicles()
  // }

  useEffect(() => {
    fetchData();
  }, []);

  const startLocation = { lat: 31.7749, lng: 74.4194 }; // Replace with your desired start location
  const endLocation = { lat: 31.0522, lng: 74.2437 }; // Replace with your desired end location

  return (
    <>
      <Layout bennerTittle="Pick your ride">
        {/* <FumesCursor/> */}
        <main className="container mx-auto px-3 pb-28 mt-24 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-[30px]">
          <div className="sm:col-span-12 md:col-span-1 w-[100%] ">
            <h1 className="bg-[#253241] relative p-5 font-[700] text-[18px] text-[#fff] uppercase">
              Search a car
              <div class="w-5 absolute left-[4px] top-[4px] overflow-hidden inline-block">
                <div class="h-9  bg-[#d01818] rotate-45 transform origin-top-right"></div>
              </div>
            </h1>
            <div className="flex flex-col bg-[#f1f5fa] h-[100%] pt-[30px] px-6">
              <h3 className=" relative font-[700] mb-3 text-[16px] text-[#253241] uppercase">
                By modal
              </h3>
              <ModalSelect options={uniqueSelectOptions} />

              <h3 className=" relative font-[700] mb-3 mt-10 text-[16px] text-[#253241] uppercase">
                by rent
              </h3>
              <RangeInut />
              {/* <button onClick={clearFilter} className="w-[100%] text-[#fff] mt-[30px] px-1 py-3 bg-[#d01818] uppercase">
              clear filter
            </button> */}
            </div>
          </div>
          <div className="relative sm:col-span-12 flex flex-col md:col-span-3 ">
            {isLoading ? (
              <div className="absolute inset-0 bg-[#000]"></div>
            ) : (
              <>
                <p className="uppercase text-[22px] font-[600] text-[#253241] mb-6">
                  total {vehicles?.vehicles?.length} vehicles found{" "}
                </p>
                {vehicles?.vehicles?.length === 0 ? (
                  <NotFoundComponent text="no vehicle found" />
                ) : (
                  <div className="grid gap-[30px] grid-cols-1 lg:grid-cols-3">
                    {vehicles?.vehicles?.map((data, index) => {
                      return (
                        <VehicleCard
                          data={data}
                          isLoading={isLoading}
                          setModal={setModal}
                          key={data?._id}
                          index={index}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
            <div className="flex flex-col justify-center  md:flex-row gap-[30px] md:justify-between items-center mt-[100px] px-3">
              <p className="uppercase text-[15px] font-[600]">
                {vehicles?.vehicles?.length} at page {vehicles?.currentPage} of
                total {vehicles?.total} vehicles{" "}
              </p>
              <Pagination
                itemsPerPage={6}
                filteredVehicles={vehicles}
                allVehicles={allVehicles}
              />
            </div>
          </div>
        </main>
      </Layout>
      {modal && <BookingDropUp setModal={setModal} />}
    </>
  );
}
