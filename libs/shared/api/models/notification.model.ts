export interface NotificationDto {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
  metadata?: Record<string, unknown>;
}

export interface MarkReadDto {
  notificationIds?: string[];
  markAll?: boolean;
}

export interface UnreadCountResponse {
  count: number;
}
