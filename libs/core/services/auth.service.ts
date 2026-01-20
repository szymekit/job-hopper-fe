import { Injectable, signal, computed } from '@angular/core';
import { UserDto } from '@shared/api/models/user.model';
import { UserRole } from '@shared/api/models/common.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  readonly isAuthenticated = signal<boolean>(this.hasToken());
  readonly currentUser = signal<UserDto | null>(this.getStoredUser());

  readonly isEmployee = computed(() => {
    const user = this.currentUser();
    return user?.role === 'EMPLOYEE';
  });

  readonly isRecruiter = computed(() => {
    const user = this.currentUser();
    return user?.role === 'RECRUITER';
  });

  readonly isAdmin = computed(() => {
    const user = this.currentUser();
    return user?.role === 'ADMIN';
  });

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuthenticated.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setUser(user: UserDto): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  getStoredUser(): UserDto | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUser();
    return user?.role === role;
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }

  refreshUser(user: UserDto): void {
    this.setUser(user);
  }
}
