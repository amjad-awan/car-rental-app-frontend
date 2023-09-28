import React from "react";
import Layout from "../components/layout/Layout";
import VehicleForm from "../components/vehicleForm/vehcileForm";
import axios from "axios";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

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
