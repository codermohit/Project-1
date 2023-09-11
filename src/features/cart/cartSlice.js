import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  cart: [
    {
      pizzaId: 12,
      name: 'Mediterranean',
      quantity: 3,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //action.payload => pizza object
      state.cart.push(action.payload);
      toast.success('Pizza added!!');
    },

    deleteItem(state, action) {
      //action.payload => pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
      toast.success('Pizza deleted!!');
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
      toast.success('Quantity increased');
    },

    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      console.log(item);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      toast.success('Quantity decreased');
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCurrentQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((acc, cur) => (acc += cur.totalPrice), 0);

export const getTotalPizzaQuantity = (state) =>
  state.cart.cart.reduce((acc, cur) => (acc += cur.quantity), 0);

export const getCart = (state) => state.cart.cart;
