'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, User, Users } from 'lucide-react'

interface Event {
  branch_id: number
  created_at: string
  description: string
  event_date: string
  event_id: number
  imageUrl: string
  is_paid: boolean
  location: string
  max_capacity: number
  price: string
  title: string
}

interface EventDetailsDialogProps {
  selectedEvent: Event | null
  setSelectedEvent: (event: Event | null) => void
  registrations: any[]
  loadingRegistrations: boolean
}

const getEventStatus = (eventDate: string) => {
  const now = new Date()
  const date = new Date(eventDate)
  const endDate = new Date(date)
  endDate.setHours(endDate.getHours() + 24)

  if (date > now) {
    return 'Upcoming'
  } else if (now >= date && now <= endDate) {
    return 'Ongoing'
  } else {
    return 'Past'
  }
}

export default function EventDetailsDialog({
  selectedEvent,
  setSelectedEvent,
  registrations,
  loadingRegistrations,
}: EventDetailsDialogProps) {
  return (
    <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        {selectedEvent && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{selectedEvent.title}</DialogTitle>
              <div className="text-sm text-muted-foreground">
                <Badge
                  className={getEventStatus(selectedEvent.event_date) === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
                >
                  {getEventStatus(selectedEvent.event_date)}
                </Badge>
              </div>
            </DialogHeader>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="details">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Details</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="attendees">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Attendees</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-2 text-brand-purple" />
                          <span>{new Date(selectedEvent.event_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-2 text-brand-purple" />
                          <span>{selectedEvent.location}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Capacity</h4>
                      <div className="flex items-center mt-1">
                        <User className="h-4 w-4 mr-2 text-brand-purple" />
                        <span>
                          {registrations.length} / {selectedEvent.max_capacity} attendees
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="attendees">
                <Card>
                  <CardContent className="pt-6">
                    {loadingRegistrations ? (
                      <div className="text-center">Loading attendees...</div>
                    ) : registrations.length === 0 ? (
                      <p className="text-center text-gray-500">No attendees registered yet</p>
                    ) : (
                      <div className="space-y-4">
                        {registrations.map((registration) => (
                          <div key={registration.registration_id} className="flex items-center gap-4 p-3 rounded-lg border">
                            <Avatar>
                              <AvatarImage src={registration.user.imageUrl} />
                              <AvatarFallback>{registration.user.email.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex flex-col gap-1">
                              <div className="text-sm font-medium p-0">{registration.user.email}</div>
                              <div className="text-xs text-gray-500">
                                Registered on {new Date(registration.registered_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}