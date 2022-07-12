import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { cartCalc, getProducts } from "./features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
function App() {
  const dispatch = useDispatch();
  const { cart, amount } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(cartCalc());
  }, [dispatch, cart, amount]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
