import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Share2,
  CalendarPlus,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistrationForm } from "@/components/registration-form"
import axios from "axios"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import EventContent from './Components/EventContent'


function EventSkeleton() {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div>
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-6 w-20 mt-2" />
        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-60" />
        </div>
      </div>
      <Skeleton className="aspect-video w-full rounded-lg" />
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


export default async function EventDetailsPage({
  params,
}: {
  params: { eventId: string }
}) {
  const eventId = await params.eventId

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