import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../core/services/settings.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageService } from 'ng-zorro-antd/message';

interface McpConfig { url: string; token: string; }

@Component({
  selector: 'app-mcp',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTypographyModule,
    NzButtonModule,
    NzToolTipModule,
    NzIconModule,
    NzSkeletonModule,
    NzAlertModule,
    NzGridModule,
    NzSwitchModule,
    NzSpaceModule
  ],
  templateUrl: './mcp.component.html',
  styleUrls: ['./mcp.component.css']
})
export class McpComponent {
  private settings = inject(SettingsService);
  private message = inject(NzMessageService);

  loading = signal(true);
  error = signal<string | null>(null);
  revealToken = signal(false);
  copied = signal<'url' | 'token' | null>(null);

  config = signal<McpConfig>({ url: '', token: '' });

  constructor() {
    this.settings.getMcpConfig().subscribe({
      next: (cfg: any) => {
        this.config.set(cfg);
        this.loading.set(false);
      },
      error: (e: any) => {
        console.error(e);
        this.error.set('No se pudo cargar la configuración del MCP.');
        this.loading.set(false);
      }
    });
  }

  async copy(value: string, which: 'url' | 'token') {
    try {
      await navigator.clipboard.writeText(value);
      this.copied.set(which);
      this.message.success(which === 'url' ? 'URL copiada' : 'Token copiado');
      setTimeout(() => this.copied.set(null), 1200);
    } catch (_) {
      this.message.error('No se pudo copiar al portapapeles');
    }
  }

  openUrl(): void {
    const url = this.config().url;
    if (url) {
      window.open(url, '_blank');
    }
  }
}
