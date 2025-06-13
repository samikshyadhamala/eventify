// types.tsx
export interface Event {
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

export interface EventRegistrations {
  [key: number]: number
}

export interface Registration {
  // Add specific registration properties based on your API response
  id: number
  event_id: number
  user_id: number
  registration_date: string
  // Add other registration fields as needed
}

export interface EventsContextType {
  events: Event[]
  filteredEvents: Event[]
  loading: boolean
  currentPage: number
  totalEvents: number
  searchQuery: string
  selectedEvent: Event | null
  editEvent: Event | null
  registrations: Registration[]
  loadingRegistrations: boolean
  eventRegistrations: EventRegistrations
  isDeleteDialogOpen: boolean
  selectedEventId: number | null
  rowsPerPage: number
  setEvents: (events: Event[]) => void
  setFilteredEvents: (events: Event[]) => void
  setLoading: (loading: boolean) => void
  setCurrentPage: (page: number) => void
  setTotalEvents: (total: number) => void
  setSearchQuery: (query: string) => void
  setSelectedEvent: (event: Event | null) => void
  setEditEvent: (event: Event | null) => void
  setRegistrations: (registrations: Registration[]) => void
  setLoadingRegistrations: (loading: boolean) => void
  setEventRegistrations: (registrations: EventRegistrations) => void
  setIsDeleteDialogOpen: (open: boolean) => void
  setSelectedEventId: (id: number | null) => void
  handleDelete: (event_id: number | null) => void
  handleEventDetails: (event: Event) => Promise<void>
  handleEditEvent: (event: Event) => void
  fetchEventsAndRegistrations: () => Promise<void>
}