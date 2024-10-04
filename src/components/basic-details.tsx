'use client'

interface BasicDetailsProps {
  day: string;
  date: string;
  time: string;
  location: string;
}

export function BasicDetails({ day, date, time, location }: BasicDetailsProps) {
  return (
    <div className="bg-white text-black rounded-full px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 w-3/4 sm:w-auto max-w-sm sm:max-w-md mx-auto">
      <div className="text-center w-full sm:w-1/2">
        <p className="">{day}</p>
        <p className="">{date}</p>
      </div>
      <div className="hidden sm:block h-8 w-px bg-gray-300" />
      <div className="text-center w-full sm:w-1/2">
        <p className="">{time}</p>
        <p>{location}</p>
      </div>
    </div>
  )
}