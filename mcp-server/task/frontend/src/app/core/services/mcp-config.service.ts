import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface McpConfig {
  url: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class McpConfigService {
  constructor(private http: HttpClient) {}
  getConfig() {
    return this.http.get<McpConfig>('/api/mcp/config');
  }
}
