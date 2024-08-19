import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='min-h-svh flex justify-center items-center w-full'>
      <Loader2  className='size-24 animate-spin'/>
    </div>
  )
}

export default loading