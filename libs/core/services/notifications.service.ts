import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  createdAt: number;
  duration?: number;
  persistent?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  readonly notifications = signal<AppNotification[]>([]);
  private readonly defaultDuration = 5000;
  private readonly errorDuration = 7000;

  show(type: NotificationType, message: string, options?: { title?: string; duration?: number; persistent?: boolean }): void {
    const notification: AppNotification = {
      id: this.generateId(),
      type,
      message,
      title: options?.title,
      createdAt: Date.now(),
      duration: options?.duration ?? (type === 'error' ? this.errorDuration : this.defaultDuration),
      persistent: options?.persistent ?? (type === 'error'),
    };

    this.notifications.update((notifications) => [...notifications, notification]);

    if (!notification.persistent && notification.duration) {
      setTimeout(() => {
        this.remove(notification.id);
      }, notification.duration);
    }
  }

  showSuccess(message: string, options?: { title?: string; duration?: number }): void {
    this.show('success', message, options);
  }

  showError(message: string, options?: { title?: string; duration?: number; persistent?: boolean }): void {
    this.show('error', message, { ...options, persistent: options?.persistent ?? true });
  }

  showInfo(message: string, options?: { title?: string; duration?: number }): void {
    this.show('info', message, options);
  }

  showWarning(message: string, options?: { title?: string; duration?: number }): void {
    this.show('warning', message, options);
  }

  remove(id: string): void {
    this.notifications.update((notifications) => notifications.filter((n) => n.id !== id));
  }

  clear(): void {
    this.notifications.set([]);
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
