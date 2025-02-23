'use client'

export default function Footer() {
  return (
    <footer className="">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Alexis Palmer & Keegan Gaffney • Website by Keegan Gaffney
        </p>
      </div>
    </footer>
  )
}