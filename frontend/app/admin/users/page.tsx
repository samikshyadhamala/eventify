"use client"

import UserTable from './components/Table'
import BranchDialog from './components/Dialog/BranchDialog'
import DeleteUserDialog from './components/Dialog/DeleteUserDialog'
import { Input } from '@/components/ui/input'
import { useUserManagement } from './context'
import AdminRoleChangeDialog from './components/Dialog/AdminRoleChangeDialog'

export default function ManageUsersPage() {
  const { 
    searchTerm, 
    setSearchTerm, 
    isDeleteUserDialogOpen, 
    setIsDeleteUserDialogOpen, 
    handleDelete, 
    selectedUserId, 
    changeRole, 
    isAdminRoleChangeDialogOpen,
    setIsAdminRoleChangeDialogOpen
  } = useUserManagement()
  return (
    <div className="py-8 px-3 sm:px-10">
      <h1 className="">Manage Users</h1>
      <div className="flex items-center justify-between my-3 w-full">
        <div className="flex items-center gap-2 w-full">
          <div className="my-0 w-full">
            <Input
              type="text"
              placeholder="Search by email, branch, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-96"
            />
          </div>
        </div>
      </div>
      <UserTable />
      <BranchDialog />
      <DeleteUserDialog
        isOpen={isDeleteUserDialogOpen}
        setIsOpen={setIsDeleteUserDialogOpen}
        onDeleteUser={handleDelete}
        selectedUserId={selectedUserId}
      />
      <AdminRoleChangeDialog 
        isOpen={isAdminRoleChangeDialogOpen}
        setIsOpen={setIsAdminRoleChangeDialogOpen}
        onChangeRole={changeRole}
        selectedUserId={selectedUserId}
      />
    </div>
  )
}