import { Injectable, inject, signal } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { FeedApiService } from '@shared/api/services/feed-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { PostDto, CreatePostDto, CreateCommentDto, CommentDto } from '@shared/api/models/feed.model';
import { PaginationParams } from '@shared/api/models/common.model';

@Injectable({
  providedIn: 'root',
})
export class FeedFacade {
  private readonly feedApi = inject(FeedApiService);
  private readonly notifications = inject(NotificationsService);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly posts = signal<PostDto[]>([]);

  loadFeed(params?: PaginationParams): void {
    this.loading.set(true);
    this.error.set(null);

    this.feedApi
      .getAll(params)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }
          if (response && typeof response === 'object' && 'data' in response) {
            return (response as { data: PostDto[] }).data || [];
          }
          return [];
        }),
        tap((posts) => {
          this.posts.set(posts);
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.error.set(errorMessage);
          this.notifications.showError(errorMessage, { title: 'Nie udało się załadować feedu' });
          return of([]);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  loadByCompany(companyId: string, params?: PaginationParams): void {
    this.loading.set(true);
    this.error.set(null);

    this.feedApi
      .getByCompany(companyId, params)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }
          if (response && typeof response === 'object' && 'data' in response) {
            return (response as { data: PostDto[] }).data || [];
          }
          return [];
        }),
        tap((posts) => {
          this.posts.set(posts);
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.error.set(errorMessage);
          this.notifications.showError(errorMessage, { title: 'Nie udało się załadować postów firmy' });
          return of([]);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  createPost(companyId: string, data: CreatePostDto): void {
    this.feedApi
      .create(companyId, data)
      .pipe(
        tap((post) => {
          this.posts.update((posts) => [post, ...posts]);
          this.notifications.showSuccess('Post został opublikowany.');
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się opublikować posta' });
          return of({} as PostDto);
        })
      )
      .subscribe();
  }

  likePost(postId: string): void {
    this.feedApi
      .like(postId)
      .pipe(
        tap(() => {
          this.posts.update((posts) =>
            posts.map((post) =>
              post.id === postId
                ? { ...post, isLiked: true, likesCount: post.likesCount + 1 }
                : post
            )
          );
        }),
        catchError((error) => {
          console.error('Failed to like post:', error);
          return of(void 0);
        })
      )
      .subscribe();
  }

  unlikePost(postId: string): void {
    this.feedApi
      .unlike(postId)
      .pipe(
        tap(() => {
          this.posts.update((posts) =>
            posts.map((post) =>
              post.id === postId
                ? { ...post, isLiked: false, likesCount: Math.max(0, post.likesCount - 1) }
                : post
            )
          );
        }),
        catchError((error) => {
          console.error('Failed to unlike post:', error);
          return of(void 0);
        })
      )
      .subscribe();
  }

  createComment(postId: string, data: CreateCommentDto): void {
    this.feedApi
      .createComment(postId, data)
      .pipe(
        tap(() => {
          this.posts.update((posts) =>
            posts.map((post) =>
              post.id === postId ? { ...post, commentsCount: post.commentsCount + 1 } : post
            )
          );
          this.notifications.showSuccess('Komentarz został dodany.');
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się dodać komentarza' });
          return of({} as CommentDto);
        })
      )
      .subscribe();
  }
}
