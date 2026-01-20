import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import { CompanyDashboardSummaryDto } from '@shared/api/models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getCompanySummary(companyId?: string): Observable<CompanyDashboardSummaryDto> {
    let httpParams = new HttpParams();
    if (companyId) {
      httpParams = httpParams.set('companyId', companyId);
    }
    return this.http.get<CompanyDashboardSummaryDto>(`${this.baseUrl}${API_ENDPOINTS.dashboard.getSummary}`, { params: httpParams });
  }
}
