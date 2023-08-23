import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children, bennerTittle }) => {
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <Navbar />
      <Header bennerTittle={bennerTittle}/>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
