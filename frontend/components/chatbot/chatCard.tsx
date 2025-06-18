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

function ChatHeader() {
    const { setIsOpen } = useChatbot();
    return (
        <CardHeader className="flex justify-between flex-row items-center pb-2 pt-3">
            <div className="flex gap-3 items-center">
                <BotAvatar className="h-6 w-6" />
                <h2 className="text-lg font-bold m-0">Eventify Bot</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="m-0">
                <X className="h-6 w-6" />
            </button>
        </CardHeader>
    )
}
export default function ChatCard() {
    return (
        <motion.div
            layout
        >
            <Card className="fixed bottom-5 right-2 md:bottom-8 md:right-8 w-80 z-50">
                <ChatHeader />
                <Separator />
                <CardContent className="pt-2 h-60 px-3">
                    <BotMessage message="Hello! How can I assist you today?" />
                </CardContent>
                <CardFooter className="gap-2">
                    <Input placeholder="Type your message..." className="w-full" />
                    <Button className="bg-black"><SendHorizontal /></Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}