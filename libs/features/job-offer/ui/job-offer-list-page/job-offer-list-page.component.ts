import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OffersApiService } from '@shared/api/services/offers-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OfferDto } from '@shared/api/models/offer.model';

@Component({
  selector: 'jh-job-offer-list-page',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './job-offer-list-page.component.html',
  styleUrls: ['./job-offer-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOfferListPageComponent implements OnInit {
  private readonly offersApi = inject(OffersApiService);
  private readonly notifications = inject(NotificationsService);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly offers = signal<OfferDto[]>([]);

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.offersApi
      .getAll()
      .pipe(
        tap((offers) => {
          this.offers.set(offers);
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.error.set(errorMessage);
          this.notifications.showError(errorMessage, { title: 'Nie udało się załadować ofert' });
          return of([]);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  getTagName(tag: any): string {
    return typeof tag === 'string' ? tag : tag?.name || '';
  }

  formatSalary(offer: OfferDto): string {
    if (offer.salaryFrom && offer.salaryTo) {
      return `${offer.salaryFrom} - ${offer.salaryTo} ${offer.currency || 'zł'}/miesiąc`;
    }
    if (offer.salaryFrom) {
      return `od ${offer.salaryFrom} ${offer.currency || 'zł'}/miesiąc`;
    }
    if (offer.salaryFrom === '0' || offer.salaryFrom === 0) {
      return 'Staż/praktyka';
    }
    return '';
  }
}
