import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsService, NotificationType } from '@core/services/notifications.service';

@Component({
  selector: 'jh-notifications-container',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsContainerComponent {
  private readonly notificationsService = inject(NotificationsService);

  readonly notifications = this.notificationsService.notifications;

  getIcon(type: NotificationType): string {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'notifications';
    }
  }

  close(notificationId: string): void {
    this.notificationsService.remove(notificationId);
  }
}
