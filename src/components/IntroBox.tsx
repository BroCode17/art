import { cn } from '@/lib/utils'
import { IntroBoxTypes } from '@/types'
import React from 'react'
import HeadTitle from './HeadTitle'

const IntroBox = ({title, description, className}: IntroBoxTypes) => {
  return (
    <div className={cn(`text-white flex items-start flex-col mb-12`, className)}>
          <HeadTitle title={title} className="text-2xl p-0" />
          <div className="w-3/5">
            <p className="text-sm pt-2 font-light">
              {description}
            </p>
          </div>
    </div>
  )
}

export default IntroBox