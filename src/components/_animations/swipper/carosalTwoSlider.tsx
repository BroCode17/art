"use client";
import { useGetImagesQuery } from "@/_redux/services/imageApi";
import { Loader2 } from "lucide-react";
import { CldImage } from "next-cloudinary";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SliderProps {
  autoSlide?: boolean;
  intervalDuration?: number;
}

const CarosalTwoSlide: React.FC<SliderProps> = ({
  autoSlide,
  intervalDuration,
}) => {
  const { data, refetch, isSuccess, isLoading, isError } =
    useGetImagesQuery("");
  const [images, setImges] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useLayoutEffect(() => {
    if (isSuccess) {
      const caroImage = data.response.filter((item: any) =>
        item.tags.includes("Caro 2")
      );
      setImges(caroImage);
    }
  }, [data, isSuccess]);

  // const [colors, setColors] = useState([
  //   "orange",
  //   "blue",
  //   "white",
  //   "yellow",
  //   "cyan",
  //   "cyan",
  //   "indigo",
  //   "indigo",
  // ]);

  // useEffect(() => {

  // }, [activeIndex])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getSlideStyle = (index: number) => {
    const position = (index - activeIndex + images.length) % images.length;
    if (position === 0)
      return "w-32 h-40 top-0 left-0 translate-y-0 shadow-none z-10";

    const maxVisibleSlides = Math.min(images.length - 1, 5);
    const step = 100 / maxVisibleSlides;

    if (position <= maxVisibleSlides) {
      return `left-[calc(50%+${position * step}px)]`;
    }

    return "left-[calc(60%+250px)] opacity-0";
  };
  //inset-[80px_200px_80px_80px]

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoSlide && !isHovering) {
      interval = setInterval(() => {
        handlePrev();
      }, intervalDuration);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoSlide, isHovering, intervalDuration, handlePrev]);

  return (
    <div className="absolute h-full">
      {/* <Container className="relative overflow-hidden"> */}

      {isSuccess && (
        <div
          className="relative w-screen h-full overflow-hidden flex justify-center items-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className="absolute inset-0 transition-all duration-500 bg-cover bg-center bg-black bg-blend-multiply bg-opacity-45"
            // style={{ backgroundColor: colors[activeIndex] }}
            style={{
              backgroundImage: `url(${
                images[activeIndex]
                  ? images[activeIndex]?.image.url
                  : "/images/brand.png"
              })`,
            }}
          >
            {images.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-32  h-40 rounded-[20px] transition-all duration-500 shadow-[0_25px_50px_rgba(0,0,0,0.5)] ${getSlideStyle(
                    index
                  )}`}
                  // style={{ backgroundColor: color }}
                >
                  <CldImage
                    src={item?.image?.public_src as string}
                    alt={"Ebenezer"}
                    fill
                    className="rounded-[20px]"
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-4 flex  gap-5 z-10">
            <button
              className="bg-transparent border p-1  rounded-full font-bold text-gray-300  hover:bg-black hover:text-white"
              onClick={handleNext}
            >
              <FaChevronLeft />
            </button>
            <button
              className="bg-blend-multiply border p-1 rounded-full font-bold text-gray-300 hover:bg-black hover:text-white ml-6"
              onClick={handlePrev}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
      {/* </Container> */}
      {isLoading && (
        <div className="flex items-center w-full h-full">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {isError && <div className=" text-sm flex items-center w-full h-full">Server is down</div>}
    </div>
  );
};

export default CarosalTwoSlide;
