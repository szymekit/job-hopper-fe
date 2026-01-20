import { Injectable, inject, signal } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AvailabilityApiService } from '@shared/api/services/availability-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import {
  AvailabilitySlotDto,
  CreateAvailabilitySlotDto,
  UpdateAvailabilitySlotDto,
} from '@shared/api/models/availability.model';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityFacade {
  private readonly availabilityApi = inject(AvailabilityApiService);
  private readonly notifications = inject(NotificationsService);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly slots = signal<AvailabilitySlotDto[]>([]);

  loadSlots(): void {
    this.loading.set(true);
    this.error.set(null);

    this.availabilityApi
      .getAll()
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }
          if (response && typeof response === 'object' && 'data' in response) {
            return (response as { data: AvailabilitySlotDto[] }).data || [];
          }
          return [];
        }),
        tap((slots) => {
          this.slots.set(slots);
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.error.set(errorMessage);
          this.notifications.showError(errorMessage, { title: 'Nie udało się załadować dostępności' });
          return of([]);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  createSlot(data: CreateAvailabilitySlotDto): void {
    this.loading.set(true);
    this.availabilityApi
      .create(data)
      .pipe(
        tap((slot) => {
          this.slots.update((slots) => [...slots, slot]);
          this.notifications.showSuccess('Slot dostępności został dodany.');
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się dodać slotu dostępności' });
          return of(null);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  updateSlot(id: string, data: UpdateAvailabilitySlotDto): void {
    this.loading.set(true);
    this.availabilityApi
      .update(id, data)
      .pipe(
        tap((updatedSlot) => {
          this.slots.update((slots) => slots.map((slot) => (slot.id === id ? updatedSlot : slot)));
          this.notifications.showSuccess('Slot dostępności został zaktualizowany.');
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się zaktualizować slotu dostępności' });
          return of(null);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  deleteSlot(id: string): void {
    this.loading.set(true);
    this.availabilityApi
      .delete(id)
      .pipe(
        tap(() => {
          this.slots.update((slots) => slots.filter((slot) => slot.id !== id));
          this.notifications.showSuccess('Slot dostępności został usunięty.');
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się usunąć slotu dostępności' });
          return of(void 0);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }
}
