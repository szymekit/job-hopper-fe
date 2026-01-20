import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import { ApplicationDto, UpdateApplicationStatusDto } from '@shared/api/models/application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getMyApplications(): Observable<ApplicationDto[]> {
    return this.http.get<ApplicationDto[]>(`${this.baseUrl}${API_ENDPOINTS.applications.getMyApplications}`);
  }

  getByJobOffer(offerId: string): Observable<ApplicationDto[]> {
    return this.http.get<ApplicationDto[]>(`${this.baseUrl}${API_ENDPOINTS.applications.getByJobOffer(offerId)}`);
  }

  updateStatus(id: string, data: UpdateApplicationStatusDto): Observable<ApplicationDto> {
    return this.http.patch<ApplicationDto>(`${this.baseUrl}${API_ENDPOINTS.applications.updateStatus(id)}`, data);
  }
}
