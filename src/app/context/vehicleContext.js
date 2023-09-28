"use client";
import axios from "axios";
// context/user.js
import { createContext, useContext, useEffect, useState } from "react";
// Creating the user context
const VehicleContext = createContext();
import { toastAlert, useCalCulateDistance } from "../helper/help";
import { useRouter } from "next/navigation";
import { useLatLongContext } from "./latLongContext";
// Making the function which will wrap the whole app using Context Provider

export default function VehicleProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [singleVehicle, setSingleVehicle] = useState();
  const { distance } = useCalCulateDistance();

  const addVehicle = async (data) => {
    try {
      setIsLoading(true);
      setIsLoading(true);
      const { picture, cloudinary_picture_id } = await uploadImage(data?.image);
      const response = await axios.post(
        `https://rental-app-backend.vercel.app/api/v1/vehcile/add`,
        {
          ...data,
          cloudinarypictureId: cloudinary_picture_id,
          picture: picture,
        }
      );
      setIsLoading(false);
      toastAlert("success", "vehicle added successfully");
    } catch (error) {
      setIsLoading(false);
      setIsLoading(true);
      toastAlert("error", "error while adding vehicle");
    }
  };

  const uploadImage = async (img) => {
    try {
      const formData = new FormData();
      formData.append("picture", img);
      const { data } = await axios.post(
        "http://localhost:5000/upload-photo",
        formData
      );
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateImage = async (img, cloudinary_picture_id) => {
    try {
      const formData = new FormData();
      formData.append("picture", img);
      const { data } = await axios.put(
        `http://localhost:5000/update_cloudinary_picture/${cloudinary_picture_id}`,
        formData
      );
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const getVehicles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://rental-app-backend.vercel.app/api/v1/vehcile/get-vehicles`
      );
      setAllVehicles(response?.data?.vehicles);
      // setVehicles(response?.data);
      setIsLoading(false);
      return await response?.data?.vehicles;
    }catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  }

  const getSingleVehicle = async (vehicleId) => {
    try {
      setIsLoading(true);
      console.log("vehicleId", vehicleId);
      const { data } = await axios.get(
        `https://rental-app-backend.vercel.app/api/v1/vehcile/get-vehicle/${vehicleId}`
      );
      setSingleVehicle(data?.vehicle);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const updateVehicle = async (vehicleId, cloudinarypictureId, image, data) => {
    try {
      setIsLoading(true);
      console.log("vehicleId", vehicleId);
      const { picture, cloudinary_picture_id } = await updateImage(
        image,
        cloudinarypictureId
      );
      const response = await axios.put(
        `https://rental-app-backend.vercel.app/api/v1/vehcile/update-vehicle/${vehicleId}`,
        {
          ...data,
          cloudinarypictureId: cloudinary_picture_id,
          picture: picture,
        }
      );

      console.log("response ===117", response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const doFilterVehicles = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://rental-app-backend.vercel.app/api/v1/vehcile/get-filtered-vehicles/${page}`,
        { cache: "no-store" }
      );
      setVehicles(response?.data);
      setIsLoading(false);
      return response?.data;
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const doPriceFilterVehicles = async (prices) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://rental-app-backend.vercel.app/api/v1/vehcile/get-price-filtered-vehicles`,
        {
          params: {
            minPrice: prices.minPrice,
            maxPrice: prices.maxPrice,
          },
        }
      );
      setVehicles(response?.data);

      setIsLoading(false);
      return response?.data;
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const doModalNameFilterVehicles = async (vehiclemodal) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://rental-app-backend.vercel.app/api/v1/vehcile/get-vehicles-by-modal/${vehiclemodal}`
      );
      setVehicles(response?.data);

      setIsLoading(false);
      return response?.data;
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        getVehicles,
        vehicles,
        addVehicle,
        allVehicles,
        setVehicles,
        doPriceFilterVehicles,
        doModalNameFilterVehicles,
        doFilterVehicles,
        getSingleVehicle,
        updateVehicle,
        singleVehicle,
        distance,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

// Make useUserContext Hook to easily use our context throughout the application
export function useVehicleContext() {
  return useContext(VehicleContext);
}
