"use client"

import { UserManagementProvider } from './context'
import UserTable from './components/Table'
import BranchDialog from './components/Dialog/BranchDialog'

export default function ManageUsersPage() { 
  return (
    <UserManagementProvider>
      <div className="py-8 px-10">
        <h1 className="">Manage Users</h1>
        <div className="flex items-center justify-between my-3">
                <div className="flex items-center gap-2">
                    {/* <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>Export</span>
                    </Button> */}
                </div>
            </div>
        <UserTable />
        <BranchDialog />
      </div>
    </UserManagementProvider>
  )
}