"use client";
import axios from "axios";
// context/user.js
import { createContext, useContext, useEffect, useState } from "react";
import { useCalCulateDistance } from "../helper/help";
// Creating the user context
const LatLongContext = createContext();

// Making the function which will wrap the whole app using Context Provider
export default function LatLongProvider({ children }) {
  // const { userLatLongs, vehicleLocation } = useCalCulateDistance();
  const [latLong, setLatLong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vehicleLatLongs, setVehicleLatLongs] = useState({
    lat: null,
    lng: null,
  });

  const vehicleLatLong = (vehicleId) => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Retrieve the latitude and longitude from the position object
          handleVehicleLatLong({
            lat: position.coords.latitude,
            long: position.coords.longitude,
            id: vehicleId,
          });
          //   setLocation({
          //     lat: position.coords.latitude,
          //     long: position.coords.longitude,
          //   });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const handleVehicleLatLong = async (location) => {
    try {
      console.log("location ===44 ", location);
      const response = await axios.post(
        `http://localhost:5000/api/v1/vehiclelatlong/add-latlong`,
        { lat: location.lat, long: location.long, id: location.id }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSingleVehicleLatLong = async (vehicId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/vehiclelatlong/get-vehiclelatlong/${vehicId}`
      );
      setVehicleLatLongs({
        lat: data?.latlong.lat,
        lng: data?.latlong.long,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // setInterval(() => {
  //   updateLatLong();
  // }, 10000);

  const addUserLatLong = async (userId) => {
    try {
      if (typeof window !== "undefined" && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            // Retrieve the latitude and longitude from the position object
            const response = await axios.post(
              `http://localhost:5000/api/v1/userlatlong/add-userlatlong`,
              {
                lat: position.coords.latitude,
                long: position.coords.longitude,
                id: userId,
              }
            );
            console.log(" response=== 84", response);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <LatLongContext.Provider
      value={{
        vehicleLatLong,
        vehicleLatLongs,
        getSingleVehicleLatLong,
        addUserLatLong,
      }}
    >
      {children}
    </LatLongContext.Provider>
  );
}

// Make useLatLongContext Hook to easily use our context throughout the application
export function useLatLongContext() {
  return useContext(LatLongContext);
}
