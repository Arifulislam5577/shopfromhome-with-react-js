import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cartItems = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios("https://fakestoreapi.com/products");
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axios(`https://fakestoreapi.com/products/${id}`);

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  products: [],
  cart: cartItems,
  product: null,
  relatedProducts: [],
  amount: 0,
  price: 0,
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const itemId = action.payload;
      const item = state.products.find((product) => product.id === itemId);
      const product = { ...item, qty: 1 };

      if (state.cart.find((cart) => cart.id === product.id)) {
        return;
      } else {
        state.cart = [...state.cart, product];
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    toggleQty: (state, action) => {
      const itemId = action.payload.id;
      const item = state.cart.find((product) => product.id === itemId);

      if (action.payload.sign === "plus") {
        item.qty = item.qty + 1;
      } else {
        item.qty = item.qty - 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((pd) => pd.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    cartCalc: (state, action) => {
      state.amount = state.cart.reduce((acc, item) => acc + item.qty, 0);
      state.price = state.cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.product = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addTocart, cartCalc, toggleQty, removeItem } =
  productSlice.actions;
export default productSlice.reducer;
