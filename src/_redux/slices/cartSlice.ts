import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  deliveryMethod?: string;
  size: string
}

export interface ProductFromCartPageProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  deliveryMethod?: string;
  image: string;
  size?: string;
  variant?: any;
  priceIndex?: number;
}

interface CartState {
  products: Product[];
  totalAmount: number;
  showCart: boolean;
  deliveryAmount: number
}

interface OrderState {
  orders: Product[];
}





const initialState: CartState = {
  products: [],
  totalAmount: 0.0,
  showCart: false,
  deliveryAmount: 0.0
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
        (product) => product.id === action.payload.id && product.size === action.payload.size
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.totalAmount += action.payload.price * action.payload.quantity;
      if(action.payload.deliveryMethod !== 'free')
          state.deliveryAmount += 559
    },
    removeProduct: (state, action: PayloadAction<{id:string, size:string}>) => {
      const productIndex = state.products.findIndex(
        (product) =>  product.id === action.payload.id && product.size === action.payload.size
      );
      if (productIndex >= 0) {
        state.totalAmount -=
          state.products[productIndex].price *
          state.products[productIndex].quantity;
          if(state.products[productIndex].deliveryMethod !== 'free')
              state.deliveryAmount -= 559
        state.products.splice(productIndex, 1);
        
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalAmount = 0;
      state.deliveryAmount = 0;
    },
    openCartModal: (state) => {
      state.showCart = !state.showCart;
    },

    increaseQuanty: (state, action: PayloadAction<{ id: string, size: string}>) => {
      const item = state.products.find((p) =>  p.id === action.payload.id && p.size === action.payload.size);
      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
      }
    },

    decreaseQuanty: (state, action: PayloadAction<{ id: string, size:string }>) => {
      const item = state.products.find((p) =>  p.id === action.payload.id && p.size === action.payload.size);
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
