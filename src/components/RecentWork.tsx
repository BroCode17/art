import React from "react";
import HeadTitle from "./HeadTitle";
import ImageContainerTwo from "./ImageContanierTwo";
import ImageContainer from "./ImageContainer";
import { recentWorkData } from "../../utils/data";
import ImageWithSkeleton from "./_images/ImageWithSkeleton";

const RecentWork = () => {
  return (
    <div className="mt-16 ">
      <HeadTitle
        title="Recent Artworks"
        className="text-2xl text-left p-0 m-0"
      />
      <div className="grid grid-cols-2 md:flex gap-2 md:justify-start mt-5 ">
        {recentWorkData.map((item, index) => (
          <div className="md:w-1/4 hover:scale-105 transition-all duration-500" key={index}>
            <ImageWithSkeleton
              key={index}
              alt={item.url}
              src={item.url}
              width={400}
              height={500}
              flag={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentWork;
