"use client";
import { useRef } from "react";
import Assistant from "@/components/assistant";
import { createConversationStore } from "@/stores/createConversationStore";
import {
  WORKER_WIZARD_DEVELOPER_PROMPT,
  WORKER_WIZARD_INITIAL_MESSAGE,
  INITIAL_MESSAGE,
} from "@/config/constants";

export default function NewWorkerPage() {
  const wizardStore = useRef(
    createConversationStore(WORKER_WIZARD_INITIAL_MESSAGE),
  ).current;
  const previewStore = useRef(createConversationStore(INITIAL_MESSAGE)).current;

  return (
    <div className="flex h-screen divide-x divide-gray-200">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="p-4 bg-gray-50 border-b font-semibold">
          Create Worker
        </div>
        <div className="flex-1 overflow-hidden">
          <Assistant
            store={wizardStore}
            developerPrompt={WORKER_WIZARD_DEVELOPER_PROMPT}
          />
        </div>
      </div>
      <div className="hidden md:flex w-1/2 flex-col">
        <div className="p-4 bg-gray-50 border-b font-semibold">Preview</div>
        <div className="flex-1 overflow-hidden">
          <Assistant store={previewStore} />
        </div>
      </div>
    </div>
  );
}
