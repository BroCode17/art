'use client'
import { ITC_Font } from "@/local-fonts/local";
import React, { useState } from "react";
import { galleryCarouselImages } from "../../utils/data";



const CarosalTwo = () => {
  const [currSlide, setCurrSlide] = useState(0);

  const nextSlide = () => {
    setCurrSlide((prev) => (prev === galleryCarouselImages.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrSlide((prev) => (prev === 0 ? galleryCarouselImages.length - 1 : prev - 1));
  };

  const switchToIndex = (idx: number) => {
    setCurrSlide(idx)
  }

  return (
    <div className="w-[900px] text-white flex flex-col gap-5 
     max-md:px-4 h-96 mt-10 z-50">
      <div className="relative">
        <h1 className={`${ITC_Font.className} text-xl text`}>Gallery Carousel</h1>
        <div className="w-3/5 absolute ">
          <p className="text-sm pt-2 sm:h-10 absolute z-10 ">
            Collection of art curated by Amo-Mensah Amofa. Artwork designed as
            more than a display but meant to ignite conversations{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarosalTwo;
