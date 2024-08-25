import Image from 'next/image'
import React from 'react'
import ImageWithSkeleton from './_images/ImageWithSkeleton'

const BannerImg = ({imageUrl}: {imageUrl: string}) => {
  return (
    <div className='w-full h-96  relative'>
        <Image src={`/images/${imageUrl}`} alt='galley' width={1000} height={500}  className='object-cover rounded-none w-full h-full' priority/>
        <div className='absolute bg-black bg-opacity-70 inset-0'>

        </div>
    </div>
  )
}

export default BannerImg