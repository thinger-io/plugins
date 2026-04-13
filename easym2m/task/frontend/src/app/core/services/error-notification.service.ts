import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from '@angular/common/http';

/** Structured error payload returned by the plugin backend. */
interface BackendError {
  message?: string;
  error?: string;
  cause?: string;
  code?: string;
}

/**
 * Centralised service for showing verbose error notifications.
 * All API errors should be routed through this service so the user
 * always sees both the technical detail and a suggested fix.
 */
@Injectable({ providedIn: 'root' })
export class ErrorNotificationService {
  constructor(private notification: NzNotificationService) {}

  /**
   * Shows an error notification derived from an Angular HttpErrorResponse.
   * @param title  Short label for the failing operation (e.g. "Loading SIM cards").
   * @param error  The raw HttpErrorResponse caught in the component.
   */
  showHttpError(title: string, error: HttpErrorResponse): void {
    const { message, cause } = this.parseHttpError(error);
    this.show(title, message, cause);
  }

  /** Shows a generic error notification with an optional cause string. */
  showError(title: string, message: string, cause?: string): void {
    this.show(title, message, cause);
  }

  private parseHttpError(error: HttpErrorResponse): { message: string; cause: string } {
    // Browser-level network failure — backend is unreachable
    if (error.status === 0) {
      return {
        message: 'Cannot connect to the plugin backend service.',
        cause: 'The backend container may be stopped or the network is unavailable. Check that the Docker service is running.'
      };
    }

    const body: BackendError = error.error ?? {};
    const message = body.message || error.message || `HTTP ${error.status}`;
    let cause = body.cause ?? '';

    // Fall back to generic causes when the backend did not send one
    if (!cause) {
      switch (error.status) {
        case 400:
          cause = 'EasyM2M credentials are missing. Open the Settings tab and enter your API Client ID, Password, and API Key.';
          break;
        case 401:
          cause = 'Unauthorized. The plugin token for Thinger.io may have expired or be missing.';
          break;
        case 403:
          cause = 'Forbidden. The plugin token may lack the required permissions on Thinger.io.';
          break;
        case 404:
          cause = 'Resource not found. The requested endpoint or ICCID may not exist.';
          break;
        case 429:
          cause = 'Too many requests. Wait a moment before retrying.';
          break;
        case 500:
          cause = 'Internal server error in the plugin backend. Check the container logs.';
          break;
        case 502:
          cause = 'The backend could not communicate with EasyM2M servers. Check your API credentials in Settings.';
          break;
        case 503:
          cause = 'The EasyM2M service is temporarily unavailable. Try again later.';
          break;
        default:
          cause = `Unexpected HTTP ${error.status} error. Check the backend logs for details.`;
      }
    }

    return { message, cause };
  }

  private show(title: string, message: string, cause?: string): void {
    const content = cause
      ? `<p style="margin:0 0 8px 0">${escapeHtml(message)}</p>
         <p style="margin:0"><b>Possible cause:</b> ${escapeHtml(cause)}</p>`
      : `<p style="margin:0">${escapeHtml(message)}</p>`;

    this.notification.error(title, content, {
      nzDuration: 10000,
      nzAnimate: true,
    });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
