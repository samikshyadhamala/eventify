import {BranchAdmin} from '../../types'
import TableHeader from './TableHeader'
import LoadingRow from './LoadingRow'
import AdminRow from './AdminRow'

const BranchAdminTable = ({
    isLoading,
    branchAdmins
}: {
    isLoading: boolean
    branchAdmins: BranchAdmin[]
}) => {
    return (
        <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <TableHeader />
                    <tbody className="[&_tr:last-child]:border-0">
                        {isLoading ? (
                            Array(5).fill(0).map((_, i) => (
                                <LoadingRow key={i} index={i} />
                            ))
                        ) : branchAdmins.length === 0 ? (
                            <tr className="border-b transition-colors">
                                <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                    No branch admins found
                                </td>
                            </tr>
                        ) : branchAdmins.map((admin) => (
                            <AdminRow key={admin.user_id} admin={admin} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BranchAdminTable;