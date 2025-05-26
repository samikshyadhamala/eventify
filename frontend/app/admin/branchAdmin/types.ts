export interface BranchAdminContextType {
  branchAdmins: BranchAdmin[]
  setBranchAdmins: (admins: BranchAdmin[]) => void
  branches: Branch[]
  users: User[]
  isLoading: boolean
  isCreating: boolean
  isDeleting: boolean // Added for deletion loading state
  selectedBranch: Branch | null
  setSelectedBranch: (branch: Branch | null) => void
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
  showCreateDialog: boolean
  setShowCreateDialog: (show: boolean) => void
  isChangeBranchOpen: boolean
  setIsChangeBranchOpen: (open: boolean) => void
  selectedUserId: string | null
  setSelectedUserId: (userId: string | null) => void
  filteredData: BranchAdmin[]
  setFilteredData: (data: BranchAdmin[]) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  handleCreateClubAdmin: () => Promise<void>
  handleBranchAdminDelete: (userId: string) => Promise<void> // Added for deletion
}

export type BranchAdmin = {
    email: string
    branch_name: string
    location: string
    user_id: string
    branch_id: string
    imageUrl: string
}

export type Branch = {
    branch_id: string
    branch_name: string
}

export type User = {
    fid: string
    email: string
    imageUrl: string
}