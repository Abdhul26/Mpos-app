// src/app/page.tsx
'use client' // Marking as a client-side component
import './globals.css'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

const HomePage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/devices') // Redirect to the devices page
  }, [router])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white p-8'>
      <h1 className='text-6xl font-extrabold mb-6 text-shadow-xl'>
        Welcome to mPOS App
      </h1>
      <p className='text-xl mb-8'>Redirecting to the devices page...</p>
      <button className='bg-yellow-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300'>
        Go to Devices
      </button>
    </div>
  )
}

export default HomePage
