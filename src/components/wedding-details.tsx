'use client'

export default function WeddingDetails() {
  return (
    <section className="py-16 w-full bg-[#442917] text-white font-serif">
      <div className="w-full px-4 sm:px-6 md:w-3/4 lg:w-1/2 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Wedding Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Reception Location</h3>
            <p>The Gaffney Household</p>
            <p>10524 Lowell Larimer Rd</p>
            <p>Everett, WA 98208</p>
          </div>
        </div>
      </div>
    </section>
  )
}