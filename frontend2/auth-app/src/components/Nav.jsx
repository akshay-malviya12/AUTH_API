import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const selectedRoute = e.target.value;
    if (selectedRoute) {
      navigate(selectedRoute);
    }
  }

  return (
    <nav>
      <img alt="logo" className="logo" src="" />

      <ul className="nav-ul">
        {token ? (

          <><li><Link to="/">Home</Link></li><li><select onChange={handleSelect} defaultValue="">
            <option value="" disabled>Category</option>
            <option value="/add-category">Add Category</option>
            <option value="/view-category">Show Category </option>
          </select></li><li><select onChange={handleSelect} defaultValue="">
            <option value="" disabled>Service</option>
            <option value="/add-service">Add Service</option>
            <option value="/view-service">Show Service</option>
          </select></li></>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

