import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SettingsComponent } from "./features/settings/settings.component";
import { ApplicationsComponent } from "./features/applications/applications.component";
import { NzSpaceModule } from "ng-zorro-antd/space";

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
        SettingsComponent,
        ApplicationsComponent,
        NzSpaceModule
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

}
