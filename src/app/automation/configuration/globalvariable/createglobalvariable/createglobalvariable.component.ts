import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from '../../../../commons/SelectModel';
import { GlobalvariableService } from '../globalvariable.service';
import { CreateGlobalVariableModel } from '../models/CreateGlobalVariableModel';
import { UpdateGlobalVariableModel } from '../models/UpdateGlobalVariableModel';

@Component({
  selector: 'app-createglobalvariable',
  templateUrl: './createglobalvariable.component.html',
  styleUrls: ['./createglobalvariable.component.scss'],
})
export class CreateGlobalVariableComponent implements OnInit {
  @Output() globalVariableEvent = new EventEmitter<string>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  globalValueTypes: SelectModel[];
  globalvariableform: FormGroup;
  files: File[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { customerDetail: CustomerDetail; globalVariableId: number },
    private globalVariableService: GlobalvariableService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateGlobalVariableComponent>
  ) {
    this.globalvariableform = new FormGroup({
      key: new FormControl('', Validators.required),
      value: new FormControl(''),
      valueType: new FormControl('keyandvalue'),
      comments: new FormControl(''),
    });
    if (this.data.globalVariableId) {
      this.globalVariableService
        .getGlobalVariableById(this.data.globalVariableId)
        .subscribe((res) => {
          this.globalvariableform.get('key').setValue(res.key);
          this.globalvariableform.get('value').setValue(res.value);
          this.globalvariableform
            .get('valueType')
            .setValue(res.valueType.toLowerCase());
          this.globalvariableform.get('comments').setValue(res.comments);
        });
    }
  }

  ngOnInit(): void {
    this.globalValueTypes = [
      { text: 'Key And Value', value: 'keyandvalue' },
      { text: 'File', value: 'file' },
    ];
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  createGlobalVariable() {
    if (this.data.globalVariableId) {
      return this.updateGlobalVariable();
    }
    let createGlobalVariable: CreateGlobalVariableModel = {
      key: this.globalvariableform.get('key').value,
      value: this.globalvariableform.get('value').value,
      valueType: this.globalvariableform.get('valueType').value,
      comments: this.globalvariableform.get('comments').value,
      userId: this.data.customerDetail.userId,
    };

    if (this.files.length >= 1) {
      const formData = new FormData();
      formData.append('file', this.files[0]);
      createGlobalVariable.file = formData;
      createGlobalVariable.value = this.files[0].name;
    }
    this.globalVariableService
      .createGlobalVariable(createGlobalVariable)
      .subscribe(
        (res) => {
          this.openSnackBar('successfully created global variable');
          this.globalVariableEvent.emit('success');
          this.dialogRef.close();
        },
        (err) => {
          this.openSnackBar('error while creating global variable');
        }
      );
  }

  updateGlobalVariable() {
    let updateGlobalVariableModel: UpdateGlobalVariableModel = {
      key: this.globalvariableform.get('key').value,
      value: this.globalvariableform.get('value').value,
      valueType: this.globalvariableform.get('valueType').value,
      comments: this.globalvariableform.get('comments').value,
      userId: this.data.customerDetail.userId,
    };
    if (this.files.length >= 1) {
      const formData = new FormData();
      formData.append('file', this.files[0]);
      updateGlobalVariableModel.file = formData;
      updateGlobalVariableModel.value = this.files[0].name;
    }

    this.globalVariableService
      .updateGlobalVariable(
        this.data.globalVariableId,
        updateGlobalVariableModel
      )
      .subscribe(
        (res) => {
          this.openSnackBar('successfully updated global variable');
          this.globalVariableEvent.emit('success');
          this.dialogRef.close();
        },
        (err) => {
          this.openSnackBar('error while update global variable');
        }
      );
  }

  openSnackBar(message: string, closeText: string = 'Close'): void {
    this._snackBar.open(message, closeText, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
