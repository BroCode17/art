// Import Swiper React components
"use client";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';

import { imagesArray, } from "../../../../utils/data";
import SlideNextButton from "./SwiperBtn";
import ImageWithSkeleton from "@/components/_images/ImageWithSkeleton";
import { useEffect, useState } from "react";
import { useGetImagesQuery } from "@/_redux/services/imageApi";

 const Slide = () => {
  const swiper = useSwiper();
  const [currentImage, setCurrentImage] = useState<any[]>(imagesArray);
  const { data, isSuccess} =
    useGetImagesQuery("");

  //When images are ready, Add to the main carousel images;
  useEffect(() => {
      if(isSuccess){
        const caroImage = data.response.filter((item: any) =>
          item.tags.includes("Caro 1")
        );
        //console.log(caroImage)
        setCurrentImage((prev) => [...prev, ...caroImage])
      }
  },[data, isSuccess])
  
  //   const nexto = () => {
  //   swiper.slideNext();
  // };
  return (
    <div className="relative">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
          EffectCoverflow,
        ]}
        spaceBetween={0}
        slidesPerView={1}
      
        className="h-96 w-full"
        autoplay={{
          delay: 5000,
          waitForTransition: true,
        }}
        effect="coverflow"
        loop={true}
        fadeEffect={{
          crossFade: true,
        }}
      >
        <div className="flex overflow-hidden relative h-10 w-full">
          {currentImage.map((item, index) => (
            <SwiperSlide
              key={index}
              //style={{ transform: `translateX(-${currSlide * 100}%)` }}
              className=""
            >
              {
                item.url ? (
                  <ImageWithSkeleton
                src={item.url}
                alt="Carosaul"
                width={1000}
                height={1000}
                className="w-full bg-blend-multiply rounded-none"
                flag={true}
              />
                ): (
                  <ImageWithSkeleton
                  src={item.image.public_src as string}
                  alt="Carosaul"
                  width={1000}
                  height={1000}
                  className="w-full bg-blend-multiply rounded-none"
                
                />
                )
              }
            </SwiperSlide>
          ))}
        </div>
        <SlideNextButton />
      </Swiper>
    </div>
  );
};

export default Slide