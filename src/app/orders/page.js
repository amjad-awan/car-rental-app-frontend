"use client";
import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import OrderCard from "../components/orderCard/OrderCard";
import { useOrdersContext } from "../context/orderContext";
import NotFoundComponent from "../components/notfoundcomponent/NotFoundComponent";
const page = () => {
  const { orders, getOrder } = useOrdersContext();

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Layout bennerTittle="Your vehicle's booking list">
      <div class="container mx-auto my-[20px] px-[20px]">
        {orders.length === 0 && <NotFoundComponent text="No bookings found" />}
        {orders?.map((data) => {
          return <OrderCard data={data}/>;
        })}
      </div>
    </Layout>
  );
};

export default page;
