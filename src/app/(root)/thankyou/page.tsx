'use client'
import React, { useEffect } from 'react'
import ThankYouPage from './_components/ThankYou'
import { useRouter } from 'next/navigation';

const ThankYou = () => {

  const router = useRouter();

  useEffect(() => {
    // Disable back navigation
    history.pushState(null, "", location.href);
    window.onpopstate = function () {
        history.go(1);
    };

    // Optional: Redirect to home page if user tries to go back
    const handleBeforeUnload = (e:any) => {
      e.preventDefault();
      router.replace('/');
    };


    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function
    return () => {
      window.onpopstate = null;
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);


  return (
    <ThankYouPage />
  )
}

export default ThankYou

