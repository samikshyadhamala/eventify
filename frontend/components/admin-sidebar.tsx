"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  Clock,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth/hooks"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"

interface User {
  email: string;
  role: string;
  imageUrl?: string;
}

export function AdminSidebar() {
  const [user, setUser] = useState<User | null>(null)
  const { axiosInstance, logout } = useAuth()
  const router = useRouter();
  const pathname = usePathname()

  // fetching user info 
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/getUserInfo')
        setUser(response.data)
      }
      catch (error) {
        console.log("error fetching user info: ", error)
      }
    }

    fetch()
  }, [])

  return (
    <Sidebar className="">
      <SidebarHeader className="h-16 border-b border-sidebar-border flex justify-center items-center">
        <Link href='/'>
          <span className="text-3xl font-bold">Eventify</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="mt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/club/dashboard"}>
                <Link href="/club">
                  <LayoutDashboard />
                  <span>Overview</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/club/events"}>
                <Link href="/club/events">
                  <Calendar />
                  <span>All Events</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/club/create-event"}>
                <Link href="/club/create-event">
                  <Clock />
                  <span>Create Event</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent >
      <SidebarFooter>
        <div className="px-3 py-2">
          {user && (
            <div className="flex items-center gap-3 rounded-md border p-2">
              <Avatar>
                <AvatarImage src={user.imageUrl} alt="@userAvatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[120px]" title={user.email}>{user.email}</span>
                <span className="text-xs text-muted-foreground">{user.role}</span>
              </div>
            </div>
          )}
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/club/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar >
  )
}
