import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CanaVariable, Variable } from '../../../../commons/enums/CanaVariable';
import { ConfigKeyValueService } from '../../config/config-key-value/config-key-value.service';
import { SnackbarService } from '../../../../commons/snackbar/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import CreateConfigKeyValueModel from '../../config/config-key-value/models/create-config-key-value-model';
import { CustomerDetail } from '../../../../commons/customer/models/CustomerDetail';

@Component({
  selector: 'app-create-system',
  templateUrl: './create-system.component.html',
  styleUrls: ['./create-system.component.scss'],
})
export class CreateSystemComponent implements OnInit {
  @Output() systemEvent = new EventEmitter<string>();
  systemForm!: FormGroup;
  isShowSystemVariable!: boolean;
  systemVariables!: Variable[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customerDetail: CustomerDetail;
      globalVariableId: string;
      configId: string;
    },
    private configKeyValueService: ConfigKeyValueService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<CreateSystemComponent>
  ) {
    this.systemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      isPortalVariable: new FormControl('', Validators.required),
      key: new FormControl('', Validators.required),
      comments: new FormControl(),
      value: new FormControl('', Validators.required),
    });

    this.systemVariables = CanaVariable.variables;
  }

  ngOnInit(): void {}

  createSystemVariable(): void {
    const createConfigKeyValueModel: CreateConfigKeyValueModel = {
      comments: this.systemForm.get('comments')?.value,
      key: this.systemForm.get('key')?.value,
      value: this.systemForm.get('value')?.value,
      type: this.systemForm.get('valueType')?.value,
      userId: this.data.customerDetail.userId,
    //  fileId,
      isApplicationVariable: this.systemForm.get('isApplicationVariable')
        ?.value,
    };
    // this.configKeyValueService
    //   .createConfigKeyValue(createConfigKeyValueModel)
    //   .subscribe({
    //     next: (res) => {
    //       this.snackbarService.openSnackBar(
    //         'successfully created environment variable'
    //       );
    //       this.dialogRef.close();
    //       this.systemEvent.emit('success');
    //     },
    //     error: (err) => {
    //       this.snackbarService.openSnackBar(
    //         'error while creating environment variables'
    //       );
    //     },
    //   });
  }

  changeSystemVariable(): void {
    if (this.isShowSystemVariable) {
      this.systemForm.get('key')?.setValidators(Validators.required);
    } else {
      this.systemForm.get('key')?.removeValidators(Validators.required);
    }
    this.systemForm.get('key')?.updateValueAndValidity();
    this.isShowSystemVariable = !this.isShowSystemVariable;
  }
}
