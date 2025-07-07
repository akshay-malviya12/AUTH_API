import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const updateService = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");   
    const [priceData, setPriceData] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        getServiceById();
    }, []);



    const getServiceById = async () => {
        const token = (localStorage.getItem("token"));
        console.log("usernew", token)
        let result = await fetch(`/api/category/${params.categoryId}/service/${params.serviceId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        result = await result.json();       
       
        if (result.services[0]) {
            setName(result.services[0].service_name)
            setType(result.services[0].type)
            setPrice(result.services[0].price_options)
            setPriceData(result.price)
        }
    };

    const updateServiceWithData = async () => {
        if (!name && !type && !price) {
            setError(true);
            return false;
        }
        navigate("/price", { state: { serviceData: { serviceId: params.serviceId, name, type, price }, priceData: priceData, categoryId: params.categoryId, serviceId: params.serviceId } });
    };


    return (
        <div className="login">
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
            <button className="appButton" onClick={updateServiceWithData} type="button">
                update Service
            </button>
            {/* <Link to={"/price/"+objUpdateServiceData}>Update Service</Link> */}
            <ToastContainer />
        </div>
    );
};

export default updateService;
