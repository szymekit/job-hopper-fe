import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import { CreatePostDto, UpdatePostDto, PostDto, CreateCommentDto, CommentDto } from '@shared/api/models/feed.model';
import { PaginationParams } from '@shared/api/models/common.model';

@Injectable({
  providedIn: 'root',
})
export class FeedApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getAll(params?: PaginationParams): Observable<PostDto[]> {
    let httpParams = new HttpParams();
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return this.http.get<PostDto[]>(`${this.baseUrl}${API_ENDPOINTS.feed.getAll}`, { params: httpParams });
  }

  getByCompany(companyId: string, params?: PaginationParams): Observable<PostDto[]> {
    let httpParams = new HttpParams();
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return this.http.get<PostDto[]>(`${this.baseUrl}${API_ENDPOINTS.feed.getByCompany(companyId)}`, { params: httpParams });
  }

  getByUser(userId: string, params?: PaginationParams): Observable<PostDto[]> {
    let httpParams = new HttpParams();
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return this.http.get<PostDto[]>(`${this.baseUrl}${API_ENDPOINTS.feed.getByUser(userId)}`, { params: httpParams });
  }

  getById(id: string): Observable<PostDto> {
    return this.http.get<PostDto>(`${this.baseUrl}${API_ENDPOINTS.feed.getById(id)}`);
  }

  create(companyId: string, data: CreatePostDto): Observable<PostDto> {
    let httpParams = new HttpParams().set('companyId', companyId);
    return this.http.post<PostDto>(`${this.baseUrl}${API_ENDPOINTS.feed.create}`, data, { params: httpParams });
  }

  update(id: string, data: UpdatePostDto): Observable<PostDto> {
    return this.http.patch<PostDto>(`${this.baseUrl}${API_ENDPOINTS.feed.update(id)}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ENDPOINTS.feed.delete(id)}`);
  }

  like(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.feed.like(id)}`, {});
  }

  unlike(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ENDPOINTS.feed.unlike(id)}`);
  }

  getComments(postId: string, params?: PaginationParams): Observable<CommentDto[]> {
    let httpParams = new HttpParams();
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return this.http.get<CommentDto[]>(`${this.baseUrl}${API_ENDPOINTS.feed.getComments(postId)}`, { params: httpParams });
  }

  createComment(postId: string, data: CreateCommentDto): Observable<CommentDto> {
    return this.http.post<CommentDto>(`${this.baseUrl}${API_ENDPOINTS.feed.createComment(postId)}`, data);
  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ENDPOINTS.feed.deleteComment(commentId)}`);
  }
}
