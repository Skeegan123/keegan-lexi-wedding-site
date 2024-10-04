'use client'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

interface ComingSoonProps {
  pageName: string;
}

export function ComingSoon({ pageName }: ComingSoonProps) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br p-4 ${montserrat.className}`}>
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Alexis & Keegan</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">August 2nd, 2025</p>
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-md">
          <p className="text-lg md:text-xl text-gray-700 mb-4">
            {pageName} Coming Soon
          </p>
          <p className="text-md md:text-lg text-gray-600">
            We&apos;re still working on this page. Please check back later for more details about our big day.
          </p>
        </div>
      </div>
    </div>
  )
}