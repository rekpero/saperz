import React from "react";
import Logo from "../../logo.svg";
import "./toolbar.css";

function Toolbar({ count }) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <img src={Logo} alt="logo" className="logo-icon" />
        <h2 className="toolbar-title">Saperz</h2>
      </div>
      <div>
        <span className="badge">{count} Spaces</span>
      </div>
    </div>
  );
}

export default Toolbar;
