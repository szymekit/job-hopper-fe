import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'jh-not-found-page',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  private readonly router = inject(Router);

  navigateBack(): void {
    void this.router.navigate(['/login']);
  }
}

