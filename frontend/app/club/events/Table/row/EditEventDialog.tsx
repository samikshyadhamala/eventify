"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, ImageIcon, Loader2 } from "lucide-react"
import { toast } from 'react-toastify'
import { useEvents } from "../../context"
import { useAuth } from "@/context/auth/hooks"

export default function EditEventDialog() {
  // const { toast } = useToast()
  const {editEvent, setEditEvent, setEvents, events, fetchEventsAndRegistrations} = useEvents()
  const { axiosInstance } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    is_paid: false,
    price: "",
    max_capacity: "",
    imageUrl: "",
    branch_id: 0,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Update form data when editEvent changes
  useEffect(() => {
    if (editEvent) {
      setFormData({
        title: editEvent.title || "",
        description: editEvent.description || "",
        event_date: editEvent.event_date ? new Date(editEvent.event_date).toISOString().split("T")[0] : "",
        location: editEvent.location || "",
        is_paid: editEvent.is_paid || false,
        price: editEvent.price?.toString() || "",
        max_capacity: editEvent.max_capacity?.toString() || "",
        imageUrl: editEvent.imageUrl || "",
        branch_id: editEvent.branch_id,
      })
      setImageFile(null)
    }
  }, [editEvent])

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_paid: checked }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        event_date: date.toISOString().split("T")[0],
      }))
    }
  }

  const handleImageChange = (file: File) => {
    debugger
    // Validate file type
    const validExtensions = ['jpg', 'jpeg', 'png'];
    const fileExt = file.name.split('.').pop()?.toLowerCase();

    if (!fileExt || !validExtensions.includes(fileExt)) {
      toast.error(
        "Invalid file type"
      )
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "File too large"
      )
      return
    }

    // Create preview URL
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl)
    }

    const newPreviewUrl = URL.createObjectURL(file)
    setPreviewUrl(newPreviewUrl)
    setImageFile(file)
  }

  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true)
    try {
      // Create a FormData object for the image upload
      const formData = new FormData()
      formData.append("image", file)

      // Upload the image to your image upload endpoint

      const filename = file.name
      const response = await axiosInstance.post(`/api/image/${filename}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      debugger
      // Return the URL of the uploaded image
      return response.data.filename
    } catch (error) {
      console.error("Error uploading image:", error)
      throw new Error("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editEvent) return

    try {
      setIsSubmitting(true)

      // Validate required fields
      if (!formData.title) {
        toast.error(
          "Title is required"
        )
        return
      }

      if (!formData.event_date) {
        toast.error(
          "Missing information"

        )
        return
      }

      // Validate event date is in the future
      const eventDate = new Date(formData.event_date)
      if (eventDate <= new Date()) {
        toast.error(
          "Invalid date"
        )
        return
      }

      // Prepare data for API
      const updatedData = {
        branch_id: formData.branch_id,
        title: formData.title,
        description: formData.description || null,
        event_date: formData.event_date,
        location: formData.location || null,
        is_paid: formData.is_paid,
        price: formData.is_paid && formData.price ? Number.parseFloat(formData.price) : null,
        max_capacity: formData.max_capacity ? Number.parseInt(formData.max_capacity) : null,
        imageUrl: formData.imageUrl,
      }

      // If there's a new image file, upload it first
      if (imageFile) {
        try {
          const imageUrl = await uploadImage(imageFile)
          updatedData.imageUrl = imageUrl
        } catch (error) {
          toast.error(
            "Could not upload the image. Please try again."
          )
          return
        }
      }

      // Update the event
      const response = await axiosInstance.put(`/api/event/updateEvent/${editEvent.event_id}`, updatedData)

      if (response.status === 200) {
        setEvents(events.map((event) => (event.event_id === editEvent.event_id ? { ...event, ...response.data.event } : event)))
        // toast.success("Event updated successfully")
        setEditEvent(null)
      } else {
        toast.error("Failed to update event")
      }
    } catch (error: any) {
      console.error("Error updating event:", error)

      toast.error("Failed to update event",
      )
    } finally {
      setIsSubmitting(false)
      setEditEvent(null)
      fetchEventsAndRegistrations() // Refresh events after edit
    }
  }

  return (
    <Dialog open={!!editEvent} onOpenChange={(open) => !open && setEditEvent(null)}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Edit Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Main details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  Event Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="event_date" className="text-sm font-medium">
                  Event Date <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.event_date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.event_date ? format(new Date(formData.event_date), "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.event_date ? new Date(formData.event_date) : undefined}
                        onSelect={handleDateChange}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            {/* Right column - Additional details and image */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="is_paid" checked={formData.is_paid} onCheckedChange={handleCheckboxChange} />
                <Label htmlFor="is_paid" className="text-sm font-medium">
                  Is Paid Event
                </Label>
              </div>

              {formData.is_paid && (
                <div>
                  <Label htmlFor="price" className="text-sm font-medium">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="max_capacity" className="text-sm font-medium">
                  Max Capacity
                </Label>
                <Input
                  id="max_capacity"
                  name="max_capacity"
                  type="number"
                  value={formData.max_capacity}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="event-image" className="text-sm font-medium">
                  Event Image
                </Label>
                <div
                  className={cn(
                    "mt-1 border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer",
                    "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:cursor-pointer",
                    isUploading && "opacity-50 pointer-events-none",
                  )}
                  onClick={() => !isUploading && document.getElementById("image-upload")?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (!isUploading) {
                      e.currentTarget.classList.add("border-primary")
                    }
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    e.currentTarget.classList.remove("border-primary")
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    e.currentTarget.classList.remove("border-primary")

                    if (isUploading) return

                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleImageChange(e.dataTransfer.files[0])
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload image"
                  id="event-image"
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageChange(e.target.files[0])
                      }
                    }}
                    disabled={isUploading}
                  />

                  <div className="flex flex-col items-center justify-center gap-2">
                    {isUploading ? (
                      <div className="flex flex-col items-center justify-center py-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                        <p className="text-sm text-muted-foreground">Uploading image...</p>
                      </div>
                    ) : previewUrl ? (
                      <div className="relative w-full aspect-video">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Event preview"
                          className="w-full h-44 object-cover rounded-md"
                          onError={(e) => {
                            ; (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=400"
                              ; (e.target as HTMLImageElement).alt = "Image failed to load"
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video flex flex-col items-center justify-center bg-muted rounded-md">
                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${editEvent?.imageUrl}` || "/placeholder.svg"} alt="placeholder" className="h-40 w-full object-cover text-muted-foreground opacity-50 mb-2" />
                        <p className="text-sm text-muted-foreground">Drag and drop an image here or click to browse</p>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground mt-2 text-center">
                      {previewUrl ? "Drop a new image to replace" : "Supported formats: JPG, PNG, GIF (max 5MB)"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => {setEditEvent(null); setPreviewUrl(null)}}
              disabled={isSubmitting || isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-black" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
