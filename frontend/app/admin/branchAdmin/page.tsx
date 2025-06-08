'use client'

import { useBranchAdmin } from './context'
import BranchAdminTable from './components/BranchAdminTable'
import CreateAdminDialog from './components/CreateAdminDialog'
import HeaderActions from './components/HeaderActions'
import ChangeBranchDialog from './components/ChangeBranchDialog'
import { Input } from '@/components/ui/input'

export default function ManageUsers() {
    const {
        branchAdmins,
        isLoading,
        showCreateDialog,
        setShowCreateDialog,
        branches,
        users,
        selectedBranch,
        setSelectedBranch,
        selectedUser,
        setSelectedUser,
        isCreating,
        isChangeBranchOpen,
        setIsChangeBranchOpen,
        searchTerm,
        setSearchTerm,
        handleCreateClubAdmin,
        filteredData
    } = useBranchAdmin()

    return (
        <div className="py-4 px-3 sm:px-6">
            <h1>Manage Club Admins</h1>
            <HeaderActions setShowCreateDialog={setShowCreateDialog} />
            <BranchAdminTable
                isLoading={isLoading}
                branchAdmins={filteredData}
                onChangeBranch={setIsChangeBranchOpen}
            />

            <CreateAdminDialog
                isOpen={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                isLoading={isLoading}
                isCreating={isCreating}
                selectedBranch={selectedBranch}
                selectedUser={selectedUser}
                branches={branches}
                users={users}
                onBranchSelect={setSelectedBranch}
                onUserSelect={setSelectedUser}
                onCreateAdmin={handleCreateClubAdmin}
            />
            <ChangeBranchDialog
                isChangeBranchOpen={isChangeBranchOpen}
                setIsChangeBranchOpen={setIsChangeBranchOpen}
                branches={branches}
            />
        </div>
    )
}