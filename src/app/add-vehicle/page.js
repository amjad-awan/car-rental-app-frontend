import React from "react";
import Layout from "../components/layout/Layout";
import VehicleForm from "../components/vehicleForm/vehcileForm";
import axios from "axios";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/vehicle/get"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }
    const jsonData = await response.json();
    return {
      props: {
        jsonData,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: {
        jsonData: null,
      },
    };
  }
}
const AddVehicle = ({ props }) => {

  return (
    <ProtectedRoute>
      <Layout bennerTittle="List your vehicle here">
        <div className="bg-[#eaeaea] pb-28">
          <div className="container mx-auto">
            <div className="max-w-[700px] mx-auto bg-[#ffff]">
              <VehicleForm />
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AddVehicle;
