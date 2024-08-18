import { ITC_Font } from "@/local-fonts/local";
import { cn } from "@/lib/utils";
import React from "react";

const HeadTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        `pl-5 font-bold text-[30px] ${ITC_Font.className} text-center max-md:pl-0`,
        className
      )}
    >
      {title}
    </h1>
  );
};

export default HeadTitle;
