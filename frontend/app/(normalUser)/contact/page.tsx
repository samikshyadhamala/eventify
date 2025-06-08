// app/contact/page.tsx
import Link from "next/link"
import Image from "next/image"
import { Calendar, Mail, MapPin, Phone } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlatformContactForm } from "@/components/platform-contact-form"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default function ContactPage() {
  return (
    <div className="bg-background p-0 m-0">
      <Header placeholder={true}></Header>
      <main className="container py-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Get in Touch</h2>
                  <p className="mt-2 text-muted-foreground">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                <PlatformContactForm />
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative h-[300px] overflow-hidden rounded-lg">
                <Image
                  src="/images/contactOrganizer.png"
                  alt="EventHub Office"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Contact Information</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="py-6 px-3 flex items-start space-x-4">
                      <div>
                        <h3 className="font-medium">Email Us</h3>
                        <p className="text-sm text-muted-foreground mt-1">For general inquiries</p>
                        <div className="truncate w-full">
                          <a href="mailto:info@eventhub.com" className="text-primary truncate w-full text-black hover:underline mt-2 block">
                            eventify.services@gmail.com
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-primary mt-1" color='black' />
                      <div>
                        <h3 className="font-medium">Call Us</h3>
                        <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am-5pm</p>
                        <a href="tel:+11234567890" className="text-primary text-black hover:underline mt-2 block">
                          9842525351
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" color='black' />
                    <div>
                      <h3 className="font-medium">Visit Us</h3>
                      <p className="text-sm text-muted-foreground mt-1">Our headquarters</p>
                      <address className="not-italic mt-2 text-sm">
                        Bagbajar
                        <br />
                        Kathmandu
                        <br />
                        Nepal
                      </address>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="text-lg">How do I create an account?</div>
                      <p className="text-sm text-muted-foreground">
                        Click the "Sign up" button in the top right corner and follow the instructions to create your
                        account.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg">Is EventHub available in my city?</div>
                      <p className="text-sm text-muted-foreground">
                        EventHub is available in most major cities. Check our locations page for a complete list.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg">How can I become an event organizer?</div>
                      <p className="text-sm text-muted-foreground">
                        After creating an account, go to your profile settings and select "Become an Organizer" to
                        apply.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="events" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="text-lg">How do I register for an event?</div>
                      <p className="text-sm text-muted-foreground">
                      Navigate to the event page and click the "Register Now" button to secure your spot.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg">Can I get a refund for a paid event?</div>
                      <p className="text-sm text-muted-foreground">
                      Refund policies vary by event. Check the event details page or contact the organizer directly.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg">How do I create my own event?</div>
                      <p className="text-sm text-muted-foreground">
                      Once you're an approved organizer, you can create events from your dashboard by clicking "Create
                      Event."
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="h-full">
        <Footer />
      </div>
    </div>
  )
}