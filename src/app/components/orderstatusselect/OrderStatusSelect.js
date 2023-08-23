"use client";
import { useOrdersContext } from "@/app/context/orderContext";
import { useVehicleContext } from "@/app/context/vehicleContext";
import { useState } from "react";
import Select from "react-select";

const ReactSelect = ({orderId,vehicleid, defaultValue }) => {
  const { doModalNameFilterVehicles } = useVehicleContext();


 const {updateOrder}=useOrdersContext()

  const options = [
    {
      label: "not accepted",
      value: "not accepted",
    },
    {
      label: "accepted",
      value: "accepted",
    },
    {
      label: "completed",
      value: "completed",
    },
    {
      label: "cancel",
      value: "cancel",
    },
  ];
  const [selectData, setSelectData] = useState({
    label: defaultValue,
    value: defaultValue,
  });

  const handleSelectChange = (selectedOption,orderId,vehicleid) => {
  
    updateOrder(orderId,selectedOption.value,vehicleid)
    setSelectData(selectedOption);
    // doModalNameFilterVehicles(selectedOption.value)
  };

  const customStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: "0px",
      padding: "10px",
      textTransform: "uppercase",
      marginBottom: 0,
      border: "1px solid #dddddd !important",
      // This line disable the blue border
      boxShadow: "0 !important",
      "&:hover": {
        border: "0px !important",
        boxShadow: "0 8px 22px 0 rgba(0, 0, 0, 0.1)",
      },
    }),
    menuList: (provided) => ({
      ...provided,
      border: "0px",
      overflowY: "scroll",
      maxHeight: "150px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "#ffff",
      color: "#253241",
      textTransform: "uppercase",
      "&:hover": {
        backgroundColor: "#d01818",
        color: "white",
      },
    }),
  };

  return (
    <div>
      <Select
        options={options}
        isSearchable={true}
        isDisabled={defaultValue==="completed"}
        className="rounded-[0px]"
        styles={customStyle}
        value={selectData}
        onChange={(val)=>handleSelectChange(val,orderId,vehicleid)}
      />
    </div>
  );
};

export default ReactSelect;
