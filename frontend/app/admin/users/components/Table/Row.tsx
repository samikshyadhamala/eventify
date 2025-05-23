"use client"

import { motion } from 'framer-motion'
import { ChevronDown, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUserManagement } from '../../context'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/auth/hooks'
import { User } from '../../types'

const roleStyles = {
  normal: 'blue',
  club: 'green',
  admin: 'red',
}

const roleColorMap: Record<"normal" | "club" | "admin", string> = {
  normal: `
    bg-neutral-200 text-neutral-800
    hover:bg-neutral-300
    focus:ring-2 focus:ring-neutral-400
  `,
  club: `
    bg-teal-500 text-white
    hover:bg-teal-600
    focus:ring-2 focus:ring-teal-400
  `,
  admin: `
    bg-emerald-600 text-white
    hover:bg-emerald-700
    focus:ring-2 focus:ring-emerald-500
  `,
}

type UserRowProps = {
  user: User
  index: number
}

export default function UserRow({ user, index }: UserRowProps) {
  const {
    currentUser,
    setUsers,
    setShowBranchDialog,
    setSelectedUserId,
    setSelectedRole,
    changingRole,
    setChangingRole,
  } = useUserManagement()
  const { axiosInstance } = useAuth()

  const handleRoleChange = async (fid: string, newRole: string) => {
    if (newRole === 'club') {
      setSelectedUserId(fid)
      setSelectedRole(newRole)
      setShowBranchDialog(true)
      return
    }

    setChangingRole(fid)
    try {
      await axiosInstance.put('/api/user/updateRole', {
        user_id: fid,
        role: newRole,
      })

      setUsers(
        users => users.map(u => {
          if (u.fid === fid) {
            return { ...u, role: newRole }
          }
          return u
        })
      )
    } catch (err) {
      toast.error('Error updating user role')
      console.error(err)
      setUsers(users => users.map(u => u)) // Revert UI
    } finally {
      setChangingRole('')
    }
  }

  return (
    <motion.tr
      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <td className="p-4 align-middle font-medium">
        <div className="flex gap-3 items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          {user.email}
        </div>
      </td>
      <td className="p-4 align-middle justify-center flex w-full">
        {changingRole === user.fid ? (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Updating...
          </div>
        ) : (
          <div className="w-24">
            <Select
              value={user.role}
              onValueChange={(newRole) => handleRoleChange(user.fid, newRole)}
              disabled={user.fid === currentUser?.fid}
            >
              <SelectTrigger className={`h-8 w-24 ${roleColorMap[user.role as keyof typeof roleColorMap]}`}>
                <SelectValue>{user.role}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.keys(roleStyles).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </td>
      <td className="p-4 align-middle">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4 align-middle h-full w-full flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Actions
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </motion.tr>
  )
}