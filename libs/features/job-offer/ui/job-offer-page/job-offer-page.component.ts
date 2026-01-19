import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { JobOfferFacade } from '@features/job-offer/data-access/job-offer.facade';
import { GoogleMapsLoaderService } from '@core/services/google-maps-loader.service';

@Component({
  selector: 'jh-job-offer-page',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, GoogleMapsModule],
  templateUrl: './job-offer-page.component.html',
  styleUrls: ['./job-offer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOfferPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(JobOfferFacade);
  private readonly mapsLoader = inject(GoogleMapsLoaderService);

  readonly jobId = this.route.snapshot.paramMap.get('id');
  readonly data = computed(() => this.facade.data());
  readonly mapsLoaded = this.mapsLoader.isLoaded;

  readonly mapOptions = computed(() => {
    const location = this.data().location;
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
    const location = this.data().location;
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
    this.mapsLoader.load().catch((error) => {
      console.error('Failed to load Google Maps API:', error);
    });
  }
}
