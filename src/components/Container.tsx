import { cn } from "@/lib/utils";
import React from "react";

const Container = ({children, className}:{children: React.ReactNode; className?: string}) => {
  return (
    <div className={cn(`w-[900px]  flex max-md:px-4 flex-col gap-5 bg-black h-full`,className)}>
      <div className=" mb-20">
            {children}
      </div>
    </div>
  );
};

export default Container;
