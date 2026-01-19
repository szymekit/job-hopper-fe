import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from '@shared/ui/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatComponent],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {}

