import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addCategory = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleCategory = async () => {
    if (!category) {
      setError(true);
      return false;
    }

    const token = localStorage.getItem("token");
    axios
      .post("/api/category", {
        "name": category
      }, {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        }
      })

      .then((response) => {
        if (response.status == 201) {
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
        placeholder="enter category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      />
      {error && !category && (
        <span className=".invalid.input">Enter valid Category</span>
      )}

      <button className="appButton" onClick={handleCategory} type="button">
        Add Category
      </button>
      <ToastContainer />
    </div>
  );
};

export default addCategory;
