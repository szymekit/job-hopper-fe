import { Injectable, inject, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { CompaniesApiService } from '@shared/api/services/companies-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { CompanyProfileData } from '@features/company-profile/model/company-profile.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyProfileFacade {
  private readonly companiesApi = inject(CompaniesApiService);
  private readonly notifications = inject(NotificationsService);
  private readonly companyId = signal<string | null>(null);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly data = signal<CompanyProfileData | null>(null);

  loadCompany(id: string): void {
    this.companyId.set(id);
    this.loading.set(true);
    this.error.set(null);

    this.companiesApi
      .getById(id)
      .pipe(
        catchError((error) => {
          this.error.set(error.status === 404 ? 'Firma nie została znaleziona.' : 'Nie udało się załadować profilu firmy.');
          this.loading.set(false);
          return of(null);
        })
      )
      .subscribe((company) => {
        this.loading.set(false);
        if (company) {
          this.data.set(this.mapCompanyToProfileData(company));
        }
      });
  }

  private mapCompanyToProfileData(company: any): CompanyProfileData {
    return {
      header: {
        id: company.id,
        companyName: company.name,
        tagline: company.tagline || '',
        logoUrl: company.logoUrl || '',
        coverUrl: company.coverUrl || '',
        companyType: company.companyType || '',
        location: company.location || '',
        country: company.country || '',
        employeeCount: company.employeeCount || '',
        activeRecruitment: company.activeRecruitment || false,
      },
      summaryCards: [
        {
          id: 'card-1',
          label: 'Siedziba główna',
          value: company.headquarters || '',
        },
        {
          id: 'card-2',
          label: 'Dostępne stanowiska',
          value: '12 ofert',
        },
        {
          id: 'card-3',
          label: 'Typ etatu',
          value: company.companyType || '',
        },
        {
          id: 'card-4',
          label: 'Działalność podstawowa',
          value: company.companyType || '',
        },
      ],
      navigationTabs: [
        {
          id: 'tab-1',
          label: 'O firmie',
          active: true,
        },
        {
          id: 'tab-2',
          label: 'Oferty pracy',
          active: false,
        },
        {
          id: 'tab-3',
          label: 'Benefity',
          active: false,
        },
        {
          id: 'tab-4',
          label: 'Opinie',
          active: false,
        },
        {
          id: 'tab-5',
          label: 'Kontakt',
          active: false,
        },
      ],
      aboutSections: [
        {
          id: 'about-1',
          title: 'O firmie',
          content: company.description || '',
        },
      ],
      benefits: [],
      portfolio: [],
      jobOffers: [],
      reviews: [],
      totalReviews: 0,
    };
  }
}
