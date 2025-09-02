import { Component, input, model, OnInit, OnDestroy } from '@angular/core';
import { Application } from "../applications.component";

// Forms
import {
  ReactiveFormsModule,
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-application',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    FontAwesomeModule
  ],
  templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit, OnDestroy {
  applications = input<Application[]>();
  application = model<Application>();

  protected applicationForm: FormGroup;

  faInfoCircle = faInfoCircle;

  private subs: Array<{ unsubscribe(): void }> = [];

  // ---------- Helpers ----------
  private normalizeHost(v: string): string {
    if (!v) return '';
    let s = v.trim();
    // Eliminate protocol and path/query if present
    // We do this to allow users to paste full URLs
    // and still get the correct host:port
    s = s.replace(/^https?:\/\//i, '');
    s = s.split('/')[0].split('?')[0];
    return s;
  }

  private extractHostPort(raw: string): { host: string; port?: number } {
    const hostPort = this.normalizeHost(raw);
    const m = hostPort.match(/^(.*?)(?::(\d{1,5}))?$/);
    if (!m) return { host: hostPort };
    const host = m[1] || '';
    const port = m[2] ? Number(m[2]) : undefined;
    return { host, port };
  }

  private buildHostPort(hostRaw: string, port?: number, defaultPort = 8080): string {
    const { host, port: inHostPort } = this.extractHostPort(hostRaw);
    const finalPort = inHostPort ?? port ?? defaultPort;
    return `${host}:${finalPort}`;
  }

  applicationIdValidator(control: AbstractControl)  {
    if (!control.value || typeof this.applications() === 'undefined' ) return null;
    return null;
  }

  deviceIdPrefixValidator(control: AbstractControl) {
    if (!control.value || typeof this.applications() === 'undefined' ) return null;
    if ( this.applications()?.find(app => app.deviceIdPrefix === control.value) ) {
      return { error: true, prefixUnique: true };
    }
    return null;
  }

  constructor(private fb: NonNullableFormBuilder) {
    this.applicationForm = this.fb.group({});
  }

  onSubmit() {
    if (!this.applicationForm.valid) return;


    const raw = this.applicationForm.getRawValue() as any;
    // serverUrl = host:port
    const composed = this.buildHostPort(raw.serverUrl, raw.port, 8080);

    const { port, server, ...rest } = raw; // quita si existieran
    const payload = { ...rest, serverUrl: composed };

    this.application.set(payload);
  }

  ngOnInit() {
    this.applicationForm = this.fb.group({
      applicationName: [this.application()?.applicationName || ''],
      deviceIdPrefix: [this.application()?.deviceIdPrefix || '', [Validators.required, this.deviceIdPrefixValidator.bind(this)]],
      accessToken: [this.application()?.accessToken || '', [Validators.minLength(16)]],
      serverUrl: [this.application()?.serverUrl || '', [Validators.required]],
      port: [8080, [Validators.min(1), Validators.max(65535)]],
      enabled: [true]
    });

    if ( this.application() !== undefined ) {
      this.applicationForm.get('accessToken')?.disable();
    }

    const serverCtrl = this.applicationForm.get('serverUrl')!;
    const portCtrl   = this.applicationForm.get('port')!;
    this.subs.push(
      serverCtrl.valueChanges.subscribe((raw: string) => {
        if (!raw) return;

        let v = String(raw).trim();

        const portMatch = v.match(/:(\d{1,5})$/);
        if (portMatch) {
          const p = Number(portMatch[1]);
          if (!Number.isNaN(p)) {
            portCtrl.setValue(p, { emitEvent: false });
            v = v.replace(/:(\d{1,5})$/, '');
            serverCtrl.setValue(v, { emitEvent: false });
            return;
          }
        }

        const currentPort = Number(portCtrl.value);
        const looksHttps = /^https:\/\//i.test(v);
        const suggested = looksHttps ? 443 : 8080;

        if (!currentPort || currentPort === 8080 || currentPort === 443) {
          portCtrl.setValue(suggested, { emitEvent: false });
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
