"use client";
import React, { useEffect } from "react";
import Chat from "./chat";
import useConversationStore from "@/stores/useConversationStore";
import { Item, processMessages } from "@/lib/assistant";
import { StoreApi } from "zustand";
import { ConversationState } from "@/stores/useConversationStore";

interface AssistantProps {
  store?: StoreApi<ConversationState>;
  initialMessage?: string;
  developerPrompt?: string;
}

export default function Assistant({
  store = useConversationStore,
  initialMessage,
  developerPrompt,
}: AssistantProps) {
  const {
    chatMessages,
    addConversationItem,
    addChatMessage,
    setAssistantLoading,
    setChatMessages,
    setConversationItems,
  } = store();

  useEffect(() => {
    if (initialMessage) {
      setChatMessages([
        {
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: initialMessage }],
        },
      ]);
      setConversationItems([]);
    }
  }, [initialMessage, setChatMessages, setConversationItems]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userItem: Item = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: message.trim() }],
    };
    const userMessage: any = {
      role: "user",
      content: message.trim(),
    };

    try {
      setAssistantLoading(true);
      addConversationItem(userMessage);
      addChatMessage(userItem);
      await processMessages(store, developerPrompt);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  const handleApprovalResponse = async (approve: boolean, id: string) => {
    const approvalItem = {
      type: "mcp_approval_response",
      approve,
      approval_request_id: id,
    } as any;
    try {
      addConversationItem(approvalItem);
      await processMessages(store, developerPrompt);
    } catch (error) {
      console.error("Error sending approval response:", error);
    }
  };

  return (
    <div className="h-full p-4 w-full bg-white">
      <Chat
        items={chatMessages}
        onSendMessage={handleSendMessage}
        onApprovalResponse={handleApprovalResponse}
      />
    </div>
  );
}
