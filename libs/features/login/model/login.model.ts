import { FormControl, FormGroup } from '@angular/forms';

export interface LoginFormValue {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type LoginFormGroup = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
}>;

export interface LoginUiState {
  submitting: boolean;
  submitError: string | null;
}

