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
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { faEye, faEyeSlash, faPlus, faLayerGroup, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

export interface Application {
  applicationId: string;
  applicationName: string | null;
  deviceIdPrefix: string;
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
  protected selectedApplication: Application | undefined;
  protected tokenVisible: {[key: string]: boolean} = {};

  public disabled: boolean = false;
  public allChecked: boolean = false;
  protected checkedApplications = new Set<string>();

  protected faPlus = faPlus;
  protected faTrashAlt = faTrashAlt;
  protected faLayerGroup = faLayerGroup;
  protected faQuestionCircle = faQuestionCircle;

  constructor(private settingsService: SettingsService) {
    this.settingsService.loadSettings().then(() => {
      this.applications = settingsService.getApplications();
    });
  }

  // Helper to get unique identifier for an application
  private getApplicationKey(app: Application): string {
    return app.applicationName || app.applicationId || '';
  }

  showModal(name: string = "") {
    if (name.length > 0) {
      this.selectedApplication = this.applications.find(
        app => this.getApplicationKey(app) === name
      );
    }
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
    this.applications = this.applications.filter(
      application => !this.checkedApplications.has(this.getApplicationKey(application))
    );

    this.checkedApplications.forEach(appName => {
      delete this.tokenVisible[appName];
    });

    this.checkedApplications.clear();
    this.allChecked = false;

    this.settingsService.saveApplications(this.applications).then(() => {
      console.log('Applications removed successfully');
    }).catch(error => {
      console.error('Failed to save applications', error);
    });
  }

  updateCheckedSet(applicationName: string, checked: boolean) {
    if (checked) {
      this.checkedApplications.add(applicationName);
    } else {
      this.checkedApplications.delete(applicationName);
    }

    // Update allChecked status
    this.allChecked = this.applications.length > 0 &&
      this.checkedApplications.size === this.applications.length;
  }

  onAllChecked(checked: boolean) {
    this.allChecked = checked;
    if (checked) {
      this.applications.forEach(app => {
        this.checkedApplications.add(this.getApplicationKey(app));
      });
    } else {
      this.checkedApplications.clear();
    }
  }

  onItemChecked(applicationName: string, checked: boolean) {
    this.updateCheckedSet(applicationName, checked);
  }

  onSwitchChange(appName: string, checked: boolean) {
    console.log('onSwitchChange called with:', { appName, checked });

    const index = this.applications.findIndex(
      app => this.getApplicationKey(app) === appName
    );

    console.log('Found index:', index);

    if (index === -1) {
      console.error("Application not found:", appName);
      return;
    }

    console.log('Application before update:', this.applications[index]);

    // Update the specific application
    this.applications[index] = {
      ...this.applications[index],
      enabled: checked
    };

    console.log('Application after update:', this.applications[index]);

    // Save changes
    this.settingsService.saveApplications(this.applications)
      .then(() => {
        console.log(`Application ${appName} enabled status updated to ${checked}`);
      })
      .catch(error => {
        console.error("Failed to save applications:", error);
        // Revert the change if save fails
        this.applications[index].enabled = !checked;
      });
  }

  onFormSubmit(application?: Application) {
    if (typeof application === 'undefined') return;

    if (typeof this.selectedApplication !== 'undefined') {
      // Update existing application
      const index = this.applications.findIndex(
        app => this.getApplicationKey(app) === this.getApplicationKey(this.selectedApplication!)
      );

      if (index === -1) {
        console.error("Application not found");
        return;
      }

      this.applications[index] = application;
      // Force change detection
      this.applications = [...this.applications];
    } else {
      // Add new application
      this.applications = [...this.applications, application];
    }

    this.settingsService.saveApplications(this.applications).then(() => {
      this.modalVisible = false;
      this.selectedApplication = undefined;
    }).catch(error => {
      console.error("Failed to save application:", error);
    });
  }

  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;
}
