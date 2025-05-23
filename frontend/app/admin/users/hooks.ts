import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/auth/hooks'
import { useUserManagement } from './context'
import { User, Branch, CurrentUser } from './types'

export function useUserManagementData() {
  const { axiosInstance } = useAuth()
  const {
    setUsers,
    setBranches,
    setCurrentUser,
    setIsLoading,
  } = useUserManagement()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get<CurrentUser>("/api/auth/getUserInfo")
        setCurrentUser(response.data)
      } catch (error) {
        console.error("Error fetching current user:", error)
        toast.error("Failed to fetch current user")
      }
    }
    fetchCurrentUser()
  }, [axiosInstance, setCurrentUser])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<User[]>("/api/user/getAllUsers")
        setUsers(response.data)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast.error("Failed to fetch users")
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [axiosInstance, setUsers, setIsLoading])

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axiosInstance.get<{ branches: Branch[] }>("/api/branch/getUniqueBranches")
        setBranches(response.data.branches)
      } catch (error) {
        console.error("Error fetching branches:", error)
        toast.error("Failed to fetch branches")
      }
    }
    fetchBranches()
  }, [axiosInstance, setBranches])
}