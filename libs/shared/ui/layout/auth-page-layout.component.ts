import { Component, Input } from '@angular/core';

@Component({
  selector: 'jh-auth-page-layout',
  standalone: true,
  templateUrl: './auth-page-layout.component.html',
  styleUrls: ['./auth-page-layout.component.scss'],
})
export class AuthPageLayoutComponent {
  @Input({ required: true }) heading = '';
}

