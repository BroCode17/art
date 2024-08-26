"use client";
import React from "react";
import ImageContainerTwo from "./ImageContanierTwo";
import Link from "next/link";
import { encryptObjectClient } from "../../utils/encDecrypt";
import { CldImage } from "next-cloudinary";
import ImageWithSkeleton from "./_images/ImageWithSkeleton";


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
  
  const productInfo = encryptObjectClient(href.query);
  const q = {productInfo}

  return (
    // <Link href={{pathname:'/shop/',  query: {name:'helloword'} }} as={`/shop/${description}`}>
    // <div className="relative h-[260px] cursor-pointer drop-shadow-md shadow-md rounded-md hover:scale-105 transition-all duration-500">
    //  { quantity === 0 && <div className="absolute inset-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-50">
    //     <p className="font-semibold text-xl select-none">Out of Stock</p>
    //   </div>}
    //   <Link
    //     href={href.pathname}
    //     as={`shop/${id}?${new URLSearchParams(q)}`}
    //   >
    //     {/* // <Link href={href} as={`/product/123?${new URLSearchParams(query).toString()}`} > */}
    //     <ImageContainerTwo
    //       imgUrl={image?.public_src}
    //       text={description}
    //       flag={flag}
    //       className=" "
    //     />
    //     <div className="h-[4.15rem] sm:h-14 absolute w-full bg-white bg-opacity-80 bottom-0 left-0  overflow-hidden shadow-inner">
    //       <div className="flex justify-between items-center py-2 max-sm:flex-col sm:px-5 text-ellipsis overflow-hidden">
    //         <div className="m-0 p-0 max-sm:w-full max-sm:flex items-center gap-2 trancate">
    //           <h1 className="max-sm:ml-1 my-0 py-0 font-bold text-sm">{price}</h1>
    //           <p className="text-[0.675rem] text-clip overflow-hidden ">{title}</p>
    //         </div>
    //         <div className="bg-black text-white py-2 px-3 md:rounded-full cursor-pointer max-sm:w-full ">
    //           <button className="cursor-pointer select-none max-sm:text-xs">BUY NOW</button>
    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    // </div>
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
          <span className="text-xl font-bold text-black">{price}</span>
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
