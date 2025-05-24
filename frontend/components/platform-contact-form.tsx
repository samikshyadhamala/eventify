"use client"

import React, { useState } from "react"
import Axios from "axios"
import { Loader2 } from "lucide-react"

import { Button } from "@radix-ui/themes"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {useAuth} from "@/context/auth/hooks"
export function PlatformContactForm() {
  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null)

  // State for form fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const {axiosInstance} = useAuth()
  // Handle form submission with Axios
  async function handleSubmit(e:  React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Create an object with form data from state
      const formData = {
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
      }

      // Send POST request to backend (placeholder URL)
      await axiosInstance.post("/api/contact/sendMessage", formData)

      // On success, update state and reset form
      setIsSuccess(true)
      setFirstName("")
      setLastName("")
      setEmail("")
      setPhone("")
      setSubject("")
      setMessage("")
    } catch (err) {
      console.log(err)
      // setError(err instanceof Error ? err.message : "Failed to send message. Please try again.")
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

      <form id="platform-contact-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger id="subject" className="border-1">
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
          <Textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
            className="min-h-[150px]"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full"
          color="gray"
          variant="solid"
          highContrast
        >
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