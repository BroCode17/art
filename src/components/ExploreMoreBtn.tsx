import { ITC_Font } from '@/local-fonts/local'
import { ExploreMoreBtnTypes } from '@/types'
import Link from 'next/link'
import React from 'react'

const ExploreMoreBtn = ({href, className, name}: ExploreMoreBtnTypes) => {
  return (
    <div className={`border border-black py-2 px-8 rounded-3xl ${ITC_Font.className} bg-soft cursor-pointer bg-opacity-25 hover:scale-90`}>
        <Link href={href} className='text-sm'>
            {name}
        </Link>
    </div>
  )
}

export default ExploreMoreBtn