// some-inner-component.jsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwiper } from "swiper/react";

export default function SlideNextButton() {
  const swiper = useSwiper();

  const next = () => {
    console.log("Clicked");
    swiper.slideNext();
  };
  return (
    <div className=" z-10 flex w-full bottom-0 absolute">
      {/* Indicator */}

      <Link
        href="/gallery"
        className="absolute bottom-10 right-10 lg:right-[250px] bg-opacity-20 bg-black  hover:bg-black hover:bg-opacity-100 transform hover:ease-linear duration-200 border-white p-2 border"
      >
        <div className="bg-transparent  rounded-none font-bold text-white ">
          Explore my Gallery
        </div>
      </Link>

      <div className="absolute bottom-10 left-10 lg:left-[250px] bg-opacity-20 border-gray-400 bg-black  rounded-full">
        <Button
          className="bg-transparent border w-10 rounded-full font-bold  hover:bg-black hover:text-white"
          onClick={() => {
            swiper.slidePrev();
          }}
        >
          <FaChevronLeft />
        </Button>

        <Button
          className="bg-transparent border w-10 rounded-full font-bold  hover:bg-black hover:text-white ml-6"
          onClick={next}
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
}
