import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serviceList = () => {
  const [categories, setCategoies] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      getcategoryList();
    }
  }, []);

  useEffect(() => {   
    if (selectedCategory) {
      getServiceList(selectedCategory);
    }
  }, [selectedCategory])

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

  const getServiceList = async (selectedCategory) => {
    const token = (localStorage.getItem("token"));
    try {
      let result = await fetch(`/api/category/${selectedCategory}/services`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      result = await result.json();
      console.log("Categories fetched:", result.services);

      if (result.services.length > 0) {
        setServices(result.services);
      } else {
        setServices([]);
      }
      console.log("services", services)
    } catch (error) {
      console.error("Error fetching services:", error);
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
      getServiceList();
    }
  };


  return (
    <>
      <div className="product-list">
        <h2>Select Category</h2>
        <select onChange={(e) => setSelectedCategory(e.target.value)} defaultValue="">
          <option value="" disabled>Select Category</option>
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))
          ) : null}

        </select>
        <h3>Service List</h3>

        <ul>
          <li>S.No.</li>
          <li>Name</li>
          <li>Type</li>
          <li>Price Options</li>
          <li>Delete / Update</li>
        </ul>

        {services && services.length > 0 ? (
          services.map((service, index) => (
            <ul key={service.id}>
              <li>{index + 1}</li>
              <li>{service.service_name}</li>
              <li>{service.type}</li>
              <li>{service.price_options}</li>
              <li>
                <button onClick={() => deleteCategory(selectedCategory, service.id)}>Delete</button>
                <Link to={"/update-service/" + selectedCategory + "/service/" + service.id}>Update</Link>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Services Found</h1>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default serviceList;
