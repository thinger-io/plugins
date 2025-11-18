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
 * Configuration for creating a new event
 */
export interface CreateEventInput {
  category: EventCategory;
  severity: EventSeverity;
  title: string;
  client?: string;
  tool?: string;
  resource?: string;
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
  client?: string;
  tool?: string;
  resource?: string;
  sessionId?: string;
}
