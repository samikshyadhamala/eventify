'use client'
import { useAuth } from '@/context/auth/hooks';
import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import { ChatHistoryType, ChatbotContextProps, ChatHistoryItem, ChatBotResponse } from './types';
import axios from 'axios';

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
    const initalMessage: ChatHistoryItem = { 
        content: "Hello! How can I assist you today?", 
        message_type: "received" 
    }
    const [chatHistory, setChatHistory] = useState<ChatHistoryType>({ messages: [initalMessage] });
    const { axiosInstance } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try { 
                const response = await axiosInstance.get<ChatHistoryType>('/api/ml/chat');
                const data = response.data;
                setChatHistory(prev => ({ messages: [...prev.messages, ...data.messages] }));
            } catch (error) {
                console.log(error)
            }
        };

        fetchChatHistory();
    }, []);

    const handleMessageSend = async (message: string) => {
        try {
            if (isLoading) return;
            setChatHistory(prev => ({
                ...prev,
                messages: [...prev.messages, { content: message, message_type: 'sent' }]
            }));
            
            setIsLoading(true); 
            const response = await axiosInstance.post<ChatBotResponse>('/api/ml/chat', { message });
            const messageItem: ChatHistoryItem = { 
                content: response.data.response,
                message_type: 'received'
            }
            setChatHistory(prev => ({
                messages: [...prev.messages, messageItem]
            }));

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleClearChat = () => {
        try { 
            axiosInstance.delete('/api/ml/chat');
            setChatHistory({ messages: [initalMessage] });
        } catch (error) {
            console.error("Error clearing chat:", error);
        }
    }

    return (
        <ChatbotContext.Provider value={{ isOpen, setIsOpen, chatHistory, setChatHistory, handleMessageSend, isLoading, handleClearChat }}>
            {children}
        </ChatbotContext.Provider>
    );
}