import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const updateServiceById = () => {   
    const [duration, setDuration] = useState('');
    const [priceType, setPriceType] = useState("");
    const [priceOptions, setPriceOptions] = useState("");
    const [priceserviceData, setPriceServiceData] = useState([]);
    const [categoryId, setcategoryId] = useState([]);

    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const priceData = location.state.priceData
        const data = location.state
        const serviceId = data.serviceData.serviceId;
        const name = data.serviceData.name;
        const type = data.serviceData.type;
        const price = data.serviceData.price;
        setPriceServiceData(priceData)
        setcategoryId(location.state.categoryId)
        setDuration(priceData.duration)
        setPriceType(priceData.type)
        setPriceOptions(priceData.price)
    }, []);

    console.log("priceserviceData", priceserviceData)
    const updateServiceById = async () => {
        if (!duration && !priceType && !priceOptions) {
            setError(true);
            return false;
        }
        const data = location.state
        if (data) {
            var name = data.serviceData.name;
            var type = data.serviceData.type;
            var price = data.serviceData.price;
            console.log("dataprice", name, type, price)
        }


        const token = localStorage.getItem("token");
        axios
            .put(`/api/category/${categoryId}/service/${location.state.serviceData.serviceId}`, JSON.stringify({
                "name": name, "type": type, "priceOptions": price, "duration": duration, "priceType": priceType, "price": priceOptions, "priceAction": "update", "priceId": priceserviceData.id

            }), {
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
        navigate("/")
    };

    return (
        <div className="login">
            <input
                type="text"
                className="inputBox"
                placeholder="enter name"
                onChange={(e) => {
                    setDuration(e.target.value);
                }}
                value={duration}
            />
            {error && !duration && (
                <span className=".invalid.input">Enter valid duration</span>
            )}
            <input
                type="text"
                className="inputBox"
                placeholder="enter type"
                onChange={(e) => {
                    setPriceType(e.target.value);
                }}
                value={priceType}
            />
            {error && !priceType && (
                <span className=".invalid.input">Enter valid priceType</span>
            )}
            <input
                type="text"
                className="inputBox"
                placeholder="enter Price Option"
                onChange={(e) => {
                    setPriceOptions(e.target.value);
                }}
                value={priceOptions}
            />
            {error && !priceOptions && (
                <span className=".invalid.input">Enter valid priceOptions</span>
            )}
            <button className="appButton" onClick={updateServiceById} type="button">
                Submit
            </button>
            <ToastContainer />
        </div>
    );
};

export default updateServiceById;
