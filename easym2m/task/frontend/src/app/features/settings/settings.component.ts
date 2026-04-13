import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../core/services/settings.service';
import { ErrorNotificationService } from '../../core/services/error-notification.service';

import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faKey, faSave, faPenToSquare, faCircleCheck, faTriangleExclamation, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardComponent,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSpinModule,
    FontAwesomeModule,
  ],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  protected faKey = faKey;
  protected faSave = faSave;
  protected faPenToSquare = faPenToSquare;
  protected faCircleCheck = faCircleCheck;
  protected faTriangleExclamation = faTriangleExclamation;
  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;

  form!: FormGroup;
  editMode = false;
  loading = false;
  saving = false;
  passwordVisible = false;
  apiKeyVisible = false;

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private errorNotification: ErrorNotificationService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      apiClientId: [{ value: '', disabled: true }, Validators.required],
      apiPassword: [{ value: '', disabled: true }, Validators.required],
      apiKey:      [{ value: '', disabled: true }, Validators.required],
    });

    this.loadSettings();
  }

  private loadSettings(): void {
    this.loading = true;
    this.settingsService.loadSettings()
      .then(() => {
        this.form.patchValue(this.settingsService.getCredentials());
        this.loading = false;
      })
      .catch((error: any) => {
        this.loading = false;
        this.errorNotification.showHttpError('Error loading settings', error);
      });
  }

  get hasCredentials(): boolean {
    return this.settingsService.hasCredentials();
  }

  enterEditMode(): void {
    this.editMode = true;
    this.form.enable();
  }

  cancelEdit(): void {
    this.form.patchValue(this.settingsService.getCredentials());
    this.form.disable();
    this.editMode = false;
  }

  async saveSettings(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    try {
      await this.settingsService.saveCredentials(this.form.getRawValue());
      this.message.success('Credentials saved successfully');
      this.form.disable();
      this.editMode = false;
    } catch (error: any) {
      this.errorNotification.showHttpError('Error saving credentials', error);
    } finally {
      this.saving = false;
    }
  }
}
