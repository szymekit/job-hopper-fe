import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from './chat.service';

@Component({
  selector: 'jh-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements AfterViewChecked {
  private readonly chatService = inject(ChatService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly messagesContainer = viewChild<ElementRef<HTMLElement>>('messagesContainer');

  readonly isOpen = this.chatService.isOpen;
  readonly data = this.chatService.data;
  readonly activeConversation = this.chatService.activeConversation;
  readonly currentUser = this.chatService.currentUser;
  readonly totalUnreadCount = this.chatService.totalUnreadCount;
  readonly messageForm = new FormControl('', [Validators.required]);

  private shouldScroll = false;
  private typingTimeout?: ReturnType<typeof setTimeout>;

  readonly conversations = computed(() => this.data().conversations);
  readonly activeMessages = computed(() => {
    const active = this.activeConversation();
    return active?.messages || [];
  });

  readonly typingUsers = computed(() => {
    const activeId = this.data().activeConversationId;
    if (!activeId) {
      return [];
    }
    return this.chatService.getTypingUsers(activeId);
  });

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        setTimeout(() => {
          this.shouldScroll = true;
          this.scrollToBottom();
        }, 0);
      }
    });

    effect(() => {
      const messages = this.activeMessages();
      if (messages.length > 0) {
        this.shouldScroll = true;
        this.cdr.markForCheck();
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  toggle(): void {
    this.chatService.toggle();
  }

  close(): void {
    this.chatService.close();
  }

  selectConversation(conversationId: string): void {
    this.chatService.selectConversation(conversationId);
    this.shouldScroll = true;
  }

  sendMessage(): void {
    const content = this.messageForm.value;
    if (!content || !content.trim()) {
      return;
    }

    this.chatService.sendMessage(content);
    this.chatService.sendTypingIndicator(false);
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.messageForm.setValue('');
    this.shouldScroll = true;
  }

  onInputChange(): void {
    const activeId = this.data().activeConversationId;
    if (!activeId) {
      return;
    }

    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    this.chatService.sendTypingIndicator(true);

    this.typingTimeout = setTimeout(() => {
      this.chatService.sendTypingIndicator(false);
    }, 3000);
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer()?.nativeElement;
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }
}
