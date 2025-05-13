"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { contactPlatform } from "@/app/actions/contact-actions"

export function PlatformContactForm() {
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
      const form = document.getElementById("platform-contact-form") as HTMLFormElement
      if (form) form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {isSuccess ? (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Message Sent!</AlertTitle>
          <AlertDescription className="text-green-700">
            Thank you for contacting us. We'll get back to you as soon as possible.
          </AlertDescription>
        </Alert>
      ) : error ? (
        <Alert className="bg-red-50 border-red-200">
          <AlertTitle className="text-red-800">Error</AlertTitle>
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      ) : null}

      <form id="platform-contact-form" action={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" name="firstName" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" name="lastName" placeholder="Doe" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 (123) 456-7890" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select name="subject">
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="support">Technical Support</SelectItem>
              <SelectItem value="billing">Billing Question</SelectItem>
              <SelectItem value="partnership">Partnership Opportunity</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="How can we help you?" className="min-h-[150px]" required />
        </div>

        <Button type="submit" disabled={isSubmitting || isSuccess} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  )
}
