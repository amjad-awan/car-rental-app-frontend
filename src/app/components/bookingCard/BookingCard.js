import React, { useEffect } from "react";
import Map from "../map/Map";
import ReactSelect from "../orderstatusselect/OrderStatusSelect";
import { useLatLongContext } from "@/app/context/latLongContext";

const BookingCard = ({ data }) => {
  const { vehicleLatLongs } = useLatLongContext();

  
  useEffect(()=>{
    getSingleVehicleLatLong(data._id)
  },[])
  return (
    <div className="border-[3px] mb-[20px] border-[#8d8b8b2a] rounded-md overflow-hidden   grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
      <div className=" bg-white h-[300px] shadow-md  border-[10px] border-[#fff] w-[100%]">
        <Map
          location={{
            lat: vehicleLatLongs.lat,
            lng: vehicleLatLongs.lng,
          }}
        />
      </div>
      <div className="flex justify-between p-[20px] w-[100%] ">
        <div className="flex flex-col">
          <p className="uppercase text-[15px] font-[600]">user name</p>
          <p className="uppercase">{data.username}</p>
        </div>
        <div className="flex flex-col">
          <p className="uppercase text-[15px] font-[600]">user phone</p>
          <p className="uppercase">{data.phone}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className={`${
              data.orderstatus === "not accepted"
                ? "bg-[#d01818]"
                : data.orderstatus === "accepted"
                ? "bg-[#42addb]"
                : data.orderstatus === "completed"
                ? "bg-[#8fce46]"
                : "bg-[#d01818]"
            } z-[500] text-[13px] flex justify-center items-center h-[50px] uppercase px-[20px]  text-white font-[400] rounded focus:outline-none focus:shadow-outline`}
          >
            {data.orderstatus}
          </button>
          {/* <ReactSelect
            vehicleid={data.vehicleid}
            orderId={data._id}
            defaultValue={data.orderstatus}
          /> */}
          {/* <button className="bg-[#d01818] z-[500] text-[13px] flex justify-center items-center h-[50px] uppercase px-[20px]  text-white font-[400] rounded focus:outline-none focus:shadow-outline">
            Not Accepted
          </button>
          <button className="bg-[#42addb] z-[500] text-[13px] flex justify-center items-center h-[50px] uppercase px-[20px]  text-white font-[400] rounded focus:outline-none focus:shadow-outline">
            Accepted
          </button>
          <button className="bg-[#8fce46] z-[500] text-[13px] flex justify-center items-center h-[50px] uppercase px-[20px]  text-white font-[400] rounded focus:outline-none focus:shadow-outline">
            Completed
          </button>
          <button className="bg-[#bdbbbb] z-[500] text-[13px] flex justify-center items-center h-[50px] uppercase px-[20px]  text-white font-[400] rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default BookingCard;
