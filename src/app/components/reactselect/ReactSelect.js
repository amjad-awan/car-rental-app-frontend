"use client";
import { useVehicleContext } from "@/app/context/vehicleContext";
import { customStyle } from "@/app/helpers";
import { useState } from "react";
import Select from "react-select";

const ReactSelect = ({ options,setFieldValue, setSelectData, selectType }) => {
const {doModalNameFilterVehicles}=useVehicleContext()


  const handleSelectChange = (selectedOption) => {
    console.log(selectedOption)
    setSelectData(selectedOption);
  };



  return (
    <div>
      <Select
        options={options}
        isSearchable={true}
        className="rounded-[0px]"
        styles={customStyle}
        value={selectType}
        // onChange={handleSelectChange}
        onChange={(option) => setFieldValue('selectField', option)}

      />
    </div>
  );
};

export default ReactSelect;
