import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addTocart, getProduct } from "../features/product/productSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const { cart, product, isLoading } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <section className="product-container py-10 container bg-white">
        <h1 className="text-xl font-bold uppercase ">Loading...</h1>
      </section>
    );
  }

  return (
    <section className="product py-10 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 justify-center">
          <div className="col-span-1 text-center flex justify-center border p-5">
            <img src={product?.image} className="h-96 " alt={product?.title} />
          </div>
          <div className="col-span-1">
            <h1 className="text-xl font-bold">{product?.title}</h1>
            <p className="text-gray-500 my-5">{product?.description}</p>
            <h3 className="text-slate-700 font-bold mb-5">
              Rating - {product?.rating?.rate} from {product?.rating?.count}
              reviews
            </h3>
            <h3 className="text-slate-700 font-bold mb-5">
              Price - ${product?.price}
            </h3>
            <h3 className="text-slate-700 font-bold mb-5">
              Category - {product?.category}
            </h3>
            <button
              className="p-3 w-2/3 bg-slate-900 text-gray-50 hover:bg-slate-800 uppercase transition-all"
              onClick={() => dispatch(addTocart(product?.id))}
            >
              {cart.find((product) => product.id === product?.id)
                ? "In cart"
                : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
