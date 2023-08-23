
import React from "react";

import axios from "axios";
import Layout from "@/app/components/layout/Layout";
import VehicleUpdateForm from "@/app/components/vehicleUpdateForm/VehicleUpdateForm";
import { useVehicleContext } from "@/app/context/vehicleContext";

const getSingleVehicle = async (vehicleid) => {
  try {
    console.log("vehicleid", vehicleid);
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/vehcile/get-vehicle/${vehicleid}`
    );
    return data?.vehicle;
  } catch (error) {
    console.log("error", error);
  }
};
const UpdateVehicle = async ({ params }) => {
  const { vehicleid } = params;

  const singleVehicle = await getSingleVehicle(vehicleid);

  console.log("singleVehicle 25 ===", singleVehicle);

  return (
    <Layout bennerTittle="update your vehicle">
      <div className="bg-[#eaeaea] pb-28">
        <div className="container mx-auto">
          <div className="max-w-[700px] mx-auto bg-[#ffff]">
            <VehicleUpdateForm vehicleid={vehicleid} singleVehicle={singleVehicle} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateVehicle;
