import { computed, Injectable, signal } from '@angular/core';
import { ChatConversation, ChatData, ChatMessage } from './chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  readonly isOpen = signal<boolean>(false);
  readonly data = signal<ChatData>({
    currentUserId: 'user-1',
    activeConversationId: 'conv-1',
    conversations: [
      {
        id: 'conv-1',
        participant: {
          id: 'user-2',
          name: 'Anna Kowalska',
          avatarUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
          isActive: true,
        },
        lastMessageTime: '14.56',
        unreadCount: 0,
        messages: [
          {
            id: 'msg-1',
            senderId: 'user-1',
            senderName: 'Tymoteusz Stalmach',
            content:
              "Hey, I'm finalizing the UI for the launch—color scheme is set, but I'm tweaking typography for all devices. What do you think of the mockups?",
            timestamp: '14.43',
            isOwn: true,
          },
          {
            id: 'msg-2',
            senderId: 'user-2',
            senderName: 'Anna Kowalska',
            content:
              "Looks great, but button hover effects are lagging on older browsers—I'll optimize them. Let me know if you want to adjust the animation timing. 😉",
            timestamp: '14.53',
            isOwn: false,
          },
          {
            id: 'msg-3',
            senderId: 'user-1',
            senderName: 'Tymoteusz Stalmach',
            content:
              'The design is solid, and Ive updated the backend for launch, but theres a minor form validation issue on the contact page Im fixing now.',
            timestamp: '',
            isOwn: true,
          },
          {
            id: 'msg-4',
            senderId: 'user-1',
            senderName: 'Tymoteusz Stalmach',
            content: "We're still on track for tomorrow!",
            timestamp: '14.56',
            isOwn: true,
          },
        ],
      },
      {
        id: 'conv-2',
        participant: {
          id: 'user-3',
          name: 'Jan Nowak',
          avatarUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          isActive: false,
        },
        lastMessageTime: '12.30',
        unreadCount: 2,
        messages: [
          {
            id: 'msg-5',
            senderId: 'user-3',
            senderName: 'Jan Nowak',
            content: 'Cześć! Czy możesz sprawdzić tę kwestię z API?',
            timestamp: '12.30',
            isOwn: false,
          },
          {
            id: 'msg-6',
            senderId: 'user-1',
            senderName: 'Tymoteusz Stalmach',
            content: 'Tak, sprawdzę to zaraz.',
            timestamp: '12.45',
            isOwn: true,
          },
        ],
      },
      {
        id: 'conv-3',
        participant: {
          id: 'user-4',
          name: 'Maria Wiśniewska',
          avatarUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
          isActive: false,
        },
        lastMessageTime: '10.15',
        unreadCount: 0,
        messages: [
          {
            id: 'msg-7',
            senderId: 'user-4',
            senderName: 'Maria Wiśniewska',
            content: 'Dzięki za pomoc z projektem!',
            timestamp: '10.15',
            isOwn: false,
          },
        ],
      },
      {
        id: 'conv-4',
        participant: {
          id: 'user-5',
          name: 'Katarzyna Zielińska',
          avatarUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
          isActive: false,
        },
        lastMessageTime: '09.00',
        unreadCount: 1,
        messages: [
          {
            id: 'msg-8',
            senderId: 'user-5',
            senderName: 'Katarzyna Zielińska',
            content: 'Czy możemy umówić się na spotkanie?',
            timestamp: '09.00',
            isOwn: false,
          },
        ],
      },
      {
        id: 'conv-5',
        participant: {
          id: 'user-6',
          name: 'Piotr Wójcik',
          avatarUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
          isActive: false,
        },
        lastMessageTime: 'Wczoraj',
        unreadCount: 0,
        messages: [
          {
            id: 'msg-9',
            senderId: 'user-6',
            senderName: 'Piotr Wójcik',
            content: 'Super, daj znać jak skończysz!',
            timestamp: 'Wczoraj',
            isOwn: false,
          },
        ],
      },
    ],
  });

  readonly activeConversation = computed(() => {
    const activeId = this.data().activeConversationId;
    if (!activeId) {
      return null;
    }
    return this.data().conversations.find((c) => c.id === activeId) || null;
  });

  readonly currentUser = computed(() => ({
    id: this.data().currentUserId,
    name: 'Tymoteusz Stalmach',
    avatarUrl:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=200&q=80',
  }));

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
    this.data.update((data) => ({
      ...data,
      activeConversationId: conversationId,
    }));
  }

  sendMessage(content: string): void {
    const activeId = this.data().activeConversationId;
    if (!activeId || !content.trim()) {
      return;
    }

    const currentUser = this.currentUser();
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    this.data.update((data) => ({
      ...data,
      conversations: data.conversations.map((conv) => {
        if (conv.id === activeId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessageTime: newMessage.timestamp,
          };
        }
        return conv;
      }),
    }));
  }
}
