import { Row2ImageParam } from '@/types';
import Image from 'next/image'
import ImageContainer from './ImageContainer';
import { ITC_Font } from '@/local-fonts/local';
import { cn } from '@/lib/utils';
const Row2Iamge = ({ text, imgUrl, color, className  }: Row2ImageParam) => {
  return (
    <div className=" row-span-2 max-md:row-span-1 relative">
      <ImageContainer text={text} imgUrl={imgUrl} />
      <span className={`${ITC_Font.className} absolute bottom-5 left-5 text-${color ? color : 'white'} font-bold text-sm`}>
        &quot;{text}&quot;
      </span>
    </div>
  );
};

export default Row2Iamge;
