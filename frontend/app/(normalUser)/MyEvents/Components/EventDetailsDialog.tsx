import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Phone, Mail, User, QrCode } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Event } from './types/EventCardTypes';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Organizer } from "./types/EventCardTypes";
import { useMyEventsContext } from "../context";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// interface Event {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
//   location: string;
//   image: string;
//   status: "upcoming" | "ongoing" | "completed";
//   category: string;
//   description?: string;
//   organizer?: {
//     name: string;
//     email: string;
//     phone: string;
//   };
//   ticketId?: string;
// }

interface EventDetailsDialogProps {
  event: Event | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EventDetailsDialog = ({ event, isOpen, setIsOpen }: EventDetailsDialogProps) => {
  if (!event) return null;
  const { organizers } = useMyEventsContext();
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${event.registration_id}`;

  // Extract date and time
  const [date, time] = event.event_date.split("T");

  // download QR code image
  const downloadImage = () => {
    fetch(qrCodeUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qr-code.png'; // You can change the filename here
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Download failed:', error);
      });
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Event Details */}
          <div className="space-y-6">
            <div>
              <img
                src={
                  event.imageUrl
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${event.imageUrl}`
                    : "/placeholder.svg"
                }
                alt={event.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Information</h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                  <span>{date}</span>
                </div>
                {/* <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-blue-600" />
                  <span>{time}</span>
                </div> */}
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            {event.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                ></div>
              </div>
            )}
          </div>

          {/* Right Column - Event Pass & Contact */}
          <div className="space-y-6">
            {/* Event Pass */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <QrCode className="h-5 w-5 mr-2" />
                Event Pass
              </h3>

              <div className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img
                    src={qrCodeUrl}
                    alt="Event QR Code"
                    className="w-48 h-48 mx-auto"
                  />
                </div>

                <div className="text-sm text-gray-600">
                  {/* <p className="font-medium">Ticke  t ID: {event.ticketId}</p> */}
                  <p>Present this QR code at the event entrance</p>
                </div>

                <Button className="w-full" variant="outline" onClick={downloadImage}>
                  Download Pass
                </Button>
              </div>
            </div>

            <Separator />

            <Card className="">
              <CardHeader>
                <CardTitle>Contact Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                {organizers?.organizers?.length > 0 ? (
                  organizers?.organizers.map((organizer: Organizer) => (
                    <div key={organizer.email} className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={organizer.imageUrl} />
                        <AvatarFallback>{organizer.email[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center">
                        <div className="font-bold">{organizer.name}</div>
                        <div className="text-sm text-gray-600">{organizer.email}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No organizer information available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsDialog;
