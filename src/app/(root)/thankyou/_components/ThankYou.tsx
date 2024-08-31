'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { updateInitState } from '@/_redux/slices/cartSlice';
import { FaCartShopping } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';



const ThankYouPage = () => {
  

    const dispatch = useDispatch();
  
    useEffect(() => {
     
        Cookies.set('cartItems','' );
        dispatch(updateInitState( {data: [], totalAmount: 0.0}))
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h1>
            <p className="text-lg text-gray-600 mb-6">Your order has been successfully placed. We appreciate your business!</p>

    
            <div className="text-left mb-8">
              <h3 className="text-lg font-mediyum text-gray-700 mb-2">What&apos;s Next?</h3>
              <p className="text-gray-600 mb-2">We&apos;ll send you a confirmation email with your order details shortly.</p>
              <div className='flex items-center'><p className="text-gray-600 ">You can view your order status and track your shipment in by navigation to 
                <span>🛒</span></p>
            
              </div>
              {/* <p className="text-gray-600">You can view your order status and track your shipment in your <Link href="/account/orders" className="text-black hover:underline">Order History</Link>.</p> */}
            </div>
    
            <Link href="/">
              <Button className="bg-black text-white py-2  hover:bg-gray-700 px-3">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      );
};

export default ThankYouPage;

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// export default function Component() {
//   const router = useRouter()
//   const [showWarning, setShowWarning] = useState(false)

//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       event.preventDefault()
//       event.returnValue = ''
//     }

//     const handlePopState = () => {
//       setShowWarning(true)
//     }

//     window.addEventListener('beforeunload', handleBeforeUnload)
//     window.addEventListener('popstate', handlePopState)

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload)
//       window.removeEventListener('popstate', handlePopState)
//     }
//   }, [])

//   const handleContinueShopping = () => {
//     router.replace('/shop')
//   }

//   const handleStayOnPage = () => {
//     setShowWarning(false)
//     window.history.pushState(null, '', window.location.href)
//   }

//   const handleLeavePage = () => {
//     router.back()
//   }

//   return (
//     <>
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle>Payment Successful</CardTitle>
//           <CardDescription>Your order has been processed successfully.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p>Thank you for your purchase! Your order will be shipped soon.</p>
//         </CardContent>
//         <CardFooter>
//           <Button onClick={handleContinueShopping}>Continue Shopping</Button>
//         </CardFooter>
//       </Card>

//       <Dialog open={showWarning} onOpenChange={setShowWarning}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Are you sure you want to leave?</DialogTitle>
//             <DialogDescription>
//               You're about to leave the payment confirmation page. Are you sure you want to do this?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={handleStayOnPage}>Stay on Page</Button>
//             <Button onClick={handleLeavePage}>Leave Page</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }