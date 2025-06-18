import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BotAvatar({ className }: { className?: string }) {
    return (
        <Avatar className={`h-14 w-14 ${className}`}>
            <AvatarImage src="/images/bot.png" alt="Chatbot Avatar" />
            <AvatarFallback>B</AvatarFallback>
        </Avatar>
    )
}