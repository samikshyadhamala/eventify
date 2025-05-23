"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useUserManagement } from '../../context'
import { useAuth } from '@/context/auth/hooks'
import { Branch, User } from '../../types'

export default function BranchDialog() {
  const {
    showBranchDialog,
    setShowBranchDialog,
    selectedUserId,
    selectedRole,
    branchId,
    setBranchId,
    changingRole,
    setChangingRole,
    branches,
    setUsers,
  } = useUserManagement()
  const { axiosInstance } = useAuth()

  const handleBranchSubmit = async () => {
    if (!branchId) {
      toast.error('Please select a branch')
      return
    }

    setChangingRole(selectedUserId)
    try {
      await axiosInstance.put('/api/user/updateRole', {
        user_id: selectedUserId,
        role: selectedRole,
        branch_id: parseInt(branchId),
      })

      setUsers(
        (users: User[]) => users.map((user: User) => {
          if (user.fid === selectedUserId) {
            return { ...user, role: selectedRole, branchId }
          }
          return user
        })
      )

      setShowBranchDialog(false)
      setBranchId('')
    } catch (err) {
      toast.error('Error updating user role and branch')
      console.error(err)
      setUsers(users => users.map(u => u)) // Revert UI
    } finally {
      setChangingRole('')
    }
  }

  return (
    <Dialog open={showBranchDialog} onOpenChange={setShowBranchDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Branch</DialogTitle>
          <DialogDescription>
            Please select the branch this club manager will be responsible for
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="branchId">Branch</label>
            <Select value={branchId} onValueChange={setBranchId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {(branches as Branch[]).map((branch: Branch) => (
                    <SelectItem
                      key={branch.branch_id}
                      value={branch.branch_id.toString()}
                    >
                      {branch.branch_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleBranchSubmit} className="bg-black" disabled={changingRole === selectedUserId}>
            {changingRole === selectedUserId ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}