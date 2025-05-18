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
}

export function RegistrationForm({ eventId, isPaid, price }: RegistrationFormProps) {
  const router = useRouter()
  const [isRegistering, setIsRegistering] = useState(false)
  const { axiosInstance, user } = useAuth()
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axiosInstance.get(`/api/registration/isAlreadyRegistered/${eventId}`)
        setIsAlreadyRegistered(response.data.isRegistered)
      } catch (error) {
        console.error("Error checking registration status:", error)
        toast.error("Failed to check registration status")
      }
    }
    fetchData()
  }, [])
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
      await axiosInstance.post("/api/registration/registerEvent", {
        event_id: eventId
      })
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
  const buttonText = isRegistering 
    ? "Processing..." 
    : isPaid 
      ? `Pay $${displayPrice}` 
      : "Register Now"

  return (
    <div className="space-y-4">
      <Button 
        className="w-full bg-black hover:bg-gray-800 transition-colors" 
        onClick={handleRegister}
        disabled={(isRegistering || !eventId ) || (isAlreadyRegistered)}
        type="button"
      >
        {buttonText}
      </Button>
    </div>
  )
}