import BotAvatar from "./botAvatar";
import { useAuth } from "@/context/auth/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BotMessage({ message }: { message: string }) {
    const { user } = useAuth();
    return (
        <div className="flex gap-2 mb-3 items-center justify-end">
            <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                <div className="text-sm text-gray-800">{message}</div>
            </div>
            <div className="flex-shrink-0">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl} alt="User Avatar" />
                    <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}