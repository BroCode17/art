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

import { imagesArray } from "../../../../utils/data";
import SlideNextButton from "./SwiperBtn";

 const Slide = () => {
  //   const [currSlide, setCurrSlide] = useState(0);

  // const nextSlide = () => {
  //   setCurrSlide((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
  // };
  // const prevSlide = () => {
  //   setCurrSlide((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
  // };

  // const switchToIndex = (idx: number) => {
  //   setCurrSlide(idx)

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
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        className="h-96 w-full"
        //pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          waitForTransition: true,
        }}
        effect="fade"
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
              <Image
                src={item.url}
                alt="Carosaul"
                style={{
                  width: "100%",
                  height: "24rem",
                  objectFit: "cover",
                }}
                className="w-full bg-blend-multiply"
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