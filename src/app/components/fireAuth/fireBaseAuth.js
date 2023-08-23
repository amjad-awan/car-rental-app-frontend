"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import {
  signInWithEmailAndPassword,
  SignUpWithEmailandPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import firebase from "../../../../firebase";
import { auth } from "../../../../firebase"

const fireBaseAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState("");
  const SignUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user ===", user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setTimeout(()=>{
          setError("")
            },5000)
      });
  };

  const SignUpWithEmailandPassword = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setTimeout(()=>{
          setError("")
            },5000)
      });
  };


  setTimeout(()=>{
setError("")
  },5000)

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
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
    <div className="app__auth">
      {error && <p className="error">{error}</p>}

      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={SignUpWithEmailandPassword}>
        SignUpWithEmailandPassword
      </button>

      <button onClick={SignUpWithGoogle}>SignUpWithGoogle</button>
      <form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            <PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
            />
            <div id="recaptcha-container"></div>
          <div className="button-right">
           
              <button variant="secondary">Cancel</button>
          
            &nbsp;
            <button type="submit" variant="primary">
              Send Otp
            </button>
          </div>
        </form>

      <form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
            <input
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          <div className="button-right">
          
              <button >Cancel</button>
            
            &nbsp;
            <button type="submit" variant="primary">
              Verify
            </button>
          </div>
        </form>
    </div>
  );
};

export default fireBaseAuth;
