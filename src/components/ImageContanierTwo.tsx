import { Row2ImageParam } from "@/types";
import { CldImage } from "next-cloudinary";

const Render = ({ imgUrl, text, flag }: Row2ImageParam) => {
  switch (flag) {
    case flag === true:
      return (
        <CldImage
          src={imgUrl}
          alt={text}
          width={210}
          height={250}
          className=" w-full h-full object-cover "
          priority
        />
      );
    default:
      return (
        <CldImage
          src={imgUrl}
          alt={text}
          width={210}
          height={250}
          className=" w-full h-full object-cover "
          priority
        />
      );
  }
};

const ImageContainerTwo = ({ imgUrl, text, flag }: Row2ImageParam) => {
  return <Render imgUrl={imgUrl} text={text} flag={flag} />;
};

export default ImageContainerTwo;
