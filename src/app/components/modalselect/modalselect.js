"use client";
import { useVehicleContext } from "@/app/context/vehicleContext";
import { useState } from "react";
import Select from "react-select";
import { customStyle } from "@/app/helpers";
const ModalSelect = ({ options }) => {
  const { doModalNameFilterVehicles } = useVehicleContext();

  const [selectData, setSelectData] = useState("");
  const handleSelectChange = async (selectedOption) => {
    await doModalNameFilterVehicles(selectedOption.value);
  
    setSelectData(selectedOption)

  };



  return (
    <div>
      <Select
        options={options}
        isSearchable={true}
        className="rounded-[0px]"
        styles={customStyle}
        value={selectData}
        onChange={handleSelectChange}
      />
    </div>
  );
};

export default ModalSelect;
