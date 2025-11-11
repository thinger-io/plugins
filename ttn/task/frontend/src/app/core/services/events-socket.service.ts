import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "./app-config.service";

/**
 * User event interface matching backend structure
 */
export interface UserEvent {
  id: string;
  timestamp: string;
  category: 'uplink' | 'downlink' | 'device' | 'config' | 'error' | 'warning';
  severity: 'success' | 'info' | 'warning' | 'error';
  title: string;
  device?: string;
  application?: string;
  details: Record<string, any>;
  metadata?: Record<string, any>;
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

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {}

  async initialize(socketPath: string = '/socket.io', maxRetries: number = 5): Promise<void> {

    const config = this.appConfigService.getConfig();
    const socketUrl = config?.api_url || 'http://localhost:3000';
    console.log(`Received ${socketUrl}`);

    // Initialize Socket.IO client
    this.socket = io(socketUrl, {
      path: socketPath,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      timeout: 20000,
      autoConnect: true
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
      console.log(`   Device: ${event.device || 'N/A'}`);
      console.log(`   Details:`, event.details);

      const current = this.events$.value;
      // Add new event at the beginning and keep only last 50
      this.events$.next([event, ...current].slice(0, 50));
    });

    // Events cleared
    this.socket.on('events-cleared', () => {
      console.log('🗑Events cleared');
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
