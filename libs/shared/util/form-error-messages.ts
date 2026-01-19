import { AbstractControl } from '@angular/forms';

export function getEmailError(control: AbstractControl<string | null>): string | null {
  if (!control.touched) {
    return null;
  }

  if (control.hasError('required')) {
    return 'Pole jest wymagane';
  }

  if (control.hasError('email')) {
    return 'Wprowadź poprawny adres e-mail';
  }

  return null;
}

export function getPasswordError(control: AbstractControl<string | null>): string | null {
  if (!control.touched) {
    return null;
  }

  if (control.hasError('required')) {
    return 'Pole jest wymagane';
  }

  if (control.hasError('minlength')) {
    return 'Hasło powinno mieć co najmniej 6 znaków';
  }

  return null;
}

export function getConfirmPasswordError(control: AbstractControl<string | null>): string | null {
  if (!control.touched) {
    return null;
  }

  if (control.hasError('required')) {
    return 'Pole jest wymagane';
  }

  if (control.hasError('passwordMismatch')) {
    return 'Hasła nie są identyczne';
  }

  return null;
}

