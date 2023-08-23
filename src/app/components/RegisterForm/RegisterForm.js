"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./style.css";

import {
  signInWithEmailAndPassword,
  SignUpWithEmailandPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/app/config/firebase";
import { useUserContext } from "@/app/context/authContext";
import Spinner from "../spinner/Spinner";
const validationSchema = Yup.object({
  username: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterForm = () => {
  const { registerUser, loading, isError } = useUserContext();
  const router = useRouter();

  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const initialValues = {
    username: "",
    password: "",
    cpassword: "",
    phone: "",
    vehicleadded: 0,
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here

      try {
        const { username, password, phone, vehicleadded } = values;
        const response = await registerUser({
          username,
          phone,
          password,
          vehicleadded,
          vehicleid: null,
        });

     

        // await getOtp(+3027543636);
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  const { username, password, phone, cpassword } = errors;
  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOtp = async (number) => {
    console.log("number 75 ===", number);

    setError("");
    if (number === "" || number === undefined) {
      return setError("Please enter a valid phone number!");
    }
    try {
      const response = setUpRecaptha(number);
      console.log("response ===", response);
      setResult(response);
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
  return (
    <>
      <form className="py-10 px-[45px]" onSubmit={handleSubmit}>
        {error && <p className="bg-red-400 p-3">{error}</p>}
        <div className="mb-8">
          <label
            className="block text-[#898989] text-[13px] font-[600] mb-2"
            htmlFor="name"
          >
            UserName
            <span
              className={` ${
                username
                  ? " bg-[#d0181833] text-[#d01818]"
                  : " bg-[#f0f0f0] bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span>
          </label>
          <input
            className="appearance-none border-[1px] border-[#eee]  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        {/* <div className="mb-8">
          <label
            className="block text-[#898989] text-[13px] font-[600] mb-2"
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
            className="block text-[#898989] text-[13px] font-[600] mb-2"
            htmlFor="name"
          >
            Phone
            <span
              className={`${
                phone
                  ? " bg-[#d0181833] text-[#d01818]"
                  : "  bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span>
          </label>

          {/* <PhoneInput
            country={"pk"}
            onChange={(e) => setPhone(e)}
            name="phone"
            value={phone}
            inputStyle={{ width: "100%", borderRaduis: "0px" }}
          /> */}

          <input
            className="appearance-none border-[1px] border-[#eee]  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
          <div id="recaptcha-container"></div>
        </div>

        <div className="mb-8">
          <label
            className="block text-[#898989] text-[13px] font-[600] mb-2"
            htmlFor="name"
          >
            Password
            <span
              className={` ${
                password
                  ? " bg-[#d0181833] text-[#d01818]"
                  : "  bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span>
          </label>
          <input
            className="appearance-none border-[1px] border-[#eee]  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="password"
            value={values.password}
            onChange={handleChange}
            type="text"
          />

          {password && <p className="text-[#d01818]">{password}</p>}
        </div>
        <div className="mb-8">
          <label
            className="block text-[#898989] text-[13px] font-[600] mb-2"
            htmlFor="name"
          >
            Confirm Password
            <span
              className={` ${
                cpassword
                  ? " bg-[#d0181833] text-[#d01818]"
                  : "  bg-[#f0f0f0] text-[#8c8c8c]"
              } ml-5  font-[400] rounded uppercase py-1 px-2`}
            >
              Required
            </span>
          </label>
          <input
            className="appearance-none border-[1px] border-[#eee]  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="cpassword"
            value={values.cpassword}
            onChange={handleChange}
          />

          {cpassword && <p className="text-[#d01818]">{cpassword}</p>}
        </div>

        <p className="text-left text-[#898989] text-[14px]">
          By creating an account you agree to{" "}
          <a herf="#" className="text-[#45b3e4] font-[600] capitalize">
            {" "}
            Terms and Conditions
          </a>{" "}
          and our{" "}
          <a herf="#" className="text-[#45b3e4] font-[600] capitalize ">
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center gap-3 mt-8 flex-col justify-between">
        {isError.regError && (
          <p className="bg-[#d01818] text-[#fff] text-left w-[100%] p-2">
            {isError.regError}
          </p>
        )}
          <button
            className="bg-[#42addb] text-[22px]  uppercase w-full hover:bg-[#45b3e4] text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? <Spinner /> : "Register"}
          </button>

          <button
            className="bg-[#8fce46] text-[22px]  uppercase w-full hover:bg-[#8fce46de] text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => router.push("/login")}
          >
            Have account ? then go to togin
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
