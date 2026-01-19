import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LandingFacade } from '@features/landing/data-access/landing.facade';

interface ContactFormValue {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

@Component({
  selector: 'jh-landing-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  private readonly facade = inject(LandingFacade);

  readonly data = computed(() => this.facade.data());
  readonly activeTab = computed(() => 'offers');
  readonly activeFilter = computed(() => 'selected');

  readonly contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  handleContactSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.contactForm.reset();
    }
  }

  getCategoryIcon(iconName: string): string {
    const icons: Record<string, string> = {
      shield: 'security',
      people: 'people',
      wallet: 'account_balance_wallet',
      restaurant: 'restaurant',
    };
    return icons[iconName] || 'help';
  }

  getCategoryColorClass(color: string): string {
    return `landing-category--${color}`;
  }
}
