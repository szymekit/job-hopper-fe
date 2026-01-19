import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthPageLayoutComponent } from '@shared/ui/layout/auth-page-layout.component';
import { LoginFacade } from '@features/login/data-access/login.facade';
import { getEmailError, getPasswordError } from '@shared/util/form-error-messages';

@Component({
  selector: 'jh-login-page',
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
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly facade = inject(LoginFacade);

  readonly form = this.facade.form;
  readonly uiState = this.facade.uiState;

  readonly emailError = computed(() => getEmailError(this.form.controls.email));
  readonly passwordError = computed(() => getPasswordError(this.form.controls.password));

  handleSubmit(): void {
    this.facade.submit();
  }
}

