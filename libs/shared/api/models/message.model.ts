export interface MessageDto {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt?: string;
  sender?: {
    id: string;
    fullName?: string;
    email: string;
    avatarUrl?: string;
  };
}

export interface CreateMessageDto {
  content: string;
}

export interface MessageCursorParams {
  cursor?: string;
}
