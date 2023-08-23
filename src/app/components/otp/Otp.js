import React, { useState } from "react";
import OtpInput from "react-otp-input";

const Otp = ({ setOtp, otp, setShowModal, verifyOtp }) => {
  return (
    <form
      onSubmit={verifyOtp}
      className="bg-[#fff] flex flex-col gap-8 justify-center p-[20px] box-shadow h-[250px] rounded"
    >
      <OtpInput
        value={otp}
        onChange={setOtp}
        //   containerStyle="bg-[#fff] p-[20px] box-shadow h-[300px] rounded"
        numInputs={6}
        renderSeparator={<span className="text-[#45b3e4]">-</span>}
        inputStyle={{
          width: "50px",
          height: "50px",
          borderRadius: "5px",
          border: "2px solid #45b3e4",
        }}
        renderInput={(props) => <input {...props} />}
      />
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-[#42addb] text-[20px]  uppercase w-[100px] hover:bg-[#45b3e4] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          verify
        </button>
        <button
          type="submit"
          className="bg-[#edeff0ea] text-[20px]  uppercase w-[100px] text-[#000000dc] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
export default Otp;
