import { Injectable, inject, signal } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardApiService } from '@shared/api/services/dashboard-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { CompanyDashboardSummaryDto } from '@shared/api/models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyDashboardFacade {
  private readonly dashboardApi = inject(DashboardApiService);
  private readonly notifications = inject(NotificationsService);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly summary = signal<CompanyDashboardSummaryDto | null>(null);

  loadSummary(companyId?: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.dashboardApi
      .getCompanySummary(companyId)
      .pipe(
        tap((summary) => {
          this.summary.set(summary);
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.error.set(errorMessage);
          this.notifications.showError(errorMessage, { title: 'Nie udało się załadować podsumowania dashboardu' });
          return of(null);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }
}
