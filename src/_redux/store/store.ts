'use client'
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../services/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../services/userApi";
import  userReducer from '../slices/userSlice'
import productSlice from "../slices/productSlice";
import cartSlice from '../slices/cartSlice'
import { orderApi } from "../services/ordersApi";
import headerSlice from "../slices/headerSlice";
import orderSlice from "../slices/orderSlice";
import { imageApi } from "../services/imageApi";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        user: userReducer,
        product: productSlice,
        cart: cartSlice,
        header: headerSlice,
        order: orderSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productApi.middleware, userApi.middleware, orderApi.middleware, imageApi.middleware])
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;