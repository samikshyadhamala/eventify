
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  branch: string;
  price: number;
  attendees: number;
  maxAttendees?: number;
  image: string;
  featured?: boolean;
}

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  branch,
  price,
  attendees,
  maxAttendees,
  image,
  featured = false,
}: EventCardProps) => {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${featured ? 'border-brand-purple border-2' : ''}`}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-brand-purple">
            Featured
          </Badge>
        )}
        {price === 0 ? (
          <Badge className="absolute top-2 left-2 bg-brand-green">
            Free
          </Badge>
        ) : (
          <Badge className="absolute top-2 left-2 bg-brand-blue">
            ${price}
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
        <Badge variant="outline" className="w-fit">
          {branch}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 pb-2">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="truncate">{location}</span>
        </div>
        {maxAttendees && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{attendees} attending</span>
            </div>
            <span className="text-xs">
              {maxAttendees - attendees} spots left
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link to={`/events/${id}`} className="w-full">
          <Button variant="default" className="w-full bg-brand-purple hover:bg-brand-purple/90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
