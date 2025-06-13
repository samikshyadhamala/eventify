'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from '@/context/auth/hooks'
import { Event, EventRegistrations, Registration, EventsContextType } from './types'

const EventsContext = createContext<EventsContextType | undefined>(undefined)

interface EventsProviderProps {
  children: ReactNode
}

export function EventsProvider({ children }: EventsProviderProps) {
  const { axiosInstance } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalEvents, setTotalEvents] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [editEvent, setEditEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loadingRegistrations, setLoadingRegistrations] = useState(false)
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistrations>({})
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const rowsPerPage = 10

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

  const handleDelete = (event_id: number | null) => {
    if (!event_id) return

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

  // Filter events based on search query
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

  // Initial data fetch
  useEffect(() => {
    fetchEventsAndRegistrations()
  }, [axiosInstance])

  const value: EventsContextType = {
    events,
    filteredEvents,
    loading,
    currentPage,
    totalEvents,
    searchQuery,
    selectedEvent,
    editEvent,
    registrations,
    loadingRegistrations,
    eventRegistrations,
    isDeleteDialogOpen,
    selectedEventId,
    rowsPerPage,
    setEvents,
    setFilteredEvents,
    setLoading,
    setCurrentPage,
    setTotalEvents,
    setSearchQuery,
    setSelectedEvent,
    setEditEvent,
    setRegistrations,
    setLoadingRegistrations,
    setEventRegistrations,
    setIsDeleteDialogOpen,
    setSelectedEventId,
    handleDelete,
    handleEventDetails,
    handleEditEvent,
    fetchEventsAndRegistrations,
  }

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider')
  }
  return context
}