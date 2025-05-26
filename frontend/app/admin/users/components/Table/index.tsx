"use client"

import { motion } from 'framer-motion'
import Row from './Row'
import { useUserManagement } from '../../context'
import { useUserManagementData } from '../../hooks'
import { User } from '../../types'
import Skeleton from './Skeleton'
export default function UserTable() {
  const { filteredUsers, isLoading } = useUserManagement()
  useUserManagementData()

  return (
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
              <Skeleton />
            ) : filteredUsers.length === 0 ? (
              <tr className="border-b transition-colors">
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user: User, i: number) => (
                <Row key={user.fid} user={user} index={i} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}