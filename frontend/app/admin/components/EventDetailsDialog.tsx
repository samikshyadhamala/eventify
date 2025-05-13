import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, Users, BarChart, PenLine } from "lucide-react";
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import EditEventDialog from "./EditEventDialog";

// Mock data for the charts
const weekdayData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 19 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 8 },
  { name: "Fri", value: 22 },
  { name: "Sat", value: 30 },
  { name: "Sun", value: 21 },
];

interface EventDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description?: string;
    attendees: number;
    maxAttendees: number;
    status: string;
  };
}

interface AttendeeType {
  name: string;
  email: string;
  registrationDate: string;
  status: string;
}

// Mock data for attendees
const mockAttendees: AttendeeType[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    registrationDate: "June 1, 2025",
    status: "confirmed",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    registrationDate: "June 2, 2025",
    status: "confirmed",
  },
  {
    name: "Robert Johnson",
    email: "robert@example.com",
    registrationDate: "June 3, 2025",
    status: "pending",
  },
  {
    name: "Emily White",
    email: "emily@example.com",
    registrationDate: "June 3, 2025",
    status: "confirmed",
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    registrationDate: "June 4, 2025",
    status: "confirmed",
  },
];

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({ 
  isOpen, 
  onClose, 
  event 
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  const handleEditClick = () => {
    setShowEditDialog(true);
  };
  
  const handleEditClose = () => {
    setShowEditDialog(false);
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{event.title}</DialogTitle>
            <DialogDescription>
              <Badge className={
                event.status === "upcoming"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }>
                {event.status === "upcoming" ? "Upcoming" : "Past"}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
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
              <TabsTrigger value="analytics">
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>Analytics</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            {/* Event Details Tab */}
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-2 text-brand-purple" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-2 text-brand-purple" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Location</h4>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-2 text-brand-purple" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Capacity</h4>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-brand-purple" />
                      <span>{event.attendees} / {event.maxAttendees} attendees</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-brand-purple h-2.5 rounded-full" 
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {event.description && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p className="mt-1">{event.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
                <Button className="bg-brand-purple hover:bg-brand-purple/90" size="sm" onClick={handleEditClick}>
                  <PenLine className="h-4 w-4 mr-2" />
                  Edit Event
                </Button>
              </div>
            </TabsContent>
            
            {/* Attendees Tab */}
            <TabsContent value="attendees">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex justify-between items-center">
                    <span>Attendees ({mockAttendees.length})</span>
                    <Button variant="outline" size="sm">Export List</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAttendees.map((attendee, index) => (
                        <TableRow key={index}>
                          <TableCell>{attendee.name}</TableCell>
                          <TableCell>{attendee.email}</TableCell>
                          <TableCell>{attendee.registrationDate}</TableCell>
                          <TableCell>
                            <Badge className={
                              attendee.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }>
                              {attendee.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Registration Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={weekdayData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#5E35B1" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">75%</div>
                    <p className="text-sm text-green-600 mt-2">+5% from average</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Page Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">342</div>
                    <p className="text-sm text-green-600 mt-2">+42 this week</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {showEditDialog && (
        <EditEventDialog 
          isOpen={showEditDialog}
          onClose={handleEditClose}
          event={event}
        />
      )}
    </>
  );
};

export default EventDetailsDialog;
