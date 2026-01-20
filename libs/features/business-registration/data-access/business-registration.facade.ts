import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  BusinessRegistrationFormGroup,
  BusinessRegistrationFormValue,
  BusinessRegistrationUiState,
} from '@features/business-registration/model/business-registration.model';
import { AuthApiService } from '@shared/api/services/auth-api.service';
import { AuthService } from '@core/services/auth.service';
import { RealtimeService } from '@core/services/realtime.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';

@Injectable({
  providedIn: 'root',
})
export class BusinessRegistrationFacade {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authApi = inject(AuthApiService);
  private readonly authService = inject(AuthService);
  private readonly realtimeService = inject(RealtimeService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationsService);

  readonly form: BusinessRegistrationFormGroup = this.formBuilder.nonNullable.group({
    fullName: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required],
    }),
    taxNumber: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required],
    }),
    email: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
    }),
    phoneNumber: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required],
    }),
    password: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirmPassword: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required],
    }),
    acceptTerms: this.formBuilder.nonNullable.control(false, {
      validators: [Validators.requiredTrue],
    }),
    acceptMarketing: this.formBuilder.nonNullable.control(false),
  });

  readonly uiState = signal<BusinessRegistrationUiState>({
    submitting: false,
    submitError: null,
    submitSuccess: false,
  });

  submit(): void {
    if (!this.form.valid || this.uiState().submitting) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as BusinessRegistrationFormValue;

    if (value.password !== value.confirmPassword) {
      this.form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return;
    }

    this.uiState.update((state) => ({
      ...state,
      submitting: true,
      submitError: null,
    }));

    this.authApi
      .register({
        email: value.email,
        password: value.password,
        fullName: value.fullName,
        taxNumber: value.taxNumber,
        phoneNumber: value.phoneNumber,
        role: 'RECRUITER',
        marketingConsent: value.acceptMarketing,
      })
      .pipe(
        tap((response) => {
          this.authService.setToken(response.accessToken);
          this.authService.setUser(response.user);
          this.realtimeService.connect();
          this.uiState.update((state) => ({
            ...state,
            submitting: false,
            submitSuccess: true,
            submitError: null,
          }));
          setTimeout(() => {
            this.router.navigate(['/app/company/dashboard']);
          }, 500);
        }),
        catchError((error) => {
          const errorMessage =
            error.status === 409
              ? 'Użytkownik o podanym adresie email już istnieje.'
              : 'Nie udało się utworzyć konta. Spróbuj ponownie.';
          this.uiState.update((state) => ({
            ...state,
            submitting: false,
            submitError: errorMessage,
          }));
          return of(null);
        })
      )
      .subscribe();
  }
}
