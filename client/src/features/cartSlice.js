import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

let initialState = {
  value: {
    restaurant: {
      data: {},
      cart: [],
      order: null,
    },
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let { toast, ...rest } = action?.payload;

      if (
        state.value.restaurant.cart.filter(
          (item) => item.mealPack.id === rest.mealPack.id,
        ).length > 0
      ) {
        return;
      }

      state.value.restaurant.data = rest;
      state.value.restaurant.cart.push(rest);
      let order = {
        ...rest,
        orderId: uuid(),
        cart: state.value.restaurant.cart,
      };
      state.value.restaurant.order = order;
      toast({
        title: "Added to cart",
        description: `${state.value.restaurant.data.mealPack.size} meal pack added to cart.`,
        status: "success",
        duration: 5000,
      });
    },
    removeFromCart: (state, action) => {
      let { toast, ...rest } = action?.payload;
      state.value.restaurant.cart = state.value.restaurant.cart.filter(
        (item) => item.mealPack.id !== rest.mealPack.id,
      );
      toast({
        title: "Removed from cart",
        description: `${state.value.restaurant.data.mealPack.size} meal pack removed from the cart.`,
        status: "success",
        duration: 5000,
      });
    },
    clearCart: (state) => {
      state.value = {
        restaurant: {
          data: {},
          cart: [],
          order: null,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
