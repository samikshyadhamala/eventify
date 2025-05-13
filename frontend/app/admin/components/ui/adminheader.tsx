
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarFooter } from "@/components/ui/sidebar";
import { Calendar, Clock, Home, Plus, User, Users, Settings, LogOut, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import EventDetailsDialog from "@/components/EventDetailsDialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Mock data
const events = [
  {
    id: "1",
    title: "Annual Tech Conference",
    date: "June 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Main Hall, Downtown",
    description: "Our flagship annual technology conference featuring industry leaders, workshops, and networking opportunities.",
    attendees: 120,
    maxAttendees: 200,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Introduction to AI",
    date: "June 25, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Tech Hub, East Campus",
    description: "A beginner-friendly workshop introducing the fundamentals of artificial intelligence and machine learning.",
    attendees: 65,
    maxAttendees: 80,
    status: "upcoming",
  },
  {
    id: "3",
    title: "JavaScript Workshop",
    date: "May 10, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Tech Hub, East Campus",
    description: "Hands-on workshop covering JavaScript fundamentals and modern development practices.",
    attendees: 42,
    maxAttendees: 50,
    status: "past",
  },
];

const attendeeData = [
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
];

const analyticsData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 19 },
  { name: "Mar", value: 25 },
  { name: "Apr", value: 32 },
  { name: "May", value: 45 },
  { name: "Jun", value: 52 },
];

const BranchDashboard = () => {
  const [activePage, setActivePage] = useState("overview");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  
  const handleOpenEventDialog = (event: any) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleCloseEventDialog = () => {
    setIsEventDialogOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-brand-purple" />
              <span className="text-xl font-bold">EventHub</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <div className="flex flex-col gap-1 mb-6">
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-brand-purple text-white">TB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Tech Branch</p>
                  <p className="text-sm text-gray-500">Admin</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-1">
              <button
                onClick={() => setActivePage("overview")}
                className={`flex items-center w-full gap-3 p-2 rounded-md ${
                  activePage === "overview"
                    ? "bg-brand-purple text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Home size={18} />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActivePage("events")}
                className={`flex items-center w-full gap-3 p-2 rounded-md ${
                  activePage === "events"
                    ? "bg-brand-purple text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Calendar size={18} />
                <span>Events</span>
              </button>
              <button
                onClick={() => setActivePage("attendees")}
                className={`flex items-center w-full gap-3 p-2 rounded-md ${
                  activePage === "attendees"
                    ? "bg-brand-purple text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Users size={18} />
                <span>Attendees</span>
              </button>
              <button
                onClick={() => setActivePage("settings")}
                className={`flex items-center w-full gap-3 p-2 rounded-md ${
                  activePage === "settings"
                    ? "bg-brand-purple text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </div>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-gray-200">
            <Link to="/login">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <LogOut size={18} />
                <span>Sign out</span>
              </Button>
            </Link>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
            <div>
              <h1 className="text-2xl font-bold">Tech Branch Dashboard</h1>
              <p className="text-gray-500">Manage your events and attendees</p>
            </div>
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <Link to="/create-event">
                <Button className="bg-brand-purple hover:bg-brand-purple/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activePage === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">8</div>
                      <p className="text-sm text-green-600 mt-2">+2 this month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Attendees</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">245</div>
                      <p className="text-sm text-green-600 mt-2">+42 this month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">3</div>
                      <p className="text-sm text-blue-600 mt-2">Next: June 15</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Attendance</CardTitle>
                    <CardDescription>Monthly attendance statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#5E35B1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Events</CardTitle>
                    <CardDescription>Your latest events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{event.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-sm text-gray-500 mr-4">
                              {event.attendees}/{event.maxAttendees} attendees
                            </div>
                            <Badge className={
                              event.status === "upcoming"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }>
                              {event.status === "upcoming" ? "Upcoming" : "Past"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activePage === "events" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Events</h2>
                  <Link to="/create-event">
                    <Button className="bg-brand-purple hover:bg-brand-purple/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                  </Link>
                </div>

                <Tabs defaultValue="upcoming">
                  <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upcoming" className="mt-4">
                    <Card>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {events
                            .filter((e) => e.status === "upcoming")
                            .map((event) => (
                              <div key={event.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                  <div className="bg-brand-purple/10 text-brand-purple rounded-md p-3">
                                    <Calendar size={24} />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{event.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      <span className="mr-3">{event.date}</span>
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{event.time}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="text-sm text-gray-500">
                                    {event.attendees}/{event.maxAttendees}
                                  </div>
                                  <Button variant="outline" size="sm" onClick={() => handleOpenEventDialog(event)}>
                                    <Info className="h-4 w-4 mr-2" />
                                    Details
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="past" className="mt-4">
                    <Card>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {events
                            .filter((e) => e.status === "past")
                            .map((event) => (
                              <div key={event.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                  <div className="bg-gray-100 text-gray-500 rounded-md p-3">
                                    <Calendar size={24} />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{event.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      <span className="mr-3">{event.date}</span>
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{event.time}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="text-sm text-gray-500">
                                    {event.attendees}/{event.maxAttendees}
                                  </div>
                                  <Button variant="outline" size="sm" onClick={() => handleOpenEventDialog(event)}>
                                    <Info className="h-4 w-4 mr-2" />
                                    Details
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="draft" className="mt-4">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-gray-500">No draft events found</p>
                        <Link to="/create-event">
                          <Button className="mt-4 bg-brand-purple hover:bg-brand-purple/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Event
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activePage === "attendees" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Attendees</h2>
                  <Button variant="outline">
                    Export List
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Registration Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendeeData.map((attendee, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-3 px-4">{attendee.name}</td>
                              <td className="py-3 px-4">{attendee.email}</td>
                              <td className="py-3 px-4">{attendee.registrationDate}</td>
                              <td className="py-3 px-4">
                                <Badge className={
                                  attendee.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }>
                                  {attendee.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Button variant="ghost" size="sm">View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activePage === "settings" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Branch Settings</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Branch Information</CardTitle>
                    <CardDescription>Update your branch details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Settings content here...</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
        
        {/* Event Details Dialog */}
        {selectedEvent && (
          <EventDetailsDialog 
            isOpen={isEventDialogOpen} 
            onClose={handleCloseEventDialog} 
            event={selectedEvent}
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default BranchDashboard;
