import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {
  SimCard, SIM_STATUSES, SimCardsService,
  Alarm
} from '../../../core/services/simcards.service';
import { ErrorNotificationService } from '../../../core/services/error-notification.service';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye, faEyeSlash, faCircleCheck, faCircleXmark,
  faFloppyDisk, faPenToSquare
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-simcard-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzDescriptionsModule,
    NzTagModule,
    NzDividerModule,
    NzSpinModule,
    NzButtonModule,
    NzEmptyModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    FontAwesomeModule,
  ],
  templateUrl: './simcard-detail.component.html',
})
export class SimCardDetailComponent implements OnChanges {
  @Input() simCard: SimCard | null = null;
  @Input() loading = false;
  @Output() simUpdated = new EventEmitter<SimCard>();

  // icons
  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;
  protected faCircleCheck = faCircleCheck;
  protected faCircleXmark = faCircleXmark;
  protected faSave = faFloppyDisk;
  protected faPenToSquare = faPenToSquare;

  readonly statuses = SIM_STATUSES;
  readonly editableStatuses = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'TEST', label: 'Test' },
    { value: 'ACTIVATION_READY', label: 'Activation Ready' },
    { value: 'SUSPENDED', label: 'Suspended' },
  ];

  // ── Overview tab ──────────────────────────────────────────────
  sensitivesVisible = false;

  // ── Edit tab ──────────────────────────────────────────────────
  editForm: FormGroup;
  saving = false;
  alarms: Alarm[] = [];
  alarmsLoading = false;
  alarmsLoaded = false;


  constructor(
    private fb: FormBuilder,
    private simCardsService: SimCardsService,
    private errorNotification: ErrorNotificationService,
    private message: NzMessageService,
  ) {
    this.editForm = this.fb.group({
      alias: [''],
      lifeCycleStatus: [null],
      idAlarm: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['simCard'] && this.simCard) {
      this.resetState();
      this.patchEditForm();
    }
  }

  private resetState(): void {
    this.sensitivesVisible = false;
    this.alarmsLoaded = false;
    this.alarms = [];
  }

  private patchEditForm(): void {
    if (!this.simCard) return;
    this.editForm.patchValue({
      alias: this.simCard.alias ?? '',
      lifeCycleStatus: null,
      idAlarm: this.simCard.idAlarm ?? null,
    });
  }

  onTabChange(index: number): void {
    if (index === 1 && !this.alarmsLoaded) this.loadAlarms();
  }

  // ── Edit ──────────────────────────────────────────────────────

  private loadAlarms(): void {
    this.alarmsLoading = true;
    this.simCardsService.listAlarms(100, 1).subscribe({
      next: (res) => {
        this.alarms = res?.data ?? [];
        // Auto-select the only alarm if there is exactly one and none is currently assigned
        if (this.alarms.length === 1 && !this.editForm.value.idAlarm) {
          this.editForm.patchValue({ idAlarm: this.alarms[0].id });
        }
        this.alarmsLoaded = true;
        this.alarmsLoading = false;
      },
      error: () => {
        this.alarmsLoading = false;
        this.alarmsLoaded = true;
      }
    });
  }

  saveSimCard(): void {
    if (!this.simCard) return;
    this.saving = true;

    const v = this.editForm.value;
    const payload: any = {};
    if (v.alias !== null && v.alias !== undefined) payload.alias = v.alias;
    if (v.lifeCycleStatus) payload.lifeCycleStatus = v.lifeCycleStatus;
    payload.idAlarm = v.idAlarm ?? null;

    this.simCardsService.updateSimCard(this.simCard.iccid, payload).subscribe({
      next: () => {
        this.simCardsService.getSimCard(this.simCard!.iccid).subscribe({
          next: (updated) => {
            this.saving = false;
            this.message.success('SIM card updated successfully');
            this.simUpdated.emit(updated);
          },
          error: () => {
            this.saving = false;
            this.message.success('SIM card updated. Reload to see changes.');
          }
        });
      },
      error: (error) => {
        this.saving = false;
        this.errorNotification.showHttpError('Error updating SIM card', error);
      }
    });
  }

  // ── Overview helpers ──────────────────────────────────────────

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
