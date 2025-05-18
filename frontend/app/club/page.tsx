"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Clock,
  Download,
  Filter,
  Plus,
  Settings,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  CheckCircle2,
  CalendarDays,
  Search,
} from "lucide-react"
import { Button } from "@radix-ui/themes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/auth/hooks"

interface Event {
  id: number
  title: string
  date: string
  description: string
  maxCapacity: number
  imageUrl: string
  isPaid: boolean
  price: number | null
  location: string
}

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      <Link href="/club/create-event">
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

function UpcomingEventCard({ event }: { event: Event }) {
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
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>
            {event.isPaid ? `$${event.price}` : 'Free'}
          </span>
          <span className="text-muted-foreground">
            Capacity: {event.maxCapacity}
          </span>
        </div>
        <Progress value={0} className="h-1" color="gray" />
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
          <span>{event.maxCapacity}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          <span>{event.maxCapacity * 10} views</span>
        </div>
        <span>{((event.maxCapacity / 300) * 100).toFixed(1)}% conversion</span>
      </div>
      <Progress value={(event.maxCapacity / 300) * 100} className="h-1" />
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [totalEvent, setTotalEvent] = useState<number>(0)
  const [totalRegistration, setTotalRegistration] = useState<number>(0)
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { axiosInstance } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<{ total: number }>('/api/event/getTotalEvent');
        setTotalEvent(res.data.total)

        const registration_res = await axiosInstance.get<{ total: number }>("/api/registration/getTotalRegistration")
        setTotalRegistration(registration_res.data.total)

        const upcoming_res = await axiosInstance.get<{ upcomingEvents: Event[] }>("/api/event/getUpcomingEvent")
        setUpcomingEvents(upcoming_res.data.upcomingEvents)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <main className="flex flex-1 flex-col gap-16 p-6 md:gap-8 md:px20 md:py-10">
        <DashboardHeader />

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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
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
                    <UpcomingEventCard key={i} event={event} />
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Link href="/admin/events" className="w-full flex items-center justify-center">
                  View All Events
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="col-span-3">
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
                    {/* {upcomingEvents.slice(0, 5).map((event, i) => (
                    <PopularEventCard key={i} event={event} />
                    ))} */}
                    <h2 className="text-center">Coming Soon</h2>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Link href="/admin/analytics" className="w-full flex items-center justify-center">
                    View Analytics
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main >
    </>
  )
}
