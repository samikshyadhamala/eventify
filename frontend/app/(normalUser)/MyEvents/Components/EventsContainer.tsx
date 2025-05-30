'use client';


import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth/hooks';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SkeletonEvents from '@/components/TrendingEvent/SkeletonEvents'
import { AnimatePresence } from "framer-motion";
import EventCard from '@/components/EventCard';
import { Event } from '@/components/types/EventCardTypes'

export default function EventsContainer() {
    const [data, setData] = useState<Event[]>([])
    const { axiosInstance } = useAuth()
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await axiosInstance.get("/api/event/getEvents")
                setData(response.data.events)
            }
            catch (error) {
                console.log(error)
                setData([])
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [axiosInstance])

    const renderEventCards = (events: Event[]) => {
        const now = new Date()
        const filteredEvents = events
            .filter(event => new Date(event.event_date) >= now)
            .filter(event =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase())
            )

        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {filteredEvents.map((item) => (
                        <EventCard {...item} key={item.event_id} />
                    ))}
                </AnimatePresence>
            </div>
        )
    }

    const getUpcomingEvents = () => {
        const now = new Date()
        return data.filter(event => new Date(event.event_date) > now)
    }

    const getFreeEvents = () => {
        return data.filter(event => !event.is_paid)
    }

    const getPaidEvents = () => {
        return data.filter(event => event.is_paid)
    }

    return (
        <div className="container px-4 md:px-6 flex justify-center mt-8 mb-12">
            <div className="flex w-full max-w-[63rem] flex-col gap-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                    {/* <Button variant="outline" className="shrink-0">
                        <Filter className="h-4 w-4" />
                        <span className="sr-only">Filter</span>
                      </Button> */}
                </div>

                {isLoading ? <SkeletonEvents /> : (
                    <div>
                        {renderEventCards(data)}
                    </div>
                )}
            </div>
        </div>
    )
}