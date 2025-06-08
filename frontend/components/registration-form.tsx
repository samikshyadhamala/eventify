'use client'
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/auth/hooks'
import { toast } from "react-toastify"

interface RegistrationFormProps {
  eventId: string
  isPaid: boolean
  price: number
  isAlreadyRegistered: boolean
  setIsAlreadyRegistered: (value: boolean) => void
  isRegistering: boolean
  setIsRegistering: (value: boolean) => void
}

export function RegistrationForm({ eventId, isPaid, price, isAlreadyRegistered, setIsAlreadyRegistered, isRegistering, setIsRegistering }: RegistrationFormProps) {
  const router = useRouter()
  const { axiosInstance, user } = useAuth()

  // Validate eventId to prevent invalid registrations
  if (!eventId) {
    return (
      <div className="text-red-500 text-sm">
        Error: Invalid event ID
      </div>
    )
  }

  const handleRegister = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    if (isRegistering) {
      return
    }

    setIsRegistering(true)
    try {
      const response = await axiosInstance.post<
        { message: string } | { redirect_url: string }
      >("/api/registration/registerEvent", { event_id: eventId });
      
      if ("redirect_url" in response.data){
        return router.push(response.data.redirect_url)
      }
      toast.success("Successfully registered!")
      setIsAlreadyRegistered(true)
      router.refresh()
    }
    catch (error) {
      console.error("Registration error:", error)
      toast.error(error instanceof Error ? error.message : "Error registering for event")
    }
    finally {
      setIsRegistering(false)
    }
  }

  // Ensure price is a valid number, default to 0 if undefined
  const displayPrice = (price && !isNaN(price)) ? price.toFixed(2) : "0.00"
const buttonText =
  isRegistering
    ? "Processing..."
    : isAlreadyRegistered
      ? "You are Already Registered"
      : isPaid
        ? `Pay Now`
        : "Register Now";


  return (
    <div className="space-y-4">
      <Button
        className="w-full bg-black hover:bg-gray-800 transition-colors"
        onClick={handleRegister}
        disabled={(isRegistering || !eventId) || (isAlreadyRegistered)}
        type="button"
      >
        {buttonText}
      </Button>
    </div>
  )
}