import { useState } from "react";



export const customStyle = {
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
const useMenuToggle=()=>{
    const [openMenu, setOpenMenu] = useState(false);

    const showMenu=()=>{

        setOpenMenu(true)
    }
    const closeMenu=()=>{
        setOpenMenu(false)
    }
    return { openMenu, setOpenMenu, showMenu, closeMenu };

}

export default useMenuToggle