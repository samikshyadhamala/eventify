"use client";

import Link from "next/link";
import { Building2, Globe, LogOut, Clock, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/auth/hooks";
import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  email: string;
  role: string;
  imageUrl?: string;
}

export default function SuperAdminSidebar() {
  const [user, setUser] = useState<User | null>(null)
  const { axiosInstance, logout } = useAuth()
  const router = useRouter();
  const pathname = usePathname()

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
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <Link href='/' className="text-black">
          <h4 className="text-center my-2 font-logo">
            <span className="text-black text-3xl">Eventify Admin</span>
          </h4>
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-12">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/branches"}>
              <Link href="/admin/" className="text-black">
                <Building2 />
                <span>All Branches</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>


          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/events"}>
              <Link href="/admin/events" className="text-black">
                <Globe />
                <span>All Events</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/create-event"}>
              <Link href="/admin/create-event" className="text-black">
                <Clock />
                <span>Create Event</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>


          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/users"}>
              <Link href="/admin/users" className="text-black">
                <Users />
                <span>All Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/branchAdmin"}>
              <Link href="/admin/branchAdmin" className="text-black">
                <Users />
                <span>Branch Admins</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="pl-2">
          <SidebarMenuItem>
            <div className="">
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
    </Sidebar>
  );
}