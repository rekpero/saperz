import React from "react";
import { BounceLoader } from "react-spinners";
import "./loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <BounceLoader size={100} color="#32357c" />
    </div>
  );
}

export default Loader;
