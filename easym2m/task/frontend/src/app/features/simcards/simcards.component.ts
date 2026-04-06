import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimCardsService, SimCard, SimCardsResponse, SIM_STATUSES } from '../../core/services/simcards.service';
import { ErrorNotificationService } from '../../core/services/error-notification.service';
import { SimCardDetailComponent } from './simcard-detail/simcard-detail.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzMessageService } from 'ng-zorro-antd/message';

import { faRotateRight, faFilter, faIdCard, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-simcards',
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzCardModule,
    NzButtonComponent,
    NzTagModule,
    NzSelectModule,
    NzModalModule,
    NzSpinModule,
    NzTooltipDirective,
    FontAwesomeModule,
    SimCardDetailComponent,
  ],
  templateUrl: './simcards.component.html',
})
export class SimCardsComponent implements OnInit {
  simCards: SimCard[] = [];
  loading = false;
  totalItems = 0;
  pageSize = 20;
  pageIndex = 1;
  selectedStatus: string | null = null;

  detailVisible = false;
  detailLoading = false;
  selectedSimCard: SimCard | null = null;

  protected faRotateRight = faRotateRight;
  protected faFilter = faFilter;
  protected faIdCard = faIdCard;
  protected faCircle = faCircle;

  readonly statuses = SIM_STATUSES;

  constructor(
    private simCardsService: SimCardsService,
    private errorNotification: ErrorNotificationService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadSimCards();
  }

  loadSimCards(): void {
    this.loading = true;
    this.simCardsService.listSimCards(this.pageSize, this.pageIndex, this.selectedStatus || undefined)
      .subscribe({
        next: (response: SimCardsResponse) => {
          this.simCards = response.data ?? [];
          this.totalItems = response.info?.resultSetSize ?? 0;
          this.loading = false;

          if (!response.data) {
            this.errorNotification.showError(
              'Unexpected API response',
              'The EasyM2M API returned a response without a "data" field.',
              'The API format may have changed, or the credentials may not have sufficient access. Check the backend logs.'
            );
          }
        },
        error: (error) => {
          this.loading = false;
          this.errorNotification.showHttpError('Error loading SIM cards', error);
        }
      });
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.loadSimCards();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    this.loadSimCards();
  }

  onStatusChange(): void {
    this.pageIndex = 1;
    this.loadSimCards();
  }

  openDetail(simCard: SimCard): void {
    this.detailVisible = true;
    this.detailLoading = true;
    this.selectedSimCard = null;

    this.simCardsService.getSimCard(simCard.iccid)
      .subscribe({
        next: (detail) => {
          this.selectedSimCard = detail;
          this.detailLoading = false;
        },
        error: (error) => {
          this.detailVisible = false;
          this.detailLoading = false;
          this.errorNotification.showHttpError(`Error loading SIM card ${simCard.iccid}`, error);
        }
      });
  }

  closeDetail(): void {
    this.detailVisible = false;
    this.selectedSimCard = null;
  }

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
}
