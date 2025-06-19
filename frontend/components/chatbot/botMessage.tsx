import BotAvatar from "./botAvatar";

export default function BotMessage({ message }: { message: string | React.ReactNode  }) {
    return (
        <div className="flex gap-2 mb-3 items-center">
            <div className="flex-shrink-0">
                <BotAvatar className="h-5 w-5" />
            </div>
            <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                <div className="text-sm text-gray-800">{message}</div>
            </div>
        </div>
    );
}