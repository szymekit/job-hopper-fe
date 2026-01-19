import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from '@core/app/app.routes';
import { AppShellComponent } from '@core/app/app-shell.component';

bootstrapApplication(AppShellComponent, {
  providers: [provideRouter(appRoutes), provideAnimations()],
}).catch((error) => {
  console.error(error);
});

