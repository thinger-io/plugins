import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export interface SimCardPageInfo {
  size: number;
  index: number;
  resultSetSize: number;
  nextIndex: number;
  totalPages: number;
}

export interface SimCard {
  iccid: string;
  alias?: string;
  imsi?: string;
  msisdn?: string;
  imei?: string;
  apn?: string;
  ipAddress?: string;
  status?: string;
  simModel?: string;
  simType?: string;
  deviceManufacturer?: string;
  deviceModel?: string;
  ipConnected?: boolean;
  gprsConnected?: boolean;
  latitude?: number;
  longitude?: number;
  activationDate?: string;
  // Sensitive fields (individual endpoint only)
  pin1?: string;
  pin2?: string;
  puk1?: string;
  puk2?: string;
  idAlarm?: string;
  // Allow any additional fields from the API
  [key: string]: any;
}

export interface SimCardsResponse {
  info: SimCardPageInfo;
  data: SimCard[];
}

export const SIM_STATUSES: { value: string; label: string }[] = [
  { value: 'INACTIVE_NEW', label: 'Inactive (New)' },
  { value: 'TEST', label: 'Test' },
  { value: 'ACTIVATION_READY', label: 'Activation Ready' },
  { value: 'ACTIVATION_PENDANT', label: 'Activation Pending' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DEACTIVATED', label: 'Deactivated' },
  { value: 'SUSPENDED', label: 'Suspended' },
];

@Injectable({
  providedIn: 'root'
})
export class SimCardsService {
  constructor(private http: HttpClient) {}

  listSimCards(size: number, index: number, status?: string): Observable<SimCardsResponse> {
    let params = new HttpParams()
      .set('size', size.toString())
      .set('index', index.toString());
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<SimCardsResponse>('./simcards', { params });
  }

  getSimCard(iccid: string): Observable<SimCard> {
    return this.http.get<SimCard>(`./simcard/${iccid}`);
  }
}
