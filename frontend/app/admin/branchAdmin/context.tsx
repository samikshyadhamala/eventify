'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/auth/hooks'
import { BranchAdmin, Branch, User, BranchAdminContextType } from './types'

const BranchAdminContext = createContext<BranchAdminContextType | undefined>(undefined)

export function useBranchAdmin(): BranchAdminContextType {
  const context = useContext(BranchAdminContext)
  if (context === undefined) {
    throw new Error('useBranchAdmin must be used within a BranchAdminProvider')
  }
  return context
}

export function BranchAdminProvider({ children }: { children: ReactNode }) {
  const { axiosInstance } = useAuth()
  const [branchAdmins, setBranchAdmins] = useState<BranchAdmin[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // Added for deletion
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [isChangeBranchOpen, setIsChangeBranchOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [filteredData, setFilteredData] = useState<BranchAdmin[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fetchBranchAdmins = async () => {
      try {
        const response = await axiosInstance.get('/api/user/getBranchAdmin')
        setBranchAdmins(response.data)
        setFilteredData(response.data) // Initialize filteredData with branchAdmins
      } catch (error) {
        console.error('Error fetching branch admins:', error)
        toast.error('Failed to fetch branch admins')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBranchAdmins()
  }, [axiosInstance])

  useEffect(() => {
    const fetchBranchesAndUsers = async () => {
      try {
        const [branchesResponse, usersResponse] = await Promise.all([
          axiosInstance.get('/api/branch/getUniqueBranches'),
          axiosInstance.get('/api/user/getAllUsers'),
        ])
        setBranches(branchesResponse.data.branches)
        setUsers(usersResponse.data)
      } catch (error) {
        console.error('Error fetching branches or users:', error)
        toast.error('Failed to fetch branches or users')
      }
    }
    fetchBranchesAndUsers()
  }, [axiosInstance])

  useEffect(() => {
    // Filter branchAdmins based on searchTerm
    const filtered = branchAdmins.filter((admin) =>
      Object.values(admin).some((value) =>
        value
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }, [searchTerm, branchAdmins])

  const handleCreateClubAdmin = async () => {
    if (!selectedBranch || !selectedUser) {
      toast.error('Please select both a branch and a user')
      return
    }

    setIsCreating(true)
    try {
      await axiosInstance.post('/api/user/createBranchAdmin', {
        branch_id: selectedBranch.branch_id,
        user_id: selectedUser.fid,
      })
      setShowCreateDialog(false)
      setSelectedBranch(null)
      setSelectedUser(null)
      const response = await axiosInstance.get('/api/user/getBranchAdmin')
      setBranchAdmins(response.data)
      setFilteredData(response.data) // Update filteredData after creating admin
      toast.success('Club admin created successfully')
    } catch (error) {
      console.error('Error creating club admin:', error)
      toast.error('Failed to create club admin')
    } finally {
      setIsCreating(false)
    }
  }

  const handleBranchAdminDelete = async (id: string) => {
    if (!id) {
      toast.error('Please select a user to delete')
      return
    }
    setIsDeleting(true)
    try {
      await axiosInstance.delete(`/api/user/deleteBranchAdmin/${id}`)
      const response = await axiosInstance.get('/api/user/getBranchAdmin')
      setBranchAdmins(response.data)
      setFilteredData(response.data) // Update filteredData after deletion
      setSelectedUserId(null) // Clear selected user
      toast.success('Branch admin deleted successfully')
    } catch (error) {
      console.error('Error deleting branch admin:', error)
      toast.error('Failed to delete branch admin')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <BranchAdminContext.Provider
      value={{
        branchAdmins,
        setBranchAdmins,
        branches,
        users,
        isLoading,
        isCreating,
        isDeleting, // Added to context
        selectedBranch,
        setSelectedBranch,
        selectedUser,
        setSelectedUser,
        showCreateDialog,
        setShowCreateDialog,
        isChangeBranchOpen,
        setIsChangeBranchOpen,
        selectedUserId,
        setSelectedUserId,
        filteredData,
        setFilteredData,
        searchTerm,
        setSearchTerm,
        handleCreateClubAdmin,
        handleBranchAdminDelete, // Added to context
      }}
    >
      {children}
    </BranchAdminContext.Provider>
  )
}

export default BranchAdminContext