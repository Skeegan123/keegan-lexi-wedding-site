import Image from "next/legacy/image"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-[#F0EAE1] px-10">
      <section className="relative w-full h-[calc(100vh-144px)] mt-5 mb-10 p-10 bg-white">
        <Image
          src="https://imagedelivery.net/yJ7bepQTW_ib5TtPRM2R9A/72562ab5-0ade-4a6f-8e11-b1ab26e42100/public?height=6192&width=4128"
          alt="Alexis and Keegan"
          quality={100}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl md:text-8xl text-center font-serif mt-8 mb-2">
            Alexis & Keegan
          </h1>
          <h2 className="text-2xl md:text-4xl text-center font-serif mb-2">
            August 2nd, 2025
          </h2>
          <h3 className="text-xl md:text-2xl text-center font-serif">
            Snohomish, WA
          </h3>
        </div>
      </section>

      <div className="w-full h-[640px] sm:h-[600px] bg-[#5C4033] text-white py-10 font-serif justify-center">
        <div className="max-w-full mx-auto sm:mx-16 flex flex-col md:flex-row items-center justify-between px-10 gap-10 sm:gap-30">
          <div className="flex-1 max-w-full">
            <h1 className="text-4xl mb-4 sm:text-5xl sm:mb-16">Wedding Details</h1>
            <p className="text-xl mb-4 sm:mb-16">Date: August 2nd, 2025</p>
            <p className="text-xl mb-4 sm:mb-16">Time: 4:00PM Ceremony Starts</p>
            <p className="text-xl">Location: 10524 Lowell Larimer Rd. Everett WA, 98208</p>
          </div>
          <div className="flex-1 md:mt-0 md:ml-10 flex items-center justify-center">
            <div className="w-[225px] h-[225px] sm:w-[500px] sm:h-[500px]">
              <Image
                src="https://imagedelivery.net/yJ7bepQTW_ib5TtPRM2R9A/74bccde1-67e6-4d6c-bb17-0966af1d6500/public"
                alt="Beach"
                quality={100}
                layout="responsive"
                width={400}
                height={400}
                objectFit="cover"
                className="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}