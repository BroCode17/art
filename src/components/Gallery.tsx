"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import BannerImg from "./BannerImg";
import HeadTitle from "./HeadTitle";
import Container from "./Container";
import { shopData } from "../../utils/data";
import ImageContainer from "./ImageContainer";
import { useInView } from "react-intersection-observer";
import ImageWithSkeleton from "./_images/ImageWithSkeleton";
import { useGetImagesQuery } from "@/_redux/services/imageApi";

const Gallery = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  const { data, refetch, isSuccess, isLoading, isError } =
    useGetImagesQuery("");
  const [images, setImges] = useState<any[]>([]);

  useLayoutEffect(() => {
    if (isSuccess) {
      // const caroImage = data.response.filter((item: any) =>
      //   item.tags.includes("Galley")
      // );
      setImges(data.response);
    }
  }, [data, isSuccess]);

  return (
    <div className="min-h-dvh">
      
      <div className="flex justify-center mt-20 px-2 md:px-0">
        <Container className="bg-white">
          <HeadTitle
            title="Explore My Gallery"
            className="text-xl p-0 m-0 flex justify-start"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 w-full min-h-96 mt-10 gap-1">
            {images.map((item, index) => {
              let sizeClass = "";

              switch (index % 6) {
                case 1:
                  sizeClass =
                    "max-sm:row-span-1 max-sm:h-[200px] sm:row-span-2 md:col-span-1 sm:h-[400px]";
                  break;
                case 2:
                  sizeClass = "row-span-1 md:col-span-2 h-[200px]";
                  break;
                default:
                  sizeClass = "col-span-1 row-span-1 h-[200px]";
              }

              return (
                <div
                  key={index}
                  className={` ${sizeClass} md:p-0 relative` }
                  ref={ref}
                >
                  {/* {!inView && (
                    <div className="flex justify-center items-center h-full absolute inset-0 left-0 right-0">
                      <div className="w-12 h-12 border-4 border-soft border-dotted rounded-full animate-spin" ></div>
                    </div>
                  )} */}
                  {/* <div className="w-full h-full" > */}
                    <ImageWithSkeleton
                      src={item.image.public_src}
                      alt={item.alt}
                      width={400}
                      height={400}
                      className="w-auto h-auto"
              
                      // className={`opacity-0 ${inView && "opacity-100"}`}
                    />
                  {/* </div> */}
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Gallery;
