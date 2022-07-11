import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTocart } from "../features/product/productSlice";
const ProductLayout = ({ title, price, image, id }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.products);
  return (
    <article
      className="p-5 bg-gray-50 flex flex-col items-center justify-center shadow"
      key={id}
    >
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className="h-20" />
      </Link>

      <div className="product-description mt-5 text-center">
        <Link to={`/product/${id}`}>
          <h2 className="font-bold text-sm text-slate-900 hover:text-slate-700 transition-all">
            {title}
          </h2>
        </Link>
        <h3 className="text-slate-900 my-5">${price}</h3>
        <button
          className="bg-gray-200 py-2 px-4  hover:bg-slate-900 transition-all hover:text-gray-50 rounded-md border-none text-slate-900 hover:scale-90"
          onClick={() => dispatch(addTocart(id))}
        >
          {cart.find((product) => product.id === id)
            ? "In cart"
            : "Add to cart"}
        </button>
      </div>
    </article>
  );
};

export default ProductLayout;
