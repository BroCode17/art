"use client";
import React from "react";
import ImageContainerTwo from "./ImageContanierTwo";
import Link from "next/link";


interface ItemInterface {
  price: any;
  image: {
    public_src: string;
    url: string;
    base64: string;
  };
  description: string;
  title: string;
  id: string;
  quantity: number;
  flag?: boolean
}

const Card = (
  { price, image, description, title, id, quantity, flag }: ItemInterface
) => {
  // const query = {
  //   name: 'John',
  //   age: 30,
  // };

  const href = {
    pathname: "/shop/[id]",
    query: {
      title,
      image: image.public_src,
      description,
      price,
      id,
    },
  };

  return (
    // <Link href={{pathname:'/shop/',  query: {name:'helloword'} }} as={`/shop/${description}`}>
    <div className="relative h-[260px] cursor-pointer drop-shadow-md shadow-md">
     { quantity === 0 && <div className="absolute inset-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-50">
        <p className="font-semibold text-xl select-none">Out of Stock</p>
      </div>}
      <Link
        href={href.pathname}
        as={`shop/${id}?${new URLSearchParams(href.query).toString()}`}
      >
        {/* // <Link href={href} as={`/product/123?${new URLSearchParams(query).toString()}`} > */}
        <ImageContainerTwo
          imgUrl={image?.public_src}
          text={description}
          flag={flag}
        />
        <div className="h-[4.15rem] sm:h-14 absolute w-full bg-white bg-opacity-80 bottom-0 left-0  overflow-hidden ">
          <div className="flex justify-between items-center py-2 max-sm:flex-col sm:px-5">
            <div className="m-0 p-0 max-sm:w-full max-sm:flex items-center gap-2">
              <h1 className="max-sm:ml-1 my-0 py-0 font-bold text-sm">{price}</h1>
              <p className="text-[0.675rem] ">{title}</p>
            </div>
            <div className="bg-black text-white py-2 px-3 md:rounded-full cursor-pointer max-sm:w-full ">
              <button className="cursor-pointer select-none max-sm:text-xs">BUY NOW</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
