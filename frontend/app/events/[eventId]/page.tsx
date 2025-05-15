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
  MessageCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistrationForm } from "@/components/registration-form"
import axios from "axios"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

async function getEvent(id: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/getEvent/${id}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      throw new Error('Failed to fetch event')
    })
}

function EventSkeleton() {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Event Header Skeleton */}
      <div>
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-6 w-20 mt-2" />
        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-60" />
        </div>
      </div>

      {/* Event Image Skeleton */}
      <Skeleton className="aspect-video w-full rounded-lg" />

      {/* Event Tabs Skeleton */}
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-2 mb-4">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  )
}

function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="sticky top-20">
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

async function EventContent({ eventId }: { eventId: string }) {
  const event = await getEvent(eventId)

  return (
    <>
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Event Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {event.is_paid ? <Badge variant="default">Paid</Badge> : <Badge variant="outline">Free</Badge>}
          </div>
          <div className="mt-4 flex flex-col gap-2 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{new Date(event.event_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        {/* Event Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${event.imageUrl}` || "/placeholder.svg?height=500&width=800"}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Event Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About</TabsTrigger>
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

          {/* Location Tab */}
          <TabsContent value="location" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">{event.location}</p>
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
            {event.is_paid ? (
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
                Capacity: {event.max_capacity} spots
              </span>
            </div>

            <RegistrationForm eventId={event.event_id} isPaid={event.is_paid} price={event.price} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default function EventDetailsPage({
  params,
}: {
  params: { eventId: string }
}) {
  const eventId = params.eventId

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6 md:py-10">
        <div className="mb-6">
          <Link href="/allevent" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Suspense fallback={
            <>
              <EventSkeleton />
              <SidebarSkeleton />
            </>
          }>
            <EventContent eventId={eventId} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
