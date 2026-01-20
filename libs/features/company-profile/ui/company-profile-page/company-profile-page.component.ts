import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CompanyProfileFacade } from '@features/company-profile/data-access/company-profile.facade';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'jh-company-profile-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './company-profile-page.component.html',
  styleUrls: ['./company-profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyProfilePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(CompanyProfileFacade);
  private readonly authService = inject(AuthService);

  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly data = computed(() => this.facade.data());

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    const queryId = this.route.snapshot.queryParamMap.get('id');
    const currentUser = this.authService.currentUser();
    const id = routeId || queryId || currentUser?.id;

    if (id) {
      this.facade.loadCompany(id);
    }
  }
}
