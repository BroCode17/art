
import { ITC_Font } from "@/local-fonts/local";
import HeadTitle from "./HeadTitle";
import gsap from "gsap";
import { useGSAP, } from "@gsap/react";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Row2Image from "./Row2Image";
import ImageContainer from "./ImageContainer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MyArtPieces = () => {
  const myRef = useRef(null);
  const[view, setView] = useState()
  const { ref, inView } = useInView({ threshold: 0 });

  useGSAP(() => {
      const t1 = gsap.timeline();
      t1.from('.title', {
        opacity: 0,
        y: '-10'
      }).from('.para', {
        opacity: 0,
        y: '-5'
      })
      t1.to('.title', {
        opacity: 1,
        duration: 1
      })

  
    
      t1.to('.para', {
        autoAlpha: 1,
        duration: 1,
      })



      // gsap.to('.para', {
      //   scrollTrigger: {
      //     trigger: '.para',
      //     toggleActions: 'restart pause reverse pause'
      //   },
      //   xPercent: '200',
      //   translateX: 0,
      //   duration: 3
      // })
  }, { scope: myRef });

  useEffect(() => {
     
     
  }, [myRef])

  return (
    <section className=" flex justify-center mt-10" ref={myRef}>
      <div className="grid  grid-cols-2 md:grid-cols-3 md:h-[600px] grid-rows-2 md:grid-rows-3 gap-3 w-[900px]">
        <Row2Image text="For Your Eyes Only" imgUrl={"brothers"} />
        <div className=" md:col-span-2 pt-5">
          <div ref={ref}>
            <HeadTitle title="My Art Pieces" className={`title  opacity-0`} />
          </div>
          <div className="pl-2 text-sm mt-3 w-[90%] para invisible">
            <p className="text-justify">
              Collection of art curated by Amo-Mensah Amofa. Artwork designed as
              more than a display but meant to ignite conversations that
              resonate within. Pieces formed as an expression to explore the
              depths of human emotion and connection. Behind every canvas is a
              story to tell and hear, where emotions find their voice
            </p>
          </div>
        </div>
        <Row2Image text="Fall of Man" imgUrl="fall" color="black" />
        <Row2Image text="Move with Me" imgUrl="oneman" />
        <div className=" relative">
          <ImageContainer text="House of Blue" imgUrl="blue" />
          <span
            className={`absolute bottom-5 left-5  text-white font-bold text-sm ${ITC_Font.className}`}
          >
            &quot;House of Blue&quot;
          </span>
        </div>
      </div>
    </section>
  );
};

export default MyArtPieces;
