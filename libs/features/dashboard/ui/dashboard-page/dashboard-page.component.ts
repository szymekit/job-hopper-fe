import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'jh-dashboard-page',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isEmployee = this.authService.isEmployee;
  readonly isRecruiter = this.authService.isRecruiter;

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user?.role === 'RECRUITER') {
      this.router.navigate(['/app/company/dashboard'], { replaceUrl: true });
    }
  }
}
