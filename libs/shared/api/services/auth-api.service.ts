import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import { RegisterDto, LoginDto, AuthResponseDto, UpdateProfileDto } from '@shared/api/models/auth.model';
import { UserDto } from '@shared/api/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  register(data: RegisterDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.register}`, data);
  }

  login(data: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.login}`, data);
  }

  getMe(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}${API_ENDPOINTS.auth.me}`);
  }

  updateProfile(data: UpdateProfileDto): Observable<UserDto> {
    return this.http.patch<UserDto>(`${this.baseUrl}${API_ENDPOINTS.users.updateProfile}`, data);
  }
}
