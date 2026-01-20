import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import {
  ConversationDto,
  CreateConversationDto,
  MessageDto,
  CreateMessageDto,
} from '@shared/api/models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getAll(): Observable<ConversationDto[]> {
    return this.http
      .get<{ data: ConversationDto[]; nextCursor: string | null } | ConversationDto[]>(
        `${this.baseUrl}${API_ENDPOINTS.conversations.getAll}`,
      )
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }
          return response.data || [];
        }),
      );
  }

  getById(id: string): Observable<ConversationDto> {
    return this.http.get<ConversationDto>(`${this.baseUrl}${API_ENDPOINTS.conversations.getById(id)}`);
  }

  create(data: CreateConversationDto): Observable<ConversationDto> {
    return this.http.post<ConversationDto>(
      `${this.baseUrl}${API_ENDPOINTS.conversations.create}`,
      data,
    );
  }

  getMessages(conversationId: string, cursor?: string): Observable<MessageDto[]> {
    let params = new HttpParams();
    if (cursor) {
      params = params.set('cursor', cursor);
    }
    return this.http
      .get<{ data: MessageDto[]; nextCursor: string | null } | MessageDto[]>(
        `${this.baseUrl}${API_ENDPOINTS.messages.getAll(conversationId)}`,
        { params },
      )
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }
          return response.data || [];
        }),
      );
  }

  sendMessage(conversationId: string, data: CreateMessageDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.baseUrl}${API_ENDPOINTS.messages.create(conversationId)}`, data);
  }

  markAsRead(conversationId: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}${API_ENDPOINTS.messages.markAsRead(conversationId)}`, {});
  }
}
