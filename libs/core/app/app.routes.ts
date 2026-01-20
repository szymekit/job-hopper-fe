import { Routes } from '@angular/router';
import { requireAuthGuard } from '@core/guards/auth.guard';
import { requireRoleGuard } from '@core/guards/role.guard';
import { dashboardRedirectGuard } from '@core/guards/dashboard-redirect.guard';
import { AppLayoutComponent } from './app-layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@features/landing/ui/landing-page/landing-page.component').then((m) => m.LandingPageComponent),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('@features/login/ui/login-page/login-page.component').then((m) => m.LoginPageComponent),
      },
      {
        path: 'register',
        redirectTo: 'register/worker',
        pathMatch: 'full',
      },
      {
        path: 'register/worker',
        loadComponent: () =>
          import('@features/employee-registration/ui/employee-registration-page/employee-registration-page.component').then(
            (m) => m.EmployeeRegistrationPageComponent,
          ),
      },
      {
        path: 'register/company',
        loadComponent: () =>
          import('@features/business-registration/ui/business-registration-page/business-registration-page.component').then(
            (m) => m.BusinessRegistrationPageComponent,
          ),
      },
    ],
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [requireAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@features/dashboard/ui/dashboard-page/dashboard-page.component').then((m) => m.DashboardPageComponent),
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('@features/job-offer/ui/job-offer-list-page/job-offer-list-page.component').then(
            (m) => m.JobOfferListPageComponent,
          ),
      },
      {
        path: 'offers/:id',
        loadComponent: () =>
          import('@features/job-offer/ui/job-offer-page/job-offer-page.component').then((m) => m.JobOfferPageComponent),
      },
      {
        path: 'saved-offers',
        canActivate: [requireRoleGuard(['EMPLOYEE'])],
        loadComponent: () =>
          import('@features/saved-offers/ui/saved-offers-page/saved-offers-page.component').then(
            (m) => m.SavedOffersPageComponent,
          ),
      },
      {
        path: 'followed-companies',
        canActivate: [requireRoleGuard(['EMPLOYEE'])],
        loadComponent: () =>
          import('@features/followed-companies/ui/followed-companies-page/followed-companies-page.component').then(
            (m) => m.FollowedCompaniesPageComponent,
          ),
      },
      {
        path: 'saved-searches',
        canActivate: [requireRoleGuard(['EMPLOYEE'])],
        loadComponent: () =>
          import('@features/dashboard/ui/dashboard-page/dashboard-page.component').then((m) => m.DashboardPageComponent),
      },
      {
        path: 'applications',
        canActivate: [requireRoleGuard(['EMPLOYEE'])],
        loadComponent: () =>
          import('@features/applications/ui/applications-page/applications-page.component').then(
            (m) => m.ApplicationsPageComponent,
          ),
      },
      {
        path: 'profile',
        canActivate: [requireRoleGuard(['EMPLOYEE'])],
        loadComponent: () =>
          import('@features/user-profile/ui/user-profile-page/user-profile-page.component').then(
            (m) => m.UserProfilePageComponent,
          ),
      },
      {
        path: 'cv/:id',
        canActivate: [requireRoleGuard(['EMPLOYEE', 'RECRUITER'])],
        loadComponent: () =>
          import('@features/user-profile/ui/cv-view-page/cv-view-page.component').then((m) => m.CvViewPageComponent),
      },
      {
        path: 'feed',
        loadComponent: () => import('@features/feed/ui/feed-page/feed-page.component').then((m) => m.FeedPageComponent),
      },
      {
        path: 'company',
        canActivate: [requireRoleGuard(['RECRUITER'])],
        children: [
          {
            path: 'dashboard',
            loadComponent: () =>
              import('@features/company-dashboard/ui/company-dashboard-page/company-dashboard-page.component').then(
                (m) => m.CompanyDashboardPageComponent,
              ),
          },
          {
            path: 'offers',
            loadComponent: () =>
              import('@features/dashboard/ui/dashboard-page/dashboard-page.component').then((m) => m.DashboardPageComponent),
          },
          {
            path: 'offers/:id',
            loadComponent: () =>
              import('@features/job-offer/ui/job-offer-page/job-offer-page.component').then((m) => m.JobOfferPageComponent),
          },
          {
            path: 'applications',
            loadComponent: () =>
              import('@features/applications/ui/applications-page/applications-page.component').then(
                (m) => m.ApplicationsPageComponent,
              ),
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('@features/company-profile/ui/company-profile-page/company-profile-page.component').then(
                (m) => m.CompanyProfilePageComponent,
              ),
          },
        ],
      },
      {
        path: '**',
        loadComponent: () =>
          import('@features/not-found/ui/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
      },
    ],
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('@features/user-profile/ui/user-profile-page/user-profile-page.component').then(
        (m) => m.UserProfilePageComponent,
      ),
  },
  {
    path: 'company/:id',
    loadComponent: () =>
      import('@features/company-profile/ui/company-profile-page/company-profile-page.component').then(
        (m) => m.CompanyProfilePageComponent,
      ),
  },
  {
    path: 'job/:id',
    loadComponent: () =>
      import('@features/job-offer/ui/job-offer-page/job-offer-page.component').then((m) => m.JobOfferPageComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@features/not-found/ui/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
