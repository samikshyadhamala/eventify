"use client"

import type React from "react"

import { Switch } from "@/components/ui/switch"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <>
      <main className="flex flex-1 flex-col gap-16 p-6 md:gap-8 md:px20 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <Link href="/admin/events/create">
            <Button size={{ initial: "2", md: "3" }} className="gap-1" variant="solid" color="gray" highContrast>
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </div>
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title="Total Events"
                value="24"
                trend="up"
                description="+2 from last month" 
                icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                change="+8.3%"
              />
              <MetricCard
                title="Upcoming Events"
                value="8"
                change="+12.5%"
                trend="up"
                description="Next event in 3 days"
                icon={<Clock className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Total Registrations"
                value="1,284"
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
                  <div className="space-y-4">
                    {[
                      {
                        name: "Web Development Workshop",
                        date: "Jun 15, 2025",
                        registrations: 45,
                        capacity: 50,
                        image: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Tech Networking Night",
                        date: "Jun 22, 2025",
                        registrations: 32,
                        capacity: 100,
                        image: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "AI Conference",
                        date: "Jul 05, 2025",
                        registrations: 78,
                        capacity: 150,
                        image: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Hackathon 2025",
                        date: "Jul 15, 2025",
                        registrations: 24,
                        capacity: 50,
                        image: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Mobile App Showcase",
                        date: "Jul 28, 2025",
                        registrations: 18,
                        capacity: 75,
                        image: "/placeholder.svg?height=40&width=40",
                      },
                    ].map((event, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.name}
                            width={40}
                            height={40}
                            className="aspect-square h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{event.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarDays className="mr-1 h-3 w-3" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span>
                              {event.registrations}/{event.capacity}
                            </span>
                            <span className="text-muted-foreground">
                              {Math.round((event.registrations / event.capacity) * 100)}%
                            </span>
                          </div>
                          <Progress value={(event.registrations / event.capacity) * 100} className="h-1" color="gray"/>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link href="/admin/events" className="w-full flex items-center justify-center">
                      View All Events
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Popular Events</CardTitle>
                  <CardDescription>Your most popular events by registration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "AI Conference", registrations: 78, views: 1245, conversion: 6.3 },
                      { name: "Web Development Workshop", registrations: 45, views: 876, conversion: 5.1 },
                      { name: "Tech Networking Night", registrations: 32, views: 654, conversion: 4.9 },
                      { name: "Hackathon 2025", registrations: 24, views: 532, conversion: 4.5 },
                      { name: "Mobile App Showcase", registrations: 18, views: 423, conversion: 4.3 },
                    ].map((event, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">{event.name}</p>
                          <div className="flex items-center gap-1 text-xs">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span>{event.registrations}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{event.views} views</span>
                          </div>
                          <span>{event.conversion}% conversion</span>
                        </div>
                        <Progress value={event.conversion * 10} className="h-1" />
                      </div>
                    ))}
                  </div>
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
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Branch Settings</CardTitle>
                <CardDescription>Manage your branch profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Branch Profile</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="branch-name">Branch Name</Label>
                      <Input id="branch-name" defaultValue="Tech Hub" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch-email">Contact Email</Label>
                      <Input id="branch-email" type="email" defaultValue="techhub@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch-phone">Contact Phone</Label>
                      <Input id="branch-phone" defaultValue="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch-location">Location</Label>
                      <Input id="branch-location" defaultValue="Downtown Tech District" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch-description">Description</Label>
                    <Textarea
                      id="branch-description"
                      defaultValue="The Tech Hub branch focuses on technology-related events, workshops, and networking opportunities for tech professionals and enthusiasts."
                      rows={4}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Event Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="default-capacity">Default Event Capacity</Label>
                      <Input id="default-capacity" type="number" defaultValue="50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registration-deadline">Default Registration Deadline</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="registration-deadline">
                          <SelectValue placeholder="Select deadline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day before event</SelectItem>
                          <SelectItem value="2">2 days before event</SelectItem>
                          <SelectItem value="3">3 days before event</SelectItem>
                          <SelectItem value="7">1 week before event</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="approval-required" />
                    <Label htmlFor="approval-required">Require approval for event registrations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="waitlist" defaultChecked />
                    <Label htmlFor="waitlist">Enable waitlist when events are full</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" defaultChecked />
                    <Label htmlFor="notifications">Send email notifications for new registrations</Label>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Payment Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Default Payment Method</Label>
                      <Select defaultValue="stripe">
                        <SelectTrigger id="payment-method">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stripe">Stripe</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="receipts" defaultChecked />
                    <Label htmlFor="receipts">Automatically send receipts for payments</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
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
  value: string
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
