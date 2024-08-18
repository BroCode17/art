import Image from "next/image";
import React from "react";
import { ITC_Font } from "@/local-fonts/local";
import AboutMe from "@/components/AboutMe";

const AboutPage = () => {
  return (
    <div className="min-h-dvh ml flex flex-col">
      <div className="bg-soft max-md:h-[30rem] h-[26rem] flex flex-col md:flex-row items-center justify-center w-full border relative py-5">
        <div className="flex  items-center justify-center">
          <div className="border-1 flex h-96 items-center justify-center border-red-500 max-sm:flex-col-reverse max-sm:gap-2 py-6">
          <div className="h-full min-w-[300px] bg-gray-400 md:w-[330px]">
              <Image
                src="/images/yy.png"
                alt="Amofa"
                width={500}
                height={500}
                className={` w-full object-contain h-full`}
                priority
              />
            </div>
            <div className="w-[300px]  sm:-ml-[150px] flex flex-col max-md:mt-10">
              <h1
                className={`self-end font-bold ${ITC_Font.className} sm:text-xl`}
              >
                About Me
              </h1>
              <div className="bg-[#3678F6] bg-opacity-[46%] sm:p-6">
                <h1 className={`font-bold ${ITC_Font.className} sm:text-xl`}>
                  Amo-Mensah Amofah
                </h1>
                <p className="text-sm">
                  A self-taught artist based in Glastonbury, Connecticut
                </p>
              </div>
            </div>
          
          </div>
        </div>
      </div> 

      <AboutMe />
    </div>
  );
};

export default AboutPage;
