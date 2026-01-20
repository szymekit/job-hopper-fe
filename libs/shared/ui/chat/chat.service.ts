import { computed, Injectable, inject, signal, effect } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { ChatConversation, ChatData, ChatMessage } from './chat.model';
import { ConversationsApiService } from '@shared/api/services/conversations-api.service';
import { RealtimeService } from '@core/services/realtime.service';
import { AuthService } from '@core/services/auth.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { MessageDto, ConversationDto } from '@shared/api/models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly conversationsApi = inject(ConversationsApiService);
  private readonly realtimeService = inject(RealtimeService);
  private readonly authService = inject(AuthService);
  private readonly notifications = inject(NotificationsService);
  private subscriptions = new Subscription();
  private typingTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

  readonly isOpen = signal<boolean>(false);
  readonly loading = signal<boolean>(false);
  readonly typingUsers = signal<Map<string, Set<string>>>(new Map());
  readonly presenceMap = signal<Map<string, boolean>>(new Map());
  readonly data = signal<ChatData>({
    currentUserId: '',
    activeConversationId: null,
    conversations: [],
  });

  readonly activeConversation = computed(() => {
    const activeId = this.data().activeConversationId;
    if (!activeId) {
      return null;
    }
    return this.data().conversations.find((c) => c.id === activeId) || null;
  });

  readonly currentUser = computed(() => {
    const user = this.authService.currentUser();
    return user
      ? {
          id: user.id,
          name: user.fullName || user.email,
          avatarUrl: user.avatarUrl || '',
        }
      : null;
  });

  readonly totalUnreadCount = computed(() => {
    return this.data().conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  });

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.data.update((d) => ({ ...d, currentUserId: user.id }));
        this.loadConversations();
        this.setupRealtimeSubscriptions();
      } else {
        this.data.set({ currentUserId: '', activeConversationId: null, conversations: [] });
        this.unsubscribeRealtime();
      }
    });
  }

  private setupRealtimeSubscriptions(): void {
    this.unsubscribeRealtime();

    const messageSub = this.realtimeService.onMessage().subscribe((payload) => {
      this.handleIncomingMessage(payload);
    });

    const typingSub = this.realtimeService.onTyping().subscribe((payload) => {
      this.handleTyping(payload);
    });

    const presenceSub = this.realtimeService.onPresence().subscribe((payload) => {
      this.handlePresence(payload);
    });

    this.subscriptions.add(messageSub);
    this.subscriptions.add(typingSub);
    this.subscriptions.add(presenceSub);
  }

  private unsubscribeRealtime(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
  }

  private handleIncomingMessage(payload: { conversationId: string; messageId: string; senderId: string; content: string; createdAt: string }): void {
    const currentUserId = this.authService.currentUser()?.id;
    if (!currentUserId) {
      return;
    }

    const message: ChatMessage = {
      id: payload.messageId,
      senderId: payload.senderId,
      senderName: '',
      content: payload.content,
      timestamp: new Date(payload.createdAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
      isOwn: payload.senderId === currentUserId,
    };

    this.data.update((data) => {
      const conversationIndex = data.conversations.findIndex((c) => c.id === payload.conversationId);
      if (conversationIndex === -1) {
        this.loadConversations();
        return data;
      }

      const conversations = [...data.conversations];
      const conversation = { ...conversations[conversationIndex] };

      if (!conversation.messages.find((m) => m.id === message.id)) {
        conversation.messages = [...conversation.messages, message];
        conversation.lastMessageTime = message.timestamp;
        if (message.isOwn || data.activeConversationId === payload.conversationId) {
          conversation.unreadCount = 0;
        } else {
          conversation.unreadCount += 1;
        }
        conversations[conversationIndex] = conversation;
      }

      return {
        ...data,
        conversations: conversations.sort((a, b) => {
          const timeA = new Date(a.lastMessageTime).getTime();
          const timeB = new Date(b.lastMessageTime).getTime();
          return timeB - timeA;
        }),
      };
    });
  }

  private handleTyping(payload: { conversationId: string; userId: string; isTyping: boolean }): void {
    const typingMap = new Map(this.typingUsers());
    if (!typingMap.has(payload.conversationId)) {
      typingMap.set(payload.conversationId, new Set());
    }

    const users = typingMap.get(payload.conversationId)!;
    if (payload.isTyping) {
      users.add(payload.userId);
      const timeout = this.typingTimeouts.get(payload.conversationId + payload.userId);
      if (timeout) {
        clearTimeout(timeout);
      }
      const newTimeout = setTimeout(() => {
        users.delete(payload.userId);
        this.typingUsers.set(new Map(typingMap));
      }, 3000);
      this.typingTimeouts.set(payload.conversationId + payload.userId, newTimeout);
    } else {
      users.delete(payload.userId);
      const timeout = this.typingTimeouts.get(payload.conversationId + payload.userId);
      if (timeout) {
        clearTimeout(timeout);
      }
    }
    this.typingUsers.set(new Map(typingMap));
  }

  private handlePresence(payload: { userId: string; status: 'online' | 'offline'; lastSeen?: string }): void {
    const presence = new Map(this.presenceMap());
    presence.set(payload.userId, payload.status === 'online');
    this.presenceMap.set(presence);

    this.data.update((data) => ({
      ...data,
      conversations: data.conversations.map((conv) => ({
        ...conv,
        participant: {
          ...conv.participant,
          isActive: presence.get(conv.participant.id) ?? false,
        },
      })),
    }));
  }

  loadConversations(): void {
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      return;
    }

    this.loading.set(true);
    this.conversationsApi
      .getAll()
      .pipe(
        tap((conversations: ConversationDto[]) => {
          const mappedConversations: ChatConversation[] = conversations.map((conv) => {
            const otherParticipant = conv.participants.find((p) => p.id !== currentUser.id) || conv.participants[0];
            const presence = this.presenceMap().get(otherParticipant.id) ?? false;

            return {
              id: conv.id,
              participant: {
                id: otherParticipant.id,
                name: otherParticipant.fullName || '',
                avatarUrl: otherParticipant.avatarUrl || '',
                isActive: presence,
              },
              messages: [],
              lastMessageTime: conv.lastMessage?.createdAt || conv.createdAt,
              unreadCount: conv.unreadCount || 0,
            };
          });

          this.data.update((data) => ({
            ...data,
            conversations: mappedConversations,
          }));

          this.loadMessagesForConversations(mappedConversations.map((c) => c.id));
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się załadować konwersacji' });
          return of([]);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  private loadMessagesForConversations(conversationIds: string[]): void {
    conversationIds.forEach((id) => {
      this.conversationsApi
        .getMessages(id)
        .pipe(
          tap((messages: MessageDto[]) => {
            const currentUserId = this.authService.currentUser()?.id;
            if (!currentUserId || !Array.isArray(messages)) {
              return;
            }

            const mappedMessages: ChatMessage[] = messages.map((msg) => ({
              id: msg.id,
              senderId: msg.senderId,
              senderName: msg.sender?.fullName || '',
              content: msg.content,
              timestamp: new Date(msg.createdAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
              isOwn: msg.senderId === currentUserId,
            }));

            this.data.update((data) => ({
              ...data,
              conversations: data.conversations.map((conv) =>
                conv.id === id ? { ...conv, messages: mappedMessages } : conv
              ),
            }));
          }),
          catchError((error) => {
            const errorMessage = errorToMessage(error);
            this.notifications.showError(errorMessage, { title: 'Nie udało się załadować wiadomości' });
            return of([]);
          })
        )
        .subscribe();
    });
  }

  loadConversation(conversationId: string): void {
    this.loading.set(true);
    this.conversationsApi
      .getById(conversationId)
      .pipe(
        tap((conv: ConversationDto) => {
          const currentUser = this.authService.currentUser();
          if (!currentUser) {
            return;
          }

          const otherParticipant = conv.participants.find((p) => p.id !== currentUser.id) || conv.participants[0];
          const presence = this.presenceMap().get(otherParticipant.id) ?? false;

          const mappedMessages: ChatMessage[] = (conv.lastMessage ? [conv.lastMessage] : []).map((msg) => ({
            id: msg.id,
            senderId: msg.senderId,
            senderName: msg.sender?.fullName || '',
            content: msg.content,
            timestamp: new Date(msg.createdAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
            isOwn: msg.senderId === currentUser.id,
          }));

          this.conversationsApi.getMessages(conversationId).subscribe((messages: MessageDto[]) => {
            if (!Array.isArray(messages)) {
              return;
            }

            const allMappedMessages: ChatMessage[] = messages.map((msg) => ({
              id: msg.id,
              senderId: msg.senderId,
              senderName: msg.sender?.fullName || '',
              content: msg.content,
              timestamp: new Date(msg.createdAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
              isOwn: msg.senderId === currentUser.id,
            }));

            const conversation: ChatConversation = {
              id: conv.id,
              participant: {
                id: otherParticipant.id,
                name: otherParticipant.fullName || '',
                avatarUrl: otherParticipant.avatarUrl || '',
                isActive: presence,
              },
              messages: allMappedMessages,
              lastMessageTime: conv.lastMessage?.createdAt || conv.createdAt,
              unreadCount: conv.unreadCount || 0,
            };

            this.data.update((data) => {
              const existingIndex = data.conversations.findIndex((c) => c.id === conversationId);
              const conversations = [...data.conversations];
              if (existingIndex >= 0) {
                conversations[existingIndex] = conversation;
              } else {
                conversations.push(conversation);
              }
              return {
                ...data,
                conversations: conversations.sort((a, b) => {
                  const timeA = new Date(a.lastMessageTime).getTime();
                  const timeB = new Date(b.lastMessageTime).getTime();
                  return timeB - timeA;
                }),
              };
            });
          });
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się załadować konwersacji' });
          return of(null);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  toggle(): void {
    this.isOpen.update((value) => !value);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  selectConversation(conversationId: string): void {
    const existingConv = this.data().conversations.find((c) => c.id === conversationId);
    if (!existingConv) {
      this.loadConversation(conversationId);
    }

    this.data.update((data) => {
      const conversations = data.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      );
      return {
        ...data,
        activeConversationId: conversationId,
        conversations,
      };
    });

    if (existingConv) {
      this.conversationsApi.markAsRead(conversationId).subscribe();
    }
  }

  sendMessage(content: string): void {
    const activeId = this.data().activeConversationId;
    if (!activeId || !content.trim()) {
      return;
    }

    const currentUser = this.currentUser();
    if (!currentUser) {
      return;
    }

    this.realtimeService.sendMessage(activeId, content.trim());

    this.conversationsApi.sendMessage(activeId, { content: content.trim() }).subscribe({
      next: (message: MessageDto) => {
        const chatMessage: ChatMessage = {
          id: message.id,
          senderId: message.senderId,
          senderName: message.sender?.fullName || currentUser.name,
          content: message.content,
          timestamp: new Date(message.createdAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
        };

        this.data.update((data) => ({
          ...data,
          conversations: data.conversations.map((conv) =>
            conv.id === activeId
              ? {
                  ...conv,
                  messages: [...conv.messages, chatMessage],
                  lastMessageTime: chatMessage.timestamp,
                  unreadCount: 0,
                }
              : conv
          ),
        }));
      },
      error: (error) => {
        const errorMessage = errorToMessage(error);
        this.notifications.showError(errorMessage, { title: 'Nie udało się wysłać wiadomości' });
      },
    });
  }

  sendTypingIndicator(isTyping: boolean): void {
    const activeId = this.data().activeConversationId;
    if (!activeId) {
      return;
    }
    this.realtimeService.sendTyping(activeId, isTyping);
  }

  isTyping(conversationId: string, userId: string): boolean {
    const typingMap = this.typingUsers();
    const users = typingMap.get(conversationId);
    return users ? users.has(userId) : false;
  }

  getTypingUsers(conversationId: string): string[] {
    const typingMap = this.typingUsers();
    const users = typingMap.get(conversationId);
    return users ? Array.from(users) : [];
  }
}
