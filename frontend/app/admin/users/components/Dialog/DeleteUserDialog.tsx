import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteUserDialog({
    isOpen, 
    setIsOpen, 
    onDeleteUser, 
    selectedUserId,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onDeleteUser: (user_id: number) => void;
    selectedUserId: number | null;
}) {
    const handleDeleteButtonClick = () => {
        setIsOpen(false);
        if (selectedUserId !== null) {
            onDeleteUser(selectedUserId);
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-left">Delete User</DialogTitle>
                <DialogDescription className="text-left">
                Are you sure you want to delete this user? This action cannot be undone
                and all data associated with this user will no longer be accessible.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
                </Button>
                <Button onClick={handleDeleteButtonClick} className="bg-red-500 hover:bg-red-600 text-white">
                Delete
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}