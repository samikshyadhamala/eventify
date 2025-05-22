"use client"

import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useAuth } from "@/context/auth/hooks"
import { User, Branch, BranchAdmin } from './types'
import BranchAdminTable from './components/BranchAdminTable'
import CreateAdminDialog from "./components/CreateAdminDialog"
import HeaderActions from "./components/HeaderActions"
import ChangeBranchDialog from './components/ChangeBranchDialog'
import {BranchAdminProvider} from './context'
import { useBranchAdmin } from "./context"

export default function ManageUsers() {
    const { axiosInstance } = useAuth()
    const [branchAdmins, setBranchAdmins] = useState<BranchAdmin[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [branches, setBranches] = useState<Branch[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [isChangeBranchOpen, setIsChangeBranchOpen] = useState(false)

    useEffect(() => {
        const fetchBranchAdmins = async () => {
            try {
                const response = await axiosInstance.get("/api/user/getBranchAdmin")
                setBranchAdmins(response.data)
            } catch (error) {
                console.error("Error fetching branch admins:", error)
                toast.error("Failed to fetch branch admins")
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
                    axiosInstance.get("/api/branch/getUniqueBranches"),
                    axiosInstance.get("/api/user/getAllUsers")
                ])
                setBranches(branchesResponse.data.branches)
                setUsers(usersResponse.data)
            } catch (error) {
                console.error("Error fetching branches or users:", error)
                toast.error("Failed to fetch branches or users")
            }
        }
        fetchBranchesAndUsers()
    }, [axiosInstance])

    const handleCreateClubAdmin = async () => {
        if (!selectedBranch || !selectedUser) {
            toast.error("Please select both a branch and a user")
            return
        }

        setIsCreating(true)

        try {
            await axiosInstance.post("/api/user/createBranchAdmin", {
                branch_id: selectedBranch.branch_id,
                user_id: selectedUser.fid
            })
            setShowCreateDialog(false)
            setSelectedBranch(null)
            setSelectedUser(null)
            // Refresh branch admins
            const response = await axiosInstance.get("/api/user/getBranchAdmin")
            setBranchAdmins(response.data)
        } catch (error) {
            console.error("Error creating club admin:", error)
            toast.error("Failed to create club admin")
        } finally {
            setIsCreating(false)
        }
    }



    return (
        <BranchAdminProvider>
        <div className="py-4 px-6">
            <h1>Manage Users</h1>

            <HeaderActions setShowCreateDialog={setShowCreateDialog} />
            <BranchAdminTable
                isLoading={isLoading}
                branchAdmins={branchAdmins}
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
    </BranchAdminProvider>
    )
}