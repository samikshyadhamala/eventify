'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from 'lucide-react'
type Branch = {
    branch_id: number
    branch_name: string
}

interface ChangeBranchProps {
    isChangeBranchOpen: boolean
    setIsChangeBranchOpen: (open: boolean) => void
    branches: Branch[]
}
import { useState } from 'react'
import { useBranchAdmin } from "../../context"
import { useAuth } from '@/context/auth/hooks'
import { toast } from 'react-toastify'

export default function ChangeBranchDialog({ 
    isChangeBranchOpen, 
    setIsChangeBranchOpen, 
    branches, 
}: ChangeBranchProps) {
    const [branchId, setBranchId] = useState<string | null>(null)
    const [changingRole, setChangingRole] = useState<boolean>(false)
    const { selectedUserId } = useBranchAdmin()
    const { axiosInstance } = useAuth()
    
    const handleBranchSubmit = () => {
        setChangingRole(true)
        try { 
            axiosInstance.put(`/api/user/updateBranchAdmin`, {
                user_id: selectedUserId,
                branch_id: branchId
            })
            setIsChangeBranchOpen(false)
        } catch (error) {
            console.error("Error changing branch:", error)
            toast.error("Failed to change branch")
        } finally {
            setChangingRole(false)
        }
    }
    return (
        <Dialog open={isChangeBranchOpen} onOpenChange={setIsChangeBranchOpen}>
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
                        <Select onValueChange={setBranchId}>
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
                    <Button onClick={handleBranchSubmit} className="bg-black" disabled={changingRole}>
                        {changingRole  ? (
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
    )
}