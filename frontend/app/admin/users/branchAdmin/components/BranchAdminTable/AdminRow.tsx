import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BranchAdmin } from "../../types"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {ChevronDown} from 'lucide-react'

const AdminRow = ({ admin }: { admin: BranchAdmin }) => (
    <motion.tr
        key={admin.user_id}
        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <td className="p-4 align-middle font-medium">{admin.email}</td>
        <td className="p-4 align-middle">{admin.branch_name}</td>
        <td className="p-4 align-middle">{admin.location}</td>
        <td className="p-4 align-middle w-full flex justify-center">
            <AdminActions userId={admin.user_id} />
        </td>
    </motion.tr>
)

const AdminActions = ({ userId }: { userId: string }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
                Actions
                <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem>Change Branch</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)

export default AdminRow