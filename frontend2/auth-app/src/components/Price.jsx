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
    const [serviceId, setServiceId] = useState([]);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const priceData = location.state.priceData
        setPriceServiceData(priceData)
        setcategoryId(location.state.categoryId)
        setServiceId(location.state.serviceId)
    }, []);

    console.log("priceserviceData", priceserviceData)
    const updateServiceById = async () => {
        if (!duration && !priceType && !priceOptions) {
            setError(true);
            return false;
        }
        var data = location.state
        if (data) {
            var name = data.serviceData.name;
            var type = data.serviceData.type;
            var price = data.serviceData.price;
            console.log("dataprice", name, type, price)
        }

        const token = localStorage.getItem("token");

        axios
            .put(`/api/category/${categoryId}/service/${serviceId}`, JSON.stringify({
                "name": name, "type": type, "priceOptions": price, "duration": duration, "priceType": priceType, "price": priceOptions, "priceAction": "add", "priceId": priceserviceData.id

            }), {
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
                getcategoryList()
                console.error(error);
                toast.error(error.message, {
                    position: "top-right",
                    theme: "dark",
                });
            });
    };


    const updatePriceWithData = async (priceId) => {
        const data = location.state
        const serviceId = data.serviceData.serviceId;
        const name = data.serviceData.name;
        const type = data.serviceData.type;
        const price = data.serviceData.price;

        const result = priceserviceData.find(item => item.id === priceId);
        console.log(result);
        navigate("/update-price/" + categoryId + "/service/" + priceId, { state: { serviceData: { serviceId, name, type, price }, priceData: result, categoryId: categoryId } });

    };

    const deletePrice = async (catId, priceId) => {
        const token = (localStorage.getItem("token"));

        const name = location.state.serviceData.name;
        const type = location.state.serviceData.type;
        const price = location.state.serviceData.price;
        const result = await fetch(`/api/category/${catId}/service/${location.state.serviceData.serviceId}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                "name": name, "type": type, "priceOptions": price, "duration": duration, "priceType": priceType, "price": priceOptions, "priceAction": "delete", "priceId": priceId
            })
        });

        const response = await result.json();

        if (response) {
            if (response.status == 200) {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000, // 3 seconds
                });
                setTimeout(() => {
                    navigate("/");
                }, 3000);
                navigate("/price")
            }
        }
    };


    return (
        <div className="login">
            <input
                type="text"
                className="inputBox"
                placeholder="enter duration"
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
                <span className=".invalid.input">Enter valid Type</span>
            )}
            <input
                type="text"
                className="inputBox"
                placeholder="enter Price"
                onChange={(e) => {
                    setPriceOptions(e.target.value);
                }}
                value={priceOptions}
            />
            {error && !priceOptions && (
                <span className=".invalid.input">Enter valid price</span>
            )}
            <button className="appButton" onClick={updateServiceById} type="button">
                Add Price Service
            </button>

            <div className="product-list">
                <h3>Service List</h3>

                <ul>
                    <li>S.No.</li>
                    <li>Duration</li>
                    <li>Type</li>
                    <li>Price</li>
                    <li>Delete / Update</li>
                </ul>

                {priceserviceData && priceserviceData.length > 0 ? (
                    priceserviceData.map((price, index) => (
                        <ul key={price.id}>
                            <li>{index + 1}</li>
                            <li>{price.duration}</li>
                            <li>{price.type}</li>
                            <li>{price.price}</li>
                            <li>
                                <button onClick={() => deletePrice(categoryId, price.id)}>Delete</button>
                                <button onClick={() => updatePriceWithData(price.id)}>Update</button>
                                {/* <Link to={"/update-price/" + categoryId + "/service/" + price.id}>Update</Link> */}
                            </li>
                        </ul>
                    ))
                ) : (
                    <h1>No Services Found</h1>
                )}
            </div>
            {/* <Link to={"/price/"+objupdateServiceByIdData}>Update Service</Link> */}
            <ToastContainer />
        </div>
    );
};

export default updateServiceById;
