import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  SimCard, SIM_STATUSES, SimCardsService,
  Alarm, ConsumptionRecord, ConsumptionThreshold
} from '../../../core/services/simcards.service';
import { ErrorNotificationService } from '../../../core/services/error-notification.service';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzMessageService } from 'ng-zorro-antd/message';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye, faEyeSlash, faCircleCheck, faCircleXmark,
  faSave, faFloppyDisk, faHeartPulse, faCoins, faChartBar,
  faPenToSquare, faRotateRight, faTriangleExclamation, faCircleInfo
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-simcard-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzDescriptionsModule,
    NzTagModule,
    NzDividerModule,
    NzSpinModule,
    NzBadgeModule,
    NzButtonModule,
    NzEmptyModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzTableModule,
    NzAlertModule,
    NzStatisticModule,
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
  protected faHeartPulse = faHeartPulse;
  protected faCoins = faCoins;
  protected faChartBar = faChartBar;
  protected faPenToSquare = faPenToSquare;
  protected faRotateRight = faRotateRight;
  protected faTriangleExclamation = faTriangleExclamation;
  protected faCircleInfo = faCircleInfo;

  readonly statuses = SIM_STATUSES;
  readonly editableStatuses = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'DEACTIVATED', label: 'Deactivated' },
  ];
  readonly serviceTypes = [
    { value: 'data', label: 'Data' },
    { value: 'voice', label: 'Voice' },
    { value: 'sms', label: 'SMS' },
    { value: 'all', label: 'All services' },
  ];

  // ── Overview tab ──────────────────────────────────────────────
  sensitivesVisible = false;

  // ── Edit tab ──────────────────────────────────────────────────
  editForm: FormGroup;
  saving = false;
  alarms: Alarm[] = [];
  alarmsLoading = false;
  alarmsLoaded = false;

  // ── Consumption tab ───────────────────────────────────────────
  consumptionYear = new Date().getFullYear();
  consumptionMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  consumptionService = 'data';
  consumptionRecords: ConsumptionRecord[] = [];
  consumptionTotal = 0;
  consumptionPageIndex = 1;
  consumptionPageSize = 20;
  consumptionLoading = false;
  consumptionLoaded = false;

  // ── Balance tab ───────────────────────────────────────────────
  balance: number | null = null;
  balanceLoading = false;
  balanceLoaded = false;
  topupAmount: number | null = null;
  toppingUp = false;

  // ── Diagnostics tab ───────────────────────────────────────────
  diagnosticGsmResult: string | null = null;
  diagnosticGprsResult: string | null = null;
  diagnosticGsmRunning = false;
  diagnosticGprsRunning = false;

  readonly yearOptions: number[] = Array.from(
    { length: 4 },
    (_, i) => new Date().getFullYear() - i
  );
  readonly monthOptions: { value: string; label: string }[] = Array.from(
    { length: 12 },
    (_, i) => {
      const m = String(i + 1).padStart(2, '0');
      return { value: m, label: new Date(2000, i).toLocaleString('en', { month: 'long' }) };
    }
  );

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
      dailyConsumptionThreshold: this.fb.group({
        dataEnabled: [false],
        dataLimit: [null],
        voiceEnabled: [false],
        voiceLimit: [null],
        smsEnabled: [false],
        smsLimit: [null],
      }),
      monthlyConsumptionThreshold: this.fb.group({
        dataEnabled: [false],
        dataLimit: [null],
        voiceEnabled: [false],
        voiceLimit: [null],
        smsEnabled: [false],
        smsLimit: [null],
      }),
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
    this.consumptionLoaded = false;
    this.consumptionRecords = [];
    this.balanceLoaded = false;
    this.balance = null;
    this.diagnosticGsmResult = null;
    this.diagnosticGprsResult = null;
  }

  private patchEditForm(): void {
    if (!this.simCard) return;
    const daily = this.simCard['dailyConsumptionThreshold'] as ConsumptionThreshold | undefined;
    const monthly = this.simCard['monthlyConsumptionThreshold'] as ConsumptionThreshold | undefined;

    this.editForm.patchValue({
      alias: this.simCard.alias ?? '',
      lifeCycleStatus: null,
      idAlarm: this.simCard.idAlarm ?? null,
      dailyConsumptionThreshold: daily ?? {},
      monthlyConsumptionThreshold: monthly ?? {},
    });
  }

  onTabChange(index: number): void {
    if (index === 1 && !this.alarmsLoaded) this.loadAlarms();
    if (index === 2 && !this.consumptionLoaded) this.loadConsumption();
    if (index === 3 && !this.balanceLoaded) this.loadBalance();
  }

  // ── Edit ──────────────────────────────────────────────────────

  private loadAlarms(): void {
    this.alarmsLoading = true;
    this.simCardsService.listAlarms(100, 1).subscribe({
      next: (res) => {
        this.alarms = res?.data ?? [];
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
    if (v.idAlarm !== null && v.idAlarm !== undefined) payload.idAlarm = v.idAlarm;

    const daily: ConsumptionThreshold = v.dailyConsumptionThreshold ?? {};
    if (daily.dataEnabled || daily.voiceEnabled || daily.smsEnabled) {
      payload.dailyConsumptionThreshold = daily;
    }
    const monthly: ConsumptionThreshold = v.monthlyConsumptionThreshold ?? {};
    if (monthly.dataEnabled || monthly.voiceEnabled || monthly.smsEnabled) {
      payload.monthlyConsumptionThreshold = monthly;
    }

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

  // ── Consumption ───────────────────────────────────────────────

  loadConsumption(): void {
    if (!this.simCard) return;
    this.consumptionLoading = true;
    this.simCardsService.getSimConsumption(
      this.simCard.iccid,
      String(this.consumptionYear),
      this.consumptionMonth,
      this.consumptionService,
      this.consumptionPageSize,
      this.consumptionPageIndex
    ).subscribe({
      next: (res) => {
        this.consumptionRecords = res?.data ?? [];
        this.consumptionTotal = res?.info?.resultSetSize ?? 0;
        this.consumptionLoaded = true;
        this.consumptionLoading = false;
      },
      error: (error) => {
        this.consumptionLoading = false;
        this.errorNotification.showHttpError('Error loading consumption data', error);
      }
    });
  }

  onConsumptionPageChange(index: number): void {
    this.consumptionPageIndex = index;
    this.loadConsumption();
  }

  onConsumptionParamsChange(): void {
    this.consumptionPageIndex = 1;
    this.consumptionLoaded = false;
    this.loadConsumption();
  }

  formatBytes(bytes: number | undefined | null): string {
    if (bytes === undefined || bytes === null) return '—';
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
  }

  // ── Balance ───────────────────────────────────────────────────

  loadBalance(): void {
    if (!this.simCard) return;
    this.balanceLoading = true;
    this.simCardsService.getSimBalance(this.simCard.iccid).subscribe({
      next: (res) => {
        this.balance = res?.balance ?? null;
        this.balanceLoaded = true;
        this.balanceLoading = false;
      },
      error: (error) => {
        this.balanceLoading = false;
        this.errorNotification.showHttpError('Error loading balance', error);
      }
    });
  }

  topup(): void {
    if (!this.simCard || !this.topupAmount || this.topupAmount <= 0) return;
    this.toppingUp = true;
    const amount = this.topupAmount;
    this.simCardsService.topupBalance(this.simCard.iccid, amount).subscribe({
      next: () => {
        this.toppingUp = false;
        this.message.success(`€${amount.toFixed(2)} added to SIM successfully`);
        this.topupAmount = null;
        this.loadBalance();
      },
      error: (error) => {
        this.toppingUp = false;
        this.errorNotification.showHttpError('Error topping up balance', error);
      }
    });
  }

  // ── Diagnostics ───────────────────────────────────────────────

  runDiagnostics(type: 'gsm' | 'gprs'): void {
    if (!this.simCard) return;

    if (type === 'gsm') {
      this.diagnosticGsmRunning = true;
      this.diagnosticGsmResult = null;
    } else {
      this.diagnosticGprsRunning = true;
      this.diagnosticGprsResult = null;
    }

    this.simCardsService.runDiagnostics(this.simCard.iccid, type).subscribe({
      next: (res) => {
        const output = res?.output ?? '';
        if (type === 'gsm') {
          this.diagnosticGsmResult = output;
          this.diagnosticGsmRunning = false;
        } else {
          this.diagnosticGprsResult = output;
          this.diagnosticGprsRunning = false;
        }
      },
      error: (error) => {
        if (type === 'gsm') this.diagnosticGsmRunning = false;
        else this.diagnosticGprsRunning = false;
        this.errorNotification.showHttpError(`Error running ${type.toUpperCase()} diagnostic`, error);
      }
    });
  }

  diagnosticStatus(output: string | null): 'success' | 'error' | 'info' {
    if (!output) return 'info';
    return output.toUpperCase().endsWith('_UP') ? 'success' : 'error';
  }

  diagnosticLabel(output: string | null, type: string): string {
    if (!output) return '';
    return output.toUpperCase().endsWith('_UP')
      ? `${type.toUpperCase()} connection is UP`
      : `${type.toUpperCase()} connection is DOWN`;
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
