import React from "react";
import IntroBox from "./IntroBox";
import Container from "./Container";
import TestCard from "./TestCard";

const Testimonials = () => {
  return (

     
      <Container className="">
        <IntroBox
          className="mt-10"
          title="Testimonails"
          description="Collection of art curated by Amo-Mensah Amofa. Artwork designed as
         more than a display but meant to ignite conversations"
        />
        <div className="  flex flex-col-reverse md:flex-row gap-4 ">
          <div className="flex flex-row md:flex-col gap-5 md:w-[36%]">
            <TestCard />
            <TestCard />
          </div>
          {/* Video */}
          <div className="col-span-2  bg-soft flex-1 flex items-center justify-center">
            Video
          </div>
        </div>
      </Container>
  
  );
};

export default Testimonials;
