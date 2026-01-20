import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import {
  AvailabilitySlotDto,
  CreateAvailabilitySlotDto,
  UpdateAvailabilitySlotDto,
} from '@shared/api/models/availability.model';
import { PaginationParams } from '@shared/api/models/common.model';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getAll(params?: PaginationParams): Observable<AvailabilitySlotDto[]> {
    let httpParams = new HttpParams();
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return this.http.get<AvailabilitySlotDto[]>(`${this.baseUrl}${API_ENDPOINTS.availability.getAll}`, {
      params: httpParams,
    });
  }

  getAvailable(params?: PaginationParams): Observable<AvailabilitySlotDto[]> {
    let httpParams = new HttpParams();
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return this.http.get<AvailabilitySlotDto[]>(`${this.baseUrl}${API_ENDPOINTS.availability.getAvailable}`, {
      params: httpParams,
    });
  }

  getById(id: string): Observable<AvailabilitySlotDto> {
    return this.http.get<AvailabilitySlotDto>(`${this.baseUrl}${API_ENDPOINTS.availability.getById(id)}`);
  }

  create(data: CreateAvailabilitySlotDto): Observable<AvailabilitySlotDto> {
    return this.http.post<AvailabilitySlotDto>(`${this.baseUrl}${API_ENDPOINTS.availability.create}`, data);
  }

  update(id: string, data: UpdateAvailabilitySlotDto): Observable<AvailabilitySlotDto> {
    return this.http.patch<AvailabilitySlotDto>(`${this.baseUrl}${API_ENDPOINTS.availability.update(id)}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ENDPOINTS.availability.delete(id)}`);
  }
}
