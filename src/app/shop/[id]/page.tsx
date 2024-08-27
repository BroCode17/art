"use client";
import React, { useEffect, useLayoutEffect } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import HeadTitle from "@/components/HeadTitle";
import { CldImage } from "next-cloudinary";
import { useCallback, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { RadioButton } from "@/components/RadioButton";
import { useSelector } from "react-redux";
import GenericBanner from "@/app/gallery/_components/GenericBanner";
import { decryptObjectClient } from "../../../../utils/encDecrypt";
import { formatCurrency } from "../../../../utils/formatters";

interface SelectType {
  value: "Small" | "Medium" | "Large";
}
// export const SelectForm = () => {
//   const [size, setItemSize] = useState("Small");

//   const handleValueChange = (value: any) => {
//     setItemSize(value);
//   };

//   return (
//     <div>
//       <h1 className={`text-sm font-normal`}>Pick a size</h1>
//       <Select onValueChange={handleValueChange} defaultValue="Small">
//         <SelectTrigger className="w-2/3 rounded-none">
//           <SelectValue placeholder="Select a timezone" />
//         </SelectTrigger>
//         <SelectContent>
//           {["Small", "Medium", "Large"].map((item: string) => (
//             <SelectItem key={item} value={item}>
//               {item}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

const ProductPage = ({ params: { id } }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
 //Get the encrypted data
  const productInfo = searchParams.get("productInfo");
 //Decypte and the actual data
  const decryptedData = decryptObjectClient(productInfo as string);
  // const eg = decryptObjectClient('1se');
  
  const [counter, setCounter] = useState(1);
  const [enbaleDecrease, setEnableDecrease] = useState(true);
  const productItem = useSelector((state: any) => state.cart.products);
  //const [size, setItemSize] = useState(decryptedData?.variant[0]?.name || '');
  const [size, setItemSize] = useState('');
  const [numOfItems, setNumOfItems] = useState(productItem.length || 0);
  const [currPrice, setCurrPrice] = useState( decryptedData?.variant[0]?.price || 0);
  
  useEffect(() => {
    setNumOfItems(productItem.length);
  }, [productItem]);

  
//  useLayoutEffect(() => {
      
//  }, [size])

  if(decryptedData === null) return notFound()



  const increaseItem = useCallback(() => {
    setEnableDecrease(false);
    setCounter((prev) => prev + 1);
  }, [enbaleDecrease]);

  const { title, image, description, price, variant } = decryptedData;
  

  
     //SET CURRENT PRICE BASE ON SELECTED SIZE
     const handleSetCurrentPrice = (priceName: string) => {
      const rs = variant?.find((v:any) => v.name === priceName).price;
      setCurrPrice(rs)
    }
    



  //HANDLE SELECT VALUE CHANGE
  const handleValueChange = (value: any) => {
    setItemSize(value)
    handleSetCurrentPrice(value)
    
  };

  const decreaseItem = () => {
    if (counter < 2) setEnableDecrease(true);
    setCounter((prev) => prev - 1);
  };



  return (
    <div className="min-h-dvh w-full ">
      <div className="">
        <GenericBanner bannerImgUrl="shop.png" bannerTitle="Cart" />
        <div className="w-full flex justify-center">
          <Container className="bg-white mt-20 ">
            <HeadTitle title={`Add To Cart `} className="text-start mb-5" />
            <div className="w-full flex flex-col items-center md:items-start  justify-center md:flex-row gap-2 md:gap-10">
              <div className="w-[350px] ">
                <CldImage
                  src={image!}
                  alt={title!}
                  width={1000}
                  height={1000}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "initial",
                  }}
                  className="w-full h-full md:h-auto "
                />
                <h1 className="text-zinc-900 font-semibold">Description</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="max-w-[400px] border border-black p-10">
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold">{`"${title!}"`}</h1>
                  <hr className="w-10/12 h-[1px] bg-gray-300 rounded-sm"></hr>
                  <div>
                    <h2 className="text-sm font-bold">US {formatCurrency(currPrice)}</h2>
                  </div>

                  <hr className=" h-[2px] bg-gray-300 rounded-sm"></hr>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex-1">
                      <div>
                         {/* <SelectForm /> */}
                         <h1 className={`text-sm font-normal`}>Pick a size</h1>
                           <Select onValueChange={handleValueChange}>
                            <SelectTrigger className="w-2/3 rounded-none">
                              <SelectValue placeholder="Select Size" />
                            </SelectTrigger>
                            <SelectContent>
                              {variant.map((item:{name: string, price:number}) => (
                               
                                <SelectItem key={item.name} value={item.name} >
                                  {item.name}
                                </SelectItem>
                               
                              ))} 
                              {/* {["Small", "Medium", "Large"].map((item: string) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))} */}
                            </SelectContent>
                          </Select>  

                        <h1 className="h-5 text-sm mt-2">Quantity</h1>
                        {/* <Counter /> */}
                        <div
                          className={`border border-soft w-2/3 flex justify-between items-center p-2 mt-1 h-[36px]`}
                        >
                          <button
                            className="cursor-pointer"
                            onClick={increaseItem}
                          >
                            <FaCirclePlus />
                          </button>
                          <span className="font-semibold text-xs">
                            {counter}
                          </span>
                          <button
                            className="cursor-pointer"
                            disabled={enbaleDecrease}
                            onClick={decreaseItem}
                          >
                            <FaCircleMinus />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className=" w-[120px] flex flex-col gap-2 ">
                      <div className="flex h-[90%] gap-2">
                        <div className="flex w-10/12 bg-gray-300 h-[88px]"></div>
                        <div className="border-l border-black flex  justify-start items-center pl-1">
                          <div className="flex flex-col justify-center  ">
                            <span className="text-[0.65rem] transform rotate-90 font-semibold p-0 m-0 ">
                              {(size === 'Original' || size === '')? "30in" : `${size.substring(4)}in`}
                            </span>
                           
                          </div>
                        </div>
                      </div>
                      <div className="w-[78%] text-center  leading-none border-t border-black">
                        <span className="text-[.65rem] font-semibold">
                        {(size === 'Original' || size === '')? '20in' : `${size.substring(0,2)}in`}
                          
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className=" h-[2px] bg-gray-300 rounded-sm"></hr>
                  {/* <div className="flex flex-col gap-2">
                  <div className="bg-gray-300 w-full h-12"></div>
                  <div className="bg-gray-300 w-full h-12"></div>
                </div> */}
                  <div className="w-full" >
                    <RadioButton
                      id={id}
                      price={currPrice}
                      title={title!}
                      quantity={counter}
                      image={image!}
                      size={size}
                      variant= {variant}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
{
  /***
  
  
  
  */
}
