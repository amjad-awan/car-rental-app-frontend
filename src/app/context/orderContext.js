"use client";
import axios from "axios";
// context/user.js
import { createContext, useContext, useEffect, useState } from "react";
// Creating the user context
const OrdersContext = createContext();
import { toastAlert, useLoading } from "../helper/help";
import { useRouter } from "next/navigation";
// Making the function which will wrap the whole app using Context Provider
export default function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [vehicleId, setVehicleId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  //add order
  const addOrder = async (vehicleOwnerId) => {
    console.log("vehicleOwnerId", vehicleOwnerId)
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:5000/api/v1/order/add-order", {
        username: user.username,
        userId: user._id,
        vehicleOwnerId: vehicleOwnerId,
        phone: user.phone,
        vehicleid: vehicleId,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //get orders
  const getOrder = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/order/get-orders/${user._id}`,{
          params:{
            vehicleid:user.vehicleid,
          }
        }
      )
      setOrders(data.orders);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


   //get user bookings
   const getUserBookings = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/order/get-user-bookings`,{
          params:{
            vehicleid:user.vehicleid,
            userId:user._id
          }
        }
      )

      console.log("data 74", data)
      setUserOrders(data.orders);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // update order
  const updateOrder = async (orderId, data,vehicleid) => {
    console.log(orderId, data);
    try {
      await axios.put(
        `http://localhost:5000/api/v1/order/update-order/${orderId}`,
        { orderstatus: data,vehicleid }
      );
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <OrdersContext.Provider
      value={{
        getOrder,
        updateOrder,
        getUserBookings,
        isLoading,
        addOrder,
        orders,
        userOrders,
        setVehicleId,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
export function useOrdersContext() {
  return useContext(OrdersContext);
}
