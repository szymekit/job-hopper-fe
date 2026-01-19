import { FormControl, FormGroup } from '@angular/forms';

export interface BusinessRegistrationFormValue {
  fullName: string;
  taxNumber: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

export type BusinessRegistrationFormGroup = FormGroup<{
  fullName: FormControl<string>;
  taxNumber: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  acceptTerms: FormControl<boolean>;
  acceptMarketing: FormControl<boolean>;
}>;

export interface BusinessRegistrationRequestDto {
  fullName: string;
  taxNumber: string;
  email: string;
  phoneNumber: string;
  password: string;
  marketingConsent: boolean;
}

export interface BusinessRegistrationResponseDto {
  id: string;
  email: string;
}

export interface BusinessRegistrationUiState {
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

