"use client";
import React, { useEffect, useLayoutEffect } from "react";
import ImageContainerTwo from "./ImageContanierTwo";
import Link from "next/link";
import { encryptObjectClient } from "../../utils/encDecrypt";
import { CldImage } from "next-cloudinary";
import ImageWithSkeleton from "./_images/ImageWithSkeleton";


interface ItemInterface {
  variant:any;
  image: {
    public_src: string;
    url: string;
  };
  description: string;
  title: string;
  id: string;
  quantity: number;
  flag?: boolean,
  price?: string
}


const Card = (
  { variant , image, description, title, id, quantity, flag, price }: ItemInterface
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
      variant,
      id,
    },
  };
  
  useEffect(() => {
      console.log(variant[0]?.price)
  }, [variant])
  
  const productInfo = encryptObjectClient(href.query);
  const q = {productInfo}

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer relative">
      { quantity === 0 && <div className="absolute inset-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-40">
         <p className="font-semibold text-xl select-none">Out of Stock</p>
      </div>}
      <Link
        href={href.pathname}
        as={`shop/${id}?${new URLSearchParams(q)}`}
      >
      <div className="relative h-48 sm:h-64">
        <ImageWithSkeleton
          src={image.public_src}
          alt={title}
          height={200}
          width={150}
          className="object-cover w-full h-full rounded-bl-none rounded-br-none"
       
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-md font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-4  truncate text-xs">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-black">{price !== '$NaN'? price : variant[0]?.price}</span>
        
          <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-muted-foreground transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default Card;
