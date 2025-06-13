'use client'

import { CardHeader, CardDescription } from '@/components/ui/card'
import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import EventsTable from './Table'
import EventDetailsDialog from './Table/row/EventDetailDialog'
import EditEventDialog from './Table/row/EditEventDialog'
import DeleteEventDialog from './Table/row/DeleteEventDialog'
import { useEvents } from './context'
import { useAuth } from '@/context/auth/hooks'

export default function Events() {
  const { axiosInstance } = useAuth()
  const {
    filteredEvents,
    currentPage,
    totalEvents,
    loading,
    eventRegistrations,
    searchQuery,
    selectedEvent,
    editEvent,
    registrations,
    loadingRegistrations,
    isDeleteDialogOpen,
    selectedEventId,
    rowsPerPage,
    setSearchQuery,
    setCurrentPage,
    setSelectedEvent,
    setEditEvent,
    setEvents,
    setIsDeleteDialogOpen,
    setSelectedEventId,
    handleDelete,
    handleEventDetails,
    handleEditEvent,
  } = useEvents()

  return (
    <div className="w-full p-2 py-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h1 className="font-bold tracking-tight">Events Management</h1>
          <Link href="/club/create-event">
            <Button className="gap-1 bg-black" color='gray'>
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </Link>
        </div>
        <CardDescription>Manage all your events in one place</CardDescription>
      </CardHeader>
      
      <EventsTable />
      
      <EventDetailsDialog
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        registrations={registrations}
        loadingRegistrations={loadingRegistrations}
      />

      <EditEventDialog />

      <DeleteEventDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onDeleteEvent={handleDelete}
        selectedEventId={selectedEventId}
      />
    </div>
  )
}