import { Injectable, inject, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { OffersApiService } from '@shared/api/services/offers-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { JobOfferData } from '@features/job-offer/model/job-offer.model';

@Injectable({
  providedIn: 'root',
})
export class JobOfferFacade {
  private readonly offersApi = inject(OffersApiService);
  private readonly notifications = inject(NotificationsService);
  private readonly offerId = signal<string | null>(null);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly data = signal<JobOfferData | null>(null);

  loadOffer(id: string): void {
    this.offerId.set(id);
    this.loading.set(true);
    this.error.set(null);

    this.offersApi
      .getById(id)
      .pipe(
        catchError((error) => {
          const errorMessage = error.status === 404 ? 'Oferta pracy nie została znaleziona.' : errorToMessage(error);
          this.error.set(errorMessage);
          this.loading.set(false);
          if (error.status !== 404) {
            this.notifications.showError(errorMessage, { title: 'Nie udało się załadować oferty' });
          }
          return of(null);
        })
      )
      .subscribe((offer) => {
        this.loading.set(false);
        if (offer) {
          this.data.set(this.mapOfferToData(offer));
        }
      });
  }

  applyToOffer(id: string): void {
    this.offersApi
      .apply(id)
      .pipe(
        tap(() => {
          this.notifications.showSuccess('Aplikacja została wysłana. Rozmowa z firmą została rozpoczęta.', {
            title: 'Aplikacja wysłana',
          });
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się wysłać aplikacji' });
          return of(null);
        })
      )
      .subscribe();
  }

  private mapOfferToData(offer: any): JobOfferData {
    const aboutSection = offer.sections?.find((s: any) => s.type === 'ABOUT');
    const competenciesSection = offer.sections?.find((s: any) => s.type === 'COMPETENCIES');
    const benefitsSection = offer.sections?.find((s: any) => s.type === 'BENEFITS');

    const salaryText =
      offer.salaryFrom && offer.salaryTo
        ? `${offer.salaryFrom} - ${offer.salaryTo} ${offer.currency || 'zł'}/miesiąc`
        : offer.salaryFrom
          ? `od ${offer.salaryFrom} ${offer.currency || 'zł'}/miesiąc`
          : offer.salaryFrom === '0' && offer.salaryTo === '0'
            ? 'Staż/praktyka'
            : '';

    const tags = Array.isArray(offer.tags)
      ? offer.tags.map((tag: any) => (typeof tag === 'string' ? tag : tag?.name || ''))
      : [];

    const skills = Array.isArray(offer.skills)
      ? offer.skills.map((skill: any) => (typeof skill === 'string' ? skill : skill?.name || ''))
      : [];

    return {
      details: {
        id: offer.id,
        title: offer.title,
        header: {
          logoUrl: offer.company?.logoUrl || '',
          companyName: offer.company?.name || '',
          location: offer.location || '',
        },
        salary: salaryText,
        activeDays: '',
        description: offer.description || '',
        tags: tags.filter((t: string) => t),
      },
      about: {
        id: aboutSection?.id || 'about-1',
        title: aboutSection?.title || 'O ofercie pracy',
        items: aboutSection?.items || [],
      },
      competencies: {
        id: competenciesSection?.id || 'competencies-1',
        title: competenciesSection?.title || 'Wymagane kompetencje',
        items: competenciesSection?.items || [],
      },
      benefits: {
        id: benefitsSection?.id || 'benefits-1',
        title: benefitsSection?.title || 'Benefity dla Ciebie',
        items: benefitsSection?.items || [],
      },
      skills: {
        id: 'skills-1',
        skills: skills.filter((s: string) => s),
      },
      location: {
        id: 'location-1',
        address: offer.address || offer.location || '',
        latitude: offer.latitude || 0,
        longitude: offer.longitude || 0,
      },
    };
  }
}
