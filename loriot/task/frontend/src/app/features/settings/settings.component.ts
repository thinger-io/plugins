import { Component } from '@angular/core';
import { NzCardComponent } from "ng-zorro-antd/card";
import { AppConfigService } from "../../core/services/app-config.service";
import { NzSkeletonComponent } from "ng-zorro-antd/skeleton";
import { faEye, faEyeSlash, faGears } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { NzTooltipDirective } from "ng-zorro-antd/tooltip";

@Component({
    selector: 'app-settings',
    imports: [
        NzCardComponent,
        FaIconComponent,
        NzSkeletonComponent,
        NzTooltipDirective,
    ],
    templateUrl: './settings.component.html',
})
export class SettingsComponent {

  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;
  protected faGears = faGears;
  protected faQuestionCircle = faQuestionCircle;

  protected endpointUrl: string;
  protected bearerToken: string;

  protected tokenVisible = false;

  constructor( private appConfigService: AppConfigService ) {
    const config = this.appConfigService.getConfig();
    this.endpointUrl = window.location.origin + window.location.pathname;
    this.bearerToken = config.THINGER_TOKEN_LORIOT_PLUGIN_CALLBACK;
  }

}
