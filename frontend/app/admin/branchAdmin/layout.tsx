'use client'

import { BranchAdminProvider } from './context' // Adjust path to your context file

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <BranchAdminProvider>{children}</BranchAdminProvider>
        </div>
    )
}