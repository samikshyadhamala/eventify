'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@radix-ui/themes"
import { Plus, Download, ChevronDown, Filter, Search } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/auth/hooks"
import { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, User, Users, BarChart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Events() {
    const { axiosInstance } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEvents, setTotalEvents] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showEventDialog, setShowEventDialog] = useState(false);
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loadingRegistrations, setLoadingRegistrations] = useState(false);
    const [eventRegistrations, setEventRegistrations] = useState<{[key: number]: number}>({});
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchEventsAndRegistrations = async () => {
            try {
                setLoading(true);
                
                // Fetch events and registrations in parallel
                const [eventsResponse, registrationsResponse] = await Promise.all([
                    axiosInstance.get('/api/event/getEvents'),
                    axiosInstance.get('/api/registration/getAllRegistrationCount')
                ]);

                const allEvents = eventsResponse.data.events;
                const registrationCounts = registrationsResponse.data.counts;

                setEvents(allEvents);
                setFilteredEvents(allEvents); 
                setTotalEvents(allEvents.length);
                setEventRegistrations(registrationCounts);

            } catch (error) {
                console.error("Error fetching events and registrations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventsAndRegistrations();
    }, [axiosInstance]);

    // Filter events based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredEvents(events);
            setTotalEvents(events.length);
        } else {
            const lowercaseQuery = searchQuery.toLowerCase();
            const filtered = events.filter(event =>
                event.title.toLowerCase().includes(lowercaseQuery) ||
                event.description.toLowerCase().includes(lowercaseQuery) ||
                event.location.toLowerCase().includes(lowercaseQuery)
            );
            setFilteredEvents(filtered);
            setTotalEvents(filtered.length);
        }
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchQuery, events]);

    interface Event {
        branch_id: number;
        created_at: string;
        description: string;
        event_date: string;
        event_id: number;
        imageUrl: string;
        is_paid: boolean;
        location: string;
        max_capacity: number;
        price: string;
        title: string;
    }

    const getEventStatus = (eventDate: string) => {
        const now = new Date();
        const date = new Date(eventDate);

        // Adding 24 hours to event date to consider it "ongoing" during the day of the event
        const endDate = new Date(date);
        endDate.setHours(endDate.getHours() + 24);

        if (date > now) {
            return "Upcoming";
        } else if (now >= date && now <= endDate) {
            return "Ongoing";
        } else {
            return "Past";
        }
    };

    // Calculate pagination values
    const indexOfLastEvent = currentPage * rowsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredEvents.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // delete logic
    const handleDelete = (event_id: number) => {
        axiosInstance.delete(`/api/event/deleteEvent/${event_id}`)
        .then(() => {
            setEvents(events.filter(event => event.event_id !== event_id));
        })
        .catch(error => {
            console.error('Error deleting event:', error);
        });
    }

    const handleEventDetails = async (event: Event) => {
        setSelectedEvent(event);
        setShowEventDialog(true);
        setLoadingRegistrations(true);
        try {
            const response = await axiosInstance.get(`/api/registration/getEventRegistration/${event.event_id}`);
            setRegistrations(response.data.registrations);
            setLoadingRegistrations(false);
        } catch (error) {
            console.error("Error fetching registrations:", error);
            setLoadingRegistrations(false);
        }
    };

    return (
        <div className="w-full">
            <div className="p-2 py-4">
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
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-between">
                            <div className="flex flex-1 items-center gap-2">
                                <div className="relative flex-1">
                                    <Input
                                        type="search"
                                        placeholder="Search events..."
                                        className="w-full pl-8 bg-muted border-none"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md border">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium">Event Name</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Registrations</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {loading ? (
                                            Array(5).fill(0).map((_, i) => (
                                                <motion.tr
                                                    key={i}
                                                    className="border-b transition-colors"
                                                >
                                                    <td className="p-4 align-middle">
                                                        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        ) : currentEvents.length === 0 ? (
                                            <tr className="border-b transition-colors">
                                                <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                                    No events found matching your search criteria
                                                </td>
                                            </tr>
                                        ) : (
                                            currentEvents.map((event, i) => {
                                                const status = getEventStatus(event.event_date);
                                                const registrationCount = eventRegistrations?.[event.event_id] || 0
                                                return (
                                                    <motion.tr
                                                        key={event.event_id}
                                                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                                        initial={{ opacity: 0, y: 20}}
                                                        animate={{ opacity: 1, y: 0 }}
                                                    >
                                                        <td className="p-4 align-middle font-medium">{event.title}</td>
                                                        <td className="p-4 align-middle">{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                        <td className="p-4 align-middle">
                                                            <Badge
                                                                variant="outline"
                                                                className={`
                                                                    ${status === "Upcoming"
                                                                        ? "border-blue-200 bg-blue-50 text-blue-700"
                                                                        : status === "Past"
                                                                            ? "border-green-200 bg-green-50 text-green-700"
                                                                            : "border-yellow-200 bg-yellow-50 text-yellow-700"
                                                                    }
                                                                `}
                                                            >
                                                                {status}
                                                            </Badge>
                                                        </td>
                                                        <td className="p-4 align-middle">
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex items-center justify-between text-xs">
                                                                    <span>
                                                                        {registrationCount}/{event.max_capacity}
                                                                    </span>
                                                                    <span className="text-muted-foreground">
                                                                        {Math.round((registrationCount / event.max_capacity) * 100)}%
                                                                    </span>
                                                                </div>
                                                                <Progress value={(registrationCount / event.max_capacity) * 100} className="h-1" />
                                                            </div>
                                                        </td>
                                                        <td className="p-4 align-middle">
                                                            <Badge
                                                                variant="outline"
                                                                className={`
                                                                    ${event.is_paid
                                                                        ? "border-purple-200 bg-purple-50 text-purple-700"
                                                                        : "border-gray-200 bg-gray-50 text-gray-700"
                                                                    }
                                                                `}
                                                            >
                                                                {event.is_paid ? "Paid" : "Free"}
                                                            </Badge>
                                                        </td>
                                                        <td className="p-4 align-middle">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost">
                                                                        Actions
                                                                        <ChevronDown className="ml-2 h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem onClick={() => handleEventDetails(event)}>
                                                                        Event Details
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(event.event_id)}>
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </motion.tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing <strong>{filteredEvents.length > 0 ? indexOfFirstEvent + 1 : 0}-{Math.min(indexOfLastEvent, totalEvents)}</strong> of <strong>{totalEvents}</strong> events
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" disabled={currentPage === 1 || loading} onClick={prevPage}>
                                    Previous
                                </Button>
                                <Button variant="outline" disabled={currentPage >= Math.ceil(totalEvents / rowsPerPage) || loading} onClick={nextPage}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </div>

            {selectedEvent && (
                <Dialog open={showEventDialog} onOpenChange={(open) => !open && setShowEventDialog(false)}>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">{selectedEvent.title}</DialogTitle>
                            <div className="text-sm text-muted-foreground">
                                <Badge className={
                                    getEventStatus(selectedEvent.event_date) === "Upcoming"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                }>
                                    {getEventStatus(selectedEvent.event_date)}
                                </Badge>
                            </div>
                        </DialogHeader>
                        
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid grid-cols-2 mb-4">
                                <TabsTrigger value="details">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>Details</span>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger value="attendees">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        <span>Attendees</span>
                                    </div>
                                </TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="details" className="space-y-4">
                                <Card>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                                                <div className="flex items-center mt-1">
                                                    <Calendar className="h-4 w-4 mr-2 text-brand-purple" />
                                                    <span>{new Date(selectedEvent.event_date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Location</h4>
                                                <div className="flex items-center mt-1">
                                                    <MapPin className="h-4 w-4 mr-2 text-brand-purple" />
                                                    <span>{selectedEvent.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Capacity</h4>
                                            <div className="flex items-center mt-1">
                                                <User className="h-4 w-4 mr-2 text-brand-purple" />
                                                <span>{registrations.length} / {selectedEvent.max_capacity} attendees</span>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                            <p className="mt-1">{selectedEvent.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            
                            <TabsContent value="attendees">
                                <Card>
                                    <CardContent className="pt-6">
                                        {loadingRegistrations ? (
                                            <div className="text-center">Loading attendees...</div>
                                        ) : registrations.length === 0 ? (
                                            <p className="text-center text-gray-500">No attendees registered yet</p>
                                        ) : (
                                            <div className="space-y-4">
                                                {registrations.map((registration) => (
                                                    <div key={registration.registration_id} className="flex items-center gap-4 p-3 rounded-lg border">
                                                        <Avatar>
                                                            <AvatarImage src={registration.user.imageUrl} />
                                                            <AvatarFallback>
                                                                {registration.user.email.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 flex flex-col gap-1">
                                                            <div className="text-sm font-medium p-0">{registration.user.email}</div>
                                                            <div className="text-xs text-gray-500">
                                                                Registered on {new Date(registration.registered_at).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}