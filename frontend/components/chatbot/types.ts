export interface ChatHistoryItem {
    content: string;
    message_type: string;
}
export interface ChatHistoryType { 
    messages: ChatHistoryItem[]; 
}

export interface ChatbotContextProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    chatHistory: ChatHistoryType;
    setChatHistory: (chatHistory: ChatHistoryType) => void;
    handleMessageSend: (message: string) => void;
    isLoading: boolean;
    handleClearChat: () => void;
}

export interface ChatBotResponse { 
    response: string;
}