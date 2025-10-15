import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McpConfigService, McpConfig } from '../../core/services/mcp-config.service';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-mcp',
  standalone: true,
  imports: [
    CommonModule,
    NzTypographyModule,
    NzButtonModule,
    NzIconModule,
    NzAlertModule,
    NzSpinModule,
    NzToolTipModule,
  ],
  templateUrl: './mcp.component.html',
  styleUrls: ['./mcp.component.css'],
})
export class McpComponent {
  private api = inject(McpConfigService);

  loading = signal(true);
  error = signal<string | null>(null);
  cfg = signal<McpConfig | null>(null);
  reveal = signal(false);

  constructor() {
    this.load();
    effect(() => {
      void this.cfg();
      this.reveal.set(false);
    });
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.api.getConfig().subscribe({
      next: (cfg) => {
        cfg.url = window.location.origin + window.location.pathname;
        this.cfg.set(cfg);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.message ?? 'Unknown error');
        this.loading.set(false);
      },
    });
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  maskedToken(full: string) {
    if (this.reveal()) return full;
    if (!full) return '';
    const tail = full.slice(-4);
    return 'Bearer **** ' + tail;
  }
}
