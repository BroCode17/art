"use client";

import Container from "@/components/Container";
import HeadTitle from "@/components/HeadTitle";


import React, { useEffect, useState } from "react";
import { shopData } from "../../../../utils/data";
import Card from "@/components/Card";

import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import GenericBanner from "../gallery/_components/GenericBanner";
import { formatCurrency, formatNumber } from "../../../../utils/formatters";
import { useGetAllProductQuery } from "@/_redux/services/productApi";
import { SkeletonDemo } from "@/components/_images/SkeletonDemo";


const ShopPage = () => {
  const [product, setProduct] = useState([]);
  const { data, isSuccess, isLoading, isError, error } = useGetAllProductQuery("");
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (isSuccess) {
      setProduct(data.data);
    }
  }, [data, isSuccess]);

  const filteredProducts = product.filter((p:any) =>
  p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen relative">
      <GenericBanner bannerImgUrl="HandCraft.png" bannerTitle="Shop" />
      <div className="flex justify-center md:px-4 lg:px-0">
        <Container className="bg-white mt-10">
          <div className="flex justify-between">
            <HeadTitle title="Buy an Art Piece" className="text-xl p-0 m-0" />
            <div className="flex items-center justify-start border-black border pl-4 focus-within:border-2">
              {/* I will fix the search box */}
              <Search size={18} color="	#778899"/>
              <Input  placeholder="Search" className="border-none outline-none  focus-visible:ring-0 focus-visible:bg-none focus-visible:border-none focus-visible:ring-offset-0" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
          </div>

          <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-5 mt-10 ">
            {isLoading && <SkeletonDemo />}
            {!isLoading && filteredProducts.length === 0 && <div className="text-2xl text-center">No Available Product</div>}          

            {isSuccess &&
              filteredProducts.map((item:any, index) => {
  
                const amout = formatCurrency(Number(formatNumber(item.price/ 100)));
                return (
                  <Card
                    key={index}
                    id={item._id}
                    image={item.image}
                    description={item.description}
                    variant={item.variants}
                    price={amout}
                    title={item.name}
                    flag={false} 
                    quantity={item.quantity} />
                );
              })}
          </div>
        </Container>
      </div>
      
    </div>
  );
};

export default ShopPage;
