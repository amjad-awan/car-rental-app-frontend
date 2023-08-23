
"use client";
import React, { useEffect } from "react";
import { useOrdersContext } from "../context/orderContext";
import Layout from "../components/layout/Layout";
import BookingCard from "../components/bookingCard/BookingCard";
import NotFoundComponent from "../components/notfoundcomponent/NotFoundComponent";

const PastBookings = () => {
  const { getUserBookings,getOrder, userOrders } = useOrdersContext();


  // const fetchAfterTwoSec=()=>{
  //   getUserBookings();
  // }
  setTimeout(()=>{
    getOrder();
  },2000)
  useEffect(() => {
    getUserBookings();
  },[]);

 
  return (
    <Layout bennerTittle="what you have booked so far">
      <div className="mt-[50px] container mx-auto flex flex-col">
      
        {userOrders.map((data) => {
          return <BookingCard data={data} />;
        })}
      </div>
    </Layout>
  );
};

export default PastBookings;
