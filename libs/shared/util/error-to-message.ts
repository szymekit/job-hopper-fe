import { HttpErrorResponse } from '@angular/common/http';

export function errorToMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'Brak połączenia z serwerem. Sprawdź połączenie internetowe.';
    }

    if (error.error) {
      if (typeof error.error === 'string') {
        return error.error;
      }

      if (error.error.message) {
        return error.error.message;
      }

      if (error.error.error) {
        if (typeof error.error.error === 'string') {
          return error.error.error;
        }
      }

      if (Array.isArray(error.error.errors) && error.error.errors.length > 0) {
        return error.error.errors.map((e: { message?: string; msg?: string }) => e.message || e.msg).join(', ');
      }
    }

    switch (error.status) {
      case 400:
        return 'Nieprawidłowe dane. Sprawdź wprowadzone informacje.';
      case 401:
        return 'Brak autoryzacji. Zaloguj się ponownie.';
      case 403:
        return 'Brak uprawnień do wykonania tej operacji.';
      case 404:
        return 'Nie znaleziono żądanego zasobu.';
      case 409:
        return 'Konflikt danych. Sprawdź wprowadzone informacje.';
      case 422:
        return 'Błąd walidacji. Sprawdź wprowadzone dane.';
      case 429:
        return 'Zbyt wiele żądań. Spróbuj ponownie za chwilę.';
      case 500:
        return 'Błąd serwera. Spróbuj ponownie później.';
      case 502:
      case 503:
      case 504:
        return 'Serwer jest chwilowo niedostępny. Spróbuj ponownie później.';
      default:
        return `Błąd ${error.status}: ${error.statusText || 'Nieznany błąd'}`;
    }
  }

  if (error instanceof Error) {
    return error.message || 'Wystąpił nieoczekiwany błąd.';
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.';
}
