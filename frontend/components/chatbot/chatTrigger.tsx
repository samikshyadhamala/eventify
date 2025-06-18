import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useChatbot } from "./context";
import BotAvatar from "./botAvatar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
export default function ChatTrigger(){
    const { setIsOpen } = useChatbot();

    // Function to handle click event and open the chat card
    const handleClick = () => {
        setIsOpen(true);
    };

    return ( 
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger className="fixed bottom-5 right-2 md:bottom-8 md:right-8 flex items-center z-50 justify-center hover:cursor-pointer">
                <Card 
                    className="h-14 w-14 p-[10px] rounded-full "
                    onClick={handleClick}
                >
                    <BotAvatar className="h-full w-full" />
                </Card>
            </TooltipTrigger>
            <TooltipContent>
                <div>Chat with Eventify Bot</div>
            </TooltipContent>
            </ Tooltip>
        </TooltipProvider>
    )
}