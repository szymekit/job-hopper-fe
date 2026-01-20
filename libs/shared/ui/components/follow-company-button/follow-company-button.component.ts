import { ChangeDetectionStrategy, Component, input, output, inject, signal, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoritesApiService } from '@shared/api/services/favorites-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'jh-follow-company-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './follow-company-button.component.html',
  styleUrls: ['./follow-company-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowCompanyButtonComponent implements OnInit {
  private readonly favoritesApi = inject(FavoritesApiService);
  private readonly notifications = inject(NotificationsService);
  
  companyId = input.required<string>();
  initialFollowing = input<boolean>(false);
  
  following = signal<boolean>(this.initialFollowing());
  loading = signal<boolean>(false);
  
  followingChange = output<boolean>();

  ngOnInit(): void {
    this.checkStatus();
  }

  private checkStatus(): void {
    this.loading.set(true);
    this.favoritesApi
      .checkFollowedStatus(this.companyId())
      .pipe(
        tap((response) => {
          this.following.set(response.followed);
        }),
        catchError(() => {
          return of({ followed: false });
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  toggleFollow(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    const wasFollowing = this.following();

    if (wasFollowing) {
      this.favoritesApi
        .unfollowCompany(this.companyId())
        .pipe(
          tap(() => {
            this.following.set(false);
            this.followingChange.emit(false);
            this.notifications.showSuccess('Przestałeś obserwować tę firmę.');
          }),
          catchError((error) => {
            const errorMessage = errorToMessage(error);
            this.notifications.showError(errorMessage, { title: 'Nie udało się przestać obserwować firmy' });
            return of(null);
          })
        )
        .subscribe(() => {
          this.loading.set(false);
        });
    } else {
      this.favoritesApi
        .followCompany(this.companyId())
        .pipe(
          tap(() => {
            this.following.set(true);
            this.followingChange.emit(true);
            this.notifications.showSuccess('Obserwujesz teraz tę firmę.');
          }),
          catchError((error) => {
            const errorMessage = errorToMessage(error);
            this.notifications.showError(errorMessage, { title: 'Nie udało się obserwować firmy' });
            return of(null);
          })
        )
        .subscribe(() => {
          this.loading.set(false);
        });
    }
  }
}
