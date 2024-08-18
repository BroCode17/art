"use client";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable, ScrollTrigger } from "gsap/all";

import ImageContainerTwo from "@/components/ImageContanierTwo";
import { ProductTypes } from "@/types";
import { useGetAllProductQuery } from "@/_redux/services/productApi";
import { Loader2 } from "lucide-react";

gsap.registerPlugin(useGSAP, Draggable, ScrollTrigger);

const G = () => {
  const container = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState([]);
  const { data, isSuccess, isLoading, isError } = useGetAllProductQuery('');

  useEffect(() => {
    if (isSuccess) {
      setProduct(data.data);
    }
  }, [data, isSuccess]);

  useGSAP(() => {
    const images = gsap.utils.toArray(".item");

    const imageSize = images.length;
    const total = images.length;

    const degree = 360 / total;

    const init = () => {
      const timeline = gsap.timeline();
      images.forEach((image:any, index) => {
        const sign = Math.floor((index / 2) % 2) ? 1 : -1;
        const value = Math.floor((index + 4) / 4) * 4;
        const rotation = index > imageSize - 3 ? 0 : sign * value;

        gsap.set(image!, {
          rotation: rotation,
          scale: 0.5,
        });

        timeline.from(
          image!,
          {
            x: () =>
              index % 2
                ? window.innerWidth + image.clientWidth * 4
                : -window.innerWidth - image.clientWidth * 4,
            y: () => window.innerHeight - image.clientHeight,
            rotation: index % 2 ? 200 : -200,
            scale: 4,
            autoAlpha: 1,
            ease: "power4.out",
            duration: 1,
            delay: 0.2 * Math.floor(index / 2),
          },
          0
        );

        let rotationAngle = index * degree;
        timeline.to(
          image!,
          {
            scale: 1,
            duration: 0,
          },
          0.15 * (imageSize / 2 - 1) + 1
        );

        timeline.to(
          image!,
          {
            transformOrigin: "center 200vh",
            rotation:
              index > imageSize / 2
                ? -degree * (imageSize - index)
                : rotationAngle,
            duration: 1,
            ease: "power1.out",
          },
          0.15 * (imageSize / 2 - 1) + 1
        );
      });
    };

    const draggable = () => {
      let start = 0;
      Draggable.create(".items", {
        type: "rotation",

        onDragStart: function () {
          start = this.rotation;
        },
        onDragEnd: function () {
          const rotation = this.rotation;
          const offset = Math.abs(rotation - start);
          if (rotation > start) {
            if (rotation - start < degree / 2) {
              gsap.to(".items", {
                rotation: `-=${offset}`,
              });
            } else {
              gsap.to(".items", {
                rotation: `+=${2 * degree - offset}`,
              });
            }
          } else {
            if (Math.abs(rotation - start) < degree / 2) {
              gsap.to(".items", {
                rotation: `+=${offset}`,
              });
            } else {
              gsap.to(".items", {
                rotation: `-=${2 * degree - offset}`,
              });
            }
          }
        },
      });
    };

    init();
    draggable();
  }, []),
    { scope: container };

  return (
    <div className="container">
      <div className="center">
        <div className="items" ref={container}>
          {/* <div className="item"> 
            <div className="card">
              <img
                className="image"
                src="https://www.themoviedb.org/t/p/original/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg"
              />
            </div>
          </div> */}
          {isLoading && <div>
            <Loader2 className="animate-spin" />
            </div>}
          {isError && <div className=" text-xl">
            Ops!!!...Something Happend Whiles Fetching Data
            </div>}

          {isSuccess &&
            product.slice(0, 15).map((item:any, index) => (
              <div className="item" key={index}>
                <div className="card">
                <ImageContainerTwo
                    imgUrl={item?.image?.public_src as string}
                    text={'Ebenezer'}
                    flag={false}
                  />
                </div>
              </div>
            ))}

      
        </div>
      </div>
    </div>
  );
};

export default G;
