'use client'
import { useLazyValidateUserQuery } from '@/_redux/services/userApi';
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'

const TestPage = () => {
    const [trigger, { data, error, isLoading }] = useLazyValidateUserQuery();
   useEffect(() => {

   },[data, isLoading])
   console.log(data)
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <Button className='font-bold' onClick={() => trigger('')}>
            Text
        </Button>
        
    </div>
  )
}

export default TestPage