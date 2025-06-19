'use client';
import ChatCard from './chatCard'
import ChatTrigger from './chatTrigger';
import { ChatbotProvider, useChatbot } from './context';
import { motion } from 'framer-motion';

export default function ChatbotWrapper() {
    return (
        <ChatbotProvider>
            <Chatbot />
        </ChatbotProvider>
    );
}

function Chatbot() {
    const { isOpen } = useChatbot();
    return (
        <motion.div layout>
            {isOpen ? (
                <ChatCard />
            ) : (
                <ChatTrigger />
            )}
        </motion.div>
    );
}