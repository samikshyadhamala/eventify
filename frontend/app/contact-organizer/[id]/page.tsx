import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ContactOrganizerForm } from "@/components/contact-organizer-form"

export default function ContactOrganizerPage({ params }: { params: { eventId: string } }) {
  // In a real application, you would fetch the event and organizer data based on the eventId
  // For this example, we'll use mock data
  const event = {
    id: params.eventId,
    title: "Web Development Workshop: Building Modern Applications",
    organizer: {
      name: "John Smith",
      email: "john@example.com", // This would be hidden from the client in a real app
      role: "Senior Developer",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-10">
        <div className="mb-6">
          <Link
            href={`/events/${params.eventId}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Event
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Contact Organizer</h1>
            <p className="text-muted-foreground mt-2">Send a message to the organizer of "{event.title}"</p>
          </div>

          <ContactOrganizerForm eventId={params.eventId} organizerName={event.organizer.name} />
        </div>
      </div>
    </div>
  )
}
