"use client";
import {
  decreaseQuanty,
  increaseQuanty,
  openCartModal,
  ProductFromCartPageProps,
  removeProduct,
  updateInitState,
} from "@/_redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import ImageContainerTwo from "./ImageContanierTwo";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

import { IoMdCloseCircleOutline } from "react-icons/io";
import { CheckoutBtn } from "./RadioButton";
import Link from "next/link";
import Cookies from 'js-cookie';
import { Input } from "./ui/input";
import { formatCurrency } from "../../utils/formatters";
import { generateOrderReference } from "./orderReferenceGenerator";

export const Counter = ({ id, quantity }: { id: string; quantity: number }) => {
  const dispatch = useDispatch();


  return (
    <div
      className={`border border-soft flex justify-between px-1 py-2 rounded-sm mt-1 bg-white`}
    >
      <button
        className="cursor-pointer"
        onClick={() => dispatch(increaseQuanty({ id }))}
      >
        <FaCirclePlus />
      </button>
      <span className="font-semibold text-xs">{quantity}</span>
      <button
        className="cursor-pointer"
        onClick={() => {
          if (quantity === 1) {
            dispatch(removeProduct(id));
          }
          {
            dispatch(decreaseQuanty({ id }));
          }
        }}
      >
        <FaCircleMinus />
      </button>
    </div>
  );
};

export default function CartModal() {
  // const { cartItems, removeFromCart, isOpen, toggleCart } = useCart();
  const isOpen: boolean = useSelector((state: any) => state.cart.showCart);

  const cartItems = useSelector((state: any) => state.cart.products);
  const totalAmount = useSelector((state: any) => state.cart.totalAmount);

  const dispatch = useDispatch();

  useEffect(() => {}, [isOpen, cartItems]);



  // useEffect(() => {
  //   // Save cart items to local storage whenever they change
  //   //localStorage.setItem("cartItems", JSON.stringify(cartItems));
  //   Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
  // }, [cartItems]);

  useEffect(() => {
    window.onbeforeunload = function(){
      console.log('Hello')
      console.log(totalAmount)
      Cookies.set('cartItems', JSON.stringify({data: cartItems, totalAmount: totalAmount}), {expires: 7} );
    }

    return () => {window.onbeforeunload}
  })



  if (!isOpen) return null;

  return (
    <Sheet open={true} onOpenChange={() => dispatch(openCartModal())}>
      <SheetTrigger asChild>
        <button className="hidden" />
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription className="sr-only hidden">
            Make changes to your to your cart and checkout
          </SheetDescription>
        </SheetHeader>
        <div className="h-[80%]">
          <h2 className="text-xl font-bold mb-4"></h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map((item: ProductFromCartPageProps) => (
                <li
                  key={item.id}
                  className="flex justify-between mb-2 bg-soft h-20 items-center"
                >
                  <div className="w-16 h-full">
                    <ImageContainerTwo imgUrl={item.image} text={item.title} />
                  </div>
                  <div className="w-20 text-sm">
                    <span>{item.title}</span>
                    <Counter quantity={item.quantity} id={item.id} />
                  </div>
                  <div className="w-10 text-sm">
                    <p>
                      {formatCurrency(Number(item.price))}
                      </p>
                      <p>{item.size}</p>
                    
                  </div>
                  <button
                    onClick={() => dispatch(removeProduct(item.id))}
                    className="text-red-500 pr-2"
                  >
                    <IoMdCloseCircleOutline size={24} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-full">
          <SearchOrderLink name="Search Order" />
          {cartItems.length > 0 && <CheckoutLink name="Check Out" />}
          {cartItems.length > 0 && (
            <p className="text-muted-foreground text-right ">
              Subtotal: {formatCurrency(totalAmount)}
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

const CheckoutLink = ({ name }: { name: string }) => {
  const dispatch = useDispatch();
  //generate reference number
  const order = generateOrderReference(8)
  return (
    <Link href={`/order/${order}`} onClick={() => dispatch(openCartModal())}>
      <button className="bg-black text-white text-xs py-3 mt-2 font-semibold w-full uppercase border">
        {name}
      </button>
    </Link>
  );
};
const SearchOrderLink = ({ name }: { name: string }) => {
  const dispatch = useDispatch();
  //generate reference number
  const order = generateOrderReference(8)
  return (
    <div className="flex items-center gap-2">
      <Input  className="rounded-none" placeholder="Order Reference Code"/>
      <button className="bg-black text-white text-xs py-3 font-semibold w-full uppercase border">
        {name}
      </button>
    </div>
  );
};
