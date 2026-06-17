import { EventCategory, EventSeverity } from './user-events.types.js';

export interface EventCategoryConfig {
  color: string;
  label: string;
}

export interface UserEventsConfig {
  maxQueueSize: number;
  defaultLimit: number;
  categories: Record<EventCategory, EventCategoryConfig>;
  severities: Record<EventSeverity, EventCategoryConfig>;
}

/**
 * Default configuration
 * Can be overridden when instantiating UserEvents class
 */
export const DEFAULT_USER_EVENTS_CONFIG: UserEventsConfig = {
  // Maximum number of events to keep in memory
  maxQueueSize: 50,

  // Default number of events returned by getRecent()
  defaultLimit: 10,

  // Visual configuration for each category
  categories: {
    uplink: {
      color: '#10b981',
      label: 'Uplink'
    },
    downlink: {
      color: '#3b82f6',
      label: 'Downlink'
    },
    device: {
      color: '#8b5cf6',
      label: 'Device'
    },
    config: {
      color: '#6b7280',
      label: 'Configuration'
    },
    warning: {
      color: '#f59e0b',
      label: 'Warning'
    },
    error: {
      color: '#ef4444',
      label: 'Error'
    }
  },

  // Visual configuration for each severity level
  severities: {
    success: {
      color: '#10b981',
      label: 'Success'
    },
    info: {
      color: '#3b82f6',
      label: 'Info'
    },
    warning: {
      color: '#f59e0b',
      label: 'Warning'
    },
    error: {
      color: '#ef4444',
      label: 'Error'
    }
  }
};
