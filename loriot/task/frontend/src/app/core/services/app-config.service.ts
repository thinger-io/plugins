import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private config: any;

  constructor( private http:HttpClient ) { }

  // Fetch the configuration from the API
  async loadConfig(): Promise<void> {
    return lastValueFrom(this.http.get('./env')).then((response) => {
      this.config = response; // Store the response
    });
  }

  // Expose the configuration
  getConfig(): any {
    return this.config;
  }

}
