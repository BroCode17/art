import { cn } from '@/lib/utils'
import { Row2ImageParam } from '@/types'
import Image from 'next/image'


const ImageContainer =  ({imgUrl, text, flag, ref, className}: Row2ImageParam) => {

  return (
  <Image src={`/images/${flag ? imgUrl+'.png' : imgUrl+'.jpeg'}`} 
  alt={text} 
  width={259}
  height={394} 
  style={{width: '100%', height: '100%', objectFit: 'cover'}} 
  // placeholder='blur'
  // blurDataURL={base64}
  className={cn(`  rounded-md`, className)}
  priority
  />
)
}

export default ImageContainer



