import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleQty, removeItem } from "../features/product/productSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const { cart, amount, price } = useSelector((state) => state.products);

  if (cart.length === 0) {
    return (
      <section className="bg-white py-10">
        <div className="container">
          <div class="alert alert-warning shadow-lg ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Your cart is currently empty!</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-3 col-span-1 w-full">
            <div class="overflow-x-auto">
              <table class="table w-full ">
                <thead>
                  <tr>
                    <th>S.NO:</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((pd, i) => (
                    <tr
                      key={pd.id}
                      className={`${(i + 1) % 2 === 0 ? "active" : ""}`}
                    >
                      <th>{i + 1}</th>
                      <td>{pd.title.split(" ").slice(0, 5).join(" ")}</td>
                      <td className="flex gap-2 items-center">
                        <button
                          onClick={() =>
                            dispatch(toggleQty({ id: pd.id, sign: "plus" }))
                          }
                        >
                          <ion-icon name="add-circle-outline"></ion-icon>
                        </button>
                        {pd.qty}
                        <button
                          onClick={() => {
                            dispatch(toggleQty({ id: pd.id, sign: "minus" }));
                            pd.qty <= 1 && dispatch(removeItem(pd.id));
                          }}
                        >
                          <ion-icon name="remove-circle-outline"></ion-icon>
                        </button>
                      </td>
                      <td>${(pd.qty * pd.price).toFixed(2)}</td>
                      <td>
                        <button onClick={() => dispatch(removeItem(pd.id))}>
                          <ion-icon
                            name="trash-outline"
                            size="small"
                          ></ion-icon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-1 w-full">
            <div className=" bg-gray-50">
              <h1 className="font-bold text-center p-4 bg-warning">
                Cart Summary
              </h1>
              <div className="p-4">
                <div className="flex items-center justify-between my-5 font-bold">
                  <h2>Total Items</h2>
                  <h2>{amount}</h2>
                </div>

                <div className="flex items-center justify-between my-5 font-bold">
                  <h2>Total Price</h2>
                  <h2>${price.toFixed(2)}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
