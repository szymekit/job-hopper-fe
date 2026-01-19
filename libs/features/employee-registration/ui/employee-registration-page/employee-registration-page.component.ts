import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthPageLayoutComponent } from '@shared/ui/layout/auth-page-layout.component';
import { EmployeeRegistrationFacade } from '@features/employee-registration/data-access/employee-registration.facade';
import {
  getConfirmPasswordError,
  getEmailError,
  getPasswordError,
} from '@shared/util/form-error-messages';

@Component({
  selector: 'jh-employee-registration-page',
  standalone: true,
  imports: [
    AuthPageLayoutComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employee-registration-page.component.html',
  styleUrls: ['./employee-registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeRegistrationPageComponent {
  private readonly facade = inject(EmployeeRegistrationFacade);

  readonly form = this.facade.form;
  readonly uiState = this.facade.uiState;

  readonly emailError = computed(() => getEmailError(this.form.controls.email));
  readonly passwordError = computed(() => getPasswordError(this.form.controls.password));
  readonly confirmPasswordError = computed(() =>
    getConfirmPasswordError(this.form.controls.confirmPassword),
  );

  handleSubmit(): void {
    this.facade.submit();
  }
}

