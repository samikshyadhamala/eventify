import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteBranchDialog({
    isOpen, 
    setIsOpen, 
    onDeleteBranch, 
    selectedBranchId,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onDeleteBranch: (branch_id: number | null) => void;
    selectedBranchId: number | null;
}) {
    const handleDeleteButtonClick = () => {
        setIsOpen(false);
        onDeleteBranch(selectedBranchId);
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-left">Delete Branch</DialogTitle>
                <DialogDescription className="text-left">
                Are you sure you want to delete this branch? This action cannot be undone 
                and all events associated with this branch will no longer be accessible.
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