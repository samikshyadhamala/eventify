"use client"

import UserTable from './components/Table'
import BranchDialog from './components/Dialog/BranchDialog'
import { Input } from '@/components/ui/input'
import { useUserManagement } from './context'
export default function ManageUsersPage() {
  const { searchTerm, setSearchTerm } = useUserManagement()
  return (
    <div className="py-8 px-10">
      <h1 className="">Manage Users</h1>
      <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-2">
          <div className="my-0">
            <Input
              type="text"
              placeholder="Search by email, branch, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-96"
            />
          </div>
        </div>
      </div>
      <UserTable />
      <BranchDialog />
    </div>
  )
}