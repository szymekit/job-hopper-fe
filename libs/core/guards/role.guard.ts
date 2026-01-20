import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NotificationsService } from '@core/services/notifications.service';
import { UserRole } from '@shared/api/models/common.model';

export const requireRoleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notifications = inject(NotificationsService);
    const currentUser = authService.currentUser();

    if (!authService.isAuthenticated()) {
      router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (currentUser && allowedRoles.includes(currentUser.role)) {
      return true;
    }

    notifications.showWarning('Nie masz dostępu do tej sekcji. Zostałeś przekierowany na swój pulpit.');
    const user = authService.currentUser();
    if (user?.role === 'EMPLOYEE') {
      router.navigate(['/app/dashboard'], { replaceUrl: true });
    } else if (user?.role === 'RECRUITER') {
      router.navigate(['/app/company/dashboard'], { replaceUrl: true });
    } else {
      router.navigate(['/auth/login']);
    }
    return false;
  };
};
