import { randomUUID } from 'crypto';
import { EventEmitter } from 'events';
import {
  UserEvent,
  CreateEventInput,
  EventFilters
} from './user-events.types.js';
import {
  DEFAULT_USER_EVENTS_CONFIG,
  UserEventsConfig
} from './user-events.config.js';

export class UserEvents extends EventEmitter {
  private queue: UserEvent[] = [];
  private config: UserEventsConfig;

  /**
   * Creates a new UserEvents instance
   * @param config Optional custom configuration
   */
  constructor(config?: Partial<UserEventsConfig>) {
    super();
    this.config = {
      ...DEFAULT_USER_EVENTS_CONFIG,
      ...config
    };
  }

  /**
   * Adds a new event to the queue
   * Automatically handles FIFO behavior when max size is reached
   *
   * @param input Event data
   * @returns The created event with generated ID and timestamp
   */
  push(input: CreateEventInput): UserEvent {
    const event: UserEvent = {
      id: randomUUID(),
      timestamp: new Date().toISOString(),
      ...input
    };

    // Add to the end of the queue
    this.queue.push(event);

    // Enforce max queue size (FIFO: remove oldest)
    if (this.queue.length > this.config.maxQueueSize) {
      this.queue.shift(); // Remove first (oldest) element
    }

    this.emit('new-event', event);

    return event;
  }

  getRecent(filters?: EventFilters): UserEvent[] {
    let filtered = [...this.queue];

    // Apply filters if provided
    if (filters) {
      if (filters.category) {
        filtered = filtered.filter(e => e.category === filters.category);
      }
      if (filters.severity) {
        filtered = filtered.filter(e => e.severity === filters.severity);
      }
    }

    // Sort by timestamp (newest first) and limit
    const limit = filters?.limit ?? this.config.defaultLimit;
    return filtered
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  /**
   * Gets a specific event by ID
   *
   * @param id Event UUID
   * @returns The event or undefined if not found
   */
  getById(id: string): UserEvent | undefined {
    return this.queue.find(e => e.id === id);
  }

  /**
   * Gets events by category
   *
   * @param category Event category
   * @param limit Optional limit
   * @returns Array of events in the category
   */
  getByCategory(category: EventFilters['category'], limit?: number): UserEvent[] {
    return this.getRecent({ category, limit });
  }

  /**
   * Gets events by severity
   *
   * @param severity Event severity
   * @param limit Optional limit
   * @returns Array of events with the severity
   */
  getBySeverity(severity: EventFilters['severity'], limit?: number): UserEvent[] {
    return this.getRecent({ severity, limit });
  }

  /**
   * Gets the current size of the queue
   *
   * @returns Number of events in queue
   */
  getSize(): number {
    return this.queue.length;
  }

  /**
   * Clears all events from the queue
   * Useful for testing or manual cleanup
   */
  clear(): void {
    this.queue = [];
    this.emit('events-cleared');
  }

  /**
   * Gets the current configuration
   * Useful for frontend to know icons, colors, etc.
   *
   * @returns Current configuration
   */
  getConfig(): UserEventsConfig {
    return { ...this.config };
  }

  /**
   * Gets statistics about current events
   * Useful for monitoring and debugging
   *
   * @returns Object with event counts by category and severity
   */
  getStats() {
    const stats = {
      total: this.queue.length,
      byCategory: {} as Record<string, number>,
      bySeverity: {} as Record<string, number>
    };

    this.queue.forEach(event => {
      // Count by category
      stats.byCategory[event.category] =
        (stats.byCategory[event.category] || 0) + 1;

      // Count by severity
      stats.bySeverity[event.severity] =
        (stats.bySeverity[event.severity] || 0) + 1;
    });

    return stats;
  }
}
