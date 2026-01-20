import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApplicationsFacade } from '@features/applications/data-access/applications.facade';
import { ApplicationStatus } from '@shared/api/models/common.model';

@Component({
  selector: 'jh-applications-page',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsPageComponent implements OnInit {
  private readonly facade = inject(ApplicationsFacade);

  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly applications = this.facade.applications;

  ngOnInit(): void {
    this.facade.loadMyApplications();
  }

  getStatusLabel(status: ApplicationStatus): string {
    const labels: Record<ApplicationStatus, string> = {
      PENDING: 'Oczekuje',
      REVIEWED: 'Przejrzana',
      ACCEPTED: 'Zaakceptowana',
      REJECTED: 'Odrzucona',
    };
    return labels[status] || status;
  }

  formatDate(date?: string): string {
    if (!date) {
      return '';
    }
    return new Date(date).toLocaleDateString('pl-PL');
  }
}
