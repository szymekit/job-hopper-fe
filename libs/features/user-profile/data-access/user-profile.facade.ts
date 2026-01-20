import { Injectable, inject, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap, switchMap } from 'rxjs';
import { UsersApiService } from '@shared/api/services/users-api.service';
import { NotificationsService } from '@core/services/notifications.service';
import { errorToMessage } from '@shared/util/error-to-message';
import { UserProfileData } from '@features/user-profile/model/user-profile.model';
import { UpdateProfileDto } from '@shared/api/models/auth.model';
import { AuthApiService } from '@shared/api/services/auth-api.service';
import { FilesApiService } from '@shared/api/services/files-api.service';
import { AuthService } from '@core/services/auth.service';
import { AvailabilityFacade } from './availability.facade';

@Injectable({
  providedIn: 'root',
})
export class UserProfileFacade {
  private readonly usersApi = inject(UsersApiService);
  private readonly authApi = inject(AuthApiService);
  private readonly filesApi = inject(FilesApiService);
  private readonly authService = inject(AuthService);
  private readonly notifications = inject(NotificationsService);
  private readonly availabilityFacade = inject(AvailabilityFacade);
  private readonly userId = signal<string | null>(null);

  readonly loading = signal<boolean>(false);
  readonly uploading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly data = signal<UserProfileData | null>(null);

  readonly isOwnProfile = signal<boolean>(false);
  readonly availabilitySlots = this.availabilityFacade.slots;
  readonly availabilityLoading = this.availabilityFacade.loading;

  loadProfile(id: string): void {
    this.userId.set(id);
    this.loading.set(true);
    this.error.set(null);

    const currentUser = this.authService.currentUser();
    this.isOwnProfile.set(currentUser?.id === id);

    this.usersApi
      .getById(id)
      .pipe(
        catchError((error) => {
          const errorMessage =
            error.status === 404 ? 'Profil użytkownika nie został znaleziony.' : errorToMessage(error);
          this.error.set(errorMessage);
          this.loading.set(false);
          if (error.status !== 404) {
            this.notifications.showError(errorMessage, { title: 'Nie udało się załadować profilu' });
          }
          return of(null);
        })
      )
      .subscribe((user) => {
        this.loading.set(false);
        if (user) {
          this.data.set(this.mapUserToProfileData(user));
          
          if (this.isOwnProfile()) {
            this.availabilityFacade.loadSlots();
          }
        }
      });
  }

  private mapUserToProfileData(user: any): UserProfileData {
    return {
      header: {
        id: user.id,
        fullName: user.fullName || '',
        headline: user.headline || '',
        description: user.description || '',
        avatarUrl: user.avatarUrl || '',
        coverUrl: user.coverUrl || '',
        top10Badge: false,
        activeTab: 'service',
      },
      availableOrders: [],
      basicInfo: {
        citizenship: user.citizenship || '',
        student: user.isStudent ? 'Tak' : 'Nie',
        noCriminalRecord: user.hasNoCriminalRecord ? 'Tak' : 'Nie',
        drivingLicense: user.drivingLicense || '',
      },
      experience: {
        description: user.experience || '',
      },
      qualifications: [],
      roles: [],
      completedOrders: [],
      certificates: [],
      portfolio: [],
    };
  }

  updateProfile(data: UpdateProfileDto): void {
    this.loading.set(true);
    this.authApi
      .updateProfile(data)
      .pipe(
        tap((user) => {
          this.authService.refreshUser(user);
          this.data.update((currentData) => {
            if (!currentData) {
              return null;
            }
            return {
              ...currentData,
              header: {
                ...currentData.header,
                fullName: user.fullName || currentData.header.fullName,
                headline: user.headline || currentData.header.headline,
                description: user.description || currentData.header.description,
                avatarUrl: user.avatarUrl || currentData.header.avatarUrl,
                coverUrl: user.coverUrl || currentData.header.coverUrl,
              },
              basicInfo: {
                ...currentData.basicInfo,
                citizenship: user.citizenship || currentData.basicInfo.citizenship,
                student: user.isStudent ? 'Tak' : 'Nie',
                noCriminalRecord: user.hasNoCriminalRecord ? 'Tak' : 'Nie',
                drivingLicense: user.drivingLicense || currentData.basicInfo.drivingLicense,
              },
              experience: {
                description: user.experience || currentData.experience.description,
              },
            };
          });
          this.notifications.showSuccess('Profil został zaktualizowany.');
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się zaktualizować profilu' });
          return of(null);
        })
      )
      .subscribe(() => {
        this.loading.set(false);
      });
  }

  uploadCoverPhoto(file: File): void {
    this.uploading.set(true);
    this.filesApi
      .uploadFile(file)
      .pipe(
        switchMap((response) => {
          return this.authApi.updateProfile({ coverUrl: response.url });
        }),
        tap((user) => {
          this.authService.refreshUser(user);
          this.data.update((currentData) => {
            if (!currentData) {
              return null;
            }
            return {
              ...currentData,
              header: {
                ...currentData.header,
                coverUrl: user.coverUrl || currentData.header.coverUrl,
              },
            };
          });
          this.notifications.showSuccess('Zdjęcie okładki zostało zaktualizowane.');
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się przesłać zdjęcia okładki' });
          return of(null);
        })
      )
      .subscribe(() => {
        this.uploading.set(false);
      });
  }

  uploadAvatar(file: File): void {
    this.uploading.set(true);
    this.filesApi
      .uploadFile(file)
      .pipe(
        switchMap((response) => {
          return this.authApi.updateProfile({ avatarUrl: response.url });
        }),
        tap((user) => {
          this.authService.refreshUser(user);
          this.data.update((currentData) => {
            if (!currentData) {
              return null;
            }
            return {
              ...currentData,
              header: {
                ...currentData.header,
                avatarUrl: user.avatarUrl || currentData.header.avatarUrl,
              },
            };
          });
          this.notifications.showSuccess('Zdjęcie profilowe zostało zaktualizowane.');
        }),
        catchError((error) => {
          const errorMessage = errorToMessage(error);
          this.notifications.showError(errorMessage, { title: 'Nie udało się przesłać zdjęcia profilowego' });
          return of(null);
        })
      )
      .subscribe(() => {
        this.uploading.set(false);
      });
  }
}
