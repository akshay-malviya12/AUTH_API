import React from "react";
import "./App.css";
import Nav from "./components/Nav";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home"
import AddCategory from "./components/AddCategory"
import Categories from "./components/categories"
import UpdateCategory from "./components/UpdateCategory"
import AddService from "./components/AddService"
import ServiceList from "./components/ServicesList";
import UpdateService from "./components/UpdateService";
import Price from "./components/Price"
import UpdatePrice from "./components/UpdatePrice"
function App() {
  return (
    <div className="App">
      {/* <h1>React App is ready to start works</h1> */}

      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/add-category" element={<AddCategory />}></Route>
          <Route path="/view-category" element={<Categories />}></Route>
          <Route path="/update-category/:id" element={<UpdateCategory />}></Route>          
          <Route path="/add-service" element={<AddService />}></Route>
          <Route path="/view-service" element={<ServiceList />}></Route>
          <Route path="/update-service/:categoryId/service/:serviceId" element={<UpdateService />}></Route>
          <Route path="/price" element={<Price />}></Route>
          <Route path="/update-price/:categoryId/service/:priceId" element={<UpdatePrice />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
