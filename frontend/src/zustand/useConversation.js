import create from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    messages: {},
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    setMessages: (conversationId, messages) => set((state) => ({
        messages: {
            ...state.messages,
            [conversationId]: messages
        }
    })),
    addMessage: (conversationId, message) => set((state) => ({
        messages: {
            ...state.messages,
            [conversationId]: [...(state.messages[conversationId] || []), message]
        }
    })),
}));

export default useConversation;
