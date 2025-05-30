'use client';

import styles from '@/styles/Freeevent.module.css';
import Link from 'next/link';
import ImageComponent from '../ImageComponent';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth/hooks';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SkeletonEvents from './SkeletonEvents'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import EventCard from '@/components/EventCard';
import { Event } from "@/components/types/EventCardTypes"

export default function Home() {
  const [data, setData] = useState<Event[]>([])
  const { axiosInstance } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)
  const controls = useAnimation()

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

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 6)
  }

  const renderEventCards = (events: Event[]) => {
    const now = new Date()
    const filteredEvents = events
      .filter(event => new Date(event.event_date) >= now)
      .filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      )

    const visibleEvents = filteredEvents.slice(0, visibleCount)
    const hasMore = filteredEvents.length > visibleCount

    return (
      <>
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleEvents.map((item) => (
            // <TrendingEventCard key={item.event_id} event={item} />
            <EventCard {...item} key={item.event_id} /> 
          ))}
        </motion.div>
        {hasMore && (
          <div className="flex justify-center mt-6">
            <Button onClick={loadMore} variant="outline">Load More</Button>
          </div>
        )}
      </>
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
    <section className="w-full py-8 md:py-16 px-8 md:px-28 lg:py-20">
      <div className="container flex justify-center">
        <div className="flex w-full max-w-[64rem] flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search events..."
                className="w-full bg-background pl-8 shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button> */}
          </div>

          {isLoading ? <SkeletonEvents /> : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                >
                  All Events
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger
                  value="free"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                >
                  Free
                </TabsTrigger>
                <TabsTrigger
                  value="paid"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                >
                  Paid
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="pt-6">
                {renderEventCards(data)}
              </TabsContent>
              <TabsContent value="upcoming" className="pt-6">
                {renderEventCards(getUpcomingEvents())}
              </TabsContent>
              <TabsContent value="free" className="pt-6">
                {renderEventCards(getFreeEvents())}
              </TabsContent>
              <TabsContent value="paid" className="pt-6">
                {renderEventCards(getPaidEvents())}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </section>
  );
}
