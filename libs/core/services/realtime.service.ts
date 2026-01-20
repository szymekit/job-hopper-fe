import { Injectable, inject, signal } from '@angular/core';
import { Observable, Subject, filter, map } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationsService } from './notifications.service';
import { WS_BASE_URL } from '@core/config/api.config';

export interface RealtimeMessage {
  type: string;
  payload: unknown;
}

export interface ChatMessagePayload {
  conversationId: string;
  messageId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface TypingPayload {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

export interface PresencePayload {
  userId: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

export interface NotificationPayload {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  private readonly authService = inject(AuthService);
  private readonly notifications = inject(NotificationsService);
  private ws: WebSocket | null = null;
  private readonly messagesSubject = new Subject<RealtimeMessage>();
  private readonly connected = signal<boolean>(false);
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly connected$ = this.connected.asReadonly();

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      return;
    }

    const wsUrl = `${WS_BASE_URL}?token=${token}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.connected.set(true);
      if (this.reconnectAttempts > 0) {
        this.notifications.showInfo('Połączenie z czatem zostało przywrócone.');
      }
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const message: RealtimeMessage = JSON.parse(event.data);
        this.messagesSubject.next(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.connected.set(false);
    };

    this.ws.onclose = (event) => {
      this.connected.set(false);
      if (event.code !== 1000) {
        this.reconnectAttempts++;
        if (this.reconnectAttempts === 1) {
          this.notifications.showWarning('Połączenie z czatem zostało utracone. Próba ponownego połączenia...');
        }
        this.attemptReconnect();
      }
    };
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connected.set(false);
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

    this.reconnectTimeout = setTimeout(() => {
      if (this.authService.isAuthenticated()) {
        this.connect();
      }
    }, delay);
  }

  sendMessage(conversationId: string, content: string): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    this.ws.send(
      JSON.stringify({
        type: 'message',
        payload: {
          conversationId,
          content,
        },
      })
    );
  }

  sendTyping(conversationId: string, isTyping: boolean): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    this.ws.send(
      JSON.stringify({
        type: 'typing',
        payload: {
          conversationId,
          isTyping,
        },
      })
    );
  }

  onMessage(): Observable<ChatMessagePayload> {
    return this.messagesSubject.pipe(
      filter((msg) => msg.type === 'message'),
      map((msg) => msg.payload as ChatMessagePayload)
    );
  }

  onTyping(): Observable<TypingPayload> {
    return this.messagesSubject.pipe(
      filter((msg) => msg.type === 'typing'),
      map((msg) => msg.payload as TypingPayload)
    );
  }

  onPresence(): Observable<PresencePayload> {
    return this.messagesSubject.pipe(
      filter((msg) => msg.type === 'presence'),
      map((msg) => msg.payload as PresencePayload)
    );
  }

  onNotification(): Observable<NotificationPayload> {
    return this.messagesSubject.pipe(
      filter((msg) => msg.type === 'notification'),
      map((msg) => msg.payload as NotificationPayload)
    );
  }
}
