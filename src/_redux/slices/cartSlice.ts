import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  deliveryMethod?: string;
}

export interface ProductFromCartPageProps {
  id: string;
  title: string;
  price: string;
  quantity: number;
  deliveryMethod?: string;
  image: string;
  size: string;
}

interface CartState {
  products: Product[];
  totalAmount: number;
  showCart: boolean;
}

interface OrderState {
  orders: Product[];
}

import Cookies from 'js-cookie';

// Utility function to load from cookies safely
const loadFromCookies = () => {
  if (typeof window === 'undefined') {
    return []; // Provide a fallback if accessed during SSR
  }

  try {
    const serializedState = Cookies.get('cartItems');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn('Could not load cart items from cookies', e);
    return [];
  }
};


const loadFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return []; // Provide a fallback if accessed during SSR
  }

  try {
    const serializedState = localStorage.getItem('cartItems');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn('Could not load cart items from local storage', e);
    return [];
  }
};





const initialState: CartState = {
  products: [],
  totalAmount: 0.0,
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateInitState: (state, action: PayloadAction<{data: Product[], totalAmount: number}>) => {
        state.products = action.payload.data;
        state.totalAmount = action.payload.totalAmount
        
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.totalAmount += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (productIndex >= 0) {
        state.totalAmount -=
          state.products[productIndex].price *
          state.products[productIndex].quantity;
        state.products.splice(productIndex, 1);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalAmount = 0;
    },
    openCartModal: (state) => {
      state.showCart = !state.showCart;
    },

    increaseQuanty: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.products.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
      }
    },

    decreaseQuanty: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.products.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity -= 1;
        state.totalAmount -= item.price;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearCart,
  openCartModal,
  increaseQuanty,
  decreaseQuanty,
  updateInitState
} = cartSlice.actions;

export default cartSlice.reducer;
