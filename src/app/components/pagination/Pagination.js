"use client";
import { useVehicleContext } from "@/app/context/vehicleContext";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";


const Pagination = ({ itemsPerPage, filteredVehicles, allVehicles }) => {
  const { doFilterVehicles, setVehicles } = useVehicleContext();
  const handlePageClick = async (event) => {
    setVehicles(filteredVehicles.vehicles);
    await doFilterVehicles(event.selected + 1);
  }

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={filteredVehicles?.total / itemsPerPage}
        previousLabel="previous"
        pageClassName="border-[2px] text-center border-[#d01818]  rounded h-[50px] "
        pageLinkClassName="text-[#d01818] flex justify-center items-center text-center h-[100%] px-[15px] w-[60px]"
        previousClassName="text-center  rounded w-[100%] h-[50px]"
        previousLinkClassName="text-[#d01818] rounded border-[2px] border-[#d01818] px-4 flex items-center border-red h-[100%]"
        nextClassName=" border-[2px] flex items-center text-center border-[#d01818]  rounded h-[50px]"
        nextLinkClassName="text-[#d01818] flex items-center text-center h-[100%] px-4"
        breakLabel="..."
        breakClassName=""
        breakLinkClassName="page-link text-[#fff]"
        containerClassName="flex items-center gap-2 ml-auto"
        activeClassName="border-[4px] text-[#fff]"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
