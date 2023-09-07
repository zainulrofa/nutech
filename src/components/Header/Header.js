import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/Logo.png";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to="/home">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h4>SIMS PPOB-ZAIN</h4>
        </div>
      </Link>
      <nav className="menu">
        <ul>
          <li>
            <NavLink to="/Topup" activeClassname="active">Top Up</NavLink>
          </li>
          <li>
          <NavLink to="/Transaction" activeClassname="active">Transaction</NavLink>
          </li>
          <li>
          <NavLink to="/History" activeClassname="active">History</NavLink>
          </li>
          <li>
          <NavLink to="/Profile" activeClassname="active">Akun</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
