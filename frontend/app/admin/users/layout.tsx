import { UserManagementProvider } from './context'

export default function layout({children}: {children: React.ReactNode}){
    return (
    <UserManagementProvider>
        {children}
    </UserManagementProvider>
    )
}
