'use client'

interface BasicDetailsProps {
  day: string;
  date: string;
  time: string;
  location: string;
}

export function BasicDetails({ day, date, time, location }: BasicDetailsProps) {
  return (
    <div className="bg-white text-black rounded-full px-8 py-4 flex items-center space-x-8 w-1/3">
      <div className="text-center w-1/2">
        <p className="">{day}</p>
        <p className="">{date}</p>
      </div>
      <div className="h-8 w-px bg-gray-300" />
      <div className="text-center w-1/2">
        <p className="">{time}</p>
        <p>{location}</p>
      </div>
    </div>
  )
}