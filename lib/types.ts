export interface AIWorker {
  id: string
  ownerUserId: string
  role: string
  name: string
  avatarPrompt: string
  avatarUrl: string
  physicalTraits: string[]
  psychologicalTraits: string[]
  jobDescription: string
  systemPrompt: string
  defaultUserPrompt: string
  knowledgeBaseIds: string[]
  allowedTools: string[]
  visibility: 'draft' | 'unlisted' | 'public'
  status: 'draft' | 'published'
}
