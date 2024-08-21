"use client";
import {
  decreaseQuanty,
  increaseQuanty,
  openCartModal,
  ProductFromCartPageProps,
  removeProduct,
  updateInitState,
} from "@/_redux/slices/cartSlice";
import { useCallback, useEffect, useState } from "react";
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
import Cookies from "js-cookie";
import { Input } from "./ui/input";
import { formatCurrency } from "../../utils/formatters";
import { generateOrderReference } from "./orderReferenceGenerator";
import { useGetProductByIdQuery } from "@/_redux/services/productApi";
import { setOpenClose, setProductId } from "@/_redux/slices/orderSlice";
import { Button } from "./ui/button";
import { useGetOrderByRefQuery } from "@/_redux/services/ordersApi";
import { IoClose } from "react-icons/io5";
import { CldImage } from "next-cloudinary";

const CloseBtn = () => {
  const dispatch = useDispatch();
  return (
    // <button
    //   className=" bg-gray-100  text-white  font-bold py-2 px-4"
    //   onClick={() => dispatch(setOpenClose())}
    // >
    //   Close
    // </button>
    <div
      className="absolute z-40 right-2 top-2 w-6 h-6 cursor-pointer hover:scale-90"
      onClick={() => dispatch(setOpenClose())}
    >
      <IoClose size={24} />
    </div>
  );
};

export const ProductDetail = () => {
  const productId = useSelector((state: any) => state.order.productId);
  const [showError, setShowError] = useState("");
  const dispatch = useDispatch();
  const {
    data: p,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetOrderByRefQuery(productId);

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        setShowError(errorData.data.message);
      }
    }
  }, [error]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-5 relative">
          <p className="mt-4">
            {/* No order exist with the provided Order Reference. Please Make sure
            you entered a valid reference */}
            {showError}
          </p>
          <CloseBtn />
        </div>
      )}
      {isSuccess && (
        <div className=" p-4">
          <div
            className="bg-white rounded-lg shadow-lg p-6 mb-5 relative"
            onClick={() => dispatch(setOpenClose())}
          >
            <div className="absolute z-40 right-2 top-2 w-6 h-6 cursor-pointer hover:scale-90">
              <IoClose size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Order Information</h2>
            <p className="mb-2">
              <span className="font-semibold">Order Status:</span>{" "}
              {p.orderStatus}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 ">
            <h2 className="text-2xl font-bold mb-4">Products to be Shipped</h2>
            <div className="space-y-4">
              {p.products.map((product: any) => (
                <div
                  key={product._id}
                  className="flex items-center bg-gray-100 rounded-lg p-4 shadow"
                >
                  <div className="w-2/3">
                    <h3 className="text-md font-[700]">
                      {product.product.name}
                    </h3>
                    <p className="text-sm">
                      Quantity: {product.orderedQuantity}
                    </p>
                  </div>
                  <div className="flex justify-end bg-green-600">
                    <CldImage
                      src={product.product.image.public_src}
                      alt={product.product.name}
                      width={60}
                      height={82}
                      className=" w-full h-full object-cover "
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*        
          <CloseBtn /> */}
        </div>
      )}
    </div>
  );
};

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
    window.onbeforeunload = function () {
      Cookies.set(
        "cartItems",
        JSON.stringify({ data: cartItems, totalAmount: totalAmount }),
        { expires: 7 }
      );
    };

    return () => {
      window.onbeforeunload;
    };
  });

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
                    <p>{formatCurrency(Number(item.price) / 100)}</p>
                    <p>{item.size}</p>
                  </div>
                  <button
                    onClick={() => dispatch(removeProduct(item.id))}
                    className=" pr-2"
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
              Subtotal: {formatCurrency(totalAmount / 100)}
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

const load = ({ cartItems, totalAmount }: any) => {
  window.onbeforeunload = function () {
    Cookies.set(
      "cartItems",
      JSON.stringify({ data: cartItems, totalAmount: totalAmount }),
      { expires: 7 }
    );
  };

  return () => {
    window.onbeforeunload;
  };
};

const CheckoutLink = ({ name }: { name: string }) => {
  const dispatch = useDispatch();
  //generate reference number
  const order = generateOrderReference(8);

  const cartItems = useSelector((state: any) => state.cart.products);
  const totalAmount = useSelector((state: any) => state.cart.totalAmount);

  const handleFoward = () => {
    // load({ cartItems, totalAmount });
    Cookies.set(
      "cartItems",
      JSON.stringify({ data: cartItems, totalAmount: totalAmount }),
      { expires: 7 }
    );
    dispatch(openCartModal());
  };

  return (
    <Link href={`/order/${order}`} onClick={handleFoward}>
      <button className="bg-black text-white text-xs py-3 mt-2 font-semibold w-full uppercase border">
        {name}
      </button>
    </Link>
  );
};
const SearchOrderLink = ({ name }: { name: string }) => {
  const dispatch = useDispatch();
  const [orderReference, setOrderReference] = useState("");
  const [isError, setIsError] = useState(false);
  //generate reference number
  const handleSearchOrder = () => {
    if (
      orderReference.length === 0 ||
      orderReference.length < 8 ||
      orderReference.length > 8
    ) {
      setIsError(true);
    } else {
      dispatch(setProductId(orderReference));
      dispatch(setOpenClose());
      dispatch(openCartModal());
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {isError && (
          <p className="text-destructive mt-1">Enter a valid order id</p>
        )}
        <div className="flex items-center gap-2">
          <div>
            <Input
              className="rounded-none"
              placeholder="Order Reference Code"
              value={orderReference}
              onChange={(e) => setOrderReference(e.target.value)}
            />
          </div>

          <button
            className="bg-black text-white text-xs py-3 font-semibold w-1/3 uppercase border"
            onClick={handleSearchOrder}
          >
            {name}
          </button>
        </div>
      </div>
    </>
  );
};
