import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FollowedCompaniesFacade } from '@features/followed-companies/data-access/followed-companies.facade';

@Component({
  selector: 'jh-followed-companies-page',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './followed-companies-page.component.html',
  styleUrls: ['./followed-companies-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowedCompaniesPageComponent implements OnInit {
  private readonly facade = inject(FollowedCompaniesFacade);

  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly companies = this.facade.companies;

  ngOnInit(): void {
    this.facade.loadCompanies();
  }
}
