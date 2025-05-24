'use client'
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, DollarSign } from "lucide-react"
import { Badge } from "@radix-ui/themes"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { Button } from "@radix-ui/themes"

interface TrendingEventCardProps {
    event: {
        event_id: string
        title: string
        event_date: string
        location: string
        imageUrl: string
        is_paid: boolean
        price?: number
        description?: string
    }
}

export function TrendingEventCard({ event }: TrendingEventCardProps) {
    const controls = useAnimation()

    return (
        <AnimatePresence>
            <motion.div
                key={event.event_id}
                className="h-full rounded-lg border bg-card text-card-foreground shadow-sm"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.3 } }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.2 } }}
                onHoverStart={() => controls.start({ scale: 1.08 })}
                onHoverEnd={() => controls.start({ scale: 1 })}
                layout
            >

                <Link href={`/events/${event.event_id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow ">
                        <div className="relative aspect-video w-full overflow-hidden">
                            <motion.div className="h-full w-full overflow-hidden" animate={controls}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${event.imageUrl}` || "/placeholder.svg"}
                                    alt={event.title}
                                    fill
                                    className="object-cover"

                                />
                            </motion.div>
                        </div>
                        <CardContent className="p-4 space-y-6">
                            <div className="flex items-center justify-between">
                                <h5 className="font-semibold line-clamp-1 m-0">{event.title}</h5>
                                {event.is_paid ? (
                                    <Badge color='gray' highContrast variant='solid'>Rs. {typeof event.price === 'number' ? event.price.toFixed(2) : event.price}</Badge>
                                ) : (
                                    <Badge variant="outline" color='gray'>Free</Badge>
                                )}
                            </div>

                            <div className="space-y-1 text-sm text-muted-foreground flex flex-col gap-2">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>{new Date(event.event_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-2 h-4 w-4" />
                                    <span className="line-clamp-1">{event.location}</span>
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                <Button className="w-full" color='gray' highContrast onClick={() => window.location.href = `/events/${event.event_id}`} style={{ width: '100%' }}>
                                    View Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </motion.div>
        </AnimatePresence>
    )
}