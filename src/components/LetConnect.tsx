import React from 'react'
import HeadTitle from './HeadTitle'
import ExploreMoreBtn from './ExploreMoreBtn'

const LetConnect = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-72 max-md:py-10'>
        <HeadTitle title="Let us help bring your ideas to Life Through Art Commissioning" className='' />
        <div className='flex flex-col items-center  gap-5'>
            <p className='text-center font-light'>Collection of art curated by Amo-Mensah Amofa. Artwork designed as more than a <br/>display but meant to ignite conversations</p>
            <ExploreMoreBtn href='#' name="Explore More Art" />
        </div>
    </div>
  )
}

export default LetConnect