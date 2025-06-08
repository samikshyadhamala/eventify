import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteEventDialog({
    isOpen, 
    setIsOpen, 
    onDeleteEvent, 
    selectedEventId,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onDeleteEvent: (event_id: number | null) => void;
    selectedEventId: number | null;
}) {
    const handleDeleteButtonClick = () => {
        setIsOpen(false);
        onDeleteEvent(selectedEventId);
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-left">Delete Event</DialogTitle>
                <DialogDescription className="text-left">
                Are you sure you want to delete this event? This action cannot be undone
                and all data associated with this event will no longer be accessible.
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