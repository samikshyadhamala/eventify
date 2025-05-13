import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Share2,
  CalendarPlus,
  Building,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistrationForm } from "@/components/registration-form"
import { ContactOrganizerButton } from "@/components/contact-organizer-button"

export default function EventDetailsPage({ params }: { params: { eventId: string } }) {
  // In a real application, you would fetch the event data based on the eventId
  // For this example, we'll use mock data
  const event = {
    id: params.eventId,
    title: "Web Development Workshop: Building Modern Applications",
    date: "June 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Tech Hub, Downtown",
    address: "123 Innovation Street, Tech District, City",
    type: "Workshop",
    price: 49.99,
    capacity: 50,
    registeredCount: 32,
    branch: "Tech Hub",
    organizer: "John Smith",
    organizerRole: "Senior Developer",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    isPaid: true,
    description: `
      <p>Join us for an intensive, hands-on workshop where you'll learn how to build modern web applications using the latest technologies and best practices.</p>
      
      <p>This workshop is designed for intermediate developers who want to level up their skills and stay current with modern web development techniques. You'll work on real-world projects and leave with practical knowledge you can apply immediately.</p>
      
      <h3>What You'll Learn:</h3>
      <ul>
        <li>Modern JavaScript frameworks and libraries</li>
        <li>Responsive design principles</li>
        <li>API integration and data management</li>
        <li>Performance optimization techniques</li>
        <li>Deployment and CI/CD workflows</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>Laptop with your preferred code editor</li>
        <li>Basic knowledge of HTML, CSS, and JavaScript</li>
        <li>Node.js installed (v16+)</li>
      </ul>
      
      <p>Lunch and refreshments will be provided. All participants will receive a certificate of completion and access to all workshop materials.</p>
    `,
    agenda: [
      { time: "9:30 AM - 10:00 AM", activity: "Check-in and Setup" },
      { time: "10:00 AM - 11:30 AM", activity: "Session 1: Modern JavaScript Frameworks" },
      { time: "11:30 AM - 12:30 PM", activity: "Hands-on Coding Exercise" },
      { time: "12:30 PM - 1:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM - 3:00 PM", activity: "Session 2: API Integration and Data Management" },
      { time: "3:00 PM - 3:45 PM", activity: "Final Project Work" },
      { time: "3:45 PM - 4:00 PM", activity: "Q&A and Closing" },
    ],
    speakers: [
      {
        name: "John Smith",
        role: "Senior Developer",
        avatar: "/placeholder.svg?height=60&width=60",
        bio: "John has over 10 years of experience in web development and has worked with companies like Google and Microsoft.",
      },
      {
        name: "Sarah Johnson",
        role: "UX Designer",
        avatar: "/placeholder.svg?height=60&width=60",
        bio: "Sarah specializes in creating intuitive user experiences and has led design teams at several tech startups.",
      },
    ],
    relatedEvents: [
      { id: "2", title: "Advanced JavaScript Concepts", date: "July 10, 2025", type: "Workshop" },
      { id: "3", title: "Tech Networking Night", date: "June 22, 2025", type: "Networking" },
      { id: "4", title: "UI/UX Design Fundamentals", date: "June 30, 2025", type: "Workshop" },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EventHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/events" className="text-sm font-medium">
              Events
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-10">
        <div className="mb-6">
          <Link href="/events" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">{event.type}</Badge>
                {event.isPaid ? <Badge variant="default">Paid</Badge> : <Badge variant="outline">Free</Badge>}
              </div>
              <div className="mt-4 flex flex-col gap-2 text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  <span>Organized by {event.branch}</span>
                </div>
              </div>
            </div>

            {/* Event Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=500&width=800"
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Event Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="mt-4 space-y-4">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.description }} />

                <div className="flex flex-wrap gap-4 mt-6">
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Event
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <CalendarPlus className="h-4 w-4" />
                    Add to Calendar
                  </Button>
                </div>
              </TabsContent>

              {/* Agenda Tab */}
              <TabsContent value="agenda" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Schedule</CardTitle>
                    <CardDescription>Detailed agenda for the day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.agenda.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-2 md:gap-4">
                          <div className="md:w-1/3 font-medium">{item.time}</div>
                          <div className="md:w-2/3">{item.activity}</div>
                          {index < event.agenda.length - 1 && <Separator className="mt-2 md:hidden" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Speakers Tab */}
              <TabsContent value="speakers" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  {event.speakers.map((speaker, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={speaker.avatar || "/placeholder.svg"} alt={speaker.name} />
                            <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <h3 className="font-semibold">{speaker.name}</h3>
                            <p className="text-sm text-muted-foreground">{speaker.role}</p>
                            <p className="text-sm">{speaker.bio}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Location Tab */}
              <TabsContent value="location" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">{event.address}</p>
                      </div>

                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                        {/* This would be a map in a real application */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-muted-foreground">Map would be displayed here</p>
                        </div>
                      </div>

                      <Button variant="outline" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Related Events */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Related Events</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {event.relatedEvents.map((relatedEvent) => (
                  <Card key={relatedEvent.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt={relatedEvent.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-1">{relatedEvent.title}</h3>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{relatedEvent.date}</span>
                      </div>
                      <Badge variant="secondary" className="mt-2">
                        {relatedEvent.type}
                      </Badge>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/events/${relatedEvent.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Registration</CardTitle>
                <CardDescription>Secure your spot for this event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.isPaid ? (
                  <div className="flex items-center text-2xl font-bold">
                    <DollarSign className="h-5 w-5" />
                    <span>{event.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-lg py-1 px-2">
                    Free
                  </Badge>
                )}

                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  <span>
                    {event.registeredCount} / {event.capacity} spots filled
                  </span>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                  />
                </div>

                <RegistrationForm eventId={event.id} isPaid={event.isPaid} price={event.price} />

                <div className="text-sm text-muted-foreground">
                  <p>Registration closes on June 14, 2025</p>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Card */}
            <Card>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={event.organizerAvatar || "/placeholder.svg"} alt={event.organizer} />
                    <AvatarFallback>{event.organizer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{event.organizer}</p>
                    <p className="text-sm text-muted-foreground">{event.organizerRole}</p>
                  </div>
                </div>
                <ContactOrganizerButton eventId={event.id} organizerName={event.organizer} fullWidth={true} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="w-full border-t bg-background py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">EventHub</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} EventHub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
