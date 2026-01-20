import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import { CreateOfferDto, UpdateOfferDto, OfferDto, OfferFilters, MatchScoreResponse } from '@shared/api/models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OffersApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getAll(filters?: OfferFilters): Observable<OfferDto[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              params = params.append(key, item);
            });
          } else {
            params = params.set(key, value.toString());
          }
        }
      });
    }
    return this.http
      .get<{ data: OfferDto[]; nextCursor: string | null } | OfferDto[]>(`${this.baseUrl}${API_ENDPOINTS.offers.getAll}`, { params })
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }
          return response.data || [];
        }),
      );
  }

  getById(id: string): Observable<OfferDto> {
    return this.http.get<OfferDto>(`${this.baseUrl}${API_ENDPOINTS.offers.getById(id)}`);
  }

  create(data: CreateOfferDto): Observable<OfferDto> {
    return this.http.post<OfferDto>(`${this.baseUrl}${API_ENDPOINTS.offers.create}`, data);
  }

  update(id: string, data: UpdateOfferDto): Observable<OfferDto> {
    return this.http.patch<OfferDto>(`${this.baseUrl}${API_ENDPOINTS.offers.update(id)}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ENDPOINTS.offers.delete(id)}`);
  }

  apply(id: string): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.baseUrl}${API_ENDPOINTS.offers.apply(id)}`, {});
  }

  getMatchScore(id: string): Observable<MatchScoreResponse> {
    return this.http.get<MatchScoreResponse>(`${this.baseUrl}${API_ENDPOINTS.offers.matchScore(id)}`);
  }
}
