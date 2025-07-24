import { Component, ViewChild } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SettingsService } from "../../core/services/settings.service";
import { ApplicationComponent } from "./application/application.component";

import { NzTableModule } from "ng-zorro-antd/table";
import { NzTooltipDirective } from "ng-zorro-antd/tooltip";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSkeletonComponent } from "ng-zorro-antd/skeleton";
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { faEye, faEyeSlash, faPlus, faLayerGroup, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

export interface Application {
  applicationId: string;
  applicationName: string | null;
  deviceIdPrefix: string;
  accessToken: string;
  enabled: boolean;
}

@Component({
    selector: 'app-applications',
    imports: [
        NzTableModule,
        NzTooltipDirective,
        NzButtonComponent,
        NzGridModule,
        NzCardModule,
        NzIconModule,
        FontAwesomeModule,
        NzModalModule,
        ApplicationComponent,
        NzSkeletonComponent,
        NzSwitchModule,
        NzPopconfirmModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './applications.component.html',
})
export class ApplicationsComponent {
  @ViewChild('applicationForm') applicationFormComponent!: ApplicationComponent;

  protected modalVisible = false;

  protected applications: Application[] = [];
  protected selectedApplication: Application | undefined;// = {};

  protected tokenVisible: {[key: string]: boolean} = {};

  public disabled: boolean = false;
  public allChecked: boolean = false;
  protected checkedApplications = new Set<string>();

  protected faPlus = faPlus;
  protected faTrashAlt = faTrashAlt;
  protected faLayerGroup = faLayerGroup;
  protected faQuestionCircle = faQuestionCircle;

  constructor( private settingsService: SettingsService ) {
    this.settingsService.loadSettings().then( () => {

      this.applications = settingsService.getApplications();

    });

  }

  showModal(id: string = "") {
    if ( id.length > 0 )
      this.selectedApplication = this.applications.find(app => app.applicationId === id );// || null;
    this.modalVisible = true;
  }

  submitForm() {
    this.applicationFormComponent.onSubmit();
  }

  handleCancel() {
    this.modalVisible = false;
    this.selectedApplication = undefined;
  }

  removeItems() {

    // remove the applications from the list
    this.applications = this.applications.filter(application => !this.checkedApplications.has(application.applicationId));

    // remove the application Id from this.tokenVisible
    this.checkedApplications.forEach(applicationId => {
      delete this.tokenVisible[applicationId];
    })

    this.checkedApplications.clear();

    this.settingsService.saveApplications(this.applications).then(() => {
    });
  }

  updateCheckedSet(applicationId: string, checked: boolean) {
    if(checked){
      this.checkedApplications.add(applicationId);
    }else{
      this.checkedApplications.delete(applicationId);
    }
  }

  onAllChecked(checked: boolean) {
    if(checked){
      for (let index = 0; index < this.applications.length; index++) {
        this.checkedApplications.add(this.applications[index].applicationId);
      }
    }else{
      this.checkedApplications.clear();
    }
  }

  onItemChecked(applicationId: string, checked: boolean) {
    this.updateCheckedSet(applicationId, checked);
  }

  // Change the enable status of the application processing based on the switch in the applications table
  onSwitchChange(appId: string, checked: any) {

    // set the application to enabled or disabled
    const index = this.applications.findIndex(app => app.applicationId === appId);
    if (index === -1) {
      console.error("Application not found");
    }
    this.applications[index].enabled = checked;

    this.settingsService.saveApplications(this.applications).catch(() => {
      console.error("Failed to save applications");
    });

  }

  onFormSubmit(application?: Application) {

    // return if application is undefined
    if ( typeof application === 'undefined' ) return;

    // Validity has already been checked in form
    const index = this.applications.findIndex(app => app.applicationId === this.selectedApplication?.applicationId);

    if ( typeof this.selectedApplication !== 'undefined' ) {
      // Update existing application
      const index = this.applications.findIndex(app => app.applicationId === this.selectedApplication?.applicationId);
      if (index === -1) {
        console.error("Application not found");
      }
      this.applications[index] = application;
      this.applications = [
        ...this.applications,
      ]

    } else {
      this.applications = [
        ...this.applications,
        application
      ]
    }

    this.settingsService.saveApplications(this.applications).then(() => {
      this.modalVisible = false;
      this.selectedApplication = undefined;
    });

  }

  truncateToken(token: string): string {
    const start = token.slice(0, 6);
    const end = token.slice(-4);
    return `${start}...${end}`;
  }

  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;
}
