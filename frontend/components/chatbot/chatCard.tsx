'use client'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useChatbot } from "./context";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BotAvatar from "./botAvatar";
import BotMessage from "./botMessage";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import UserMessage from "./userMessage";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"

function ChatHeader() {
    const { setIsOpen, handleClearChat } = useChatbot();
    return (
        <CardHeader className="flex justify-between flex-row items-center pb-2 pt-3">
            <div className="flex gap-2 items-center">
                <BotAvatar className="h-6 w-6" />
                <h3 className="text-lg m-0">Eventify Bot</h3>
            </div>
            <div className="flex gap-3 items-center m-0">
                <div className="hover:cursor-pointer flex justify-center items-center" onClick={handleClearChat}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Trash2 className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                Clear chat history
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <button onClick={() => setIsOpen(false)} className="m-0">
                    <X className="h-5 w-5" />
                </button>
            </div>
        </CardHeader>
    )
}
function ChatFooter() {
    const [inputMessage, setInputMessage] = useState<string>('');
    const { handleMessageSend } = useChatbot();

    const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputMessage) {
            handleMessageSend(inputMessage);
            setInputMessage('');
        }
    };
    return (
        <CardFooter className="">
            <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input placeholder="Type your message..." className="w-full" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                <Button className="bg-black" type='submit'><SendHorizontal /></Button>
            </form>
        </CardFooter>
    )
}
export default function ChatCard() {
    const { chatHistory, setChatHistory, isLoading } = useChatbot();
    const bottomRef = useRef<HTMLDivElement | null>(null);



    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory.messages]);

    return (
        <motion.div
            layout
        >
            <Card className="fixed bottom-5 right-2 md:bottom-8 md:right-8 w-80 z-50">
                <ChatHeader />
                <Separator />
                <CardContent className="pt-2 px-3 ">
                    <ScrollArea className="h-60 pr-3">
                        {
                            chatHistory.messages.map((msg, index) => (
                                msg.message_type == 'received' ? (
                                    <BotMessage key={index} message={msg.content} />
                                ) : (
                                    <UserMessage key={index} message={msg.content} />
                                )
                            ))
                        }
                        {isLoading && (
                            <BotMessage
                                message={
                                    <ThreeDots
                                        visible={true}
                                        height="20"
                                        width="20"
                                        color="black"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                    />
                                }
                            />
                        )}
                        <div ref={bottomRef} />
                    </ScrollArea>
                </CardContent>
                <ChatFooter />

            </Card>
        </motion.div>
    );
}