import { Source_Sans_Pro_400 } from "@/local-fonts/local";
import React from "react";


const Points = ({ desc }: { desc: string }) => {
  return (
    <div className="flex text-sm">
      <div>&#8226;</div>&nbsp;
      <div className={`${Source_Sans_Pro_400.className} `}>{desc}</div>
    </div>
  );
};

export default Points;
