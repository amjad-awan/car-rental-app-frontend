"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import { useUserContext } from "@/app/context/authContext";
import Spinner from "../spinner/Spinner";
import { useLatLongContext } from "@/app/context/latLongContext";
const validationSchema = Yup.object({
  phone: Yup.string().required("phone is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const { loginUser, isError, loading } = useUserContext();
  const router = useRouter();

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await loginUser(values);
    },
  });

  const { phone, password } = errors;

  return (
    <form className="py-10 px-[45px]" onSubmit={handleSubmit}>
      <div className="mb-8">
        <label
          className="block uppercase text-[#898989] text-[13px] font-[600] mb-2"
          htmlFor="name"
        >
          phone
          <span
            className={` ${
              phone
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
          name="phone"
          value={values.phone}
          onChange={handleChange}
        />
        {phone && <p className="text-[#d01818]">{phone}</p>}
      </div>
      <div className="mb-8">
        <label
          className="block uppercase text-[#898989] text-[13px] font-[600] mb-2"
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
      <div className="flex items-center gap-3 mt-8 flex-col justify-between">
        {isError.loginError && (
          <p className="bg-[#d01818] text-[#fff] text-left w-[100%] p-2">
            {isError.loginError}
          </p>
        )}
        <button
          className="bg-[#8fce46] text-[22px] flex justify-center items-center h-[80px] uppercase w-full hover:bg-[#8fce46de] text-white font-bold rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {loading ? <Spinner /> : " Login"}
        </button>
        <button
          className="bg-[#42addb] h-[80px] flex items-center justify-center uppercase w-full hover:bg-[#45b3e4] text-white font-bold rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => router.push("/register")}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
