import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CompanyProfileFacade } from '@features/company-profile/data-access/company-profile.facade';

@Component({
  selector: 'jh-company-profile-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './company-profile-page.component.html',
  styleUrls: ['./company-profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyProfilePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(CompanyProfileFacade);

  readonly companyId = this.route.snapshot.paramMap.get('id');
  readonly data = computed(() => this.facade.data());
}
