"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ContactOrganizerForm } from "@/components/contact-organizer-form"

interface ContactOrganizerButtonProps {
  eventId: string
  organizerName: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  fullWidth?: boolean
}

export function ContactOrganizerButton({
  eventId,
  organizerName,
  variant = "outline",
  fullWidth = false,
}: ContactOrganizerButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const handleContactPage = () => {
    router.push(`/contact-organizer/${eventId}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={variant} className={`gap-2 ${fullWidth ? "w-full" : ""}`}>
          <MessageCircle className="h-4 w-4" />
          Contact Organizer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Organizer</DialogTitle>
          <DialogDescription>Send a message directly to the event organizer.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <ContactOrganizerForm eventId={eventId} organizerName={organizerName} />
        </div>

        <div className="mt-2 text-center text-sm text-muted-foreground">
          <button onClick={handleContactPage} className="text-primary hover:underline">
            Open in full page
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
