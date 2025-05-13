"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Building2, ChevronDown, Download, Filter, Globe, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SuperAdminSidebar } from "@/components/super-admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        <SuperAdminSidebar />
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center gap-2">
              <h1 className="text-lg font-semibold">Super Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <span>Admin User</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>System Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight">Super Admin Dashboard</h1>
              <Button size="sm" className="ml-auto gap-1">
                <Plus className="h-4 w-4" />
                Add Branch
              </Button>
            </div>
            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="branches">Branches</TabsTrigger>
                <TabsTrigger value="events">All Events</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">+1 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">142</div>
                      <p className="text-xs text-muted-foreground">+12 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8,294</div>
                      <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$89,452</div>
                      <p className="text-xs text-muted-foreground">+12.3% from last month</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>System Performance</CardTitle>
                      <CardDescription>Event and registration trends across all branches</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Performance Chart</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Branch Performance</CardTitle>
                      <CardDescription>Top performing branches by event count</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "Tech Hub", events: 24, registrations: 1284 },
                          { name: "Arts & Culture", events: 18, registrations: 956 },
                          { name: "Music Society", events: 16, registrations: 1102 },
                          { name: "Sports Club", events: 15, registrations: 845 },
                          { name: "Business Network", events: 14, registrations: 732 },
                        ].map((branch, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{branch.name}</p>
                              <p className="text-sm text-muted-foreground">{branch.events} events</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{branch.registrations}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Link href="/super-admin/branches" className="w-full flex items-center justify-center">
                          View All Branches
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="branches" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>Export</span>
                    </Button>
                  </div>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Branch</span>
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Branch Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Admin</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Events</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Users</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Revenue</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {[
                          {
                            name: "Tech Hub",
                            admin: "John Smith",
                            events: 24,
                            users: 1284,
                            revenue: "$12,234",
                            status: "Active",
                          },
                          {
                            name: "Arts & Culture",
                            admin: "Emily Johnson",
                            events: 18,
                            users: 956,
                            revenue: "$8,456",
                            status: "Active",
                          },
                          {
                            name: "Music Society",
                            admin: "Michael Brown",
                            events: 16,
                            users: 1102,
                            revenue: "$10,789",
                            status: "Active",
                          },
                          {
                            name: "Sports Club",
                            admin: "Sarah Davis",
                            events: 15,
                            users: 845,
                            revenue: "$7,234",
                            status: "Active",
                          },
                          {
                            name: "Business Network",
                            admin: "David Wilson",
                            events: 14,
                            users: 732,
                            revenue: "$15,678",
                            status: "Active",
                          },
                          {
                            name: "Science Club",
                            admin: "Jennifer Lee",
                            events: 12,
                            users: 645,
                            revenue: "$5,432",
                            status: "Active",
                          },
                          {
                            name: "Photography Club",
                            admin: "Robert Taylor",
                            events: 10,
                            users: 512,
                            revenue: "$3,245",
                            status: "Inactive",
                          },
                          {
                            name: "Culinary Arts",
                            admin: "Lisa Anderson",
                            events: 8,
                            users: 423,
                            revenue: "$2,345",
                            status: "Active",
                          },
                        ].map((branch, i) => (
                          <tr
                            key={i}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle font-medium">{branch.name}</td>
                            <td className="p-4 align-middle">{branch.admin}</td>
                            <td className="p-4 align-middle">{branch.events}</td>
                            <td className="p-4 align-middle">{branch.users}</td>
                            <td className="p-4 align-middle">{branch.revenue}</td>
                            <td className="p-4 align-middle">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  branch.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                              >
                                {branch.status}
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    Actions
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Branch</DropdownMenuItem>
                                  <DropdownMenuItem>Manage Admins</DropdownMenuItem>
                                  <DropdownMenuItem>View Events</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Deactivate Branch</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="events" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Event Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Branch</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Registrations</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {[
                          {
                            name: "Web Development Workshop",
                            branch: "Tech Hub",
                            date: "Jun 15, 2025",
                            status: "Upcoming",
                            registrations: 45,
                            type: "Paid",
                          },
                          {
                            name: "Art Exhibition",
                            branch: "Arts & Culture",
                            date: "Jun 18, 2025",
                            status: "Upcoming",
                            registrations: 62,
                            type: "Free",
                          },
                          {
                            name: "Summer Concert",
                            branch: "Music Society",
                            date: "Jun 20, 2025",
                            status: "Upcoming",
                            registrations: 124,
                            type: "Paid",
                          },
                          {
                            name: "Tech Networking Night",
                            branch: "Tech Hub",
                            date: "Jun 22, 2025",
                            status: "Upcoming",
                            registrations: 32,
                            type: "Free",
                          },
                          {
                            name: "Basketball Tournament",
                            branch: "Sports Club",
                            date: "Jun 25, 2025",
                            status: "Upcoming",
                            registrations: 78,
                            type: "Free",
                          },
                          {
                            name: "Business Leadership Summit",
                            branch: "Business Network",
                            date: "Jun 28, 2025",
                            status: "Upcoming",
                            registrations: 56,
                            type: "Paid",
                          },
                          {
                            name: "AI Conference",
                            branch: "Tech Hub",
                            date: "Jul 05, 2025",
                            status: "Upcoming",
                            registrations: 78,
                            type: "Paid",
                          },
                          {
                            name: "Science Fair",
                            branch: "Science Club",
                            date: "Jul 10, 2025",
                            status: "Upcoming",
                            registrations: 45,
                            type: "Free",
                          },
                          {
                            name: "Hackathon 2025",
                            branch: "Tech Hub",
                            date: "Jul 15, 2025",
                            status: "Draft",
                            registrations: 24,
                            type: "Free",
                          },
                          {
                            name: "Photography Workshop",
                            branch: "Photography Club",
                            date: "Jul 20, 2025",
                            status: "Draft",
                            registrations: 0,
                            type: "Paid",
                          },
                        ].map((event, i) => (
                          <tr
                            key={i}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{event.name}</td>
                            <td className="p-4 align-middle">{event.branch}</td>
                            <td className="p-4 align-middle">{event.date}</td>
                            <td className="p-4 align-middle">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  event.status === "Upcoming"
                                    ? "bg-blue-100 text-blue-800"
                                    : event.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {event.status}
                              </span>
                            </td>
                            <td className="p-4 align-middle">{event.registrations}</td>
                            <td className="p-4 align-middle">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  event.type === "Paid" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {event.type}
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    Actions
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>View Registrations</DropdownMenuItem>
                                  <DropdownMenuItem>Contact Branch Admin</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Flag Event</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="users" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>Export</span>
                    </Button>
                  </div>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Admin</span>
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Branch</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Joined</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {[
                          {
                            name: "John Smith",
                            email: "john@example.com",
                            role: "Branch Admin",
                            branch: "Tech Hub",
                            joined: "Jan 15, 2023",
                            status: "Active",
                          },
                          {
                            name: "Emily Johnson",
                            email: "emily@example.com",
                            role: "Branch Admin",
                            branch: "Arts & Culture",
                            joined: "Feb 22, 2023",
                            status: "Active",
                          },
                          {
                            name: "Michael Brown",
                            email: "michael@example.com",
                            role: "Branch Admin",
                            branch: "Music Society",
                            joined: "Mar 10, 2023",
                            status: "Active",
                          },
                          {
                            name: "Sarah Davis",
                            email: "sarah@example.com",
                            role: "Branch Admin",
                            branch: "Sports Club",
                            joined: "Apr 05, 2023",
                            status: "Active",
                          },
                          {
                            name: "David Wilson",
                            email: "david@example.com",
                            role: "Branch Admin",
                            branch: "Business Network",
                            joined: "May 18, 2023",
                            status: "Active",
                          },
                          {
                            name: "Jennifer Lee",
                            email: "jennifer@example.com",
                            role: "Branch Admin",
                            branch: "Science Club",
                            joined: "Jun 30, 2023",
                            status: "Active",
                          },
                          {
                            name: "Robert Taylor",
                            email: "robert@example.com",
                            role: "Branch Admin",
                            branch: "Photography Club",
                            joined: "Jul 12, 2023",
                            status: "Inactive",
                          },
                          {
                            name: "Lisa Anderson",
                            email: "lisa@example.com",
                            role: "Branch Admin",
                            branch: "Culinary Arts",
                            joined: "Aug 25, 2023",
                            status: "Active",
                          },
                          {
                            name: "Admin User",
                            email: "admin@example.com",
                            role: "Super Admin",
                            branch: "All Branches",
                            joined: "Jan 01, 2023",
                            status: "Active",
                          },
                        ].map((user, i) => (
                          <tr
                            key={i}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle font-medium">{user.name}</td>
                            <td className="p-4 align-middle">{user.email}</td>
                            <td className="p-4 align-middle">{user.role}</td>
                            <td className="p-4 align-middle">{user.branch}</td>
                            <td className="p-4 align-middle">{user.joined}</td>
                            <td className="p-4 align-middle">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    Actions
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                  <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                  <DropdownMenuItem>Change Role</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Deactivate User</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
