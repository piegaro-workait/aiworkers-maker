import { create } from "zustand";
import { ConversationState } from "./useConversationStore";
import { Item } from "@/lib/assistant";

export const createConversationStore = (initialMessage: string) =>
  create<ConversationState>((set) => ({
    chatMessages: [
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: initialMessage }],
      },
    ],
    conversationItems: [],
    isAssistantLoading: false,
    setChatMessages: (items: Item[]) => set({ chatMessages: items }),
    setConversationItems: (messages: any[]) =>
      set({ conversationItems: messages }),
    addChatMessage: (item: Item) =>
      set((state) => ({ chatMessages: [...state.chatMessages, item] })),
    addConversationItem: (message) =>
      set((state) => ({
        conversationItems: [...state.conversationItems, message],
      })),
    setAssistantLoading: (loading: boolean) =>
      set({ isAssistantLoading: loading }),
    rawSet: set,
  }));
