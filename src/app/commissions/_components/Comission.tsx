import React from "react";
import Image from "next/image";
import {
  Ink_Free,
  ITC_Font,
  Source_Sans_Pro_400,
  Source_Sans_Pro_Bold,
  Source_Sans_Pro_Light,
  Source_Sans_Pro_SemiBold,
} from "@/local-fonts/local";
;
import Points from "@/components/Points";
import GenericBanner from "@/app/gallery/_components/GenericBanner";
import Container from "@/components/Container";
import HeadTitle from "@/components/HeadTitle";
import UserForm from "@/components/UserForm";
import { leftPointsData, pointsData } from "../../../../utils/data";


const Render  = ({position, imgPath}:{position: 'left'|'right'; imgPath: string}) => {
    switch(position){
      case 'left':
          return (
            <div className="flex max-sm:flex-col gap-5 items-center">
              <div className="bg-black h-[370px] w-[40%] overflow-hidden border max-sm:w-full max-sm:px-10">
                <Image
                  src={imgPath}
                  alt="Fall"
                  width={1000}
                  height={1000}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  className="object-cover"
                 
                />
              </div>
              <div className="w-2/3 max-sm:w-full">
                <h1 className={`font-bold ${ITC_Font.className} text-xl`}>Lorem Ipsum</h1>
                  <div className="text-sm flex flex-col gap-5 mt-5 ">
                  <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Maecenas porttitor congue massa. Fusce posuere, magna sed
                  pulvinar ultricies, purus lectus malesuada libero, sit amet
                  commodo magna eros quis urna. Nunc viverra imperdiet enim.
                  Fusce est. Vivamus a tellus. Pellentesque habitant morbi
                  tristique senectus et netus et malesuada fames ac turpis
                  egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean
                  nec lorem. In porttitor. Donec laoreet nonummy augue.
                  Suspendisse dui purus, scelerisque at, vulputate vitae,
                  pretium mattis, nunc. Mauris eget neque at sem venenatis
                  eleifend. Ut nonummy
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Maecenas porttitor congue massa. Fusce posuere, magna sed
                  pulvinar ultricies, purus lectus malesuada libero, sit amet
                  commodo magna eros quis urna
                </p>
                  </div>
              </div>
            </div>
          )
      case 'right':
        return(
          <div className="flex max-sm:flex-col gap-5 items-center">
             
              <div className="w-2/3 max-sm:w-full">
                <h1 className={`font-bold ${ITC_Font.className} text-xl`}>Lorem Ipsum</h1>
                  <div className="text-sm flex flex-col gap-5 mt-5 ">
                  <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Maecenas porttitor congue massa. Fusce posuere, magna sed
                  pulvinar ultricies, purus lectus malesuada libero, sit amet
                  commodo magna eros quis urna. Nunc viverra imperdiet enim.
                  Fusce est. Vivamus a tellus. Pellentesque habitant morbi
                  tristique senectus et netus et malesuada fames ac turpis
                  egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean
                  nec lorem. In porttitor. Donec laoreet nonummy augue.
                  Suspendisse dui purus, scelerisque at, vulputate vitae,
                  pretium mattis, nunc. Mauris eget neque at sem venenatis
                  eleifend. Ut nonummy
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Maecenas porttitor congue massa. Fusce posuere, magna sed
                  pulvinar ultricies, purus lectus malesuada libero, sit amet
                  commodo magna eros quis urna
                </p>
                  </div>
              </div>

              <div className="bg-black h-[370px] w-[40%] overflow-hidden border max-sm:w-full max-sm:px-10">
                <Image
                  src={imgPath}
                  alt="Fall"
                  width={1000}
                  height={1000}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  className="object-cover"
                 
                />
              </div>
            </div>
        )
    }
}


const Commissions = () => {
  return (
    <div className="">
      <GenericBanner
        bannerImgUrl="/images/commision.png"
        bannerTitle="Commission"
      />
      <div className="w-ful flex justify-center">
        <Container className="bg-white mt-20">
          <div>
            <div className="flex gap-8 flex-col md:flex-row">
              <div className="w-full md:w-2/3 pt-5 flex flex-col gap-5 ">
                <h1 className={`${Ink_Free.className} text-3xl font-bold`}>
                  Bring Your Vision to LIFE <br /> With a CUSTOM ART
                </h1>

                <p className={`${Source_Sans_Pro_400.className} `}>
                  We offer you the opportunity to collaborate with Amo to create
                  customer piece of art that reflects your personal vision and
                  style
                </p>

                <div className="flex flex-col gap-2">
                  <h2 className={`${Source_Sans_Pro_SemiBold.className}`}>
                    HOW IT WORKS:
                  </h2>

                  <ul>
                    <li className="flex flex-col">
                      {pointsData.map((item, index) => (
                        <Points key={index} desc={item.desc} />
                      ))}
                    </li>
                  </ul>

                  <h1 className={`${Source_Sans_Pro_Bold.className}`}>
                    NOTE: Framing options are also available upon request
                  </h1>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/four.png"
                  alt="Fall"
                  width={400}
                  height={400}
                  // style={{
                  //   width: "100%",
                  //   height: "auto",
                  //   objectFit: "initial",
                  // }}
                  className="h-[500px]  md:w-[400px] md:h-auto"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-8 flex-col sm:flex-row mt-10 items-center">
            <div className="max-sm:w-6/12 h-64">
              <Image
                src="/images/frame.png"
                alt="Fall"
                width={1000}
                height={1000}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "initial",
                }}
                className="w-full h-full md:h-auto"
              />
            </div>
            <div className="w-full md:w-2/3 pt-5 flex flex-col gap-5 ">
              <div className="flex flex-col gap-2">
                <h2 className={`${Source_Sans_Pro_SemiBold.className}`}>
                  WHY COMMISSION ARTWORK?
                </h2>

                <ul>
                  <li className="flex flex-col gap-3">
                    {leftPointsData.map((item, index) => (
                      <Points key={index} desc={item.desc} />
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 mt-14">
            <div className="w-24 h-[.5px] bg-black"></div>
            <div>
              <HeadTitle
                title="Let's get Started!"
                className="text-md p-0 m-0"
              />
            </div>
            <div className="w-24 h-[.5px] bg-black"></div>
          </div>

          {/* FROM */}
          <div className="mt-10"><UserForm /></div>
          {/* Horizontal Bar */}
          <div className="flex justify-center mt-10">
            <hr className="w-4/5 h-[1px] bg-black border-[0.5px] border-black "/>
          </div>

          <div className="mt-10 flex flex-col gap-10">
            <h1 className={`font-bold ${ITC_Font.className} text-xl`}>Some Commisiond Pieces</h1>
            <Render position="left" imgPath="/images/coms.png"/>
            <Render position="right" imgPath="/images/home.png"/>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Commissions;
