import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h4>SIMS PPOB-ZAIN</h4>
        </div>
      </Link>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/Topup">Top Up</Link>
          </li>
          <li>
            <Link to="/transaction">Transaction</Link>
          </li>
          <li>
            <Link to="/account">Akun</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
