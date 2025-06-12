'use client'
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useAuth } from '@/context/auth/hooks';
import { Event, Organizer, OrganizersType } from './Components/types/EventCardTypes';

// Define the shape of your context data
interface MyEventsContextType {
    events: Event[];
    isLoading: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedEvent: Event | null;
    setSelectedEvent: (event: Event | null) => void;
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    fetchEvents: () => Promise<void>;
    getUpcomingEvents: () => Event[];
    getFreeEvents: () => Event[];
    getPaidEvents: () => Event[];
    organizers: OrganizersType | null;
    qrCodeUrl: string;
}

// Create context with a default value
const MyEventsContext = createContext<MyEventsContextType | undefined>(undefined);

interface MyEventsProviderProps {
    children: ReactNode;
}

export const MyEventsProvider = ({ children }: MyEventsProviderProps) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [organizers, setOrganizers] = useState<OrganizersType | null>(null);
    const { axiosInstance } = useAuth();
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    
    useEffect(() => {
        const fetchEventPass = async () => {
            try {
                const response = await axiosInstance.get(`/api/registration/getRegistrationPass/${selectedEvent?.event_id}`);
                const data = await response.data;
                const registration_pass = data?.registration_pass;
                setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${registration_pass}`);
            } catch (error) {
                console.error('Error fetching event pass:', error);
            }
        };

        fetchEventPass();
    }, [selectedEvent, axiosInstance]);

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/api/event/getRegisteredEvents");
            setEvents(response.data.events);
        }
        catch (error) {
            console.log(error);
            setEvents([]);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = selectedEvent?.event_id;
                try {
                    const response = await axiosInstance.get<OrganizersType>('/api/event/getOrganizerContact', { params: { event_id: selectedEvent?.event_id } });
                    setOrganizers(response.data);
                } catch (error) {
                    console.error(error);
                    //   toast.error("Error retrieving organizer contact");
                }
            } catch (error) {
                console.error(error);
                // toast.error("Failed to fetch event details");
            }
        };
        fetchData();
    }, [selectedEvent]);

    useEffect(() => {
        fetchEvents();
    }, [axiosInstance]);

    const getUpcomingEvents = () => {
        const now = new Date();
        return events.filter(event => new Date(event.event_date) > now);
    };

    const getFreeEvents = () => {
        return events.filter(event => !event.is_paid);
    };

    const getPaidEvents = () => {
        return events.filter(event => event.is_paid);
    };

    const contextValue: MyEventsContextType = {
        events,
        isLoading,
        searchQuery,
        setSearchQuery,
        selectedEvent,
        setSelectedEvent,
        isDialogOpen,
        setIsDialogOpen,
        fetchEvents,
        getUpcomingEvents,
        getFreeEvents,
        getPaidEvents,
        organizers, 
        qrCodeUrl
    };

    return (
        <MyEventsContext.Provider value={contextValue}>
            {children}
        </MyEventsContext.Provider>
    );
};

export const useMyEventsContext = (): MyEventsContextType => {
    const context = useContext(MyEventsContext);
    if (context === undefined) {
        throw new Error("useMyEventsContext must be used within a MyEventsProvider");
    }
    return context;
};