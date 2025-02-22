'use client'

import Link from "next/link"
import Image from "next/legacy/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative h-screen flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Alexis and Keegan"
            layout="fill"
            objectFit="cover"
            priority
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white px-4 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Alexis Palmer & Keegan Gaffney</h1>
            <p className="text-xl sm:text-2xl mb-8">Are getting married!</p>
            <p className="text-2xl sm:text-3xl font-semibold">August 2nd, 2025 • Snohomish, Washington</p>
          </div>
        </section>

        <section id="details" className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Wedding Details</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>When</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Saturday, August 2nd, 2025</p>
                  <p>Ceremony starts at 4:00 PM</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Where</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Snohomish, Washington</p>
                  <p>(Exact venue details to be announced)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Dress Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Semi-formal / Cocktail Attire</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I bring a plus one?</AccordionTrigger>
                <AccordionContent>
                  Please refer to your invitation for details about plus ones. If you have any questions, feel free to contact us.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Are children invited?</AccordionTrigger>
                <AccordionContent>
                  Our wedding is an adults-only celebration. We hope this advance notice means you&apos;re still able to join us!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What&apos;s the parking situation?</AccordionTrigger>
                <AccordionContent>
                  Parking details will be provided closer to the wedding date. We&apos;ll make sure there&apos;s ample parking for all our guests.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="rsvp" className="py-16 bg-muted">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Celebrate With Us?</h2>
            <p className="mb-8">We can&apos;t wait to see you on our big day!</p>
            <Button size="lg" asChild>
              <Link href="/rsvp">RSVP Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-6 bg-background">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Alexis Palmer & Keegan Gaffney • <Link href="https://akgaffney.com" className="hover:underline">akgaffney.com</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}