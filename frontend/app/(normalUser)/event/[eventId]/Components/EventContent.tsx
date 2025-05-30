"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegistrationForm } from "@/components/registration-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Share2,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SidebarSkeleton, EventSkeleton } from './Skeleton';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth/hooks";

interface Event {
  id?: string;
  title?: string;
  isPaid?: boolean;
  date?: string;
  location?: string;
  imageUrl?: string;
  description?: string;
  price?: number;
  maxCapacity?: number | string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Organizer {
  email: string;
  imageUrl: string;
  name: string;
}

interface OrganizersType {
  organizers: Organizer[];
}

async function getEvent(id: string): Promise<Event> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/getEvent/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch event");
    }
    throw new Error("Failed to fetch event");
  }
}

export default function EventContent({ eventId }: { eventId: string }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 27.7172,
    lng: 85.324,
  });
  const [loadingMap, setLoadingMap] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [organizers, setOrganizers] = useState<OrganizersType>({ organizers: [] });
  const { axiosInstance } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvent(eventId);
        setEvent(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch event details");
      }
    };
    fetchData();
  }, [eventId]);

  useEffect(() => {
    if (event?.location) {
      fetchCoordinates(event.location);
    }
  }, [event?.location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<OrganizersType>('/api/event/getOrganizerContact', {params: {event_id: eventId}});
        setOrganizers(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Error retrieving organizer contact");
      }
    };
    fetchData();
  }, [axiosInstance]);

  const fetchCoordinates = async (address: string) => {
    setLoadingMap(true);
    setMapError(null);
    try {
      const response = await axios.get("/api/geteventLocation", {
        params: { address },
      });
      if (response.data.lat && response.data.lng) {
        setCoordinates({ lat: response.data.lat, lng: response.data.lng });
      } else {
        const errorMessage =
          response.data.error || "Could not load map for this location";
        toast.error(errorMessage);
        setMapError(errorMessage);
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error || "Could not load map"
        : "Could not load map for this location";
      setMapError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingMap(false);
    }
  };

  const getDirectionsUrl = () => {
    if (!coordinates) return "#";
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  };

  const getMapUrl = () => {
    if (!coordinates) return "";
    return `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`;
  };

  return (
    <>
      {!event ? (
        <>
          <EventSkeleton />
          <SidebarSkeleton />
        </>
      ) : (
        <>
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{event.title || "Untitled Event"}</h1>
              <div className="flex flex-wrap gap-2">
                {event.isPaid ? (
                  <Badge variant="default" className="bg-black">Paid</Badge>
                ) : (
                  <Badge variant="outline">Free</Badge>
                )}
              </div>
              <div className="mt-4 flex flex-col gap-2 text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>
                    {event.date
                      ? new Date(event.date).toLocaleDateString()
                      : "Date not specified"}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location || "Location not specified"}</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={
                  event.imageUrl
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${event.imageUrl}`
                    : "/placeholder.svg"
                }
                alt={event.title || "Event image"}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-4 space-y-4">
                <Card>
                  <CardContent className="py-3 px-8">
                    {event.description ? (
                      <div
                        className="prose max-w-none py-4"
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                    ) : (
                      <p>No description available</p>
                    )}
                  </CardContent>
                </Card>
                <div className="flex flex-wrap gap-4 mt-6">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Event URL copied to clipboard!");
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    Share Event
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="location" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-muted-foreground">
                          {event.location || "Location not specified"}
                        </p>
                        {mapError && (
                          <p className="text-sm text-red-600">{mapError}</p>
                        )}
                      </div>
                      <div className="rounded-2xl overflow-hidden shadow-lg">
                        <div className="h-96 w-full bg-gray-200">
                          {loadingMap ? (
                            <div className="h-full w-full flex items-center justify-center">
                              <p>Loading map...</p>
                            </div>
                          ) : coordinates ? (
                            <iframe
                              src={getMapUrl()}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              loading="lazy"
                              allowFullScreen
                              title="Event Location"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <p>Map not available</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="gap-2"
                        asChild
                        disabled={!coordinates}
                      >
                        <a
                          href={getDirectionsUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Get Directions
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Registration</CardTitle>
                <CardDescription>Secure your spot for this event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.isPaid ? (
                  <div className="flex items-center text-2xl font-bold">
                    <span>NPR {(event.price || 0).toFixed(2)}</span>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-lg py-1 px-2">
                    Free
                  </Badge>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Capacity: {event.maxCapacity || "N/A"} spots</span>
                </div>
                <RegistrationForm
                  eventId={event.id || ""}
                  isPaid={event.isPaid || false}
                  price={event.price || 0}
                />
              </CardContent>
            </Card>
            <Card className="sticky top-[23rem]">
              <CardHeader>
                <CardTitle>Contact Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                {organizers.organizers.length > 0 ? (
                  organizers.organizers.map((organizer: Organizer) => (
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
        </>
      )}
    </>
  );
}