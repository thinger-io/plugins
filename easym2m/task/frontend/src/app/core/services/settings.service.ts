import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

export interface EasyM2MCredentials {
  apiClientId: string;
  apiPassword: string;
  apiKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: EasyM2MCredentials = { apiClientId: '', apiPassword: '', apiKey: '' };

  constructor(private http: HttpClient) {}

  async loadSettings(): Promise<void> {
    const response = await lastValueFrom(this.http.get<EasyM2MCredentials>('./settings'));
    this.settings = response;
  }

  getCredentials(): EasyM2MCredentials {
    return this.settings;
  }

  hasCredentials(): boolean {
    return !!(this.settings.apiClientId && this.settings.apiPassword && this.settings.apiKey);
  }

  async saveCredentials(credentials: EasyM2MCredentials): Promise<void> {
    const backup = structuredClone(this.settings);
    this.settings = credentials;
    try {
      const response = await lastValueFrom(this.http.post<EasyM2MCredentials>('./settings', credentials));
      this.settings = response;
    } catch (error) {
      this.settings = backup;
      throw error;
    }
  }
}
