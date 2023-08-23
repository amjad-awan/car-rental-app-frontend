"use client";
import React from "react";
import Layout from "../components/layout/Layout";
import "./styler.css";
import RegisterForm from "../components/RegisterForm/RegisterForm";
const Register = () => {
  return (
    <Layout bennerTittle="Register yourself here">

      
      <div className="bg-[#eaeaea] pb-28">
        <div className="container mx-auto">
          <div className="max-w-[700px] mx-auto bg-[#ffff]">
            <div className="registerHead">
              <p className="bg-[rgba(0,0,0,.45)] px-[15px] py-[5px] uppercase text-[16px] leading-[26px] text-[#fff] absolute bottom-10 left-[50px] font-[500]">
                {" "}
                Register
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
