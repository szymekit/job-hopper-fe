import { ChangeDetectionStrategy, Component, computed, inject, signal, HostListener, ElementRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@core/services/auth.service';
import { NotificationsStore } from '@core/store/notifications.store';
import { ChatService } from '@shared/ui/chat/chat.service';
import { NotificationsContainerComponent } from '@shared/ui/components/notifications-container/notifications-container.component';
import { ChatComponent } from '@shared/ui/chat/chat.component';
import { NotificationsService } from '@core/services/notifications.service';

@Component({
  selector: 'jh-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    NotificationsContainerComponent,
    ChatComponent,
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notificationsStore = inject(NotificationsStore);
  private readonly chatService = inject(ChatService);
  private readonly notifications = inject(NotificationsService);
  private readonly elementRef = inject(ElementRef);

  readonly currentUser = this.authService.currentUser;
  readonly isEmployee = this.authService.isEmployee;
  readonly isRecruiter = this.authService.isRecruiter;
  readonly unreadCount = computed(() => this.notificationsStore.unreadCount());
  readonly chatOpen = this.chatService.isOpen;
  readonly userMenuOpen = signal<boolean>(false);

  readonly workerMenuItems = [
    { label: 'Dashboard', route: '/app/dashboard', icon: 'dashboard' },
    { label: 'Oferty', route: '/app/offers', icon: 'work' },
    { label: 'Zapisane oferty', route: '/app/saved-offers', icon: 'bookmark' },
    { label: 'Zapisane wyszukiwania', route: '/app/saved-searches', icon: 'search' },
    { label: 'Moje aplikacje', route: '/app/applications', icon: 'description' },
    { label: 'Feed', route: '/app/feed', icon: 'article' },
    { label: 'Profil', route: '/app/profile', icon: 'person' },
  ];

  readonly companyMenuItems = [
    { label: 'Dashboard', route: '/app/company/dashboard', icon: 'dashboard' },
    { label: 'Moje oferty', route: '/app/company/offers', icon: 'work' },
    { label: 'Aplikacje', route: '/app/company/applications', icon: 'description' },
    { label: 'Feed', route: '/app/feed', icon: 'article' },
    { label: 'Profil firmy', route: '/app/company/profile', icon: 'business' },
  ];

  readonly menuItems = computed(() => {
    if (this.isEmployee()) {
      return this.workerMenuItems;
    }
    if (this.isRecruiter()) {
      return this.companyMenuItems;
    }
    return [];
  });

  constructor() {
    this.notificationsStore.loadNotifications();
  }


  toggleChat(): void {
    this.chatService.toggle();
  }

  openNotifications(): void {
    this.notificationsStore.loadNotifications();
  }

  goToProfile(): void {
    this.userMenuOpen.set(false);
    const user = this.currentUser();
    if (!user) {
      return;
    }
    if (this.isEmployee()) {
      this.router.navigate(['/app/profile'], { queryParams: { id: user.id }, replaceUrl: false });
    } else if (this.isRecruiter()) {
      this.router.navigate(['/app/company/profile'], { queryParams: { id: user.id }, replaceUrl: false });
    }
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.userMenuOpen.update((value) => !value);
  }

  logout(): void {
    this.userMenuOpen.set(false);
    this.authService.logout();
    this.chatService.close();
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const userMenuElement = this.elementRef.nativeElement.querySelector('.app-layout__user-menu');
    if (userMenuElement && !userMenuElement.contains(target)) {
      this.userMenuOpen.set(false);
    }
  }
}
