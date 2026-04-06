import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimCard, SIM_STATUSES } from '../../../core/services/simcards.service';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-simcard-detail',
  imports: [
    CommonModule,
    NzDescriptionsModule,
    NzTagModule,
    NzDividerModule,
    NzSpinModule,
    NzBadgeModule,
    NzButtonModule,
    NzEmptyModule,
    FontAwesomeModule,
  ],
  templateUrl: './simcard-detail.component.html',
})
export class SimCardDetailComponent {
  @Input() simCard: SimCard | null = null;
  @Input() loading = false;

  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;
  protected faCircleCheck = faCircleCheck;
  protected faCircleXmark = faCircleXmark;

  sensitivesVisible = false;

  readonly statuses = SIM_STATUSES;

  /** Returns the ng-zorro tag color for a given SIM status. */
  getStatusColor(status: string | undefined): string {
    const colors: Record<string, string> = {
      ACTIVE: 'green',
      INACTIVE_NEW: 'default',
      TEST: 'blue',
      ACTIVATION_READY: 'gold',
      ACTIVATION_PENDANT: 'orange',
      DEACTIVATED: 'red',
      SUSPENDED: 'volcano',
    };
    return colors[status ?? ''] ?? 'default';
  }

  getStatusLabel(status: string | undefined): string {
    return this.statuses.find(s => s.value === status)?.label ?? status ?? '—';
  }

  /** Formats raw bytes into a human-readable string. */
  formatBytes(bytes: number | undefined | null): string {
    if (bytes === undefined || bytes === null) return '—';
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
  }

  /** Returns all keys from the simCard object that are not in the known-fields list. */
  getExtraFields(): string[] {
    if (!this.simCard) return [];
    const knownFields = new Set([
      'iccid', 'alias', 'imsi', 'msisdn', 'imei', 'apn', 'ipAddress', 'status',
      'simModel', 'simType', 'deviceManufacturer', 'deviceModel',
      'ipConnected', 'gprsConnected', 'latitude', 'longitude', 'activationDate',
      'pin1', 'pin2', 'puk1', 'puk2', 'idAlarm',
    ]);
    return Object.keys(this.simCard).filter(k => !knownFields.has(k));
  }

  /** Returns an object with all extra (non-known) fields for the JSON preview. */
  getExtraObject(): Record<string, any> {
    if (!this.simCard) return {};
    return this.getExtraFields().reduce((acc, key) => {
      acc[key] = this.simCard![key];
      return acc;
    }, {} as Record<string, any>);
  }

  hasSensitiveData(): boolean {
    return !!(this.simCard?.pin1 || this.simCard?.pin2 || this.simCard?.puk1 || this.simCard?.puk2);
  }
}
