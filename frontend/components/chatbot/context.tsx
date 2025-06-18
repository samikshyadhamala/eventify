'use client'
import { createContext, useContext } from 'react';
import { useState } from 'react';
interface ChatbotContextProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ChatbotContext = createContext<ChatbotContextProps | undefined>(undefined);

export function useChatbot() {
    const context = useContext(ChatbotContext);
    if (!context) {
        throw new Error("useChatbot must be used within a ChatbotProvider");
    }
    return context;
}

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <ChatbotContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ChatbotContext.Provider>
    );
}