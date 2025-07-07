import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const updateCategory = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {    
    getCategoryById();
  }, []);


  const getCategoryById = async () => {
    console.log(params, params.id);
    const token = (localStorage.getItem("token"));
    console.log("usernew", token)
    let result = await fetch(`/api/single-category/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    result = await result.json();
    console.log(result);
    setCategory(result.categories[0].category_name);

  };
  const upadteCategory = async () => {
    if (!category) {
      setError(true);
      return false;
    }

    const token = localStorage.getItem("token");
    axios
      .put(`/api/category/${params.id}`, {
        "name": category
      }, {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        }
      })

      .then((response) => {
        if (response.status == 200) {
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
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className=".invalid.input">Enter valid Category</span>
      )}
      <button className="appButton" onClick={upadteCategory} type="button">
        Update Category
      </button>
      <ToastContainer />
    </div>
  );
};

export default updateCategory;
