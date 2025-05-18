import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Branch } from '../../types'
import { ChevronDown } from 'lucide-react'

const BranchSelect = ({
    isLoading,
    selectedBranch,
    branches,
    onSelect
}: {
    isLoading: boolean
    selectedBranch: Branch | null
    branches: Branch[]
    onSelect: (branch: Branch) => void
}) => (
    <div className="grid gap-2">
        <label htmlFor="branch">Branch *</label>
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isLoading}>
                <Button variant="outline" className="w-full justify-between">
                    {isLoading ? (
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                        selectedBranch ? selectedBranch.branch_name : "Select Branch"
                    )}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
                {isLoading ? (
                    Array(3).fill(0).map((_, i) => (
                        <DropdownMenuItem key={`loading-branch-${i}`} disabled>
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        </DropdownMenuItem>
                    ))
                ) : (
                    branches?.map((branch) => (
                        <DropdownMenuItem
                            key={branch.branch_id}
                            onSelect={() => onSelect(branch)}
                        >
                            {branch.branch_name}
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
)

export default BranchSelect;