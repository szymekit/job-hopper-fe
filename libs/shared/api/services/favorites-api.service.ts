import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import {
  SavedOfferDto,
  FollowedCompanyDto,
  SavedOfferStatusResponse,
  FollowedCompanyStatusResponse,
} from '@shared/api/models/favorites.model';
import { PaginationParams } from '@shared/api/models/common.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  saveOffer(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.favorites.saveOffer(id)}`, {});
  }

  unsaveOffer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ENDPOINTS.favorites.unsaveOffer(id)}`);
  }

  getSavedOffers(params?: PaginationParams): Observable<SavedOfferDto[]> {
    let httpParams = new HttpParams();
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return this.http
      .get<{ data: SavedOfferDto[]; nextCursor: string | null } | SavedOfferDto[]>(
        `${this.baseUrl}${API_ENDPOINTS.savedOffers.getAll}`,
        { params: httpParams },
      )
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }
          return response.data || [];
        }),
      );
  }

  checkSavedStatus(id: string): Observable<SavedOfferStatusResponse> {
    return this.http.get<SavedOfferStatusResponse>(`${this.baseUrl}${API_ENDPOINTS.favorites.checkSavedStatus(id)}`);
  }

  followCompany(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.favorites.followCompany(id)}`, {});
  }

  unfollowCompany(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ENDPOINTS.favorites.unfollowCompany(id)}`);
  }

  getFollowedCompanies(params?: PaginationParams): Observable<FollowedCompanyDto[]> {
    let httpParams = new HttpParams();
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return this.http.get<FollowedCompanyDto[]>(`${this.baseUrl}${API_ENDPOINTS.favorites.getFollowedCompanies}`, { params: httpParams });
  }

  checkFollowedStatus(id: string): Observable<FollowedCompanyStatusResponse> {
    return this.http.get<FollowedCompanyStatusResponse>(`${this.baseUrl}${API_ENDPOINTS.favorites.checkFollowedStatus(id)}`);
  }
}
