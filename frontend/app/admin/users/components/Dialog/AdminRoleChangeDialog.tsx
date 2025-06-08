import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AdminRoleChangeDialog({
    isOpen,
    setIsOpen,
    onChangeRole,
    selectedUserId,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onChangeRole: (user_id: string, new_role: string) => void;
    selectedUserId: string | null;
}) {
    const handleDeleteButtonClick = () => {
        debugger
        setIsOpen(false);
        if (selectedUserId !== null) {
            onChangeRole(selectedUserId, 'admin');
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">Change User Role</DialogTitle>
                    <DialogDescription className="text-left">
                        Are you sure you want to change this user's role? This action cannot be undone
                        and the user will have access to all events, users and branches.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteButtonClick} className="bg-black text-white">
                        Change Role
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}