'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistrationForm } from "@/components/registration-form"
import axios from "axios"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { useState, useEffect } from 'react'

async function getEvent(id: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/getEvent/${id}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            throw new Error('Failed to fetch event')
        })
}

export default function EventContent({ eventId }: { eventId: string }) {
    const [event, setEvent] = useState({})

    useEffect(() => {
        const fetchData = async () => { 
            try { 
                const data = await getEvent(eventId)
                setEvent(data)
            }
            catch (error){
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{event?.title}</h1>
                    <div className="flex flex-wrap gap-2">
                        {event?.isPaid ? <Badge variant="default" className="bg-black">Paid</Badge> : <Badge variant="outline">Free</Badge>}
                    </div>
                    <div className="mt-4 flex flex-col gap-2 text-muted-foreground">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{new Date(event?.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{event?.location}</span>
                        </div>
                    </div>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${event?.imageUrl}` || "/placeholder.svg?height=500&width=800"}
                        alt={event?.title || "event image"} 
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <Tabs defaultValue="about" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="location">Location</TabsTrigger>
                    </TabsList>
                    <TabsContent value="about" className="mt-4 space-y-4">
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event?.description }} />
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
                    <TabsContent value="location" className="mt-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold">Location</h3>
                                        <p className="text-muted-foreground">{event.location}</p>
                                    </div>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
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
            <div className="space-y-6">
                <Card className="sticky top-20">
                    <CardHeader>
                        <CardTitle>Registration</CardTitle>
                        <CardDescription>Secure your spot for this event</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {event?.isPaid ? (
                            <div className="flex items-center text-2xl font-bold">
                                <span>{(event?.price || 0).toFixed(2)}</span>
                            </div>
                        ) : (
                            <Badge variant="outline" className="text-lg py-1 px-2">
                                Free
                            </Badge>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-2 h-4 w-4" />
                            <span>
                                Capacity: {event.maxCapacity || 'N/A'} spots
                            </span>
                        </div>
                        <RegistrationForm
                            eventId={event?.id || ''}
                            isPaid={event?.isPaid || false}
                            price={event?.price || 0}
                            maxCapacity={event?.maxCapacity || 0}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}