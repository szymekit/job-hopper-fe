export interface CreateConversationDto {
  participantIds: string[];
}

export interface CreateMessageDto {
  content: string;
}

export interface MessageDto {
  id: string;
  content: string;
  senderId: string;
  sender?: {
    id: string;
    fullName?: string;
    avatarUrl?: string;
  };
  conversationId: string;
  read: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ConversationDto {
  id: string;
  participants: Array<{
    id: string;
    fullName?: string;
    avatarUrl?: string;
    isActive?: boolean;
    lastSeen?: string;
  }>;
  lastMessage?: MessageDto;
  unreadCount: number;
  createdAt: string;
  updatedAt?: string;
}
