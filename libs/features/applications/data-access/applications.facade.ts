import { Injectable, inject, signal } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApplicationsApiService } from '@shared/api/services/applications-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { ApplicationDto, UpdateApplicationStatusDto } from '@shared/api/models/application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsFacade {
  private readonly applicationsApi = inject(ApplicationsApiService);
  private readonly notifications = inject(NotificationsService);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly applications = signal<ApplicationDto[]>([]);

  loadMyApplications(): void {
    this.loading.set(true);
    this.error.set(null);

    this.applicationsApi
      .getMyApplications()
      .pipe(
        tap((applications) => {
          this.applications.set(applications);
        }),
        catchError((error) => {
          this.error.set('Nie udało się załadować aplikacji.');
          return of([]);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  loadByJobOffer(offerId: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.applicationsApi
      .getByJobOffer(offerId)
      .pipe(
        tap((applications) => {
          this.applications.set(applications);
        }),
        catchError((error) => {
          this.error.set('Nie udało się załadować aplikacji.');
          return of([]);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  updateStatus(applicationId: string, status: UpdateApplicationStatusDto): void {
    this.applicationsApi
      .updateStatus(applicationId, status)
      .pipe(
        tap((updated) => {
          this.applications.update((apps) =>
            apps.map((app) => (app.id === applicationId ? updated : app))
          );
          this.notifications.showSuccess('Status aplikacji został zaktualizowany.');
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się zaktualizować statusu aplikacji' });
          return of({} as ApplicationDto);
        })
      )
      .subscribe();
  }
}
