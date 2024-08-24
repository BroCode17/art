"use client";
import { useState } from "react";
import Image from "next/image";
import ImageSkeleton from "./ImageSkeleton";
import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  imageType?: boolean;
  priority?: boolean;
  className?: string;
  flag?: boolean;
};

const Render = ({
  imageType,
  src,
  alt,
  width,
  height,
  priority,
  className,
  flag,
}: ImageWithSkeletonProps) => {
  const [isLoading, setIsLoading] = useState(true);
  if (flag) {
   
    return (
      <div className="relative w-full h-full ">
        {isLoading && <ImageSkeleton />}
      <Image
        src={`/images/${src}`}
        alt={alt}
        width={width}
        height={height}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        // placeholder='blur'
        // blurDataURL={base64}
        className={cn(`rounded-lg transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            } `, className)}
        onLoad={() => setIsLoading(false)}
        priority={priority || false}
      />
      </div>
    );
  }
  if (imageType) {
    return (
      <div className="relative w-full h-full ">
        {isLoading && <ImageSkeleton />}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            `rounded-lg transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`,
            className
          )}
          onLoadingComplete={() => setIsLoading(false)}
          priority={priority || false}
        />
      </div>
    );
  }
  return (
    <div className="relative w-full h-full">
      {isLoading && <ImageSkeleton />}
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          `rounded-lg transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`,
          className
        )}
        priority={priority || false}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

const ImageWithSkeleton = ({
  src,
  alt,
  width,
  height,
  imageType,
  priority,
  className,
  flag,
}: ImageWithSkeletonProps) => {
  return (
    <Render
      imageType={imageType}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      flag={flag}
    />
  );
};

export default ImageWithSkeleton;
