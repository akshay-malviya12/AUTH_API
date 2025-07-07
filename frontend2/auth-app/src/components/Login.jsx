import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    }
    axios
      .post("/api/login", {
        email,
        password,
      })
      .then((response) => {        
        if (response.status == 200) {         
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000, // 3 seconds
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, {
          position: "top-right",
          theme: "dark",
        });
      });
  };

  return (
    <div className="login">
      <input
        type="text"
        className="inputBox"
        placeholder="enter email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      {error && !email && (
        <span className=".invalid.input">Enter valid email</span>
      )}
      <input
        type="password"
        className="inputBox"
        placeholder="enter password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      {error && !password && (
        <span className=".invalid.input">Enter valid password</span>
      )}
      <button className="appButton" onClick={handleLogin} type="button">
        Login
      </button>
      <ToastContainer />
    </div>
  );
};

export default login;
