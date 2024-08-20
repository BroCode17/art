'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { updateInitState } from '@/_redux/slices/cartSlice';
import { FaCartShopping } from 'react-icons/fa6';


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
    
            {/* <div className="text-left mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Order Summary</h2>
              <p className="text-gray-700">Order Number: <strong>#123456</strong></p>
              <p className="text-gray-700">Items: <strong>3 items</strong></p>
              <p className="text-gray-700">Total: <strong>$99.99</strong></p>
            </div> */}
    
            <div className="text-left mb-8">
              <h3 className="text-lg font-mediyum text-gray-700 mb-2">What’s Next?</h3>
              <p className="text-gray-600 mb-2">We’ll send you a confirmation email with your order details shortly.</p>
              <div className='flex items-center'><p className="text-gray-600 ">You can view your order status and track your shipment in by navigation to 
                <span>🛒</span></p>
            
              </div>
              {/* <p className="text-gray-600">You can view your order status and track your shipment in your <Link href="/account/orders" className="text-black hover:underline">Order History</Link>.</p> */}
            </div>
    
            <Link href="/">
              <button className="bg-black text-white py-2  hover:bg-gray-700 px-3">Continue Shopping</button>
            </Link>
          </div>
        </div>
      );
};

export default ThankYouPage;

