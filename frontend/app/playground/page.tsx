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

export default function CommandDemo() {
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
        <div className="w-full min-h-screen flex justify-center items-center">
            <div>
                <Command className="rounded-lg border shadow-md md:min-w-[450px] relative overflow-visible">
                    <CommandInput
                        placeholder="Type a command or search..."
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                    />
                    {open && (
                        <CommandList className="absolute bottom-0 left-0 right-0 transform translate-y-full">
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                <ScrollArea className="h-60">
                                    {eventNames.events.map((event) => (
                                        <CommandItem
                                            key={event.event_id}
                                            onMouseDown={() => { router.push(`/event/${event.event_id}`) }}
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
        </div>
    )
}
