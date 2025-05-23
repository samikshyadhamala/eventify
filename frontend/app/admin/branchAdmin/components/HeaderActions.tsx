import { Button } from "@/components/ui/button"
import { Filter, Download, Plus } from 'lucide-react'

const HeaderActions = ({setShowCreateDialog} : {setShowCreateDialog: (show: boolean) => void}) => (
    <div className="flex items-center justify-between my-4">
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

export default HeaderActions;