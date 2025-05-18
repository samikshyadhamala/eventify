"use client";

import Link from "next/link";
import { BarChart3, Building2, Globe, LayoutDashboard, LogOut, Settings, Shield, Users } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation"; // Use next/navigation instead of next/router
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
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <Link href='/'>
          <h4 className="text-center my-2">
            <span className="font-semibold text-black">Eventify Admin</span>
          </h4>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                  <Link href="/admin">
                    <LayoutDashboard />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="m-0">
          <SidebarGroupLabel>Branch Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/branches"}>
                  <Link href="/admin/branches">
                    <Building2 />
                    <span>All Branches</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/branches/create"}>
                  <Link href="/admin/branches/create">
                    <Building2 />
                    <span>Create Branch</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Event Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/events"}>
                  <Link href="/admin/events">
                    <Globe />
                    <span>All Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>User Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/users"}>
                  <Link href="/admin/users">
                    <Users />
                    <span>All Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/users/branchAdmin"}>
                  <Link href="/admin/users/branchAdmin">
                    <Users />
                    <span>Branch Admins</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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