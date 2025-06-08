"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/auth/hooks'
import { UserManagementContextType, User } from './types'

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined)

export function UserManagementProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserManagementContextType['users']>([])
  const [filteredUsers, setFilteredUsers] = useState<UserManagementContextType['users']>([])
  const [branches, setBranches] = useState<UserManagementContextType['branches']>([])
  const [currentUser, setCurrentUser] = useState<UserManagementContextType['currentUser']>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showBranchDialog, setShowBranchDialog] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [branchId, setBranchId] = useState('')
  const [changingRole, setChangingRole] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false)
  const { axiosInstance } = useAuth()
  const [isAdminRoleChangeDialogOpen, setIsAdminRoleChangeDialogOpen] = useState(false)

  // role change handler
  const changeRole = async (fid: string, newRole: string) => {
    setChangingRole(fid)
    try {
      await axiosInstance.put('/api/user/updateRole', {
        user_id: fid,
        role: newRole,
      })

      // Update users and filteredUsers with new role
      setUsers((users: User[]) =>
        users.map(u => (u.fid === fid ? { ...u, role: newRole } : u))
      )
      setFilteredUsers((filteredUsers: User[]) =>
        filteredUsers.map(u => (u.fid === fid ? { ...u, role: newRole } : u))
      )
      toast.success('User role updated successfully')
    } catch (err) {
      toast.error('Error updating user role')
      console.error(err)
    } finally {
      setChangingRole('')
    }
  }

  // Handle search
  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  // Handle user deletion
  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error('No user selected for deletion')
      return
    }

    try {
      setIsLoading(true)
      await axiosInstance.delete(`/api/user/delete-user/${id}`)
      // Update users and filteredUsers lists
      setUsers((users: User[]) => users.filter(user => user.fid !== id))
      setFilteredUsers((filteredUsers: User[]) => filteredUsers.filter(user => user.fid !== id))
      setSelectedUserId('') // Clear selected user
      toast.success('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserManagementContext.Provider
      value={{
        users,
        setUsers,
        filteredUsers,
        setFilteredUsers,
        branches,
        setBranches,
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading,
        showBranchDialog,
        setShowBranchDialog,
        selectedUserId,
        setSelectedUserId,
        selectedRole,
        setSelectedRole,
        branchId,
        setBranchId,
        changingRole,
        setChangingRole,
        searchTerm,
        setSearchTerm,
        handleDelete,
        setIsDeleteUserDialogOpen,
        isDeleteUserDialogOpen,
        isAdminRoleChangeDialogOpen,
        setIsAdminRoleChangeDialogOpen,
        changeRole
      }}
    >
      {children}
    </UserManagementContext.Provider>
  )
}

export function useUserManagement() {
  const context = useContext(UserManagementContext)
  if (!context) {
    throw new Error('useUserManagement must be used within a UserManagementProvider')
  }
  return context
}