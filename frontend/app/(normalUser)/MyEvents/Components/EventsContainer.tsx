'use client';


import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth/hooks';
import SkeletonEvents from '@/components/LandingPage/TrendingEvent/SkeletonEvents'
import { AnimatePresence } from "framer-motion";
import EventCard from './EventCard';
import { Event } from './types/EventCardTypes'
import EventDetailsDialog from './EventDetailsDialog';
import { useMyEventsContext } from '../context';
export default function EventsContainer() {
    const {
        events,
        isLoading,
        searchQuery,
        selectedEvent,
        isDialogOpen,
        setIsDialogOpen
    } = useMyEventsContext();

    const renderEventCards = (events: Event[]) => {
        const now = new Date()
        const filteredEvents = events
            .filter(event => new Date(event.event_date) >= now)
            .filter(event =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase())
            )

        return (
            <div className="flex flex-wrap gap-4 justify-center">
                <AnimatePresence>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((item) => (
                            <EventCard {...item} key={item.event_id} />
                        ))) : (
                        <div className='w-full h-40 text-center col-span-3 text-3xl '>No Registered Events</div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    return (
        <>
            <div className="container px-4 md:px-6 flex justify-center mt-2 mb-12">
                <div className="flex w-full max-w-[63rem] flex-col gap-4">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        {/* <Button variant="outline" className="shrink-0">
                        <Filter className="h-4 w-4" />
                        <span className="sr-only">Filter</span>
                        </Button> */}
                    </div>

                    {isLoading ? <SkeletonEvents /> : (
                        <div>
                            {renderEventCards(events)}
                        </div>
                    )}
                </div>
            </div>
            <EventDetailsDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                event={selectedEvent}
            />
        </>
    )
}