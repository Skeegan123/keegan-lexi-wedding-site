import Image from "next/legacy/image"

export default function Details() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-[#F0EAE1] px-10">
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-144px)] mb-10 p-10 bg-white">
        <Image
          src="https://imagedelivery.net/yJ7bepQTW_ib5TtPRM2R9A/ec240b9a-161d-4f9d-8989-6b681450b700/public"
          alt="Wedding Details"
          quality={100}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl md:text-8xl text-center font-serif mt-8 mb-2">
            Wedding Details
          </h1>
          <h2 className="text-2xl md:text-4xl text-center font-serif mb-2">
            August 2nd, 2025
          </h2>
          <h3 className="text-xl md:text-2xl text-center font-serif">
            Snohomish, WA
          </h3>
        </div>
      </section>

      {/* Ceremony Details Section */}
      <section className="w-full bg-[#5C4033] text-white py-16 font-serif">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-4xl md:text-5xl mb-8 text-center">Ceremony</h2>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            <div className="flex-1">
              <div className="bg-white/10 p-8 rounded-lg h-full">
                <h3 className="text-2xl mb-4">Date & Time</h3>
                <p className="text-xl mb-4">Saturday, August 2nd, 2025</p>
                <p className="text-xl mb-4">Ceremony begins at 4:00 PM</p>
                <p className="text-xl mb-8">Please arrive 30 minutes early</p>
                
                <h3 className="text-2xl mb-4">Location</h3>
                <p className="text-xl mb-2">10524 Lowell Larimer Rd.</p>
                <p className="text-xl mb-4">Everett WA, 98208</p>
                <p className="text-xl italic">[Additional venue details to be added]</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white/10 p-8 rounded-lg h-full">
                <h3 className="text-2xl mb-4">What to Expect</h3>
                <p className="text-xl mb-4">[Ceremony description to be added]</p>
                <p className="text-xl mb-4">[Ceremony format to be added]</p>
                <p className="text-xl mb-4">[Special elements to be added]</p>
                
                <h3 className="text-2xl mb-4">Dress Code</h3>
                <p className="text-xl">[Dress code details to be added]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reception Details Section */}
      <section className="w-full bg-white py-16 font-serif">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-4xl md:text-5xl mb-8 text-center text-[#5C4033]">Reception</h2>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            <div className="flex-1">
              <div className="bg-[#F0EAE1] p-8 rounded-lg h-full text-[#5C4033]">
                <h3 className="text-2xl mb-4">Time & Location</h3>
                <p className="text-xl mb-4">Following the ceremony</p>
                <p className="text-xl mb-4">[Reception venue to be added if different]</p>
                <p className="text-xl mb-8">[Start and end times to be added]</p>
                
                <h3 className="text-2xl mb-4">Menu</h3>
                <p className="text-xl mb-2">[Dinner details to be added]</p>
                <p className="text-xl mb-2">[Drink options to be added]</p>
                <p className="text-xl">[Special dietary accommodations to be added]</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-[#F0EAE1] p-8 rounded-lg h-full text-[#5C4033]">
                <h3 className="text-2xl mb-4">Schedule</h3>
                <p className="text-xl mb-2">[Cocktail hour details to be added]</p>
                <p className="text-xl mb-2">[Dinner time to be added]</p>
                <p className="text-xl mb-2">[First dance timing to be added]</p>
                <p className="text-xl mb-2">[Cake cutting to be added]</p>
                <p className="text-xl mb-2">[Other special moments to be added]</p>
                <p className="text-xl">[End time to be added]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section className="w-full bg-[#5C4033] text-white py-16 font-serif">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-4xl md:text-5xl mb-8 text-center">Accommodations</h2>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            <div className="flex-1">
              <div className="bg-white/10 p-8 rounded-lg h-full">
                <h3 className="text-2xl mb-4">Recommended Hotels</h3>
                <p className="text-xl mb-4">[Hotel option 1 - to be added]</p>
                <p className="text-xl mb-4">[Hotel option 2 - to be added]</p>
                <p className="text-xl">[Hotel option 3 - to be added]</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white/10 p-8 rounded-lg h-full">
                <h3 className="text-2xl mb-4">Transportation</h3>
                <p className="text-xl mb-4">[Transportation details to be added]</p>
                <p className="text-xl mb-4">[Parking information to be added]</p>
                <p className="text-xl">[Shuttle service information if applicable]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full bg-white py-16 font-serif">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-4xl md:text-5xl mb-8 text-center text-[#5C4033]">Venue Map</h2>
          <div className="border-4 border-dashed border-[#5C4033] p-4 rounded-lg">
            <div className="bg-[#F0EAE1] p-8 rounded-lg h-[500px] flex items-center justify-center text-[#5C4033]">
              <iframe loading='lazy' height='100%' width='100%'
                src='https://id.land/maps/8734ab23a90149a38ce4fe89eb07123a/embed'>
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="w-full bg-[#5C4033] text-white py-16 font-serif mb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-4xl md:text-5xl mb-8 text-center">Additional Information</h2>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            <div className="flex-1">
              <div className="bg-white/10 p-8 rounded-lg h-full">
                <h3 className="text-2xl mb-4">Registry</h3>
                <p className="text-xl mb-4">[Registry details to be added]</p>
                <p className="text-xl">[Registry links to be added]</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white/10 p-8 rounded-lg h-full">
                <h3 className="text-2xl mb-4">FAQ</h3>
                <p className="text-xl mb-2">[Common question 1 - to be added]</p>
                <p className="text-xl mb-4">[Answer 1 - to be added]</p>
                <p className="text-xl mb-2">[Common question 2 - to be added]</p>
                <p className="text-xl mb-4">[Answer 2 - to be added]</p>
                <p className="text-xl mb-2">[Common question 3 - to be added]</p>
                <p className="text-xl">[Answer 3 - to be added]</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}