"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const { toast } = require("react-hot-toast");

export const toastAlert = (type, message) => {
  toast[type](message);
};
const startingPoint = {
  lat: 30.157458,
  lng: 71.5249154,
};

export const useCalCulateDistance = () => {
  const [vehicleLocation, setVehicleLocation] = useState(startingPoint);
  const [userLatLongs, setUserLatLongs] = useState({});
  const [vehiclePath, setVehiclePath] = useState([]);
  const [selectedVehiclePath, setSelectedVehiclePath] = useState([]);
  const [distance, setDistance] = useState([]); // State variable to store the distance
  const [allV, setAllV] = useState(null);
  // Function to calculate the distance using the Haversine formula

  useEffect(() => {
    // Replace this with your WebSocket or real-time location data integration
    // For demonstration purposes, this is a sample code

    const getAllVehicles = async () => {
      try {
        const { data } = await axios.get(
          "https://rental-app-backend.vercel.app/api/v1/vehcile/get-vehicles"
        );

        return data?.vehicles;
        // setAllV(data)
      } catch (error) {
        console.log("error", error);
      }
    };

    const getVehicleLatLong = async () => {
      try {
        const { data } = await axios.get(
          "https://rental-app-backend.vercel.app/api/v1/vehiclelatlong/get-latlong"
        );
        return data?.latlong;
      } catch (error) {
        console.log("error", error);
      }
    };
    const getUserLatLong = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const { data } = await axios.get(
          `https://rental-app-backend.vercel.app/api/v1/userlatlong/get-userlatlong/${user._id}`
        );

        return data?.latlong;
      } catch (error) {
        console.log("error", error);
      }
    };

    const addVehicleLatLong = async (location) => {
      try {
        const response = await axios.post(
          `https://rental-app-backend.vercel.app/api/v1/vehiclelatlong/add-latlong`,
          { lat: location.lat, long: location.long, id: location.id }
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    const interval = setInterval(async () => {
      const allVehicles = await getAllVehicles();

      const latLongList = await getVehicleLatLong();
      // setAllV(latLongList)

      setDistance([]);
      latLongList?.map((latLong) => {
        const vehicleLatitude = latLong.lat;
        const vehicleLongitude = latLong.long;
        const updatedVehicleLocation = {
          lat: vehicleLatitude,
          lng: vehicleLongitude,
        };
        const newDistance = calculateDistance(
          userLatLongs,
          updatedVehicleLocation
        );

        setDistance((prev) => [...prev, newDistance]);
        setVehicleLocation(updatedVehicleLocation);

        // Store the updated vehicle location in the path array
        setVehiclePath((prevPath) => [...prevPath, updatedVehicleLocation]);

        // Store the updated vehicle location in the selectedVehiclePath array
        setSelectedVehiclePath((prevPath) => [
          ...prevPath,
          startingPoint,
          updatedVehicleLocation,
        ]);
      });
      allVehicles.forEach((vehicle) => {
        // Calculate the distance between your location and the vehicle's location
        // Simulate random location updates for the vehicle

        if (typeof window !== "undefined" && "geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              addVehicleLatLong({
                lat: position?.coords?.latitude,
                long: position?.coords?.longitude,
                id: vehicle._id,
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
      });

      // Smoothly pan the map to the new vehicle location
      // mapRef.current.panTo(updatedVehicleLocation);

      // Simulate random location updates for your position

      const userLatLongList = await getUserLatLong();
      console.log("userLatLongList", userLatLongList)

      setUserLatLongs({ lat: userLatLongList.lat, lng: userLatLongList.long });
    }, 5000);

    return () => clearInterval(interval);
  }, [vehicleLocation]);

  const calculateDistance = (location1, location2) => {
    if (!location1 || !location2) return 0;
    const earthRadius = 6371;
    const { lat: lat1, lng: lng1 } = location1;
    const { lat: lat2, lng: lng2 } = location2;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  return {
    distance,
    allV,
    vehicleLocation,
    userLatLongs,
    vehiclePath,
    selectedVehiclePath,
  };
};

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  return { isLoading, setIsLoading };
};
