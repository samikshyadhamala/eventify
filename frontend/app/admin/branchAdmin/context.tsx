'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { BranchAdmin } from './types';

interface BranchAdminContextType {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
  filteredData: BranchAdmin[], 
  setFilteredData: (value: BranchAdmin[]) => void
}

const BranchAdminContext = createContext<BranchAdminContextType | undefined>(undefined)

export function useBranchAdmin(): BranchAdminContextType {
  const context = useContext(BranchAdminContext)
  if (context === undefined) {
    throw new Error('useBranchAdmin must be used within a BranchAdminProvider')
  }
  return context
}

export function BranchAdminProvider({ children }: { children: ReactNode }) { 
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [filteredData, setFilteredData] = useState<BranchAdmin[]>([])
  
  return (
    <BranchAdminContext.Provider value={{ selectedUserId, setSelectedUserId, filteredData, setFilteredData }}>
      {children}
    </BranchAdminContext.Provider>
  )
}

export default BranchAdminContext
