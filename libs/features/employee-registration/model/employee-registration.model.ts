import { FormControl, FormGroup } from '@angular/forms';

export interface EmployeeRegistrationFormValue {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

export type EmployeeRegistrationFormGroup = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  acceptTerms: FormControl<boolean>;
  acceptMarketing: FormControl<boolean>;
}>;

export interface EmployeeRegistrationRequestDto {
  email: string;
  password: string;
  marketingConsent: boolean;
}

export interface EmployeeRegistrationResponseDto {
  id: string;
  email: string;
}

export interface EmployeeRegistrationUiState {
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

