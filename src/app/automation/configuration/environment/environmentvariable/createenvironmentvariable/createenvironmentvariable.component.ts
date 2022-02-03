import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from 'src/app/commons/models/SelectModel';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ConfigKeyValueService } from '../../../config/config-key-value/config-key-value.service';
import CreateConfigKeyValueModel from '../../../config/config-key-value/models/create-config-key-value-model';
import { ConfigType } from '../../../config/models/config-type';

@Component({
  selector: 'app-createenvironmentvariable',
  templateUrl: './createenvironmentvariable.component.html',
  styleUrls: ['./createenvironmentvariable.component.scss'],
})
export class CreateEnvironmentVariableComponent implements OnInit {
  @Output() environmentVariableEvent = new EventEmitter<string>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  applicationVariables!: SelectModel[];
  environmentValueTypes!: SelectModel[];
  environmentVariableForm: FormGroup;
  files: File[] = [];
  customerDetail!: CustomerDetail;
  isShowApplicationVariable: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customerDetail: CustomerDetail;
      environmentId: string;
      envVariableId: string;
    },
    private dialogRef: MatDialogRef<CreateEnvironmentVariableComponent>,
    private snackbarService: SnackbarService,
    private configKeyValueService: ConfigKeyValueService
  ) {
    this.environmentVariableForm = new FormGroup({
      key: new FormControl('', Validators.required),
      value: new FormControl(''),
      valueType: new FormControl('text', Validators.required),
      comments: new FormControl(''),
      isApplicationVariable: new FormControl(''),
      applicationVariable: new FormControl(''),
    });
    if (this.data.envVariableId) {
      // this.environmentVariableService
      //   .getEnvVariablesById(this.data.environmentId, this.data.envVariableId)
      //   .subscribe(
      //     (res) => {
      //       this.environmentVariableForm.get('key')!.setValue(res.key);
      //       this.environmentVariableForm.get('value')!.setValue(res.value);
      //       this.environmentVariableForm.get('valueType')!.setValue(res.type);
      //       this.environmentVariableForm
      //         .get('comments')!
      //         .setValue(res.comments);
      //     },
      //     (err) => {
      //       this.snackbarService.openSnackBar(
      //         'error while loading environment variable'
      //       );
      //     }
      //   );
    }

    this.environmentVariableForm
      .get('valueType')
      ?.valueChanges.subscribe((value) => {
        if (value === 'file') {
          this.environmentVariableForm.get('value')?.clearValidators();
        } else {
          this.environmentVariableForm
            .get('value')
            ?.setValidators(Validators.required);
        }
        this.environmentVariableForm.get('value')?.updateValueAndValidity();
      });
  }

  ngOnInit(): void {
    this.environmentValueTypes = [
      { text: 'Text', value: 'text' },
      { text: 'File', value: 'file' },
    ];
    this.applicationVariables = [
      { text: 'Accept Untrusted Certs', value: 'ACCEPT_UNTRUSTED_CERTS' },
    ];
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  createEnvironmentVariable(fileId?: string) {
    let createConfigKeyValueModel: CreateConfigKeyValueModel = {
      comments: this.environmentVariableForm.get('comments')?.value,
      key: this.environmentVariableForm.get('key')?.value,
      value: this.environmentVariableForm.get('value')?.value,
      type: this.environmentVariableForm.get('valueType')?.value,
      userId: this.data.customerDetail.userId,
      fileId: fileId,
      isApplicationVariable: this.environmentVariableForm.get(
        'isApplicationVariable'
      )?.value,
    };

    if (createConfigKeyValueModel.isApplicationVariable) {
      createConfigKeyValueModel.key = this.environmentVariableForm.get(
        'applicationVariable'
      )?.value;
    }

    this.configKeyValueService
      .createConfigKeyValue(
        this.data.customerDetail.applicationId,
        ConfigType.EnvironmentVariable,
        this.data.environmentId,
        createConfigKeyValueModel
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'successfull created environment variable'
          );
          this.dialogRef.close();
          this.environmentVariableEvent.emit('success');
        },
        (error) => {
          this.snackbarService.openSnackBar(
            'error while creating environment variables'
          );
        }
      );
    // if (this.data.envVariableId) {
    //   this.updateEnvironmentVariable();
    //   return;
    // }
    // let createEnvVariableModel: CreateEnvVariableModel = {
    //   comments: this.environmentVariableForm.get('comments')!.value,
    //   key: this.environmentVariableForm.get('key')!.value,
    //   type: this.environmentVariableForm.get('valueType')!.value,
    //   userId: this.data.customerDetail.userId,
    //   value: this.environmentVariableForm.get('value')!.value,
    // };
    // this.environmentVariableService
    //   .createEnvVariable(this.data.environmentId, createEnvVariableModel)
    //   .subscribe(
    //     (res) => {
    //       this.snackbarService.openSnackBar(
    //         'successfull created environment variable'
    //       );
    //       this.dialogRef.close();
    //       this.environmentVariableEvent.emit('success');
    //     },
    //     (err) => {
    //       this.snackbarService.openSnackBar(
    //         'error while creating environment variables'
    //       );
    //     }
    //   );
  }

  updateEnvironmentVariable() {
    // let updateEnvVariableModel: UpdateEnvVariableModel = {
    //   comments: this.environmentVariableForm.get('comments')!.value,
    //   key: this.environmentVariableForm.get('key')!.value,
    //   type: this.environmentVariableForm.get('valueType')!.value,
    //   userId: this.data.customerDetail.userId,
    //   value: this.environmentVariableForm.get('value')!.value,
    // };
    // this.environmentVariableService
    //   .updateEnvVariable(
    //     this.data.environmentId,
    //     this.data.envVariableId,
    //     updateEnvVariableModel
    //   )
    //   .subscribe(
    //     (res) => {
    //       this.snackbarService.openSnackBar(
    //         'successfull created environment variable'
    //       );
    //       this.dialogRef.close();
    //       this.environmentVariableEvent.emit('success');
    //     },
    //     (err) => {
    //       this.snackbarService.openSnackBar(
    //         'error while creating environment variables'
    //       );
    //     }
    //   );
  }

  valueTypeChange($event: any) {}

  changeApplicationVariable(): void {
    if (this.isShowApplicationVariable) {
      this.environmentVariableForm
        .get('key')
        ?.setValidators(Validators.required);
    } else {
      this.environmentVariableForm
        .get('key')
        ?.removeValidators(Validators.required);
    }
    this.environmentVariableForm.get('key')?.updateValueAndValidity();
    this.isShowApplicationVariable = !this.isShowApplicationVariable;
  }
}
