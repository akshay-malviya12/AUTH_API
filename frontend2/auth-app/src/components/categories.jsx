import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categoryList = () => {
  const [categories, setCategoies] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      getcategoryList();
    }
  }, []);

  const getcategoryList = async () => {
    const token = (localStorage.getItem("token"));
    try {
      let result = await fetch("/api/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      result = await result.json();
      console.log("Categories fetched:", result.categories);

      if (result.categories.length > 0) {
        setCategoies(result.categories);
      } else {
        setCategoies([]);
      }
      console.log("categories", categories)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteCategory = async (id) => {
    const token = (localStorage.getItem("token"));
    const result = await fetch(`/api/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await result.json();
    if (data) {
      getcategoryList();
    }
  };


  return (
    <>
      <div className="product-list">
        <h3>Category List</h3>

        <ul>
          <li>S.No.</li>
          <li>Name</li>
          <li>Delete / Update</li>
        </ul>

        {categories && categories.length > 0 ? (
          categories.map((category, index) => (
            <ul key={category.id}>
              <li>{index + 1}</li>
              <li>{category.category_name}</li>
              <li>
                <button onClick={() => deleteCategory(category.id)}>Delete</button>
                <Link to={"/update-category/" + category.id}>Update</Link>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Products Found</h1>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default categoryList;
