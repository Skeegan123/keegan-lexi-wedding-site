import Image from "next/legacy/image";

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
          <h1 className="text-6xl md:text-8xl text-center font-serif mt-8 mb-2">Wedding Details</h1>
          <h2 className="text-2xl md:text-4xl text-center font-serif mb-2">August 2nd, 2025</h2>
          <h3 className="text-xl md:text-2xl text-center font-serif">Snohomish, WA</h3>
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
                <p className="text-xl mb-4">Everett, WA 98208</p>
                <p className="text-xl">Outdoor ceremony on grass.</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white/10 p-8 rounded-lg h-full">
                <h3 className="text-2xl mb-4">What to Expect</h3>
                <p className="text-xl mb-4">A short, modern, non-religious ceremony.</p>
                <p className="text-xl mb-4">The ceremony will take place outdoors on grass.</p>
                <p className="text-xl mb-4">Bride and Groom will read their vows.</p>
                
                <h3 className="text-2xl mb-4">Dress Code</h3>
                <p className="text-xl">Semi-formal or cocktail attire.</p>
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
                <p className="text-xl mb-4">Reception starts immediately after the ceremony.</p>
                <p className="text-xl mb-4">Same location as ceremony.</p>
                <p className="text-xl mb-8">Ends at 10:00 PM.</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-[#F0EAE1] p-8 rounded-lg h-full text-[#5C4033]">
                <h3 className="text-2xl mb-4">Food & Drinks</h3>
                <p className="text-xl mb-4">Buffet-style woodfire pizza, pasta, and salad.</p>
                <p className="text-xl mb-4">Beer, wine, and signature cocktails available.</p>
                <p className="text-xl">Some gluten and dairy-free accommodations.</p>
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
            {/* Hotel Indigo */}
            <div className="flex-1 bg-white/10 p-8 rounded-lg h-full text-center">
              <div className="relative w-full h-[100px] mb-4">
                <a href="https://www.indigoeverett.com" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/hotel-indigo.png"
                    alt="Hotel Indigo Logo"
                    layout="fill"
                    objectFit="contain"
                    className="mx-auto"
                  />
                </a>
              </div>
              <p className="text-xl">Rooms: $250-$350</p>
              <p className="text-xl">Distance to Wedding: 15-20 Minutes</p>
              <p className="text-xl mt-4 font-semibold">Fun things to do:</p>
              <p className="text-xl">Everett Waterfront & Marina, coffee shops, walking path, Jetty Island, music on the waterfront, Imagine Children&apos;s Museum.</p>
              <p className="text-xl mt-4 font-semibold">Restaurants:</p>
              <p className="text-xl">Jetty Grill, Fisherman Jack&apos;s, Scuttlebutt Brewing, Anthony&apos;s Woodfire, Bluewater Distilling, Lombardi&apos;s.</p>
              <a href="https://www.indigoeverett.com" className="underline text-xl block mt-4" target="_blank" rel="noopener noreferrer">Hotel Website</a>
            </div>

            {/* Willows Lodge */}
            <div className="flex-1 bg-white/10 p-8 rounded-lg h-full text-center">
              <div className="relative w-full h-[100px] mb-4">
                <a href="https://www.willowslodge.com" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/willows-lodge.png"
                    alt="Willows Lodge Logo"
                    layout="fill"
                    objectFit="contain"
                    className="mx-auto"
                  />
                </a>
              </div>
              <p className="text-xl">Rooms: $550-$935</p>
              <p className="text-xl">Distance to Wedding: 25-40 Minutes</p>
              <p className="text-xl mt-4 font-semibold">Fun things to do:</p>
              <p className="text-xl">Woodinville Wine Region: wine tasting, restaurants, coffee shops, walking trails, shopping.</p>
              <p className="text-xl mt-4 font-semibold">Restaurants:</p>
              <p className="text-xl">Fireside Lounge, Barking Frog, Herb Farm, Pablo y Pablo, Purple Cafe.</p>
              <a href="https://www.willowslodge.com" className="underline text-xl block mt-4" target="_blank" rel="noopener noreferrer">Hotel Website</a>
            </div>

            {/* Courtyard Marriott */}
            <div className="flex-1 bg-white/10 p-8 rounded-lg h-full text-center">
              <div className="relative w-full h-[100px] mb-4">
                <a href="https://www.marriott.com/en-us/hotels/seaev-courtyard-seattle-everett-downtown/overview/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/courtyard-marriott.png"
                    alt="Courtyard by Marriott Logo"
                    layout="fill"
                    objectFit="contain"
                    className="mx-auto"
                  />
                </a>
              </div>
              <p className="text-xl">Rooms: $220-$250</p>
              <p className="text-xl">Distance to Wedding: 10-20 Minutes</p>
              <p className="text-xl mt-4 font-semibold">Fun things to do:</p>
              <p className="text-xl">Downtown Everett: coffee shops, Imagine Children&apos;s Museum, FUNKO, shopping.</p>
              <p className="text-xl mt-4 font-semibold">Restaurants:</p>
              <p className="text-xl">Bistro Bar Area, El Paraiso, The Valley Organic Deli, Major League Pizza, J&L BBQ, Ice Cream BAR.</p>
              <a href="https://www.marriott.com/en-us/hotels/seaev-courtyard-seattle-everett-downtown/overview/" className="underline text-xl block mt-4" target="_blank" rel="noopener noreferrer">Hotel Website</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-16 font-serif">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-4xl md:text-5xl mb-12 text-center text-[#5C4033]">FAQ</h2>
          <div className="space-y-8">
            <div className="border-b border-[#5C4033]/20 pb-6">
              <h3 className="text-2xl font-semibold text-[#5C4033] mb-3">Will transportation be provided?</h3>
              <p className="text-xl text-[#5C4033]/80 pl-4">No transportation provided. Carpool or rideshare recommended.</p>
            </div>
            <div className="border-b border-[#5C4033]/20 pb-6">
              <h3 className="text-2xl font-semibold text-[#5C4033] mb-3">Is parking available?</h3>
              <p className="text-xl text-[#5C4033]/80 pl-4">Yes, across the street with a shuttle to the venue.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
