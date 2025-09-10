import { Component, ViewEncapsulation, signal, inject } from '@angular/core';
import { SettingsService, McpConfig } from '../../core/services/settings.service';
import { take } from 'rxjs/operators';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-mcp',
  standalone: true,
  templateUrl: './mcp.component.html',
  styleUrls: ['./mcp.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class McpComponent {
  private readonly settings = inject(SettingsService);

  // Valores reactivos que ya usas en el template
  url   = signal<string>('');
  token = signal<string>('');

  // Feedback de copiado
  copiedMessage = signal<string | null>(null);

  // Estado del servidor para el badge verde
  serverOk = signal<boolean>(false);

  constructor() {
    // Carga una vez desde el backend (con tus fallbacks del SettingsService)
    this.settings.getMcpConfig().pipe(take(1)).subscribe({
      next: (cfg: McpConfig) => {
        const url = (cfg?.url ?? '').trim();
        const token = (cfg?.token ?? '').trim();
        this.url.set(url);
        this.token.set(token);
        // si llega respuesta válida, consideramos OK
        this.serverOk.set(Boolean(url || token));
      },
      error: () => {
        this.serverOk.set(false);
      },
    });
  }

  copyToClipboard(value: string, label: string) {
    if (!value) return;
    navigator.clipboard.writeText(value).then(
      () => {
        this.copiedMessage.set(`${label} copiado`);
        setTimeout(() => this.copiedMessage.set(null), 2000);
      },
      () => {
        this.copiedMessage.set(`Error al copiar ${label}`);
        setTimeout(() => this.copiedMessage.set(null), 2000);
      }
    );
  }
}
