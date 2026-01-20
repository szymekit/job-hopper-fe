import { Injectable, inject, signal } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FavoritesApiService } from '@shared/api/services/favorites-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { SavedOfferDto } from '@shared/api/models/favorites.model';
import { PaginationParams } from '@shared/api/models/common.model';

@Injectable({
  providedIn: 'root',
})
export class SavedOffersFacade {
  private readonly favoritesApi = inject(FavoritesApiService);
  private readonly notifications = inject(NotificationsService);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly offers = signal<SavedOfferDto[]>([]);

  loadOffers(params?: PaginationParams): void {
    this.loading.set(true);
    this.error.set(null);

    this.favoritesApi
      .getSavedOffers(params)
      .pipe(
        tap((offers) => {
          this.offers.set(offers);
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.error.set(errorMessage);
          this.notifications.showError(errorMessage, { title: 'Nie udało się załadować zapisanych ofert' });
          return of([]);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }
}
