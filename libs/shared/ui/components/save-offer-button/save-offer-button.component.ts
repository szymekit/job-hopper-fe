import { ChangeDetectionStrategy, Component, input, output, inject, signal, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoritesApiService } from '@shared/api/services/favorites-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'jh-save-offer-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './save-offer-button.component.html',
  styleUrls: ['./save-offer-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveOfferButtonComponent {
  private readonly favoritesApi = inject(FavoritesApiService);
  private readonly notifications = inject(NotificationsService);
  
  offerId = input.required<string>();
  initialSaved = input<boolean>(false);
  
  saved = signal<boolean>(this.initialSaved());
  loading = signal<boolean>(false);
  
  savedChange = output<boolean>();

  ngOnInit(): void {
    this.checkStatus();
  }

  private checkStatus(): void {
    this.loading.set(true);
    this.favoritesApi
      .checkSavedStatus(this.offerId())
      .pipe(
        tap((response) => {
          this.saved.set(response.saved);
        }),
        catchError(() => {
          return of({ saved: false });
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  toggleSave(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    const wasSaved = this.saved();

    if (wasSaved) {
      this.favoritesApi
        .unsaveOffer(this.offerId())
        .pipe(
          tap(() => {
            this.saved.set(false);
            this.savedChange.emit(false);
            this.notifications.showSuccess('Oferta została usunięta z zapisanych.');
          }),
          catchError((error) => {
            const errorMessage = errorToMessage(error);
            this.notifications.showError(errorMessage, { title: 'Nie udało się usunąć oferty' });
            return of(null);
          })
        )
        .subscribe(() => {
          this.loading.set(false);
        });
    } else {
      this.favoritesApi
        .saveOffer(this.offerId())
        .pipe(
          tap(() => {
            this.saved.set(true);
            this.savedChange.emit(true);
            this.notifications.showSuccess('Oferta została zapisana.');
          }),
          catchError((error) => {
            const errorMessage = errorToMessage(error);
            this.notifications.showError(errorMessage, { title: 'Nie udało się zapisać oferty' });
            return of(null);
          })
        )
        .subscribe(() => {
          this.loading.set(false);
        });
    }
  }
}
