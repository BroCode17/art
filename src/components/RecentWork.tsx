import React from "react";
import HeadTitle from "./HeadTitle";
import ImageContainerTwo from "./ImageContanierTwo";
import ImageContainer from "./ImageContainer";
import { recentWorkData } from "../../utils/data";

const RecentWork = () => {
  return (
    <div className="mt-16 ">
      <HeadTitle
        title="Recent Artworks"
        className="text-2xl text-left p-0 m-0"
      />
      <div className="grid grid-cols-2 md:flex gap-2 md:justify-start mt-5">
        {recentWorkData.map((item, index) => (
          <div className="md:w-1/4" key={index}>
            <ImageContainer
              key={index}
              imgUrl={item.url}
              text={item.url}
              flag={item.flag}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentWork;
