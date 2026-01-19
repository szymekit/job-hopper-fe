import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserProfileFacade } from '@features/user-profile/data-access/user-profile.facade';

@Component({
  selector: 'jh-user-profile-page',
  standalone: true,
  imports: [MatIconModule, MatCheckboxModule],
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(UserProfileFacade);

  readonly profileId = this.route.snapshot.paramMap.get('id');
  readonly data = computed(() => this.facade.data());
}
