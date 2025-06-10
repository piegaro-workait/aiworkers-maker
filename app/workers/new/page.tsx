"use client";
import { useEffect, useRef } from "react";
import Assistant from "@/components/assistant";
import { createConversationStore } from "@/stores/createConversationStore";
import {
  WORKER_WIZARD_DEVELOPER_PROMPT,
  WORKER_WIZARD_INITIAL_MESSAGE,
  INITIAL_MESSAGE,
} from "@/config/constants";
import useWorkerFormStore from "@/stores/useWorkerFormStore";

const generateAvatar = async (name: string) => {
  try {
    const res = await fetch("/api/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: `portrait photo of ${name}` }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.url as string;
    }
  } catch (e) {
    console.error("avatar generation failed", e);
  }
  return "";
};

export default function NewWorkerPage() {
  const wizardStore = useRef(
    createConversationStore(WORKER_WIZARD_INITIAL_MESSAGE),
  ).current;
  const previewStore = useRef(createConversationStore(INITIAL_MESSAGE)).current;
  const { role, name, avatarUrl, setRole, setName, setAvatarUrl } =
    useWorkerFormStore();

  const handleWizardUserMessage = async (msg: string) => {
    if (!role) {
      setRole(msg);
    } else if (!name) {
      setName(msg);
      const url = await generateAvatar(msg);
      if (url) setAvatarUrl(url);
    }
  };

  useEffect(() => {
    if (name) {
      const greeting = `Hi, I'm ${name}${role ? `, your ${role}` : ""}.`;
      previewStore.getState().setChatMessages([
        { type: "message", role: "assistant", content: [{ type: "output_text", text: greeting }] },
      ]);
      previewStore.getState().setConversationItems([]);
    }
  }, [name, role, previewStore]);

  const previewPrompt =
    name || role
      ? `You are ${name || "an AI"}${role ? `, a ${role}` : ""}. Answer as ${
          name || "the worker"
        }.`
      : undefined;

  return (
    <div className="flex h-screen divide-x divide-gray-200">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="p-4 bg-gray-50 border-b font-semibold flex justify-between items-center">
          <span>Create Worker</span>
          <button className="text-sm text-blue-600">Publish</button>
        </div>
        <div className="flex-1 overflow-hidden">
          <Assistant
            store={wizardStore}
            developerPrompt={WORKER_WIZARD_DEVELOPER_PROMPT}
            onUserMessage={handleWizardUserMessage}
          />
        </div>
      </div>
      <div className="hidden md:flex w-1/2 flex-col">
        <div className="p-4 bg-gray-50 border-b font-semibold flex items-center gap-2">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full animate-in fade-in"
            />
          )}
          <span>Preview</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <Assistant store={previewStore} developerPrompt={previewPrompt} />
        </div>
      </div>
    </div>
  );
}
