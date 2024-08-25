
import GenericBanner from '@/app/gallery/_components/GenericBanner';
import Container from '@/components/Container';
import HeadTitle from '@/components/HeadTitle';
import React from 'react'

const OrderDetailsPage = () => {
  return (
    <div className="min-h-dvh w-full ">
    <div className="">
      <GenericBanner bannerImgUrl="shop.png" bannerTitle="Cart" />
      <div className="w-full flex justify-center">
        <Container className="bg-white mt-20 ">
          <HeadTitle title={`Shipping Information`}className="text-start mb-5" />
         
        </Container>
      </div>
    </div>
  </div>
);
}

export default OrderDetailsPage