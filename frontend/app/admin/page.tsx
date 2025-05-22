"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Download, Filter, Plus, Search, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth/hooks"
import { motion } from "framer-motion"
import { toast } from 'react-toastify'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

type Branch = {
    branch_id: number
    branch_name: string
    created_at: string
    event_count: number
    location: string
}

export default function Branches() {
    const { axiosInstance } = useAuth()
    const [branches, setBranches] = useState<Branch[]>([])
    const [filteredBranches, setFilteredBranches] = useState<Branch[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [branchName, setBranchName] = useState('')
    const [location, setLocation] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [deletingBranches, setDeletingBranches] = useState<number[]>([])

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await axiosInstance.get("/api/branch/getDetailedBranch")
                setBranches(response.data)
                setFilteredBranches(response.data)
            } catch (error) {
                console.error("Error fetching branches:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchBranches()
    }, [axiosInstance])

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredBranches(branches)
        } else {
            const lowercaseQuery = searchQuery.toLowerCase()
            const filtered = branches.filter(branch =>
                branch.branch_name.toLowerCase().includes(lowercaseQuery) ||
                branch.location.toLowerCase().includes(lowercaseQuery)
            )
            setFilteredBranches(filtered)
        }
    }, [searchQuery, branches])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleDeleteBranch = async (branch_id: number) => {
        setDeletingBranches(prev => [...prev, branch_id])
        try {
            await axiosInstance.delete(`/api/branch/deleteBranch/${branch_id}`)
            const updatedBranches = branches.filter(b => b.branch_id !== branch_id)
            setBranches(updatedBranches)
            setFilteredBranches(prev => prev.filter(b => b.branch_id !== branch_id))
        } catch (error) {
            console.error("Error deleting branch:", error)
            toast.error('Failed to delete branch')
        } finally {
            setDeletingBranches(prev => prev.filter(id => id !== branch_id))
        }
    }

    const handleCreateBranch = async () => {
        if (!branchName.trim()) {
            toast.error('Branch name is required')
            return
        }

        setIsCreating(true)
        try {
            const response = await axiosInstance.post('/api/branch/createBranch', {
                branch_name: branchName,
                location: location
            })

            setBranches([...branches, response.data.branch])
            setFilteredBranches([...branches, response.data.branch])
            setShowCreateDialog(false)
            setBranchName('')
            setLocation('')
        } catch (error) {
            console.error("Error creating branch:", error)
            toast.error('Failed to create branch')
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="p-4">
            <h1>All Branches</h1>
            <div className="flex items-center justify-between my-4">
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Input
                            type="search"
                            placeholder="Search branches..."
                            className="w-96 pl-8 bg-muted border-none"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {/* <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>Export</span>
                    </Button> */}
                </div>
                <Button size="sm" className="gap-1 bg-black" onClick={() => setShowCreateDialog(true)}>
                    <div className="flex gap-2 text-white items-center">
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Branch</span>
                    </div>
                </Button>
            </div>

            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Branch</DialogTitle>
                        <DialogDescription>
                            Enter the details for the new branch
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="branchName">Branch Name *</label>
                            <Input
                                id="branchName"
                                value={branchName}
                                onChange={(e) => setBranchName(e.target.value)}
                                placeholder="Enter branch name"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="location">Location</label>
                            <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter location"
                            />
                        </div>
                        <Button onClick={handleCreateBranch} disabled={isCreating} className="bg-black">
                            {isCreating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Branch'
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
                                <th className="h-12 px-4 text-left align-middle font-medium">Branch Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Events</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Created At</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <motion.tr
                                        key={i}
                                        className="border-b transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <td className="p-4 align-middle">
                                            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : filteredBranches.length === 0 ? (
                                <tr className="border-b transition-colors">
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                        No branches found matching your search criteria
                                    </td>
                                </tr>
                            ) : (
                                filteredBranches.map((branch) => (
                                    <motion.tr
                                        key={branch.branch_id}
                                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <td className="p-4 align-middle font-medium">{branch.branch_name}</td>
                                        <td className="p-4 align-middle">{branch.location}</td>
                                        <td className="p-4 align-middle">{branch.event_count}</td>
                                        <td className="p-4 align-middle">{new Date(branch.created_at).toLocaleDateString()}</td>
                                        <td className="p-4 align-middle text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="text-center" disabled={deletingBranches.includes(branch.branch_id)}>
                                                        {deletingBranches.includes(branch.branch_id) ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            </>
                                                        ) : (
                                                            <>
                                                                Actions
                                                                <ChevronDown className="ml-2 h-4 w-4" />
                                                            </>
                                                        )}
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem><Link href={`/admin/users/branchAdmin`} className='text-black'>Manage Admins</Link></DropdownMenuItem>
                                                    <DropdownMenuItem><Link href={`/admin/events`} className='text-black'>View Events</Link></DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        className="text-red-600" 
                                                        onClick={() => handleDeleteBranch(branch.branch_id)}
                                                        disabled={deletingBranches.includes(branch.branch_id)}
                                                    >
                                                        Delete Branch
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}