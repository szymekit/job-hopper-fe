export interface ChatParticipant {
  id: string;
  name: string;
  avatarUrl: string;
  isActive?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface ChatConversation {
  id: string;
  participant: ChatParticipant;
  messages: ChatMessage[];
  lastMessageTime: string;
  unreadCount: number;
}

export interface ChatData {
  currentUserId: string;
  conversations: ChatConversation[];
  activeConversationId: string | null;
}
