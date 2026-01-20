import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { AsyncPipe } from '@angular/common';
import { JobOfferFacade } from '@features/job-offer/data-access/job-offer.facade';
import { GoogleMapsLoaderService } from '@core/services/google-maps-loader.service';

@Component({
  selector: 'jh-job-offer-page',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, GoogleMapsModule, AsyncPipe],
  templateUrl: './job-offer-page.component.html',
  styleUrls: ['./job-offer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOfferPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(JobOfferFacade);
  private readonly mapsLoader = inject(GoogleMapsLoaderService);

  readonly jobId = this.route.snapshot.paramMap.get('id');
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly data = computed(() => this.facade.data());
  readonly mapsLoaded$ = this.mapsLoader.apiLoaded$;

  readonly mapOptions = computed(() => {
    const data = this.data();
    if (!data) {
      return {
        center: { lat: 0, lng: 0 },
        zoom: 10,
      };
    }
    const location = data.location;
    return {
      center: { lat: location.latitude, lng: location.longitude },
      zoom: 15,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    };
  });

  readonly markerPosition = computed(() => {
    const data = this.data();
    if (!data) {
      return { lat: 0, lng: 0 };
    }
    const location = data.location;
    return { lat: location.latitude, lng: location.longitude };
  });

  readonly markerOptions = computed(() => ({
    draggable: false,
    label: {
      text: '📍',
      fontSize: '24px',
    },
  }));

  ngOnInit(): void {
    if (this.jobId) {
      this.facade.loadOffer(this.jobId);
    }
    this.mapsLoader.loadApi();
  }
}
