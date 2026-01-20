import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginFormGroup, LoginFormValue, LoginUiState } from '@features/login/model/login.model';
import { AuthApiService } from '@shared/api/services/auth-api.service';
import { AuthService } from '@core/services/auth.service';
import { RealtimeService } from '@core/services/realtime.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authApi = inject(AuthApiService);
  private readonly authService = inject(AuthService);
  private readonly realtimeService = inject(RealtimeService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationsService);

  readonly form: LoginFormGroup = this.formBuilder.nonNullable.group({
    email: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required],
    }),
    rememberMe: this.formBuilder.nonNullable.control(false),
  });

  readonly uiState = signal<LoginUiState>({
    submitting: false,
    submitError: null,
  });

  submit(): void {
    if (!this.form.valid || this.uiState().submitting) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as LoginFormValue;

    this.uiState.update((state) => ({
      ...state,
      submitting: true,
      submitError: null,
    }));

    this.authApi
      .login({
        email: value.email,
        password: value.password,
      })
      .pipe(
        tap((response) => {
          this.authService.setToken(response.accessToken);
          this.authService.setUser(response.user);
          this.realtimeService.connect();
          this.uiState.update((state) => ({
            ...state,
            submitting: false,
            submitError: null,
          }));
          const userName = response.user.fullName || response.user.email;
          this.notifications.showSuccess(`Witaj ponownie${userName ? `, ${userName}` : ''}!`);

          const returnUrl = this.router.parseUrl(this.router.url).queryParams['returnUrl'];
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else {
            if (response.user.role === 'EMPLOYEE') {
              this.router.navigate(['/app/dashboard']);
            } else if (response.user.role === 'RECRUITER') {
              this.router.navigate(['/app/company/dashboard']);
            } else {
              this.router.navigate(['/app/dashboard']);
            }
          }
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.uiState.update((state) => ({
            ...state,
            submitting: false,
            submitError: errorMessage,
          }));
          this.notifications.showError(errorMessage, { title: 'Błąd logowania' });
          return of(null);
        })
      )
      .subscribe();
  }
}
