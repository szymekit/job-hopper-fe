import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const dashboardRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const user = authService.currentUser();
  if (!user) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (user.role === 'EMPLOYEE') {
    router.navigate(['/app/dashboard'], { replaceUrl: true });
  } else if (user.role === 'RECRUITER') {
    router.navigate(['/app/company/dashboard'], { replaceUrl: true });
  } else {
    router.navigate(['/app/dashboard'], { replaceUrl: true });
  }

  return false;
};
