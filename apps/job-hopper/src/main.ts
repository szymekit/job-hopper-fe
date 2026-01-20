import { bootstrapApplication } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from '@core/app/app.routes';
import { AppShellComponent } from '@core/app/app-shell.component';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { AuthService } from '@core/services/auth.service';
import { RealtimeService } from '@core/services/realtime.service';
import { AuthApiService } from '@shared/api/services/auth-api.service';

function initializeApp(authService: AuthService, authApi: AuthApiService, realtimeService: RealtimeService) {
  return () => {
    if (authService.isAuthenticated()) {
      authApi.getMe().subscribe({
        next: (user) => {
          authService.setUser(user);
          realtimeService.connect();
        },
        error: () => {
          authService.logout();
        },
      });
    }
  };
}

bootstrapApplication(AppShellComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService, AuthApiService, RealtimeService],
      multi: true,
    },
  ],
}).catch((error) => {
  console.error(error);
});

