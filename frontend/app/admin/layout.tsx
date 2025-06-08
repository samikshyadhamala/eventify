'use client'
import type React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Sidebar from "./components/Sidebar"
import {useEffect, useState} from 'react'
import { useAuth } from "@/context/auth/hooks"
import { redirect } from 'next/navigation'

type CurrentUser = {
  email: string
  imageUrl: string | null
  role: string
  fid: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { axiosInstance } = useAuth()
  const [currentUser, setCurrentUsers] = useState<CurrentUser | null>(null)
  // fetching current user
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/getUserInfo")
        setCurrentUsers(response.data)
      } catch (error) {
        return redirect('/forbidden')
      }
    }
    getCurrentUser()
  }, [])

  if (currentUser && currentUser.role !== 'admin') {
    return redirect('/forbidden')
  }
  return (
    <SidebarProvider>
        <Sidebar />
      <main className="min-h-screen w-full flex flex-col">
          <SidebarTrigger />
          {children}
      </main>
    </SidebarProvider>
  )
}
