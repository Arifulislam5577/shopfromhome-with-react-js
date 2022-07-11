import React from "react";
import { useSelector } from "react-redux";
import ProductLayout from "./ProductLayout";

const Home = () => {
  const { error, isLoading, products } = useSelector((state) => state.products);

  if (error) {
    return (
      <section className=" bg-white py-10 container">
        <div className="alert alert-warning shadow-lg ">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <div className=" bg-white py-10 container">
        <h1 className="font-bold text-xl uppercase">Loading...</h1>
      </div>
    );
  }

  return (
    <section className="bg-white py-10">
      <div className="container">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
          {products?.map((product) => (
            <ProductLayout {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
