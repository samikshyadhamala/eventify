import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {Branch, User} from '../../types'
import { Button } from '@/components/ui/button'
import { Loader2 } from "lucide-react"
import BranchSelect from "./BranchSelect"
import UserSelect from "./UserSelect"

const CreateAdminDialog = ({
    isOpen,
    onOpenChange,
    isLoading,
    isCreating,
    selectedBranch,
    selectedUser,
    branches,
    users,
    onBranchSelect,
    onUserSelect,
    onCreateAdmin
}: {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    isLoading: boolean
    isCreating: boolean
    selectedBranch: Branch | null
    selectedUser: User | null
    branches: Branch[]
    users: User[]
    onBranchSelect: (branch: Branch) => void
    onUserSelect: (user: User) => void
    onCreateAdmin: () => void
}) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Club Admin</DialogTitle>
                <DialogDescription>
                    Select a branch and user to create a new club admin
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <BranchSelect
                    isLoading={isLoading}
                    selectedBranch={selectedBranch}
                    branches={branches}
                    onSelect={onBranchSelect}
                />
                <UserSelect
                    isLoading={isLoading}
                    selectedUser={selectedUser}
                    users={users}
                    onSelect={onUserSelect}
                />
                <Button
                    onClick={onCreateAdmin}
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
)

export default CreateAdminDialog;