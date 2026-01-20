import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import { CreateSavedSearchDto, UpdateSavedSearchDto, SavedSearchDto } from '@shared/api/models/saved-search.model';

@Injectable({
  providedIn: 'root',
})
export class SavedSearchesApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getAll(): Observable<SavedSearchDto[]> {
    return this.http.get<SavedSearchDto[]>(`${this.baseUrl}${API_ENDPOINTS.savedSearches.getAll}`);
  }

  create(data: CreateSavedSearchDto): Observable<SavedSearchDto> {
    return this.http.post<SavedSearchDto>(`${this.baseUrl}${API_ENDPOINTS.savedSearches.create}`, data);
  }

  update(id: string, data: UpdateSavedSearchDto): Observable<SavedSearchDto> {
    return this.http.patch<SavedSearchDto>(`${this.baseUrl}${API_ENDPOINTS.savedSearches.update(id)}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ENDPOINTS.savedSearches.delete(id)}`);
  }
}
