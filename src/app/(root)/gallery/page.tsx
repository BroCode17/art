"use client";
import React, { useEffect, useState } from "react";
import GenericBanner from "./_components/GenericBanner";
import Gallery from "@/components/_animations/galley/ArtGallery";
import { useGetImagesQuery } from "@/_redux/services/imageApi";
import Container from "@/components/Container";
import ImageSkeleton from "@/components/_images/ImageSkeleton";
import { Loader2 } from "lucide-react";

const GalleryPage = () => {
  const { data, refetch, isSuccess, isLoading, isError } =
    useGetImagesQuery("");
  const [images, setImges] = useState<any[]>([]);
  useEffect(() => {
    if (isSuccess) {
      setImges(data.response);
    }
  }, [data, isSuccess]);
  return (
    <div className="min-h-screen w-full  ">
      <GenericBanner bannerImgUrl="Hair.jpeg" bannerTitle="Gallery" />
      <div className=" flex justify-center">
        <Container className="min-h-[24rem] w-full bg-white ">
          {isLoading && (
            <div className="min-h-[24rem] flex  w-full items-center justify-center">
              <Loader2 className="animate-spin size-20" />
            </div>
          )}
          {isSuccess && <Gallery artworks={images} />}
        </Container>
      </div>
    </div>
  );
};

export default GalleryPage;
