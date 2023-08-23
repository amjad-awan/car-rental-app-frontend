"use client";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import v1 from "../../assets/images/v1.png";
import v2 from "../../assets/images/v2.png";
import v3 from "../../assets/images/v3.png";
import v4 from "../../assets/images/v4.png";
import v5 from "../../assets/images/v5.png";
import Select from "react-select";

import PhoneInput from "react-phone-input-2";
// import "./style.css";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/app/config/firebase";
import ReactSelect from "../reactselect/ReactSelect";
import Image from "next/image";
import { useVehicleContext } from "@/app/context/vehicleContext";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import Otp from "../otp/Otp";
import { customStyle } from "@/app/helpers";
const validationSchema = Yup.object({
  // vehicletype:Yup.string().required("Vehicle type is required"),
  // phone: Yup.string().required("Phone is required"),
  vehiclename: Yup.string().required("vehicle name is required"),
  cc: Yup.string().required("CC name is required"),
  rent: Yup.string().required("Rent is required"),
  vehicletype: Yup.object().required("vehicle type is required"),

  fueltype: Yup.object().required("Fuel type is required"),
  vehiclemodal: Yup.object().required("vehicle modal is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
});

const VehicleForm = () => {
  const router = useRouter();
  const vehcileTypeoptions = [
    { value: "CAR", label: "car" },
    { value: "BUS", label: "bus" },
    { value: "TRUCK", label: "truck" },
  ];
  const fuelTypeoptions = [
    { value: "PETROL", label: "PETROL" },
    { value: "DIESEL", label: "DIESEL" },
    { value: "LPG", label: "lpg" },
    { value: "HYBRID", label: "hybrid" },
    { value: "ELECTRIC", label: "electric" },
    { value: "PETROL+CNG", label: "petrol+cng" },
  ];
  const currentYear = new Date().getFullYear();
  const startYear = 2000;

  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push({ value: year, label: year });
  }
  const vehcileModaloptions = years;
  const { addVehicle, isLoading } = useVehicleContext();
  // console.log("addVehicle 52 ===", addVehicle);

  // states
  const [vehcileType, setVehcileType] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [vehcileModal, setVehcileModal] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loginAlert, setAlert] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  console.log(`otp ====`, otp);

  console.log(`result`, result);
  const InputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const { handleChange, setFieldValue, handleSubmit, values, errors } =
    useFormik({
      initialValues: {
        vehiclename: "",
        cc: "",
        rent: "",
        vehicletype: "",
        vehiclemodal:"",
        fueltype: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("values", values);

        // Handle form submission here
        try {
          // await getOtp(`+${phone}`);

          await addVehicle({
            ...values,
            vehicletype: values.vehicletype?.value,
            fueltype: values.fueltype?.value,
            vehiclemodal: values.vehiclemodal?.value,
            phone: phone,
            image,
            userId: JSON.parse(localStorage.getItem("user"))._id,
          });

          setAlert(true);
        } catch (error) {
          console.log("error", error);
        }
      },
    });

  // const { vname, email, password, cpassword, vtype } = errors;
  console.log("errors ==", errors);
  async function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOtp = async (number) => {
    console.log("120", number, typeof number);

    setError("");
    if (number === "" || number === undefined) {
      return setError("Please enter a valid phone number!");
    }
    try {
      const response = await setUpRecaptha(number);
      console.log("response === 134 ", response);
      setResult(response);
      setShowModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  //upload image to cloudenry

  return (
    <>
      {showModal && (
        <div
          className={`fixed inset-0 duration-300 transition-all ease-in ${
            showModal ? "z-50" : "-z-50"
          }  flex justify-center items-start  bg-[#00000091]  p-[20px]`}
        >
          <Otp
            verifyOtp={verifyOtp}
            setShowModal={setShowModal}
            setOtp={setOtp}
            otp={otp}
          />
        </div>
      )}
      {loginAlert && (
        <div className="bg-[#17642ab9] p-3 flex items-center gap-5">
          <p className="text-[#fff]">
            your vehcile added now you have to login again for proper function
          </p>
          <button
            className="bg-[#42addb] flex justify-center uppercase items-center w-[150px] h-[40px] hover:bg-[#45b3e4] text-[16px] text-white font-bold  rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/login");
            }}
          >
            go to login
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="py-10 px-[45px] -z-1">
        {error && <p className="bg-red-400 p-3">{error}</p>}

        <div className="mb-8">
          <label
            className="block text-[#898989] text-[16px] uppercase font-[600] mb-2"
            htmlFor="name"
          >
            vehcile type
            {/* <span
              className={` ${
                vtype
                  ? " bg-[#d0181833] text-[#d01818]"
                  : " bg-[#f0f0f0] bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span> */}
          </label>
          {/* <ReactSelect
            options={vehcileTypeoptions}
            setSelectData={setVehcileType}
            selectType={vehcileType}
          /> */}

          <Select
            options={vehcileTypeoptions}
            isSearchable={true}
            className="rounded-[0px]"
            styles={customStyle}
            value={values.vehicletype}
            // onChange={handleSelectChange}
            onChange={(option) => setFieldValue("vehicletype", option)}
          />

          {errors.vehicletype && (
            <p className="text-[#d01818]">{errors.vehicletype}</p>
          )}
        </div>
        {vehcileType?.value === "CAR" && (
          <div className="flex gap-2 justify-center items-center flex-wrap mb-10">
            <div className="border-[2px] flex flex-col gap-4 justify-center items-center h-[80px]  px-4 w-[100px] border-[#dddddd">
              <Image src={v1} height={50} width={50} />
              <p className="text-[10px] font-[600] text-[#222] uppercase">
                CONVERTIBLE
              </p>
            </div>
            <div className="border-[2px] flex flex-col gap-4 justify-center items-center h-[80px] px-4 w-[100px] border-[#dddddd">
              <Image src={v2} height={50} width={50} />
              <p className="text-[10px] font-[600] text-[#222] uppercase">
                SUPER CAR
              </p>
            </div>

            <div className="border-[2px] flex flex-col gap-4 justify-center items-center h-[80px] px-4 w-[100px] border-[#dddddd">
              <Image src={v4} height={50} width={50} />
              <p className="text-[10px] font-[600] text-[#222] uppercase">
                MINI CAR
              </p>
            </div>
            <div className="border-[2px] flex flex-col gap-4 justify-center items-center h-[80px] px-4 w-[100px] border-[#dddddd">
              {" "}
              <Image src={v5} height={50} width={50} />
              <p className="text-[10px] font-[600] text-[#222] uppercase">
                PICKUP
              </p>
            </div>
          </div>
        )}

        {/* <div className="mb-8">
          <label
            className="block text-[#898989] text-[16px] uppercase font-[600] mb-2"
            htmlFor="name"
          >
            Email Address
            <span
              className={` ${
                email
                  ? " bg-[#d0181833] text-[#d01818]"
                  : "  bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span>
          </label>
          <input
            className="appearance-none border-[1px] border-[#eee]  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {email && <p className="text-[#d01818]">{email}</p>}
        </div> */}
        <div className="mb-8">
          <label
            className="block text-[#898989] text-[16px] uppercase font-[600] mb-2"
            htmlFor="name"
          >
            Vehcile Name
            {/* <span
              className={` ${
                vname
                  ? " bg-[#d0181833] text-[#d01818]"
                  : "  bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span> */}
          </label>
          <input
            className="appearance-none border-[1px] border-[#eee]  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="vehiclename"
            value={values.vehiclename}
            onChange={handleChange}
            type="text"
          />

          {errors.vehiclename && (
            <p className="text-[#d01818]">{errors.vehiclename}</p>
          )}
        </div>
        <div className="mb-8">
          <label
            className="block text-[#898989] text-[16px] uppercase font-[600] mb-2"
            htmlFor="name"
          >
            cc
            {/* <span
              className={` ${
                vname
                  ? " bg-[#d0181833] text-[#d01818]"
                  : "  bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span> */}
          </label>
          <input
            className="appearance-none border-[1px] border-[#eee]  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="cc"
            value={values.cc}
            onChange={handleChange}
            type="text"
          />

          {errors.cc && <p className="text-[#d01818]">{errors.cc}</p>}
        </div>
        <div className="mb-8">
          <label
            className="block text-[#898989] text-[16px] uppercase font-[600] mb-2"
            htmlFor="name"
          >
            Fuel type
            {/* <span
              className={` ${
                vtype
                  ? " bg-[#d0181833] text-[#d01818]"
                  : " bg-[#f0f0f0] bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span> */}
          </label>
          {/* <ReactSelect
            options={fuelTypeoptions}
            setSelectData={setFuelType}
            selectType={fuelType}
          /> */}

          <Select
            options={fuelTypeoptions}
            isSearchable={true}
            className="rounded-[0px]"
            styles={customStyle}
            value={values.fueltype}
            // onChange={handleSelectChange}
            onChange={(option) => setFieldValue("fueltype", option)}
          />

          {errors.fueltype && (
            <p className="text-[#d01818]">{errors.fueltype}</p>
          )}
        </div>
        <div className="mb-8">
          <label
            className="block text-[#898989] text-[16px] uppercase font-[600] mb-2"
            htmlFor="name"
          >
            Vehcile modal
            {/* <span
              className={` ${
                vtype
                  ? " bg-[#d0181833] text-[#d01818]"
                  : " bg-[#f0f0f0] bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span> */}
          </label>
          {/* <ReactSelect
            options={vehcileModaloptions}
            setSelectData={setVehcileModal}
            selectType={vehcileModal}
          /> */}

          <Select
            options={vehcileModaloptions}
            isSearchable={true}
            className="rounded-[0px]"
            styles={customStyle}
            value={values.vehiclemodal}
            // onChange={handleSelectChange}
            onChange={(option) => setFieldValue("vehiclemodal", option)}
          />

          {errors.vehiclemodal && (
            <p className="text-[#d01818]">{errors.vehiclemodal}</p>
          )}
        </div>
        <div className="mb-8">
          <label
            className="block text-[#898989] text-[16px] uppercase font-[600] mb-2"
            htmlFor="name"
          >
            Phone
            {/* <span
              className={` ${
                password
                  ? " bg-[#d0181833] text-[#d01818]"
                  : "  bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span> */}
          </label>

          <PhoneInput
            country={"pk"}
            onChange={(e) => setPhone(e)}
            name="phone"
            value={phone}
            inputStyle={{ width: "100%", borderRaduis: "0px" }}
          />

          <div id="recaptcha-container"></div>
        </div>

        {/* <p className="text-left text-[#898989] text-[14px]">
          By creating an account you agree to{" "}
          <a herf="#" className="text-[#45b3e4] font-[600] capitalize">
            {" "}
            Terms and Conditions
          </a>{" "}
          and our{" "}
          <a herf="#" className="text-[#45b3e4] font-[600] capitalize ">
            Privacy Policy
          </a>
        </p> */}
        <div className="mb-8">
          <label
            className="block text-[#898989] text-[16px] uppercase font-[600] mb-2"
            htmlFor="name"
          >
            rent per km
            {/* <span
              className={` ${
                vname
                  ? " bg-[#d0181833] text-[#d01818]"
                  : "  bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span> */}
          </label>
          <input
            className="appearance-none border-[1px] border-[#eee]  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="rent"
            value={values.rent}
            onChange={handleChange}
            type="text"
          />

          {errors.rent && <p className="text-[#d01818]">{errors.rent}</p>}
        </div>
        <div className="mb-8">
          <input
            type="file"
            // ref={fileInputRef}

            onChange={handleFileChange}
          />
          {/* <button
            onClick={handleButtonClick}
            className="bg-[#fff]  uppercase w-full border-[3px] border-[#45b3e4] hover:bg-[#45b3e4] text-[#45b3e4] hover:text-[#fff] font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Choose picture
          </button> */}
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="vehicle picture"
              height={300}
              width={"300"}
              className="w-[100%] h-[200px] object-cover my-5"
            />
          )}
        </div>

        <div className="flex items-center gap-3 mt-8 flex-col justify-between">
          <button
            className="bg-[#42addb] flex justify-center items-center uppercase w-full h-[70px] hover:bg-[#45b3e4] text-[22px] text-white font-bold  rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : " submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default VehicleForm;
