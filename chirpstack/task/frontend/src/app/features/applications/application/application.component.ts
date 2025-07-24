import {Component, input, model, OnInit} from '@angular/core';
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
import { access } from 'fs';

@Component({
    selector: 'app-application',
    imports: [
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzSwitchModule
    ],
    templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit {
  applications = input<Application[]>();
  application = model<Application>();

  protected applicationForm: FormGroup;

  applicationIdValidator(control: AbstractControl)  {
    if (!control.value || typeof this.applications() === 'undefined' ) {
      // If the control is empty, consider it valid
      return null;
    }
    return null;
  }

  /** Makes sure the device Id prefix is not repeated */
  deviceIdPrefixValidator(control: AbstractControl) {
    if (!control.value || typeof this.applications() === 'undefined' ) {
      // If the control is empty, consider it valid
      return null;
    }
    if ( this.applications()?.find(app => app.deviceIdPrefix === control.value) ) {
        return { error: true, prefixUnique: true };
    }
    return null;
  }

  constructor(
    private fb: NonNullableFormBuilder
  ) {
    this.applicationForm = this.fb.group({});

  }

  onSubmit() {
    if ( this.applicationForm.valid ) {
      this.application.set(this.applicationForm.getRawValue());
    }
  }

  ngOnInit() {

    this.applicationForm = this.fb.group({
      applicationName: [this.application()?.applicationName || ''],
      deviceIdPrefix: [this.application()?.deviceIdPrefix || '', [Validators.required, this.deviceIdPrefixValidator.bind(this)]],
      accessToken: [this.application()?.accessToken || '', [Validators.minLength(16)]],
      enabled: [true]
    });

    if ( this.application() !== undefined ) {
      this.applicationForm.get('accessToken')?.disable();
    }

  }

}
