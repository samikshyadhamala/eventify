'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth/hooks'
import { CardHeader, CardDescription } from '@/components/ui/card'
import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import EventsTable from './Table'
import EventDetailsDialog from './Table/row/EventDetailDialog'
import EditEventDialog from './Table/row/EditEventDialog'

interface Event {
  branch_id: number
  created_at: string
  description: string
  event_date: string
  event_id: number
  imageUrl: string
  is_paid: boolean
  location: string
  max_capacity: number
  price: string
  title: string
}

export default function Events() {
  const { axiosInstance } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalEvents, setTotalEvents] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [editEvent, setEditEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loadingRegistrations, setLoadingRegistrations] = useState(false)
  const [eventRegistrations, setEventRegistrations] = useState<{ [key: number]: number }>({})
  const rowsPerPage = 10

  useEffect(() => {
    const fetchEventsAndRegistrations = async () => {
      try {
        setLoading(true)
        const [eventsResponse, registrationsResponse] = await Promise.all([
          axiosInstance.get('/api/event/getBranchEvents'),
          axiosInstance.get('/api/registration/getBranchRegistrationCount'),
        ])
        const allEvents = eventsResponse.data.events
        const registrationCounts = registrationsResponse.data.counts

        setEvents(allEvents)
        setFilteredEvents(allEvents)
        setTotalEvents(allEvents.length)
        setEventRegistrations(registrationCounts)
      } catch (error) {
        console.error('Error fetching events and registrations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEventsAndRegistrations()
  }, [axiosInstance])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEvents(events)
      setTotalEvents(events.length)
    } else {
      const lowercaseQuery = searchQuery.toLowerCase()
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(lowercaseQuery) ||
          event.description.toLowerCase().includes(lowercaseQuery) ||
          event.location.toLowerCase().includes(lowercaseQuery)
      )
      setFilteredEvents(filtered)
      setTotalEvents(filtered.length)
    }
    setCurrentPage(1)
  }, [searchQuery, events])

  const handleDelete = (event_id: number) => {
    axiosInstance
      .delete(`/api/event/deleteEvent/${event_id}`)
      .then(() => {
        setEvents(events.filter((event) => event.event_id !== event_id))
      })
      .catch((error) => {
        console.error('Error deleting event:', error)
      })
  }

  const handleEventDetails = async (event: Event) => {
    setSelectedEvent(event)
    setLoadingRegistrations(true)
    try {
      const response = await axiosInstance.get(`/api/registration/getEventRegistration/${event.event_id}`)
      setRegistrations(response.data.registrations)
      setLoadingRegistrations(false)
    } catch (error) {
      console.error('Error fetching registrations:', error)
      setLoadingRegistrations(false)
    }
  }

  const handleEditEvent = (event: Event) => {
    setEditEvent(event)
  }

  return (
    <div className="w-full p-2 py-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h1 className="font-bold tracking-tight">Events Management</h1>
          <Link href="/club/create-event">
            <Button className="gap-1 bg-black">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </Link>
        </div>
        <CardDescription>Manage all your events in one place</CardDescription>
      </CardHeader>
      <EventsTable
        events={filteredEvents}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalEvents={totalEvents}
        loading={loading}
        eventRegistrations={eventRegistrations}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
        handleDelete={handleDelete}
        handleEventDetails={handleEventDetails}
        handleEditEvent={handleEditEvent}
      />
      <EventDetailsDialog
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        registrations={registrations}
        loadingRegistrations={loadingRegistrations}
      />
      <EditEventDialog
        editEvent={editEvent}
        setEditEvent={setEditEvent}
        axiosInstance={axiosInstance}
        setEvents={setEvents}
      />
    </div>
  )
}