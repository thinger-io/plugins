import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { EventsSocketService, UserEvent } from './core/services/events-socket.service';
import { Subscription } from 'rxjs';
import { ApplicationsComponent } from './features/applications/applications.component';
import { SettingsComponent } from './features/settings/settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    ApplicationsComponent,
    SettingsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isCollapsed = false;

  // Events data
  events: UserEvent[] = [];
  isConnected = false;
  expandedEventIds = new Set<string>();

  private subscription = new Subscription();

  constructor(private eventsSocketService: EventsSocketService) {
    console.log('App Component initialized');
  }

  ngOnInit() {
    console.log('App Component ngOnInit - Setting up WebSocket subscriptions');

    // Subscribe to events stream
    this.subscription.add(
      this.eventsSocketService.getEvents$().subscribe(events => {
        console.log(`📋 Events updated in component: ${events.length} events`);
        this.events = events;
      })
    );

    // Subscribe to connection status
    this.subscription.add(
      this.eventsSocketService.isConnected$().subscribe(connected => {
        console.log(`🔌 Connection status changed: ${connected ? 'CONNECTED' : 'DISCONNECTED'}`);
        this.isConnected = connected;
      })
    );
  }

  /**
   * Toggle event details expansion
   */
  toggleEventDetails(eventId: string): void {
    if (this.expandedEventIds.has(eventId)) {
      this.expandedEventIds.delete(eventId);
    } else {
      this.expandedEventIds.add(eventId);
    }
  }

  /**
   * Check if event is expanded
   */
  isEventExpanded(eventId: string): boolean {
    return this.expandedEventIds.has(eventId);
  }

  /**
   * Clear all events
   */
  clearEvents(): void {
    if (confirm('Are you sure you want to clear all events?')) {
      this.eventsSocketService.clearEvents();
      this.expandedEventIds.clear();
    }
  }

  /**
   * Get color based on severity
   */
  getSeverityColor(severity: string): string {
    const colors: Record<string, string> = {
      'success': '#52c41a',
      'info': '#1890ff',
      'warning': '#faad14',
      'error': '#ff4d4f'
    };
    return colors[severity] || '#d9d9d9';
  }

  /**
   * Get background color based on severity (for badges)
   */
  getSeverityBg(severity: string): string {
    const colors: Record<string, string> = {
      'success': '#f6ffed',
      'info': '#e6f7ff',
      'warning': '#fffbe6',
      'error': '#fff2f0'
    };
    return colors[severity] || '#fafafa';
  }

  /**
   * Check if metadata has any content
   */
  hasMetadata(metadata: any): boolean {
    return metadata && Object.keys(metadata).length > 0;
  }

  /**
   * Format timestamp to relative time
   */
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
    console.log('App Component destroyed - Cleaning up subscriptions');
    this.subscription.unsubscribe();
    this.eventsSocketService.disconnect();
  }
}
