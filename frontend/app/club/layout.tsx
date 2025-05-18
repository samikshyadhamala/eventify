'use client'
import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useEffect, useState } from 'react'
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

  if (currentUser && currentUser.role !== 'club') {
    return redirect('/forbidden')
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[16.5rem_1fr]">
        <AdminSidebar />
        <main className="flex flex-col">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
