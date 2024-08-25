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

import { imagesArray } from "../../../../utils/data";
import SlideNextButton from "./SwiperBtn";
import ImageWithSkeleton from "@/components/_images/ImageWithSkeleton";

 const Slide = () => {
  const swiper = useSwiper();
  const nexto = () => {
    swiper.slideNext();
  };
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
          {imagesArray.map((item, index) => (
            <SwiperSlide
              key={index}
              //style={{ transform: `translateX(-${currSlide * 100}%)` }}
              className=""
            >
              <ImageWithSkeleton
                src={item.url}
                alt="Carosaul"
                width={1000}
                height={1000}
                className="w-full bg-blend-multiply rounded-none"
                flag={true}
              />
            </SwiperSlide>
          ))}
        </div>
        <SlideNextButton />
      </Swiper>
    </div>
  );
};

export default Slide