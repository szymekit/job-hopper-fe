import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FeedFacade } from '@features/feed/data-access/feed.facade';
import { PostDto } from '@shared/api/models/feed.model';

@Component({
  selector: 'jh-feed-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedPageComponent implements OnInit {
  private readonly facade = inject(FeedFacade);

  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly posts = this.facade.posts;

  ngOnInit(): void {
    this.facade.loadFeed();
  }

  toggleLike(post: PostDto): void {
    if (post.isLiked) {
      this.facade.unlikePost(post.id);
    } else {
      this.facade.likePost(post.id);
    }
  }

  toggleComments(postId: string): void {
    console.log('Toggle comments for post:', postId);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
