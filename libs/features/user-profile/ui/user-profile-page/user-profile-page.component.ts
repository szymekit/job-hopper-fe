import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileFacade } from '@features/user-profile/data-access/user-profile.facade';
import { AvailabilityFacade } from '@features/user-profile/data-access/availability.facade';
import { AuthService } from '@core/services/auth.service';
import { UpdateProfileDto } from '@shared/api/models/auth.model';
import { CreateAvailabilitySlotDto } from '@shared/api/models/availability.model';

@Component({
  selector: 'jh-user-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(UserProfileFacade);
  private readonly availabilityFacade = inject(AvailabilityFacade);
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);

  @ViewChild('coverInput') coverInput?: ElementRef<HTMLInputElement>;
  @ViewChild('avatarInput') avatarInput?: ElementRef<HTMLInputElement>;

  readonly loading = this.facade.loading;
  readonly uploading = this.facade.uploading;
  readonly error = this.facade.error;
  readonly data = computed(() => this.facade.data());
  readonly isOwnProfile = this.facade.isOwnProfile;
  readonly isEditing = signal<boolean>(false);
  readonly availabilitySlots = this.facade.availabilitySlots;
  readonly availabilityLoading = this.facade.availabilityLoading;
  readonly isAddingAvailability = signal<boolean>(false);

  profileForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    headline: [''],
    description: [''],
    phoneNumber: [''],
    citizenship: [''],
    isStudent: [false],
    hasNoCriminalRecord: [false],
    drivingLicense: [''],
    experience: [''],
  });

  availabilityForm: FormGroup = this.formBuilder.group({
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    isAvailable: [true],
  });

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    const queryId = this.route.snapshot.queryParamMap.get('id');
    const currentUser = this.authService.currentUser();
    const id = routeId || queryId || currentUser?.id;

    if (id) {
      this.facade.loadProfile(id);
    }
  }

  startEditing(): void {
    const data = this.data();
    if (!data) {
      return;
    }
    this.profileForm.patchValue({
      fullName: data.header.fullName,
      headline: data.header.headline,
      description: data.header.description,
      citizenship: data.basicInfo.citizenship,
      isStudent: data.basicInfo.student === 'Tak',
      hasNoCriminalRecord: data.basicInfo.noCriminalRecord === 'Tak',
      drivingLicense: data.basicInfo.drivingLicense,
      experience: data.experience.description,
    });
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    this.isEditing.set(false);
    this.profileForm.reset();
  }

  saveProfile(): void {
    if (!this.profileForm.valid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formValue = this.profileForm.value;
    const updateData: UpdateProfileDto = {
      fullName: formValue.fullName,
      headline: formValue.headline,
      description: formValue.description,
      phoneNumber: formValue.phoneNumber,
      citizenship: formValue.citizenship,
      isStudent: formValue.isStudent,
      hasNoCriminalRecord: formValue.hasNoCriminalRecord,
      drivingLicense: formValue.drivingLicense,
      experience: formValue.experience,
    };

    this.facade.updateProfile(updateData);
    this.isEditing.set(false);
  }

  onCoverPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.facade.uploadCoverPhoto(file);
      } else {
        // Error handling - można dodać notyfikację
      }
      input.value = '';
    }
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.facade.uploadAvatar(file);
      } else {
        // Error handling
      }
      input.value = '';
    }
  }

  triggerCoverUpload(): void {
    this.coverInput?.nativeElement.click();
  }

  triggerAvatarUpload(): void {
    this.avatarInput?.nativeElement.click();
  }

  startAddingAvailability(): void {
    this.isAddingAvailability.set(true);
    this.availabilityForm.reset({ isAvailable: true });
  }

  cancelAddingAvailability(): void {
    this.isAddingAvailability.set(false);
    this.availabilityForm.reset();
  }

  saveAvailability(): void {
    if (!this.availabilityForm.valid) {
      this.availabilityForm.markAllAsTouched();
      return;
    }

    const formValue = this.availabilityForm.value;
    const slotData: CreateAvailabilitySlotDto = {
      startTime: new Date(formValue.startTime).toISOString(),
      endTime: new Date(formValue.endTime).toISOString(),
      isAvailable: formValue.isAvailable,
    };

    this.availabilityFacade.createSlot(slotData);
    this.isAddingAvailability.set(false);
    this.availabilityForm.reset();
  }

  deleteAvailabilitySlot(id: string): void {
    if (confirm('Czy na pewno chcesz usunąć ten slot dostępności?')) {
      this.availabilityFacade.deleteSlot(id);
    }
  }

  formatAvailabilityTime(timeString: string): string {
    const date = new Date(timeString);
    return date.toLocaleString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
