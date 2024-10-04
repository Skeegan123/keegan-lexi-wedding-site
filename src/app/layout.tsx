import { Inter, Libre_Caslon_Text } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Script from 'next/script'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serif = Libre_Caslon_Text({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif'
})
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata = {
  title: 'Alexis Palmer & Keegan Gaffney Wedding',
  description: 'Join us in celebrating our special day on August 2nd, 2025',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Script
      src="https://app.tinyanalytics.io/pixel/QocUKZ8GWTHSbc2r"
      strategy="afterInteractive"
    />
    <html lang="en" className={`${serif.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
    </>
  )
}