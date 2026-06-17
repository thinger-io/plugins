import { Component } from '@angular/core';
import { NzCardComponent } from "ng-zorro-antd/card";
import { AppConfigService } from "../../core/services/app-config.service";
import { faEye, faEyeSlash, faGears, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle, faCopy } from "@fortawesome/free-regular-svg-icons"
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { NzTooltipDirective } from "ng-zorro-antd/tooltip";
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-settings',
    imports: [
        NzCardComponent,
        FaIconComponent,
        NzTooltipDirective,
    ],
    templateUrl: './settings.component.html',
})
export class SettingsComponent {

  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;
  protected faGears = faGears;
  protected faQuestionCircle = faQuestionCircle;
  protected faInfoCircle = faInfoCircle;
  protected faCopy = faCopy;

  protected endpointUrl: string;
  protected tokenVisible = false;
  protected callbackToken = '';

  constructor(
    private appConfigService: AppConfigService,
    private modal: NzModalService,
    private clipboard: Clipboard,
    private message: NzMessageService
  ) {
    const config = this.appConfigService.getConfig();
    this.endpointUrl = window.location.origin + window.location.pathname;
    this.callbackToken = config?.THINGER_TOKEN_THINGPARK_PLUGIN_CALLBACK || 'UNKNOWN';
  }

  showTokenModal(): void {
    this.modal.create({
      nzTitle: 'ThingPark Callback Token',
      nzContent: `
        <div style="width: 520px; word-break: break-all; padding: 18px 0;">
          <span style="color: #888;">Bearer </span>
          <span style="font-family: monospace; user-select: all;">${this.callbackToken}</span>
        </div>
      `,
      nzFooter: [
        {
          label: 'Copy',
          type: 'primary',
          onClick: () => {
            this.copyToken();
            this.modal.closeAll();
          }
        },
        {
          label: 'Close',
          onClick: () => this.modal.closeAll()
        }
      ],
      nzClosable: true,
      nzMaskClosable: true,
      nzBodyStyle: { padding: '0 24px' }
    });
  }

  copyToken(): void {
    this.clipboard.copy(`Bearer ${this.callbackToken}`);
    this.message.success('Copied!');
  }
}
