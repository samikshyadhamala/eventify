"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { UserManagementContextType } from './types'

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined)

export function UserManagementProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserManagementContextType['users']>([])
  const [branches, setBranches] = useState<UserManagementContextType['branches']>([])
  const [currentUser, setCurrentUser] = useState<UserManagementContextType['currentUser']>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showBranchDialog, setShowBranchDialog] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [branchId, setBranchId] = useState('')
  const [changingRole, setChangingRole] = useState<string>('')

  return (
    <UserManagementContext.Provider
      value={{
        users,
        setUsers,
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