import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addService = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getcategoryList()
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
                setCategory(result.categories);
            } else {
                setCategory([]);
            }
            console.log("categories", categories)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleService = async () => {
        if (!name && !type && !price && !selectedCategory) {
            setError(true);
            return false;
        }
        console.log("selectedCategory", selectedCategory)
        const token = localStorage.getItem("token");
        const categoryId = localStorage.getItem("")
        axios
            .post(`/api/category/${selectedCategory}/service`, {
                "name": name,
                "type": type,
                "priceOptions": price

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
                getcategoryList()
                console.error(error);
                toast.error(error.message, {
                    position: "top-right",
                    theme: "dark",
                });
            });
    };

    return (
        <div className="login">
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

            <input
                type="text"
                className="inputBox"
                placeholder="enter name"
                onChange={(e) => {
                    setName(e.target.value);
                }}
                value={name}
            />
            {error && !name && (
                <span className=".invalid.input">Enter valid name</span>
            )}
            <input
                type="text"
                className="inputBox"
                placeholder="enter type"
                onChange={(e) => {
                    setType(e.target.value);
                }}
                value={type}
            />
            {error && !type && (
                <span className=".invalid.input">Enter valid type</span>
            )}
            <input
                type="text"
                className="inputBox"
                placeholder="enter Price Option"
                onChange={(e) => {
                    setPrice(e.target.value);
                }}
                value={price}
            />
            {error && !price && (
                <span className=".invalid.input">Enter valid Price</span>
            )}
            <button className="appButton" onClick={handleService} type="button">
                Add Service
            </button>
            <ToastContainer />
        </div>
    );
};

export default addService;
