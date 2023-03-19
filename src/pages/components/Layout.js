import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="grid content-between">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
