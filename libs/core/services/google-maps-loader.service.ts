import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { GOOGLE_MAPS_API_KEY } from '@core/config/google-maps.config';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsLoaderService {
  private readonly loaded = signal<boolean>(false);
  private readonly loading = signal<boolean>(false);
  private readonly apiLoadedSubject = new BehaviorSubject<boolean>(false);

  readonly isLoaded = this.loaded.asReadonly();
  readonly isLoading = this.loading.asReadonly();
  readonly apiLoaded$: Observable<boolean> = this.apiLoadedSubject.asObservable();

  loadApi(): void {
    if (this.loaded()) {
      return;
    }

    if (this.loading()) {
      return;
    }

    this.loading.set(true);

    if (typeof google !== 'undefined' && google.maps) {
      this.loaded.set(true);
      this.loading.set(false);
      this.apiLoadedSubject.next(true);
      return;
    }

    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
      console.warn('Google Maps API key not configured');
      this.loading.set(false);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.loaded.set(true);
      this.loading.set(false);
      this.apiLoadedSubject.next(true);
    };
    script.onerror = () => {
      this.loading.set(false);
      console.error('Failed to load Google Maps API');
    };
    document.head.appendChild(script);
  }

  load(): Promise<void> {
    if (this.loaded()) {
      return Promise.resolve();
    }

    if (this.loading()) {
      return new Promise((resolve) => {
        const checkLoaded = setInterval(() => {
          if (this.loaded()) {
            clearInterval(checkLoaded);
            resolve();
          }
        }, 100);
      });
    }

    this.loading.set(true);

    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.maps) {
        this.loaded.set(true);
        this.loading.set(false);
        this.apiLoadedSubject.next(true);
        resolve();
        return;
      }

      if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
        console.warn('Google Maps API key not configured');
        this.loading.set(false);
        reject(new Error('Google Maps API key not configured'));
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.loaded.set(true);
        this.loading.set(false);
        this.apiLoadedSubject.next(true);
        resolve();
      };
      script.onerror = () => {
        this.loading.set(false);
        reject(new Error('Failed to load Google Maps API'));
      };
      document.head.appendChild(script);
    });
  }
}
