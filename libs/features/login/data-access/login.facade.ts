import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginFormGroup, LoginFormValue, LoginUiState } from '@features/login/model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {
  private readonly formBuilder = inject(FormBuilder);

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

    setTimeout(() => {
      const shouldFail = value.email === 'fail@example.com';

      this.uiState.update((state) => ({
        ...state,
        submitting: false,
        submitError: shouldFail ? 'Nie udało się zalogować. Sprawdź dane i spróbuj ponownie.' : null,
      }));
    }, 600);
  }
}

