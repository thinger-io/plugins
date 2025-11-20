// inspector.component.ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { EventsSocketService, UserEvent } from '../../core/services/events-socket.service';
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-inspector',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule
  ],
  templateUrl: './inspector.component.html',
})
export class InspectorComponent implements OnInit, OnDestroy {
  // Events data
  events: UserEvent[] = [];
  isConnected = false;
  expandedEventIds = new Set<string>();

  private subscription = new Subscription();

  constructor(
    private eventsSocketService: EventsSocketService,
    private modal: NzModalService
  ) {
    console.log('Inspector Component initialized');
  }

  async ngOnInit() {
    try {
      await this.eventsSocketService.initialize('/socket.io', 5);

      this.subscription.add(
        this.eventsSocketService.getEvents$().subscribe(events => {
          this.events = events;
        })
      );

      this.subscription.add(
        this.eventsSocketService.isConnected$().subscribe(connected => {
          this.isConnected = connected;
        })
      );

    } catch (error) {
      console.error('Failed to initialize EventsSocketService:', error);
    }
  }

  toggleEventDetails(eventId: string): void {
    if (this.expandedEventIds.has(eventId)) {
      this.expandedEventIds.delete(eventId);
    } else {
      this.expandedEventIds.add(eventId);
    }
  }

  isEventExpanded(eventId: string): boolean {
    return this.expandedEventIds.has(eventId);
  }

  clearEvents(): void {
    this.modal.confirm({
      nzTitle: 'Clear All Events',
      nzContent: 'Are you sure you want to clear all events? This action cannot be undone.',
      nzOkText: 'Clear',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.eventsSocketService.clearEvents();
        this.expandedEventIds.clear();
      }
    });
  }

  getSeverityColor(severity: string): string {
    const colors: Record<string, string> = {
      'success': '#52c41a',
      'info': '#1890ff',
      'warning': '#faad14',
      'error': '#ff4d4f'
    };
    return colors[severity] || '#d9d9d9';
  }

  getSeverityBg(severity: string): string {
    const colors: Record<string, string> = {
      'success': '#f6ffed',
      'info': '#e6f7ff',
      'warning': '#fffbe6',
      'error': '#fff2f0'
    };
    return colors[severity] || '#fafafa';
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
  }

  hasMetadata(metadata: any): boolean {
    return metadata && Object.keys(metadata).length > 0;
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleString();
  }

  ngOnDestroy() {
    console.log('Inspector Component destroyed - Cleaning up subscriptions');
    this.subscription.unsubscribe();
    this.eventsSocketService.disconnect();
  }
}
