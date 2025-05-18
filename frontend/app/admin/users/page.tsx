"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Download, Filter, Plus, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth/hooks"
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type User = {
    email: string
    imageUrl: string | null
    createdAt: number
    role: string
    fid: string
    branchId?: string
}
type CurrentUser = {
    email: string
    imageUrl: string | null
    role: string
    fid: string
}

type Branch = {
    branch_id: number
    branch_name: string
}

const roleStyles = {
    normal: 'blue',
    club: 'green',
    admin: 'red'
}

export default function ManageUsers() {
    const { axiosInstance } = useAuth()
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showBranchDialog, setShowBranchDialog] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const [selectedRole, setSelectedRole] = useState<string>('')
    const [branchId, setBranchId] = useState('')
    const [changingRole, setChangingRole] = useState<string>('')
    const [branches, setBranches] = useState<Branch[]>([])

    const [currentUser, setCurrentUsers] = useState<CurrentUser[]>([])
    // fetching current user
    useEffect(() => {
        const getCurrentUser = async () => {
            const response = await axiosInstance.get("/api/auth/getUserInfo")
            setCurrentUsers(response.data)
        }
        getCurrentUser()
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("/api/user/getAllUsers")
                setUsers(response.data)
            } catch (error) {
                console.error("Error fetching users:", error)
                toast.error("Failed to fetch users")
            } finally {
                setIsLoading(false)
            }
        }
        fetchUsers()
    }, [axiosInstance])

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await axiosInstance.get("/api/branch/getUniqueBranches")
                setBranches(response.data.branches)
            } catch (error) {
                console.error("Error fetching branches:", error)
                toast.error("Failed to fetch branches")
            }
        }
        fetchBranches()
    }, [axiosInstance])

    const handleRoleChange = async (fid: string, newRole: string) => {
        if (newRole === 'club') {
            setSelectedUserId(fid)
            setSelectedRole(newRole)
            setShowBranchDialog(true)
            return
        }

        setChangingRole(fid)
        try {
            await axiosInstance.put('/api/user/updateRole', {
                user_id: fid,
                role: newRole
            })

            setUsers(users.map(user => {
                if (user.fid === fid) {
                    return { ...user, role: newRole }
                }
                return user
            }))

        } catch (err) {
            toast.error('Error updating user role')
            console.error(err)
            // Revert the role back in UI if update failed
            setUsers(users.map(user => {
                if (user.fid === fid) {
                    return { ...user }
                }
                return user
            }))
        } finally {
            setChangingRole('')
        }
    }

    const handleBranchSubmit = async () => {
        if (!branchId) {
            toast.error('Please select a branch')
            return
        }

        setChangingRole(selectedUserId)
        try {
            await axiosInstance.put('/api/user/updateRole', {
                user_id: selectedUserId,
                role: selectedRole,
                branch_id: parseInt(branchId)
            })

            setUsers(users.map(user => {
                if (user.fid === selectedUserId) {
                    return { ...user, role: selectedRole, branchId }
                }
                return user
            }))

            setShowBranchDialog(false)
            setBranchId('')
        } catch (err) {
            toast.error('Error updating user role and branch')
            console.error(err)
            // Revert changes in UI if update failed
            setUsers(users.map(user => {
                if (user.fid === selectedUserId) {
                    return { ...user }
                }
                return user
            }))
        } finally {
            setChangingRole('')
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
            </div>

            <Dialog open={showBranchDialog} onOpenChange={setShowBranchDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Branch</DialogTitle>
                        <DialogDescription>
                            Please select the branch this club manager will be responsible for
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="branchId">Branch</label>
                            <Select value={branchId} onValueChange={setBranchId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {branches.map((branch) => (
                                            <SelectItem
                                                key={branch.branch_id}
                                                value={branch.branch_id.toString()}
                                            >
                                                {branch.branch_name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleBranchSubmit} className="bg-black" disabled={changingRole === selectedUserId}>
                            {changingRole === selectedUserId ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                                <th className="h-12 px-4 text-center align-middle font-medium">Role</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Joined</th>
                                <th className="h-12 px-4 align-middle font-medium text-center">Actions</th>
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
                                        <td className="p-4 align-middle h-full w-full flex justify-center">
                                            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : users.length === 0 ? (
                                <tr className="border-b transition-colors">
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                        No users found
                                    </td>
                                </tr>
                            ) : users.map((user, i) => (
                                <motion.tr
                                    key={i}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <td className="p-4 align-middle font-medium">{user.email}</td>
                                    <td className="p-4 align-middle justify-center flex w-full">
                                        {changingRole === user.fid ? (
                                            <div className="flex items-center">
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                Updating...
                                            </div>
                                        ) : (
                                            <div className="w-24">
                                                <Select
                                                    className="gap-2"
                                                    value={user.role}
                                                    onValueChange={(newRole) => handleRoleChange(user.fid, newRole)}
                                                    disabled={user.fid === currentUser?.fid}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue>{user.role}</SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {Object.keys(roleStyles).map((role) => (
                                                                <SelectItem
                                                                    key={role}
                                                                    value={role}
                                                                >
                                                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 align-middle">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 align-middle h-full w-full flex justify-center ">
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
                                                <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}