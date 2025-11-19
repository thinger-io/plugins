import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

export type EventCategory =
  | 'connection'      // Connection lifecycle events
  | 'initialization'  // Server/client initialization
  | 'tool'           // Tool-related events (calls, list, etc)
  | 'resource'       // Resource operations
  | 'prompt'         // Prompt operations
  | 'sampling'       // LLM sampling requests
  | 'auth'           // Authentication/authorization events
  | 'config'         // Configuration changes
  | 'error'          // Error events
  | 'warning';       // Warning events

export type EventSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'error';

/**
 * Main event structure stored in the queue
 */
export interface UserEvent {
  id: string;                    // Unique identifier (UUID)
  timestamp: string;             // ISO 8601 format
  category: EventCategory;       // Event type
  severity: EventSeverity;       // Importance level
  title: string;                 // Short message for list view (max ~100 chars)
  client?: string;               // Client identifier if applicable
  tool?: string;                 // Tool name if applicable
  resource?: string;             // Resource URI if applicable
  details: Record<string, any>;  // Complete data for popup/details view
  metadata?: EventMetadata;      // Optional additional info
}

/**
 * Optional metadata for events
 */
export interface EventMetadata {
  duration?: number;             // Processing time in ms
  size?: number;                 // Payload/response size in bytes
  retries?: number;              // Number of retry attempts
  method?: string;               // MCP method name (e.g., 'tools/call', 'resources/read')
  sessionId?: string;            // Session identifier for the connection
  [key: string]: any;            // Extensible for future use
}

/**
 * Service to handle WebSocket connection for real-time events
 */
@Injectable({
  providedIn: 'root'
})
export class EventsSocketService {
  // @ts-ignore
  private socket: Socket;
  private events$ = new BehaviorSubject<UserEvent[]>([]);
  private connected$ = new BehaviorSubject<boolean>(false);
  private config$ = new BehaviorSubject<any>(null);

  constructor() {}

  async initialize(socketEndpoint: string = '/socket.io', maxRetries: number = 5): Promise<void> {

    const socketPath = window.location.pathname.replace(/\/$/, '') + socketEndpoint;
    console.log(`Socket.IO path: ${socketPath}`);

    // Initialize Socket.IO client
    this.socket = io({
      path: socketPath,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      timeout: 20000,
      autoConnect: true,
      withCredentials: true
    });

    this.setupListeners();
  }

  /**
   * Set up all Socket.IO event listeners
   */
  private setupListeners(): void {
    // Connection established
    this.socket.on('connect', () => {
      console.log('Connected to events WebSocket - ID:', this.socket.id);
      this.connected$.next(true);
    });

    // Connection lost
    this.socket.on('disconnect', (reason: string) => {
      console.log('Disconnected from events WebSocket - Reason:', reason);
      this.connected$.next(false);
    });

    // Reconnection attempts
    this.socket.on('reconnect_attempt', (attempt: number) => {
      console.log(`Reconnection attempt #${attempt}`);
    });

    // Successfully reconnected
    this.socket.on('reconnect', (attempt: number) => {
      console.log(`Reconnected after ${attempt} attempts`);
    });

    // Initial data when connecting
    this.socket.on('initial-events', (data: { events: UserEvent[], config: any, stats: any }) => {
      console.log('Received initial data:', data);
      console.log(`   - Events: ${data.events.length}`);
      console.log(`   - Config:`, data.config);
      console.log(`   - Stats:`, data.stats);

      this.events$.next(data.events);
      this.config$.next(data.config);
    });

    // New event in real-time
    this.socket.on('new-event', (event: UserEvent) => {
      console.log('NEW EVENT:', event);
      console.log(`   Category: ${event.category}`);
      console.log(`   Severity: ${event.severity}`);
      console.log(`   Title: ${event.title}`);
      console.log(`   Details:`, event.details);

      const current = this.events$.value;
      // Add new event at the beginning and keep only last 50
      this.events$.next([event, ...current].slice(0, 50));
    });

    // Events cleared
    this.socket.on('events-cleared', () => {
      console.log('Events cleared');
      this.events$.next([]);
    });

    // Response to filtered request
    this.socket.on('events-response', (data: { events: UserEvent[], filters: any }) => {
      console.log('Filtered events received:', data.events.length, 'events with filters:', data.filters);
      this.events$.next(data.events);
    });

    // Stats response
    this.socket.on('stats-response', (stats: any) => {
      console.log('Stats received:', stats);
    });

    // Error handling
    this.socket.on('error', (data: { message: string, error: string }) => {
      console.error('Socket error:', data.message, '-', data.error);
    });

    // Connection error
    this.socket.on('connect_error', (error: Error) => {
      console.error('Connection error:', error.message);
    });
  }

  /**
   * Get events as Observable
   */
  getEvents$(): Observable<UserEvent[]> {
    return this.events$.asObservable();
  }

  /**
   * Get connection status as Observable
   */
  isConnected$(): Observable<boolean> {
    return this.connected$.asObservable();
  }

  /**
   * Get config as Observable
   */
  getConfig$(): Observable<any> {
    return this.config$.asObservable();
  }

  /**
   * Request events with optional filters
   */
  requestEvents(filters?: {
    limit?: number;
    category?: string;
    severity?: string;
    device?: string;
    application?: string;
  }): void {
    console.log('Requesting events with filters:', filters);
    this.socket.emit('get-events', filters);
  }

  /**
   * Clear all events
   */
  clearEvents(): void {
    console.log('Requesting to clear events');
    this.socket.emit('clear-events');
  }

  /**
   * Get statistics
   */
  getStats(): void {
    console.log('Requesting stats');
    this.socket.emit('get-stats');
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    console.log('Disconnecting from WebSocket');
    this.socket.disconnect();
  }
}
