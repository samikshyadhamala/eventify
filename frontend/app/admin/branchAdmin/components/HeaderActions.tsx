import { Button } from "@/components/ui/button"
import { Filter, Download, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input";
import { useBranchAdmin } from "../context";

const HeaderActions = ({ setShowCreateDialog }: { setShowCreateDialog: (show: boolean) => void }) => {

    const { searchTerm, setSearchTerm } = useBranchAdmin()

    return (
        <div className="flex items-center justify-between my-0 w-full gap-2">
            <div className="my-4 w-full">
                <Input
                    type="text"
                    placeholder="Search by email, branch, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="sm:w-96 w-full"
                />
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
    )
}
export default HeaderActions;