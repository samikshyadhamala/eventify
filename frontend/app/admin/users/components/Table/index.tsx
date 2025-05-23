"use client"

import { motion } from 'framer-motion'
import Row from './Row'
import { useUserManagement } from '../../context'
import { useUserManagementData } from '../../hooks'
import { User } from '../../types'

export default function UserTable() {
  const { users, isLoading } = useUserManagement()
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
              Array(5).fill(0).map((_, i) => (
                <motion.tr
                  key={i}
                  className="border-b transition-colors"
                >
                  <td className="p-4 align-middle">
                    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="p-4 align-middle w-full flex justify-center">
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
            ) : (
              users.map((user: User, i: number) => (
                <Row key={user.fid} user={user} index={i} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}