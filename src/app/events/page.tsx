import Container from "@/components/Container";
import React from "react";
import GenericBanner from "../gallery/_components/GenericBanner";



export type ShowType = {
  showType?: string
}

const Render = ({ showType }: ShowType) => {
  switch (showType) {
    case 'left':
      return (
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 flex-wrap gap-4 sm:grid-cols-3 w-full">
            <div className="col-span-2 h-[300px]  sm:col-span-3 rounded-sm bg-soft"></div>
            <div className="h-[300px] w-full rounded-sm bg-soft "></div>
            <div className="h-[300px] rounded-sm bg-soft"></div>
            <div className="h-[300px] rounded-sm bg-soft"></div>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center w-full ">
          <div className="grid grid-cols-2 flex-wrap gap-4 sm:grid-cols-3 w-full">
            <div className="h-[300px] w-full  bg-soft"></div>
            <div className="h-[300px] bg-soft"></div>
            <div className="h-[300px] bg-soft"></div>
            <div className="col-span-2 h-[300px] rounded-sm bg-soft sm:col-span-3"></div>
          </div>
        </div>
      );
  }
};

const page = () => {
  return (
    <div className="min-h-dvh">
      <GenericBanner bannerImgUrl="/images/shop.png" bannerTitle="Events/Exhibition" />
      <div className="flex justify-center mt-20">
      <Container className="bg-white mt-10">
           <div>
           <Render showType={'left'} />
           </div>
           <div className="mt-10">
           <Render  />
           </div>
      </Container>
      </div>
    </div>
  );
};

export default page;
