"use client";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "@/app/config/firebase";
import "react-phone-number-input/style.css";

import PhoneInput from "react-phone-number-input";

const Page = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");

  const getOtp = async (e) => {
    e.preventDefault();

    console.log("120", number, typeof number)

    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };
  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  return (<div>
    <h1>phone auth</h1>
      {error && <p className="bg-red-400 p-3">{error}</p>}

      <form onSubmit={getOtp}>
     

<PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
            />

        <div id="recaptcha-container"></div>

        <button type="submit"> submit </button>
      </form>
    </div>
  );
};

export default Page;
