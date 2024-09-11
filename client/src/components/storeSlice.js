import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  isCategoriesFetched: false,
  totalCount: 0,
  cartItems: [],
  totalPrice: 0,
};

export const fetchCategories = createAsyncThunk(
  "store/fetchCategories",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    ).then((res) => res.json());

    return response;
  }
);

export const storeSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingCartItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (existingCartItemIndex !== -1) {
        state.cartItems[existingCartItemIndex].quantity =
          state.cartItems[existingCartItemIndex].quantity + 1;
      } else {
        const newCartItem = {
          id: action.payload.id,
          data: action.payload,
          quantity: 1,
        };
        state.cartItems.push(newCartItem);
      }
      state.totalCount = state.totalCount + 1;
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalPrice = Math.round(state.totalPrice * 100) / 100;
    },
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.loading = true;
      state.isCategoriesFetched = false;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.isCategoriesFetched = true;
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
      state.isCategoriesFetched = false;
    },
  },
});

export const { addToCart } = storeSlice.actions;

export default storeSlice.reducer;
