import React from "react";


import { BannerProps } from "@/types";
import { cn } from "@/lib/utils";
import BannerImg from "@/components/BannerImg";
import HeadTitle from "@/components/HeadTitle";

const GenericBanner = ({
  bannerImgUrl,
  bannerTitle,
  titleColor,
}: BannerProps) => {
  return (
    <div className="w-full relative">

      <BannerImg imageUrl={bannerImgUrl} />
   
        <div className="absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <HeadTitle
            title={bannerTitle}
            className={cn(`text-white text-center bg-transparent`, titleColor)}
          />
        
      </div>
    </div>
  );
};

export default GenericBanner;
