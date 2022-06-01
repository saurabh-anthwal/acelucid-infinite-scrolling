import React from "react";
import "./Header.css";
import logo from "../logo/logo.png";
export default function Header() {
  const icon = logo;
  return (
    <div className="container-full">
      <div className="mainHeader">
      <img src={icon} alt="icon" />
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </div>
  );
}
