import Image from 'next/image'
import { CountdownTimer } from '@/components/countdown-timer'
import { BasicDetails } from '@/components/basic-details'
import WeddingDetails from '@/components/wedding-details'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <section className="relative w-full h-screen">
        <Image
          src="https://imagedelivery.net/yJ7bepQTW_ib5TtPRM2R9A/72562ab5-0ade-4a6f-8e11-b1ab26e42100/public?height=6192&width=4128"
          alt="Alexis and Keegan"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <CountdownTimer targetDate="2025-08-02T16:00:00" />
          <h1 className="text-6xl md:text-8xl font-serif mt-8 mb-16">ALEXIS & KEEGAN</h1>
          <BasicDetails 
            day="FRIDAY"
            date='August 2nd, 2025'
            time="4:00PM" 
            location="Snohomish, WA" 
          />
        </div>
      </section>

      <WeddingDetails />
    </main>
  )
}