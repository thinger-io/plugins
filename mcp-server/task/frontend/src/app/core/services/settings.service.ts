import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';

export interface McpConfig { url: string; token: string; }

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private http: HttpClient, private appCfg: AppConfigService) {}

  getMcpConfig(): Observable<McpConfig> {
    // Try to get MCP config from multiple sources, in order of preference:
    return this.http.get<McpConfig>('/api/mcp/config').pipe(
      // Load from backend API
      catchError(() => {
        const cfg = this.appCfg.getConfig?.() || {};
        const url = cfg.mcpUrl ?? cfg.url ?? '';
        const token = cfg.mcpToken ?? cfg.token ?? '';
        if (url || token) return of({ url, token });

        // Read from /env as fallback
        return this.http.get<any>('/env').pipe(
          map((env) => ({
            url: env?.mcpUrl ?? env?.url ?? '',
            token: env?.mcpToken ?? env?.token ?? ''
          })),
          catchError(() => of({ url: '', token: '' }))
        );
      }),
      map((cfg) => ({ url: cfg?.url ?? '', token: cfg?.token ?? '' }))
    );
  }
}
