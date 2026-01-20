import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import {
  NotificationDto,
  MarkReadDto,
  UnreadCountResponse,
} from '@shared/api/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getAll(unreadOnly?: boolean, page?: number, limit?: number): Observable<NotificationDto[]> {
    let params = new HttpParams();
    if (unreadOnly !== undefined) {
      params = params.set('unreadOnly', unreadOnly.toString());
    }
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (limit !== undefined) {
      params = params.set('limit', limit.toString());
    }
    return this.http.get<NotificationDto[]>(`${this.baseUrl}${API_ENDPOINTS.notifications.getAll}`, {
      params,
    });
  }

  markAsRead(data: MarkReadDto): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}${API_ENDPOINTS.notifications.markAsRead}`, data);
  }

  getUnreadCount(): Observable<UnreadCountResponse> {
    return this.http.get<UnreadCountResponse>(
      `${this.baseUrl}${API_ENDPOINTS.notifications.getUnreadCount}`,
    );
  }
}
