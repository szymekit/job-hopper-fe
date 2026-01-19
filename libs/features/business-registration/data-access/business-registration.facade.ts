import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  BusinessRegistrationFormGroup,
  BusinessRegistrationFormValue,
  BusinessRegistrationUiState,
} from '@features/business-registration/model/business-registration.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessRegistrationFacade {
  private readonly formBuilder = inject(FormBuilder);

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

    setTimeout(() => {
      this.uiState.update((state) => ({
        ...state,
        submitting: false,
        submitSuccess: true,
      }));
    }, 600);
  }
}

