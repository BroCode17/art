import Image from 'next/image'
import React from 'react'

const BannerImg = ({imageUrl}: {imageUrl: string}) => {
  return (
    <div className='w-full h-96 '>
        <Image src={imageUrl} alt='galley' width={1000} height={500} style={{width: '100%', height: '100%'}} className='object-cover'/>
    </div>
  )
}

export default BannerImg