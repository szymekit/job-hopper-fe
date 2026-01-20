import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import { CreateCompanyDto, UpdateCompanyDto, CompanyDto } from '@shared/api/models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getAll(): Observable<CompanyDto[]> {
    return this.http.get<CompanyDto[]>(`${this.baseUrl}${API_ENDPOINTS.companies.getAll}`);
  }

  getById(id: string): Observable<CompanyDto> {
    return this.http.get<CompanyDto>(`${this.baseUrl}${API_ENDPOINTS.companies.getById(id)}`);
  }

  create(data: CreateCompanyDto): Observable<CompanyDto> {
    return this.http.post<CompanyDto>(`${this.baseUrl}${API_ENDPOINTS.companies.create}`, data);
  }

  update(id: string, data: UpdateCompanyDto): Observable<CompanyDto> {
    return this.http.patch<CompanyDto>(`${this.baseUrl}${API_ENDPOINTS.companies.update(id)}`, data);
  }
}
