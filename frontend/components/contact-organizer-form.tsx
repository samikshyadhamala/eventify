"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { contactPlatform } from "@/app/actions/contactAction"

interface ContactOrganizerFormProps {
  eventId: string
  organizerName: string
}

export function ContactOrganizerForm({ eventId, organizerName }: ContactOrganizerFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      // Call the server action to send the email
      await contactPlatform(formData)
      setIsSuccess(true)

      // Reset form after success
      const form = document.getElementById("contact-form") as HTMLFormElement
      if (form) form.reset()

      // Optionally redirect after a delay
      // setTimeout(() => {
      //   router.push(`/events/${eventId}`);
      // }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message {organizerName}</CardTitle>
        <CardDescription>Fill out the form below to send a message directly to the event organizer.</CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Message Sent!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your message has been sent to the organizer. They will get back to you soon.
            </AlertDescription>
          </Alert>
        ) : error ? (
          <Alert className="bg-red-50 border-red-200 mb-4">
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        ) : null}

        <form id="contact-form" action={handleSubmit} className="space-y-4">
          <input type="hidden" name="eventId" value={eventId} />
          <input type="hidden" name="organizerName" value={organizerName} />

          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="Question about the event" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="I'm interested in your event and have a few questions..."
              className="min-h-[150px]"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="contact-form" disabled={isSubmitting || isSuccess} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
