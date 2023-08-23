import React from "react";
import Map from "../map/Map";
import { useVehicleContext } from "@/app/context/vehicleContext";
import Image from "next/image";
import { useOrdersContext } from "@/app/context/orderContext";
import { useLoading } from "@/app/helper/help";
import { useLatLongContext } from "@/app/context/latLongContext";
import { useRouter } from "next/navigation";

const BookingDropUp = ({ setModal }) => {
  const { distance, singleVehicle } = useVehicleContext();
  const {vehicleLatLongs}=useLatLongContext()
  const { addOrder , isLoading} = useOrdersContext()
const router=useRouter()
  const handleOrder = async (vehicleOwnerId) => {
    try {
      await addOrder(vehicleOwnerId);
      router.push("/past-bookings")
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <>
      <div className="fixed z-[3000] inset-0 bg-black opacity-[.5]"></div>
      <div className="bg-[#fff] p-5 w-[500px]  rounded-[20px] overflow-hidden absolute top-[10px] left-[50%] right-[50%] -translate-x-[50%] z-[5000]">
        <div className="  bg-white h-[300px] rounded-md overflow-hidden shadow-lg border-[10px] border-[#fff]">
          <Map location={{lat:vehicleLatLongs.lat,lng:vehicleLatLongs.lng} } />
        </div>
        {singleVehicle && (
          <div className="flex my-4 flex-col rounded-md overflow-hidden shadow-md border-[5px] border-[#fff]">
            <div className="relative hoverme w-[100%] h-[200px] overflow-hidden">
              {/* {loading && (
              <div className="absolute flex justify-center items-center z-[333] bg-white opacity-[.8] left-0 right-0 top-0 bottom-0">
                <span class="animate-ping absolute inline-flex h-[20px] w-[20px] rounded-full bg-[#d01818] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-[#d01818]"></span>{" "}
              </div>
            )}{" "} */}

              <a
                href={`tel:${singleVehicle.phone}`}
                className="absolute z-[1000] py-2 px-5 bg-[#d01818] hover:text-[#fff] text-[#fff] text-[15px] font-[500] left-0  top-2 rounded-r-[30px] "
              >
                call: {singleVehicle.phone}
              </a>
              <Image
                src={singleVehicle.picture}
                width={200}
                height={200}
                alt={singleVehicle?.vehiclename}
                className="object-cover -z-1 h-[100%] w-[100%] duration-500 transition-all ease-in hover:scale-[1.1]"
              />
            </div>
            <div className="bg-[#253241] h-[200px]">
              <p className="text-[15px] text-center font-bold w-[100%] text-[#fff] uppercase py-[10px] px-[10px]">
                {distance[0]?.toFixed(2)} km away
              </p>
              <div className="w-[100%] h-[1px] bg-[#DDDDDD33]"></div>
              <h2 className="text-[#fff] uppercase text-[22px] font-[600] pt-5 text-center">
                {singleVehicle.vehiclename}
              </h2>
              <div className="flex justify-between items-center mt-[20px] w-[100] mx-auto">
                <p className="text-[10px] w-[100%] text-center  text-[#fff] uppercase border-r-[1px] border-[#DDDDDD33] px-[10px]">
                  {singleVehicle.cc}
                </p>
                <p className="text-[10px] text-center w-[100%] text-[#fff] uppercase border-r-[1px] border-[#DDDDDD33] px-[10px]">
                  {singleVehicle.vehiclemodal}
                </p>
                <p className="text-[10px] text-center w-[100%] text-[#fff] uppercase border-r-[1px] border-[#DDDDDD33] px-[10px]">
                  {singleVehicle.fueltype}
                </p>
              </div>
              <div className="w-[100%] h-[1px] bg-[#DDDDDD33] mt-[10px]"></div>
              <h2 className="text-[#fff] text-[19px] uppercase font-[600] pt-5 text-center">
                {singleVehicle.rent} RS/Km
              </h2>
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <button
            onClick={()=>handleOrder(singleVehicle?.userId)}
            className="bg-[#d01818] mt-7 z-[500] text-[16px] flex justify-center items-center h-[50px] uppercase px-[20px]  text-white font-[500] rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? "..." : "Confirm your book"}
          </button>{" "}
          <button
            onClick={() => setModal(false)}
            className="bg-[#d01818] mt-7 z-[500] text-[16px] flex justify-center items-center h-[50px] uppercase px-[20px]  text-white font-[500] rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingDropUp;
