// 'use client'

// import { useState, useEffect } from 'react'

// export default function Component({children}: {children: React.ReactNode}) {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   })

//   useEffect(() => {
//     const launchDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    
//     const timer = setInterval(() => {
//       const now = new Date()
//       const difference = launchDate.getTime() - now.getTime()

//       if (difference <= 0) {
//         clearInterval(timer)
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
//       } else {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60)
//         })
//       }
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   return (
//    <>
//    {
//     timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? children : ( <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white z-40">
//         <h1 className="text-4xl md:text-6xl font-bold mb-8">Site Launch Countdown</h1>
//         <div className="flex flex-wrap justify-center gap-4">
//           {Object.entries(timeLeft).map(([unit, value]) => (
//             <div key={unit} className="flex flex-col items-center border-2 border-white rounded-lg p-4">
//               <span className="text-3xl md:text-5xl font-bold">{value.toString().padStart(2, '0')}</span>
//               <span className="text-sm md:text-base uppercase">{unit}</span>
//             </div>
//           ))}
//         </div>
//       </div>)
//    }
//    </>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { setShowPage } from '@/_redux/slices/countDown';

interface CountdownWrapperProps {
  children: React.ReactNode
}

export default function CountdownWrapper({ children }: CountdownWrapperProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  })

  const [isCountdownComplete, setIsCountdownComplete] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000).getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = endTime - now

      if (difference <= 0) {
        clearInterval(timer)
        setIsCountdownComplete(true)
        dispatch(setShowPage(true))
        
      } else {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isCountdownComplete) {
    return <>{children}</>
  }

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Site Launch Countdown</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center border-2 border-white rounded-lg p-4">
            <span className="text-3xl md:text-5xl font-bold">{value.toString().padStart(2, '0')}</span>
            <span className="text-sm md:text-base uppercase">{unit}</span>
          </div>
        ))}
      </div>
    </div>
       
  )
}