import { Injectable, inject, signal, effect } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { RealtimeService, NotificationPayload } from '@core/services/realtime.service';
import { NotificationsApiService } from '@shared/api/services/notifications-api.service';
import { NotificationDto } from '@shared/api/models/notification.model';
import { catchError, tap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsStore {
  private readonly notificationsApi = inject(NotificationsApiService);
  private readonly realtimeService = inject(RealtimeService);
  private readonly authService = inject(AuthService);
  private subscription?: Subscription;

  readonly notifications = signal<NotificationDto[]>([]);
  readonly unreadCount = signal<number>(0);
  readonly loading = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.loadNotifications();
        this.setupRealtimeSubscription();
      } else {
        this.notifications.set([]);
        this.unreadCount.set(0);
        this.unsubscribeRealtime();
      }
    });

    effect(() => {
      this.updateUnreadCount();
    });
  }

  private setupRealtimeSubscription(): void {
    this.unsubscribeRealtime();
    this.subscription = this.realtimeService.onNotification().subscribe((payload: NotificationPayload) => {
      const notification: NotificationDto = {
        id: payload.id,
        type: payload.type,
        title: payload.title,
        message: payload.message,
        read: false,
        createdAt: payload.createdAt,
        link: payload.link,
      };
      this.notifications.update((notifications) => [notification, ...notifications]);
      this.unreadCount.update((count) => count + 1);
    });
  }

  private unsubscribeRealtime(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  loadNotifications(unreadOnly?: boolean): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }

    this.loading.set(true);
    this.notificationsApi
      .getAll(unreadOnly)
      .pipe(
        tap((notifications) => {
          this.notifications.set(notifications);
        }),
        catchError((error) => {
          console.error('Failed to load notifications:', error);
          return of([]);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });

    this.loadUnreadCount();
  }

  loadUnreadCount(): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }

    this.notificationsApi
      .getUnreadCount()
      .pipe(
        tap((response) => {
          this.unreadCount.set(response.count);
        }),
        catchError((error) => {
          console.error('Failed to load unread count:', error);
          return of({ count: 0 });
        })
      )
      .subscribe();
  }

  markAsRead(notificationIds?: string[], markAll?: boolean): void {
    this.notificationsApi
      .markAsRead({ notificationIds, markAll })
      .pipe(
        tap(() => {
          if (markAll) {
            this.notifications.update((notifications) =>
              notifications.map((n) => ({ ...n, read: true }))
            );
          } else if (notificationIds) {
            this.notifications.update((notifications) =>
              notifications.map((n) =>
                notificationIds.includes(n.id) ? { ...n, read: true } : n
              )
            );
          }
        }),
        catchError((error) => {
          console.error('Failed to mark notifications as read:', error);
          return of(void 0);
        })
      )
      .subscribe();
  }

  private updateUnreadCount(): void {
    const count = this.notifications().filter((n) => !n.read).length;
    this.unreadCount.set(count);
  }
}
