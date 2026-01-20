import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CompanyDashboardFacade } from '@features/company-dashboard/data-access/company-dashboard.facade';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'jh-company-dashboard-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './company-dashboard-page.component.html',
  styleUrls: ['./company-dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDashboardPageComponent implements OnInit {
  private readonly facade = inject(CompanyDashboardFacade);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly summary = this.facade.summary;

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (!user || user.role !== 'RECRUITER') {
      this.router.navigate(['/app/dashboard'], { replaceUrl: true });
      return;
    }
    const companyId = user.id;
    this.facade.loadSummary(companyId);
  }
}
