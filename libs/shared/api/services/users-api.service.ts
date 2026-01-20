import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import { UserDto } from '@shared/api/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  getById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}${API_ENDPOINTS.users.getById(id)}`);
  }
}
