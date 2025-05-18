"use client"

import { useState, useEffect } from "react"
import { BarChart3, Building2, ChevronDown, Download, Filter, Globe, Plus, Users, Loader2 } from "lucide-react"
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useAuth } from "@/context/auth/hooks"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"

type BranchAdmin = {
    email: string
    branch_name: string
    location: string
    user_id: string
    branch_id: string
}

type Branch = {
    branch_id: string
    branch_name: string
}

type User = {
    user_id: string
    email: string
    imageUrl: string
}

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
                debugger
                setBranches(branchesResponse.data.branches)
                setUsers(usersResponse.data)
            } catch (error) {
                console.error("Error fetching branches or users:", error)
                toast.error("Failed to fetch branches or users")
            }
        }
        if (showCreateDialog) {
            fetchBranchesAndUsers()
        }
    }, [])

    const handleCreateClubAdmin = async () => {
        if (!selectedBranch || !selectedUser) {
            toast.error("Please select both a branch and a user")
            return
        }

        setIsCreating(true)
        try {
            await axiosInstance.post("/api/user/createBranchAdmin", {
                branch_id: selectedBranch.branch_id,
                user_id: selectedUser.user_id
            })
            toast.success("Club admin created successfully")
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
        <div className="py-4 px-6">
            <h1>Manage Users</h1>
            <div className="flex items-center justify-between my-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>Export</span>
                    </Button>
                </div>
                <Button 
                    size="sm" 
                    className="gap-1 bg-black"
                    onClick={() => setShowCreateDialog(true)}
                >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Club Admin</span>
                </Button>
            </div>
            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Branch</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                                <th className="h-12 px-4 text-center align-middle font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <motion.tr
                                        key={i}
                                        className="border-b transition-colors"
                                    >
                                        <td className="p-4 align-middle">
                                            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : branchAdmins.length === 0 ? (
                                <tr className="border-b transition-colors">
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                        No branch admins found
                                    </td>
                                </tr>
                            ) : branchAdmins.map((admin, i) => (
                                <motion.tr
                                    key={i}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <td className="p-4 align-middle font-medium">{admin.email}</td>
                                    <td className="p-4 align-middle">{admin.branch_name}</td>
                                    <td className="p-4 align-middle">{admin.location}</td>
                                    <td className="p-4 align-middle w-full flex justify-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    Actions
                                                    <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                                <DropdownMenuItem>Change Role</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Deactivate User</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Club Admin</DialogTitle>
                        <DialogDescription>
                            Select a branch and user to create a new club admin
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="branch">Branch *</label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedBranch ? selectedBranch.branch_name : "Select Branch"}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    {branches?.map((branch) => (
                                        <DropdownMenuItem 
                                            key={branch.branch_id}
                                            onSelect={() => setSelectedBranch(branch)}
                                        >
                                            {branch.branch_name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="user">User *</label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedUser ? selectedUser.email : "Select User"}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    {users?.map((user) => (
                                        <DropdownMenuItem 
                                            key={user.user_id}
                                            onSelect={() => setSelectedUser(user)}
                                            className="flex items-center gap-2"
                                        >
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={user.imageUrl} />
                                                <AvatarFallback>
                                                    {user.email}
                                                </AvatarFallback>
                                            </Avatar>
                                            {user.email}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Button 
                            onClick={handleCreateClubAdmin} 
                            disabled={isCreating} 
                            className="bg-black"
                        >
                            {isCreating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Club Admin'
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}