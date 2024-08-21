import React, { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Cookies   from "js-cookie";
import { openCartModal, updateInitState } from "@/_redux/slices/cartSlice";

const loadFromCookies = () => {
  if (typeof window === "undefined") {
    return {data: [], totalAmount: 0}; // Provide a fallback if accessed during SSR
  }

  try {
    const serializedState = Cookies.get("cartItems");
    return serializedState ? JSON.parse(serializedState) : {data: [], totalAmount: 0};
  } catch (e) {
    console.warn("Could not load cart items from cookies", e);
    return {data: [], totalAmount: 0};
  }
};

const Cart = () => {
  const item = useSelector((state: any) => state.cart.products);

  const dispatch = useDispatch()

 



  useEffect(() => {
   
   dispatch(updateInitState(loadFromCookies()))
  }, []);

  return (
    <div
      className="relative w-4 cursor-pointer"
      onClick={() => {
       
        dispatch(openCartModal());
      }}
    >
      <FaCartShopping />
      {item.length > 0 && (
        <div className="w-2 h-2 bg-red-500 rounded-full absolute inset-0 left-[0.7rem] -top-[0.2rem]"></div>
      )}
    </div>
  );
};

export default Cart;
