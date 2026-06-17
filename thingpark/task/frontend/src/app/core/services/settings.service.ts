import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: any;

  constructor( private http:HttpClient ) { }

  async loadSettings(): Promise<void> {
    const response = await lastValueFrom(this.http.get('./settings'));
    this.settings = response;
  }

  getApplications(): any {
    return this.settings.applications;
  }

  async saveApplications(applications: any): Promise<void> {

    const settings_bk = structuredClone(this.settings);

    this.settings.applications = applications;

    try {
      const response = await lastValueFrom(this.http.post('./settings', this.settings));
      this.settings = response;
    } catch (error) {
      console.error("Error updating settings", error);
      this.settings =
        settings_bk;
    }
  }
}
