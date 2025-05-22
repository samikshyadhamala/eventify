"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Clock,
  Plus,
  Users,
  Eye,
  CalendarDays,
} from "lucide-react"
import { Button } from "@radix-ui/themes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/auth/hooks"
interface Event {
  event_id: number
  title: string
 event_date: string
  description: string
  max_capacity: number
  imageUrl: string
  isPaid: boolean
  price: number | null
  location: string
}

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      <Link href="/club/create-event" className="text-black">
        <Button size={{ initial: "2", md: "3" }} className="gap-1" variant="solid" color="gray" highContrast>
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </Link>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 w-full bg-gray-200 rounded mb-4"></div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UpcomingEventCard({ event, registrationCount }: { event: Event, registrationCount: number }) {
  debugger
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${event.imageUrl}` || "/placeholder.svg"}
          alt={event.title}
          width={60}
          height={60}
          className="aspect-square h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{event.title}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-1 h-3 w-3" />
          <span>{new Date(event.event_date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>
            {event.isPaid ? `$${event.price}` : 'Free'}
          </span>
          <span className="text-muted-foreground">
            {registrationCount}/{event.max_capacity}
          </span>
        </div>
        <Progress value={(registrationCount / event.max_capacity) * 100} className="h-1" />
      </div>
    </div>
  )
}

function PopularEventCard({ event }: { event: Event }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium leading-none">{event.title}</p>
        <div className="flex items-center gap-1 text-xs">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span>{event.max_capacity}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          <span>{event.max_capacity * 10} views</span>
        </div>
        <span>{((event.max_capacity / 300) * 100).toFixed(1)}% conversion</span>
      </div>
      <Progress value={(event.max_capacity / 300) * 100} className="h-1" />
    </div>
  )
}

function MetricCard({
  title,
  value,
  icon,
  description,
  change,
  trend,
}: {
  title: string
  value: number
  icon: React.ReactNode
  description: string
  change: string
  trend: "up" | "down" | "neutral"
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

function MetricsSection({ 
  loading, 
  totalEvent, 
  upcomingEvents, 
  totalRegistration 
}: { 
  loading: boolean; 
  totalEvent: number; 
  upcomingEvents: Event[]; 
  totalRegistration: number; 
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Events"
        value={loading ? 0 : totalEvent}
        trend="up"
        description="+2 from last month"
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        change="+8.3%"
      />
      <MetricCard
        title="Upcoming Events"
        value={loading ? 0 : upcomingEvents.length}
        change="+12.5%"
        trend="up"
        description="Next event in 3 days"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Total Registrations"
        value={loading ? 0 : totalRegistration}
        change="+19.3%"
        trend="up"
        description="+248 from last month"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}

function UpcomingEventsCard({ 
  loading, 
  upcomingEvents, 
  registrationCounts 
}: { 
  loading: boolean; 
  upcomingEvents: Event[]; 
  registrationCounts: {[key: number]: number}; 
}) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Your next 5 scheduled events</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-4">
            {upcomingEvents.slice(0, 5).map((event, i) => (
              <UpcomingEventCard 
                key={i} 
                event={event} 
                registrationCount={registrationCounts[event.event_id] || 0} 
              />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-black" color="gray">
          <Link href="/club/events" className="w-full flex items-center justify-center text-black">
            View All Events
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function PopularEventsCard({ loading }: {loading: boolean}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Events</CardTitle>
        <CardDescription>Your most popular events by registration</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-4">
            <h2 className="text-center">Coming Soon</h2>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-black" color="gray" disabled={true}>
          {/* <Link href="/admin/analytics" className="w-full flex items-center justify-center text-black border-black" > */}
            View Analytics
          {/* </Link> */}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function AdminDashboard() {
  const [totalEvent, setTotalEvent] = useState<number>(0)
  const [totalRegistration, setTotalRegistration] = useState<number>(0)
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [registrationCounts, setRegistrationCounts] = useState<{[key: number]: number}>({})
  const [loading, setLoading] = useState(true)
  const { axiosInstance } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, regRes, upcomingRes] = await Promise.all([
          axiosInstance.get<{ total: number }>('/api/event/getTotalEvent'),
          axiosInstance.get<{ total: number, counts: {[key: string]: number} }>("/api/registration/getBranchRegistrationCount"),
          axiosInstance.get<{ upcomingEvents: Event[] }>("/api/event/getUpcomingBranchEvent")
        ]);
        
        setTotalEvent(eventRes.data.total);
        setTotalRegistration(regRes.data.total);
        setRegistrationCounts(regRes.data.counts)
        setUpcomingEvents(upcomingRes.data.upcomingEvents);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosInstance]);

  return (
    <>
      <main className="flex flex-1 flex-col gap-16 p-6 md:gap-8 md:px20 md:py-10">
        <DashboardHeader />
        
        <MetricsSection 
          loading={loading} 
          totalEvent={totalEvent} 
          upcomingEvents={upcomingEvents} 
          totalRegistration={totalRegistration} 
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <UpcomingEventsCard 
            loading={loading} 
            upcomingEvents={upcomingEvents} 
            registrationCounts={registrationCounts} 
          />

          <div className="col-span-3">
            <PopularEventsCard loading={loading} />
          </div>
        </div>
      </main>
    </>
  )
}
