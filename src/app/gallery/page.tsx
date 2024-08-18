

import React from 'react'
import GenericBanner from './_components/GenericBanner'
import Gallery from '@/components/Gallery'

const page = () => {
  return (
    <div className='min-h-screen'>
        <GenericBanner bannerImgUrl="/images/galley.png" bannerTitle="Gallery" />
        <Gallery />   
    </div>
  )
}

export default page