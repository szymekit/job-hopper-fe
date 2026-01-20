import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';

@Component({
  selector: 'jh-cv-view-page',
  standalone: true,
  templateUrl: './cv-view-page.component.html',
  styleUrls: ['./cv-view-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvViewPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly baseUrl = API_BASE_URL;

  readonly userId = this.route.snapshot.paramMap.get('id');
  readonly cvUrl = computed<SafeResourceUrl>(() => {
    if (!this.userId) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    const url = `${this.baseUrl}${API_ENDPOINTS.users.cvPdf(this.userId)}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
}
