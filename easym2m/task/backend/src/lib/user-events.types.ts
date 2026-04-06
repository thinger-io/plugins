
export type EventCategory =
  | 'uplink'
  | 'downlink'
  | 'device'
  | 'config'
  | 'error'
  | 'warning';

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
  device?: string;               // Device EUI if applicable
  application?: string;          // Application ID if applicable
  details: Record<string, any>;  // Complete data for popup/details view
  metadata?: EventMetadata;      // Optional additional info
}

/**
 * Optional metadata for events
 */
export interface EventMetadata {
  duration?: number;             // Processing time in ms
  size?: number;                 // Payload size in bytes
  retries?: number;              // Number of retry attempts
  [key: string]: any;            // Extensible for future use
}

/**
 * Configuration for creating a new event
 */
export interface CreateEventInput {
  category: EventCategory;
  severity: EventSeverity;
  title: string;
  device?: string;
  application?: string;
  details: Record<string, any>;
  metadata?: EventMetadata;
}

/**
 * Query parameters for filtering events
 */
export interface EventFilters {
  limit?: number;
  category?: EventCategory;
  severity?: EventSeverity;
  device?: string;
  application?: string;
}
