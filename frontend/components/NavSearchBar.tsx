'use client'

import { useState, useEffect } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useAuth } from "@/context/auth/hooks"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

interface EventName {
    event_id: string;
    title: string;
}
interface EventNamesType {
    events: EventName[];
}

export default function NavSearchBar({placeholder = false}: {placeholder: boolean}) {
    const [open, setOpen] = useState(false)
    const { axiosInstance } = useAuth()
    const [eventNames, setEventNames] = useState<EventNamesType>({ events: [] })
    const router = useRouter()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get<EventNamesType>("/api/event/getEventsName")
                setEventNames(response.data)
            } catch (error) {
                console.error("Error fetching events:", error)
            }
        }

        fetchEvents()
    }, [axiosInstance])

    return (
        <div className="relative z-50">
            <Command className={`rounded-lg shadow-md md:min-w-[17rem] relative overflow-visible bg-background`}>
                <CommandInput
                    placeholder="Search for events..."
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                    className='border-0 focus:ring-0 h-9 focus:border-0 bg-background text-black placeholder:text-gray-500'
                />
                {open && (
                    <CommandList className="absolute bottom-2 left-0 right-0 transform translate-y-full z-50 bg-background">
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <ScrollArea className="h-60">
                                {eventNames.events.map((event) => (
                                    <CommandItem
                                        key={event.event_id}
                                        onMouseDown={() => { router.push(`/event/${event.event_id}`) }}
                                        className='py-2'
                                    >
                                        {event.title}
                                    </CommandItem>
                                ))}
                            </ScrollArea>
                        </CommandGroup>
                    </CommandList>
                )}
            </Command>
        </div>
    )
}