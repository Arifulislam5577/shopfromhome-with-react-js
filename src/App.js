import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { getProducts } from "./features/product/productSlice";
import { useDispatch } from "react-redux";
import SingleProduct from "./components/SingleProduct";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
