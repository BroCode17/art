
// import React, { useState, useRef, useEffect } from 'react';

// const Slider: React.FC = () => {
//   const [slides, setSlides] = useState<string[]>(['orange', 'blue', 'white', 'yellow', 'cyan', 'indigo']);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev + 1) % slides.length);
//   };

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const getSlideStyle = (index: number) => {
//     const position = (index - activeIndex + slides.length) % slides.length;
//     if (position === 0) return 'w-full h-full top-0 left-0 translate-y-0 shadow-none z-10';
//     if (position === 1) return 'left-[calc(50%+50px)]';
//     if (position === 2) return 'left-[calc(50%+100px)]';
//     if (position === 3) return 'left-[calc(50%+150px)]';
//     if (position === 4) return 'left-[calc(50%+200px)]';
//     return 'left-[calc(50%+250px)] opacity-0';
//   };

//   return (
//     <div className="absolute w-screen h-screen overflow-hidden flex justify-center items-center">
//       <div
//         ref={sliderRef}
//         className="absolute inset-[80px_200px_80px_80px] transition-colors duration-500"
//         style={{ backgroundColor: slides[activeIndex] }}
//       >
//         {slides.map((color, index) => (
//           <div
//             key={index}
//             className={`absolute top-1/2 -translate-y-1/2 w-60 h-80 rounded-[20px] transition-all duration-500 shadow-[0_25px_50px_rgba(0,0,0,0.5)] ${getSlideStyle(index)}`}
//             style={{ backgroundColor: color }}
//           >
//             {index + 1}
//           </div>
//         ))}
//       </div>
//       <div className="absolute bottom-4 flex gap-5 z-10 bg-green-500">
//         <button
//           onClick={handleNext}
//           className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center cursor-pointer active:opacity-50"
//         >
//           next
//         </button>
//         <button
//           onClick={handlePrev}
//           className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center cursor-pointer active:opacity-50"
//         >
//           prev
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Slider;

// import React, { useEffect, useLayoutEffect, useState } from "react";

// interface SliderProps {
//   autoSlide?: boolean;
//   intervalDuration?: number;
// }

// const Slider: React.FC<SliderProps> = ({  autoSlide, intervalDuration}) => {
//   const { data, refetch, isSuccess, isLoading, isError } =
//   useGetImagesQuery("");
//   const [images, setImges] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);

//   useLayoutEffect(() => {
//     if (isSuccess) {
//       setImges(data.response);
//     }
//   }, [data, isSuccess]);


//   const [colors, setColors] = useState([
//     "orange",
//     "blue",
//     "white",
//     "yellow",
//     "cyan",
//     "cyan",
//     "indigo",
//     "indigo",
//   ]);
 

//   // useEffect(() => {

//   // }, [activeIndex])

  
//   const handleNext = () => {
//     setActiveIndex((prev) => (prev + 1) % images.length);
//   };

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const getSlideStyle = (index: number) => {
//     const position = (index - activeIndex + images.length) % images.length;
//     if (position === 0)
//       return "w-32 h-40 top-0 left-0 translate-y-0 shadow-none z-10";

//     const maxVisibleSlides = Math.min(images.length - 1, 5);
//     const step = 100 / maxVisibleSlides;

//     if (position <= maxVisibleSlides) {
//       return `left-[calc(50%+${position * step}px)]`;
//     }

//     return "left-[calc(60%+250px)] opacity-0";
//   };
//   //inset-[80px_200px_80px_80px]

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (autoSlide && !isHovering) {
//       interval = setInterval(() => {
//         handleNext();
//       }, intervalDuration);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [autoSlide, isHovering, intervalDuration, handleNext]);

//   return (
//     <div className="">
//       {/* <Container className="relative overflow-hidden"> */}
//       {isLoading && (
//         <div>
//           <Loader2 className="animate-spin" />
//         </div>
//       )}
//       {isError && <div className=" text-sm">Server is down</div>}
//       {isSuccess && (
//         <div className="relative w-screen h-[30rem] overflow-hidden flex justify-center items-center"
//         onMouseEnter={() => setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//         >
//           <div
//             className="absolute inset-0 transition-all duration-500 bg-cover bg-center "
//             // style={{ backgroundColor: colors[activeIndex] }}
//            style={{ backgroundImage: `url(${images[activeIndex] ? images[activeIndex]?.image.url : '/images/brand.png'})` }}
//           >
//             {images.map((item, index) => (
//               <div
//                 key={index}
//                 className={`absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-32  h-40 rounded-[20px] transition-all duration-500 shadow-[0_25px_50px_rgba(0,0,0,0.5)] ${getSlideStyle(
//                   index
//                 )}`}
//                 // style={{ backgroundColor: color }}
//               >
//                 <CldImage
//                   src={item?.image?.public_src as string}
//                   alt={"Ebenezer"}
//                   fill
//                   className="rounded-[20px]"
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="absolute bottom-4 flex gap-5 z-10 bg-green-500">
//             <button
//               onClick={handleNext}
//               className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center cursor-pointer active:opacity-50"
//             >
//               prev
//             </button>
//             <button
//               onClick={handlePrev}
//               className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center cursor-pointer active:opacity-50"
//             >
//               next
//             </button>
//           </div>
//         </div>
//       )}
//       {/* </Container> */}
//     </div>
//   );
// };

// export default Slider;
'use client'

import Gallery from "@/components/_animations/galley/ArtGallery";

const artworks = [
    {
      id: '1',
      title: 'Starry Night',
      artist: 'Vincent van Gogh',
      imageUrl: '/images/starry-night.jpg',
      description: 'This is a description of Starry Night...',
    },
    {
      id: '2',
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      imageUrl: '/images/mona-lisa.jpg',
      description: 'This is a description of Mona Lisa...',
    },
    {
      id: '3',
      title: 'The Persistence of Memory',
      artist: 'Salvador Dalí',
      imageUrl: '/images/persistence-of-memory.jpg',
      description: 'This is a description of The Persistence of Memory...',
    },
    // Add more artworks here
  ];
  
  export default function Home() {
    return (
      <main>
        <Gallery artworks={artworks} />
      </main>
    );
  }