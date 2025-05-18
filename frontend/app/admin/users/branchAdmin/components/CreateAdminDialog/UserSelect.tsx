import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User } from '../../types'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {ChevronDown} from 'lucide-react'
const UserSelect = ({
    isLoading,
    selectedUser,
    users,
    onSelect
}: {
    isLoading: boolean
    selectedUser: User | null
    users: User[]
    onSelect: (user: User) => void
}) => (
    <div className="grid gap-2">
        <label htmlFor="user">User *</label>
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isLoading}>
                <Button variant="outline" className="w-full justify-between">
                    {isLoading ? (
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                        selectedUser ? selectedUser.email : "Select User"
                    )}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
                {isLoading ? (
                    Array(3).fill(0).map((_, i) => (
                        <DropdownMenuItem key={`loading-user-${i}`} disabled className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </DropdownMenuItem>
                    ))
                ) : (
                    users?.map((user) => (
                        <DropdownMenuItem
                            key={user.fid}
                            onSelect={() => onSelect(user)}
                            className="flex items-center gap-2"
                        >
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={user.imageUrl} />
                                <AvatarFallback>
                                    {user.email[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span>{user.email}</span>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
)

export default UserSelect