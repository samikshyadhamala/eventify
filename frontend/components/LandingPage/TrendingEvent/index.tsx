'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth/hooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SkeletonEvents from './SkeletonEvents'
import { motion } from 'framer-motion'
import EventCard from '@/components/EventCard';
import { Event } from "@/components/types/EventCardTypes"
// import { toast } from "sonner"
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState<Event[]>([])
  const { axiosInstance } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)
  const [isLoading, setIsLoading] = useState(false);
  const [forYouEvent, setForYouEvent] = useState<number[]>([])

  useEffect(() => {
    let isMounted = true; // to avoid setting state on unmounted component

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/api/event/getEvents");
        if (isMounted) {
          setData(response.data.events);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setData([]);
          toast.info(
            "Oops! Our server decided to take an unscheduled nap 😴💤 It's probably dreaming of better API responses! Try again in a few seconds 🔄✨"
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [axiosInstance]);

  // fetch event recommendations
  useEffect(() => {
    const fetchForYouEvents = async () => {
      try {
        const response = await axiosInstance.get<number[]>("/api/ml/recommend");
        setForYouEvent(response.data);
      } catch (error) {
        console.error("Error fetching for you events:", error);
        toast.info(
          "Oops! Our server decided to take an unscheduled nap 😴💤 It's probably dreaming of better API responses! Try again in a few seconds 🔄✨"
        );
      }
    }
    fetchForYouEvents();
  }, [axiosInstance]);

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
          {visibleEvents.length >= 1 ? (
            visibleEvents.map((item) => (
              // <TrendingEventCard key={item.event_id} event={item} />
              <EventCard {...item} key={item.event_id} />
            ))) : (
            <div className='col-span-3 text-center text-2xl py-8'>No results found</div>
          )}
        </motion.div>
        {hasMore ? (
          <div className="flex justify-center mt-6">
            <Button onClick={loadMore} variant="outline">Load More</Button>
          </div>
        ) : (
          <div className="flex justify-center mt-6">
            <Link href="/allevent">
              <Button variant="outline" className='text-black'>Explore All Events</Button>
            </Link>
          </div>
        )}
      </>
    )
  }

  const getForYouEvents = () => {
    return data
      .filter(event =>
        forYouEvent.includes(event.event_id))
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
    <section className="w-full py-8 md:py-16 px-2 sm:px-8 md:px-28 lg:py-20">
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
            <Tabs defaultValue="forYou" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="forYou"
                  className="rounded-none border-b-2 border-transparent px-3 sm:px-4 py-2 data-[state=active]:border-primary"
                >
                  For You
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="rounded-none border-b-2 border-transparent px-3 sm:px-4 py-2 data-[state=active]:border-primary"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger
                  value="free"
                  className="rounded-none border-b-2 border-transparent px-3 sm:px-4 py-2 data-[state=active]:border-primary"
                >
                  Free
                </TabsTrigger>
                <TabsTrigger
                  value="paid"
                  className="rounded-none border-b-2 border-transparent px-3 sm:px-4 py-2 data-[state=active]:border-primary"
                >
                  Paid
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forYou" className="pt-6">
                {renderEventCards(getForYouEvents())}
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
