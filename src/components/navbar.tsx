import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="top-0 left-0 right-0 bg-[#F0EAE1] z-50 px-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="text-gray-700 flex-shrink-0 flex items-center">
              A&K
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
              Home
            </Link>
            {/* <Link href="/details" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
              Details
            </Link> */}
            {/* <Link href="/gallery" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
              Gallery
            </Link> */}
            {/* <Link href="/registry" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
              Registry
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  )
}