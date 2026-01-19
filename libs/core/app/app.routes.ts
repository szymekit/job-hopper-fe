import { Routes } from '@angular/router';
import { EmployeeRegistrationPageComponent } from '@features/employee-registration/ui/employee-registration-page/employee-registration-page.component';
import { BusinessRegistrationPageComponent } from '@features/business-registration/ui/business-registration-page/business-registration-page.component';
import { LoginPageComponent } from '@features/login/ui/login-page/login-page.component';
import { UserProfilePageComponent } from '@features/user-profile/ui/user-profile-page/user-profile-page.component';
import { CompanyProfilePageComponent } from '@features/company-profile/ui/company-profile-page/company-profile-page.component';
import { JobOfferPageComponent } from '@features/job-offer/ui/job-offer-page/job-offer-page.component';
import { LandingPageComponent } from '@features/landing/ui/landing-page/landing-page.component';
import { NotFoundPageComponent } from '@features/not-found/ui/not-found-page/not-found-page.component';

export const appRoutes: Routes = [
  {
    path: 'register',
    children: [
      {
        path: 'employee',
        component: EmployeeRegistrationPageComponent,
      },
      {
        path: 'business',
        component: BusinessRegistrationPageComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'profile/:id',
    component: UserProfilePageComponent,
  },
  {
    path: 'company/:id',
    component: CompanyProfilePageComponent,
  },
  {
    path: 'job/:id',
    component: JobOfferPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

