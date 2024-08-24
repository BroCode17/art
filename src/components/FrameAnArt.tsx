
import React, { useEffect, useState } from "react";
import { useGetAllProductQuery } from "@/_redux/services/productApi";
import { ProductTypes } from "@/types";
import { formatCurrency } from "../../utils/formatters";

import IntroBox from "./IntroBox";
import Container from "./Container";
import Card from "./Card";
import { SkeletonDemo } from "./_images/SkeletonDemo";

const FrameAnArt = () => {
  const [product, setProduct] = useState([]);
  const { data, isSuccess, isLoading, isError } = useGetAllProductQuery("");

  useEffect(() => {
    if (isSuccess) {
      setProduct(data.data);
    }
  }, [data, isSuccess]);
  return (
    <Container className="bg-white md:px-4 lg:px-0">
      <IntroBox
        className="text-black"
        title="Frame an Art"
        description=" Collection of art curated by Amo-Mensah Amofa. Artwork designed as
            more than a display but meant to ignite conversations"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4  relative">
        {isLoading && <div className="absolute w-full h-full flex justify-center">
          <SkeletonDemo />
          </div>}
        {isError && <div>Opps!!!...try referesh your browser</div>}

        {isSuccess &&
          product.slice(0,6).map((item:any, index) => {
            const amout = formatCurrency(item.price / 100);
            return (
              <Card
                key={index}
                image={item.image}
                description={item.description}
                price={amout}
                flag={false}
                id={item._id as string}
                quantity={item.quantity}
                title={item.name}
              />
            );
          })}
      </div>
    </Container>
  );
};

export default FrameAnArt;
